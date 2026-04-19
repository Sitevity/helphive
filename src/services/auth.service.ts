import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '@/lib/firebase';
import { User as UserType, UserRole } from '@/types';

export class AuthService {
  static async register(
    email: string,
    password: string,
    displayName: string,
    role: UserRole = 'user'
  ): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });

    const userData: Omit<UserType, 'id'> = {
      email,
      displayName,
      role,
      createdAt: serverTimestamp() as any,
      updatedAt: serverTimestamp() as any,
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), userData);

    return userCredential.user;
  }

  static async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  static async logout(): Promise<void> {
    await signOut(auth);
  }

  static async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }

  static async getUserProfile(uid: string): Promise<UserType | null> {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) return null;
    return { id: userDoc.id, ...userDoc.data() } as UserType;
  }

  static async updateUserProfile(
    uid: string,
    data: Partial<UserType>
  ): Promise<void> {
    await updateDoc(doc(db, 'users', uid), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }

  static async uploadAvatar(
    uid: string,
    file: File
  ): Promise<string> {
    const storageRef = ref(storage, `avatars/${uid}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    await updateProfile(auth.currentUser!, { photoURL: downloadURL });
    await updateDoc(doc(db, 'users', uid), { photoURL: downloadURL });
    return downloadURL;
  }

  static onAuthChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }

  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  static async upgradeToHost(uid: string): Promise<void> {
    await updateDoc(doc(db, 'users', uid), {
      role: 'host',
      hostProfile: {
        isApproved: false,
        vehicles: [],
        totalEarnings: 0,
        rating: 0,
        responseRate: 100,
      },
      updatedAt: serverTimestamp(),
    });
  }

  static async upgradeToGuide(uid: string): Promise<void> {
    await updateDoc(doc(db, 'users', uid), {
      role: 'guide',
      guideProfile: {
        isApproved: false,
        tours: [],
        languages: [],
        categories: [],
        bio: '',
        rating: 0,
      },
      updatedAt: serverTimestamp(),
    });
  }

  static async approveHost(uid: string): Promise<void> {
    await updateDoc(doc(db, 'users', uid), {
      'hostProfile.isApproved': true,
      updatedAt: serverTimestamp(),
    });
  }

  static async approveGuide(uid: string): Promise<void> {
    await updateDoc(doc(db, 'users', uid), {
      'guideProfile.isApproved': true,
      updatedAt: serverTimestamp(),
    });
  }
}
