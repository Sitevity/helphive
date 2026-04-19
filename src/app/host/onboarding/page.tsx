'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Header, Footer } from '@/components/layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Input, Select, Card, Textarea } from '@/components/ui';
import { AuthService } from '@/services/auth.service';
import { CheckCircle, Car, Shield, Clock, Star } from 'lucide-react';

const hostSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  city: z.string().min(1, 'Please select a city'),
  address: z.string().min(10, 'Please enter your full address'),
  idType: z.string().min(1, 'Please select ID type'),
  idNumber: z.string().min(1, 'Please enter ID number'),
});

type HostFormData = z.infer<typeof hostSchema>;

export default function HostOnboardingPage() {
  const router = useRouter();
  const { user, upgradeToHost, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<HostFormData>({
    resolver: zodResolver(hostSchema),
  });

  const steps = [
    { number: 1, title: 'Personal Info', icon: CheckCircle },
    { number: 2, title: 'Location', icon: CheckCircle },
    { number: 3, title: 'Verification', icon: CheckCircle },
    { number: 4, title: 'Review', icon: CheckCircle },
  ];

  const nextStep = async () => {
    let valid = true;
    if (currentStep === 1) {
      valid = await trigger(['displayName', 'phone']);
    } else if (currentStep === 2) {
      valid = await trigger(['city', 'address']);
    } else if (currentStep === 3) {
      valid = await trigger(['idType', 'idNumber']);
    }
    if (valid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: HostFormData) => {
    if (!user) return;
    setIsLoading(true);
    try {
      await upgradeToHost();
      setIsComplete(true);
    } catch (error) {
      console.error('Error upgrading to host:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: Car, title: 'Earn Extra Income', description: 'Set your own prices and earn money from your vehicle' },
    { icon: Shield, title: 'Insurance Coverage', description: 'All bookings are covered by comprehensive insurance' },
    { icon: Clock, title: 'Flexible Schedule', description: 'You control when your vehicle is available' },
    { icon: Star, title: 'Build Your Reputation', description: 'Get rated by renters and build credibility' },
  ];

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="max-w-md mx-auto text-center px-4">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
              Application Submitted!
            </h1>
            <p className="text-[var(--color-text-muted)] mb-8">
              Your host application is under review. We'll notify you once it's approved, typically within 24-48 hours.
            </p>
            <Button onClick={() => router.push('/dashboard/user')} className="w-full">
              Go to Dashboard
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--color-text)]">Become a Host</h1>
            <p className="text-[var(--color-text-muted)] mt-2">
              Start earning by listing your vehicle
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 px-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      currentStep >= step.number
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-xs mt-1 text-[var(--color-text-muted)] hidden sm:block">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 sm:w-24 h-1 mx-2 rounded ${
                      currentStep > step.number ? 'bg-[var(--color-primary)]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                      <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        error={errors.displayName?.message}
                        {...register('displayName')}
                      />
                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="Enter your phone number"
                        error={errors.phone?.message}
                        {...register('phone')}
                      />
                      <p className="text-sm text-[var(--color-text-muted)]">
                        We'll use this information to verify your identity and contact you about your listings.
                      </p>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">Location Details</h3>
                      <Select
                        label="City"
                        placeholder="Select your city"
                        options={[
                          { value: '', label: 'Select city' },
                          { value: 'mumbai', label: 'Mumbai' },
                          { value: 'delhi', label: 'Delhi' },
                          { value: 'bangalore', label: 'Bangalore' },
                          { value: 'chennai', label: 'Chennai' },
                          { value: 'kolkata', label: 'Kolkata' },
                          { value: 'hyderabad', label: 'Hyderabad' },
                          { value: 'pune', label: 'Pune' },
                          { value: 'jaipur', label: 'Jaipur' },
                          { value: 'goa', label: 'Goa' },
                        ]}
                        error={errors.city?.message}
                        {...register('city')}
                      />
                      <Textarea
                        label="Address"
                        placeholder="Enter your full address for vehicle pickup"
                        error={errors.address?.message}
                        {...register('address')}
                      />
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">Identity Verification</h3>
                      <Select
                        label="ID Type"
                        placeholder="Select ID type"
                        options={[
                          { value: '', label: 'Select ID type' },
                          { value: 'aadhaar', label: 'Aadhaar Card' },
                          { value: 'passport', label: 'Passport' },
                          { value: 'driving_license', label: 'Driving License' },
                          { value: 'voter_id', label: 'Voter ID' },
                        ]}
                        error={errors.idType?.message}
                        {...register('idType')}
                      />
                      <Input
                        label="ID Number"
                        placeholder="Enter your ID number"
                        error={errors.idNumber?.message}
                        {...register('idNumber')}
                      />
                      <p className="text-sm text-[var(--color-text-muted)]">
                        Please ensure the name on your ID matches your registered name. This information is used for verification only.
                      </p>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">Review & Submit</h3>
                      <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[var(--color-text-muted)]">Name:</span>
                          <span className="font-medium">To be reviewed</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--color-text-muted)]">Phone:</span>
                          <span className="font-medium">To be verified</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--color-text-muted)]">City:</span>
                          <span className="font-medium">To be confirmed</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--color-text-muted)]">ID Type:</span>
                          <span className="font-medium">To be verified</span>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        By submitting, you agree to our Host Terms of Service and confirm that all information provided is accurate.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between mt-6 pt-4 border-t">
                    {currentStep > 1 && (
                      <Button type="button" variant="ghost" onClick={prevStep}>
                        Back
                      </Button>
                    )}
                    <div className="ml-auto">
                      {currentStep < 4 ? (
                        <Button type="button" onClick={nextStep}>
                          Continue
                        </Button>
                      ) : (
                        <Button type="submit" isLoading={isLoading}>
                          Submit Application
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </Card>
            </div>

            {/* Benefits Sidebar */}
            <div className="hidden lg:block">
              <Card className="sticky top-24">
                <h3 className="font-semibold text-[var(--color-text)] mb-4">Why Become a Host?</h3>
                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit.title} className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                        <benefit.icon className="h-5 w-5 text-[var(--color-primary)]" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{benefit.title}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">{benefit.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
