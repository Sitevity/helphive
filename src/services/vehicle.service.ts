import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  Timestamp,
  writeBatch,
  Firestore,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Vehicle, VehicleFormData, VehicleType } from '@/types';

export class VehicleService {
  static async createVehicle(
    hostId: string,
    data: VehicleFormData
  ): Promise<string> {
    const vehicleData = {
      ...data,
      hostId,
      primaryImage: data.images[0] || '',
      availability: {
        defaultAvailable: true,
        customSchedule: {},
      },
      status: 'pending' as const,
      isApproved: false,
      rating: 0,
      totalBookings: 0,
      totalReviews: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'vehicles'), vehicleData);
    return docRef.id;
  }

  static async getVehicle(id: string): Promise<Vehicle | null> {
    const vehicleDoc = await getDoc(doc(db, 'vehicles', id));
    if (!vehicleDoc.exists()) return null;
    return { id: vehicleDoc.id, ...vehicleDoc.data() } as Vehicle;
  }

  static async getVehicles(
    filters?: {
      type?: VehicleType;
      city?: string;
      minPrice?: number;
      maxPrice?: number;
    },
    pageSize: number = 20,
    lastDoc?: any
  ): Promise<{ vehicles: Vehicle[]; lastDoc: any }> {
    let q = query(collection(db, 'vehicles'), where('status', '==', 'approved'));

    if (filters?.type) {
      q = query(q, where('type', '==', filters.type));
    }

    if (filters?.city) {
      q = query(q, where('city', '==', filters.city));
    }

    q = query(q, orderBy('createdAt', 'desc'), limit(pageSize));

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);
    const vehicles = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Vehicle[];

    const newLastDoc = snapshot.docs[snapshot.docs.length - 1];

    return { vehicles, lastDoc: newLastDoc };
  }

  static async getVehiclesByHost(hostId: string): Promise<Vehicle[]> {
    const q = query(
      collection(db, 'vehicles'),
      where('hostId', '==', hostId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Vehicle[];
  }

  static async updateVehicle(
    id: string,
    data: Partial<VehicleFormData>
  ): Promise<void> {
    await updateDoc(doc(db, 'vehicles', id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }

  static async deleteVehicle(id: string): Promise<void> {
    await deleteDoc(doc(db, 'vehicles', id));
  }

  static async approveVehicle(id: string): Promise<void> {
    await updateDoc(doc(db, 'vehicles', id), {
      status: 'approved',
      isApproved: true,
      updatedAt: serverTimestamp(),
    });
  }

  static async rejectVehicle(id: string): Promise<void> {
    await updateDoc(doc(db, 'vehicles', id), {
      status: 'rejected',
      isApproved: false,
      updatedAt: serverTimestamp(),
    });
  }

  static async toggleVehicleStatus(id: string, isActive: boolean): Promise<void> {
    await updateDoc(doc(db, 'vehicles', id), {
      status: isActive ? 'approved' : 'inactive',
      updatedAt: serverTimestamp(),
    });
  }

  static async checkAvailability(
    vehicleId: string,
    startDate: Date,
    endDate: Date
  ): Promise<boolean> {
    const bookingsQuery = query(
      collection(db, 'bookings'),
      where('vehicleId', '==', vehicleId),
      where('status', 'in', ['pending', 'confirmed', 'in_progress'])
    );

    const snapshot = await getDocs(bookingsQuery);
    const startTimestamp = Timestamp.fromDate(startDate);
    const endTimestamp = Timestamp.fromDate(endDate);

    for (const doc of snapshot.docs) {
      const booking = doc.data();
      const bookingStart = booking.startDate;
      const bookingEnd = booking.endDate;

      if (
        (startTimestamp >= bookingStart && startTimestamp <= bookingEnd) ||
        (endTimestamp >= bookingStart && endTimestamp <= bookingEnd) ||
        (startTimestamp <= bookingStart && endTimestamp >= bookingEnd)
      ) {
        return false;
      }
    }

    return true;
  }

  static async uploadImages(
    vehicleId: string,
    files: File[]
  ): Promise<string[]> {
    const urls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `vehicles/${vehicleId}/${i}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }

    return urls;
  }

  static async updateVehicleRating(
    vehicleId: string,
    newRating: number
  ): Promise<void> {
    const vehicle = await this.getVehicle(vehicleId);
    if (!vehicle) return;

    const totalRatings = vehicle.totalReviews + 1;
    const updatedRating =
      (vehicle.rating * vehicle.totalReviews + newRating) / totalRatings;

    await updateDoc(doc(db, 'vehicles', vehicleId), {
      rating: updatedRating,
      totalReviews: totalRatings,
    });
  }

  static async incrementBookingCount(vehicleId: string): Promise<void> {
    await updateDoc(doc(db, 'vehicles', vehicleId), {
      totalBookings: (await this.getVehicle(vehicleId))!.totalBookings + 1,
    });
  }

  static async getPopularVehicles(
    limitCount: number = 10
  ): Promise<Vehicle[]> {
    const q = query(
      collection(db, 'vehicles'),
      where('status', '==', 'approved'),
      orderBy('totalBookings', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Vehicle[];
  }

  static async getFeaturedVehicles(
    limitCount: number = 6
  ): Promise<Vehicle[]> {
    const q = query(
      collection(db, 'vehicles'),
      where('status', '==', 'approved'),
      orderBy('rating', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Vehicle[];
  }

  static async searchVehicles(
    searchQuery: string
  ): Promise<Vehicle[]> {
    const { vehicles } = await this.getVehicles();
    const query = searchQuery.toLowerCase();
    return vehicles.filter(
      (v) =>
        v.brand.toLowerCase().includes(query) ||
        v.model.toLowerCase().includes(query) ||
        v.city.toLowerCase().includes(query) ||
        v.type.toLowerCase().includes(query)
    );
  }
}
