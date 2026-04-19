'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Input, Select } from '@/components/ui';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { UserRole } from '@/types';

const registerSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['user', 'host', 'guide']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'user',
    },
  });

  if (isAuthenticated) {
    router.push('/dashboard/user');
    return null;
  }

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');
    try {
      await registerUser(data.email, data.password, data.displayName);
      router.push('/dashboard/user');
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[var(--color-secondary)] to-[#087E7E]">
        <div className="h-full flex flex-col items-center justify-center p-12 text-white">
          <div className="text-center">
            <div className="text-8xl mb-6">🌟</div>
            <h2 className="text-3xl font-bold mb-4">Start Your Journey</h2>
            <p className="text-white/80 max-w-md mb-8">
              Create an account to rent vehicles, book experiences, or start hosting. The adventure begins here!
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-md">
              <div className="text-center">
                <div className="text-4xl mb-2">🛺</div>
                <div className="text-sm">Rent Vehicles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <div className="text-sm">Book Tours</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">💰</div>
                <div className="text-sm">Earn Money</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="text-3xl">🛺</span>
              <span className="text-xl font-bold text-[var(--color-primary)] font-[var(--font-heading)]">
                TukTukIndia
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-[var(--color-text)]">Create an account</h1>
            <p className="text-[var(--color-text-muted)] mt-2">
              Join thousands of travelers and hosts
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your name"
              leftIcon={<User className="h-4 w-4" />}
              error={errors.displayName?.message}
              {...register('displayName')}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              leftIcon={<Phone className="h-4 w-4" />}
              error={errors.phone?.message}
              {...register('phone')}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              hint="At least 6 characters"
              {...register('password')}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <Select
              label="I want to..."
              options={[
                { value: 'user', label: 'Rent vehicles and book experiences' },
                { value: 'host', label: 'List my vehicles and earn money' },
                { value: 'guide', label: 'Offer local experiences and tours' },
              ]}
              error={errors.role?.message}
              {...register('role')}
            />

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                required
              />
              <label htmlFor="terms" className="text-sm text-[var(--color-text-muted)]">
                I agree to the{' '}
                <Link href="/terms" className="text-[var(--color-primary)] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[var(--color-primary)] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[var(--color-primary)] font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
