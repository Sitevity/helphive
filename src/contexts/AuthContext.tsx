'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { AuthService } from '@/services/auth.service';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  upgradeToHost: () => Promise<void>;
  upgradeToGuide: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const profile = await AuthService.getUserProfile(firebaseUser.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await AuthService.login(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    setIsLoading(true);
    try {
      await AuthService.register(email, password, displayName);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      setUserProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    await AuthService.resetPassword(email);
  };

  const refreshUserProfile = async () => {
    if (user) {
      const profile = await AuthService.getUserProfile(user.uid);
      setUserProfile(profile);
    }
  };

  const upgradeToHost = async () => {
    if (!user) throw new Error('User not authenticated');
    await AuthService.upgradeToHost(user.uid);
    await refreshUserProfile();
  };

  const upgradeToGuide = async () => {
    if (!user) throw new Error('User not authenticated');
    await AuthService.upgradeToGuide(user.uid);
    await refreshUserProfile();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isLoading,
        isAuthenticated: !!user,
        role: userProfile?.role || null,
        login,
        register,
        logout,
        resetPassword,
        refreshUserProfile,
        upgradeToHost,
        upgradeToGuide,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useRequireAuth(redirectTo = '/auth/login') {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = redirectTo;
    }
  }, [isAuthenticated, isLoading, redirectTo]);

  return { isAuthenticated, isLoading };
}

export function useRequireRole(allowedRoles: UserRole[], redirectTo = '/') {
  const { role, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated && role && !allowedRoles.includes(role)) {
      window.location.href = redirectTo;
    }
  }, [role, isLoading, isAuthenticated, redirectTo]);

  return { role, isLoading, isAuthorized: role ? allowedRoles.includes(role) : false };
}
