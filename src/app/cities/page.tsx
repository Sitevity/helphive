'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer } from '@/components/layout';
import { Search, MapPin, Star, Users, Calendar, ArrowRight } from 'lucide-react';
import { CITIES_DATA } from '@/data/sample-data';

export default function CitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLive, setShowLive] = useState(true);

  const filteredCities = CITIES_DATA.filter((city) => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />

      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#2D2D44] py-16 lg:py-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF5722]/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C6FF00]/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              Explore India's Best Cities
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              From beach adventures in Goa to heritage tours in Jaipur. Discover authentic experiences in {CITIES_DATA.length} cities across India.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-full bg-white text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#FF5722] shadow-2xl text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cities Grid */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredCities.length === 0 ? (
              <div className="text-center py-16">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-500">No cities found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCities.map((city, index) => (
                  <Link
                    key={city.slug}
                    href={`/explore/vehicles?city=${city.name}`}
                    className="group block animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="relative rounded-3xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(26,26,46,0.06)] hover:shadow-[0_12px_40px_rgba(26,26,46,0.12)] transition-all duration-300 hover:-translate-y-2">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={city.image}
                          alt={city.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{city.name}</h3>
                          <p className="text-white/80 text-sm">{city.description}</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="p-5">
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-[#FF5722]/10 flex items-center justify-center">
                              <Star className="h-5 w-5 text-[#FF5722]" />
                            </div>
                            <div>
                              <p className="font-bold text-[#1A1A2E]">{city.vehicleCount}</p>
                              <p className="text-xs text-[#4A4A6A]">Vehicles</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-[#00BCD4]/10 flex items-center justify-center">
                              <Users className="h-5 w-5 text-[#00BCD4]" />
                            </div>
                            <div>
                              <p className="font-bold text-[#1A1A2E]">{city.experienceCount}</p>
                              <p className="text-xs text-[#4A4A6A]">Experiences</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#F0F0F5] flex items-center justify-between">
                          <span className="text-sm text-[#4A4A6A]">Starting from</span>
                          <span className="text-lg font-bold text-[#FF5722]">₹599/day</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
