import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui';
import {
  MapPin,
  Shield,
  Star,
  Clock,
  Users,
  Trophy,
  ArrowRight,
  Zap,
  Heart,
} from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Explore Local',
    description: 'Discover hidden gems and iconic landmarks with local hosts who know every corner.',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'All vehicles are verified, insured, and equipped with GPS tracking for your peace of mind.',
  },
  {
    icon: Star,
    title: 'Top Rated',
    description: 'Browse thousands of 5-star rated vehicles and experiences from trusted hosts.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Our dedicated support team is always available to help you anytime, anywhere.',
  },
];

const stats = [
  { value: '10,000+', label: 'Happy Travelers' },
  { value: '500+', label: 'Vehicles Available' },
  { value: '50+', label: 'Local Experiences' },
  { value: '4.9★', label: 'Average Rating' },
];

const vehicleTypes = [
  { emoji: '🛺', name: 'Tuk-Tuks', description: 'Iconic 3-wheelers for the authentic experience' },
  { emoji: '🛵', name: 'Scooters', description: 'Perfect for zipping through city streets' },
  { emoji: '🏍️', name: 'Motorbikes', description: 'For the adventurous souls seeking thrills' },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)] to-[#D35400]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoNHY0aC0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Explore India,
                  <br />
                  <span className="text-[var(--color-warning)]">Your Way</span>
                </h1>
                <p className="mt-6 text-lg text-white/90 max-w-xl">
                  Rent iconic tuk-tuks, scooters, and bikes from local hosts. Discover authentic experiences with
                  knowledgeable guides who'll show you the real India.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/explore/vehicles">
                    <Button size="xl" className="w-full sm:w-auto bg-white text-[var(--color-primary)] hover:bg-gray-100">
                      Rent a Vehicle
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/explore/experiences">
                    <Button size="xl" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                      Explore Experiences
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-[var(--color-warning)] rounded-full opacity-20 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[var(--color-secondary)] rounded-full opacity-20 blur-3xl" />
                <Image
                  src="https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=600&h=500&fit=crop"
                  alt="Tuk-Tuk adventure in India"
                  width={600}
                  height={500}
                  className="relative rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-12 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--color-text-muted)] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicle Types */}
        <section className="py-20 bg-[var(--color-background)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">
                Choose Your Ride
              </h2>
              <p className="mt-4 text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
                From the iconic tuk-tuk to sleek scooters, we've got the perfect vehicle for every journey.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {vehicleTypes.map((type) => (
                <Link
                  key={type.name}
                  href={`/explore/vehicles?type=${type.name.toLowerCase().replace(' ', '-')}`}
                  className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="text-6xl mb-4">{type.emoji}</div>
                  <h3 className="text-xl font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                    {type.name}
                  </h3>
                  <p className="mt-2 text-[var(--color-text-muted)]">{type.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">
                Why Choose TukTukIndia?
              </h2>
              <p className="mt-4 text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
                We're not just a rental platform — we're your gateway to authentic Indian experiences.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-text)]">{feature.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tournament CTA */}
        <section className="py-20 bg-gradient-to-r from-[var(--color-accent)] to-[#7B2CBF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 mb-4">
                  <Trophy className="h-4 w-4 text-[var(--color-warning)]" />
                  <span className="text-sm text-white font-medium">Driver Tournament</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Compete & Win Rewards
                </h2>
                <p className="mt-4 text-lg text-white/80 max-w-lg">
                  Join our weekly driver tournaments. Earn points, climb the leaderboard, and unlock exclusive rewards like fee discounts and featured listings.
                </p>
                <Link href="/tournament">
                  <Button size="lg" className="mt-6 bg-white text-[var(--color-accent)] hover:bg-gray-100">
                    View Leaderboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="flex gap-4">
                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-white">🥉 10%</div>
                  <div className="text-sm text-white/70">Bronze Discount</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-white">🥈 20%</div>
                  <div className="text-sm text-white/70">Silver Discount</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-white">🥇 30%</div>
                  <div className="text-sm text-white/70">Gold Discount</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Become a Host */}
        <section className="py-20 bg-[var(--color-background)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop"
                  alt="Host a vehicle"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">
                  Earn Money Hosting
                </h2>
                <p className="mt-4 text-lg text-[var(--color-text-muted)]">
                  Have a tuk-tuk, scooter, or bike sitting idle? List it on TukTukIndia and start earning.
                  Our hosts earn up to ₹50,000 per month!
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    'Free listing with no hidden fees',
                    'Insurance coverage for all bookings',
                    '24/7 customer support',
                    'Secure payments directly to your account',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-[var(--color-success)]" />
                      </div>
                      <span className="text-[var(--color-text)]">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/host/onboarding">
                  <Button size="lg" className="mt-8">
                    Start Hosting
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[var(--color-primary)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Start Your Adventure?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Join thousands of travelers who've discovered the magic of India with TukTukIndia.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="xl" className="w-full sm:w-auto bg-white text-[var(--color-primary)] hover:bg-gray-100">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/explore/vehicles">
                <Button size="xl" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Browse Vehicles
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
