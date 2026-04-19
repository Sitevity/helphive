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
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Experience, ExperienceFormData } from '@/types';

export class ExperienceService {
  static async createExperience(
    guideId: string,
    data: ExperienceFormData
  ): Promise<string> {
    const experienceData = {
      guideId,
      ...data,
      primaryImage: data.images[0] || '',
      availability: {
        availableDays: data.availableDays,
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

    const docRef = await addDoc(collection(db, 'experiences'), experienceData);
    return docRef.id;
  }

  static async getExperience(id: string): Promise<Experience | null> {
    const experienceDoc = await getDoc(doc(db, 'experiences', id));
    if (!experienceDoc.exists()) return null;
    return { id: experienceDoc.id, ...experienceDoc.data() } as Experience;
  }

  static async getExperiences(
    filters?: {
      category?: string;
      guideId?: string;
    },
    pageSize: number = 20,
    lastDoc?: any
  ): Promise<{ experiences: Experience[]; lastDoc: any }> {
    let q = query(
      collection(db, 'experiences'),
      where('status', '==', 'approved')
    );

    if (filters?.category) {
      q = query(q, where('category', '==', filters.category));
    }

    if (filters?.guideId) {
      q = query(q, where('guideId', '==', filters.guideId));
    }

    q = query(q, orderBy('createdAt', 'desc'), limit(pageSize));

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);
    const experiences = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Experience[];

    return {
      experiences,
      lastDoc: snapshot.docs[snapshot.docs.length - 1],
    };
  }

  static async getExperiencesByGuide(guideId: string): Promise<Experience[]> {
    const q = query(
      collection(db, 'experiences'),
      where('guideId', '==', guideId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Experience[];
  }

  static async updateExperience(
    id: string,
    data: Partial<ExperienceFormData>
  ): Promise<void> {
    const updateData: any = {
      ...data,
      updatedAt: serverTimestamp(),
    };

    if (data.availableDays) {
      updateData.availability = {
        availableDays: data.availableDays,
        customSchedule: {},
      };
    }

    await updateDoc(doc(db, 'experiences', id), updateData);
  }

  static async deleteExperience(id: string): Promise<void> {
    await deleteDoc(doc(db, 'experiences', id));
  }

  static async approveExperience(id: string): Promise<void> {
    await updateDoc(doc(db, 'experiences', id), {
      status: 'approved',
      isApproved: true,
      updatedAt: serverTimestamp(),
    });
  }

  static async rejectExperience(id: string): Promise<void> {
    await updateDoc(doc(db, 'experiences', id), {
      status: 'rejected',
      isApproved: false,
      updatedAt: serverTimestamp(),
    });
  }

  static async uploadImages(
    experienceId: string,
    files: File[]
  ): Promise<string[]> {
    const urls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `experiences/${experienceId}/${i}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }

    return urls;
  }

  static async getPopularExperiences(
    limitCount: number = 10
  ): Promise<Experience[]> {
    const q = query(
      collection(db, 'experiences'),
      where('status', '==', 'approved'),
      orderBy('totalBookings', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Experience[];
  }

  static async getFeaturedExperiences(
    limitCount: number = 6
  ): Promise<Experience[]> {
    const q = query(
      collection(db, 'experiences'),
      where('status', '==', 'approved'),
      orderBy('rating', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Experience[];
  }

  static async incrementBookingCount(experienceId: string): Promise<void> {
    const experience = await this.getExperience(experienceId);
    if (!experience) return;

    await updateDoc(doc(db, 'experiences', experienceId), {
      totalBookings: experience.totalBookings + 1,
    });
  }
}
