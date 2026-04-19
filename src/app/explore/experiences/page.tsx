'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer } from '@/components/layout';
import { ExperienceService } from '@/services/experience.service';
import { Experience } from '@/types';
import { Card, Button, Input, Select, Badge, EmptyState } from '@/components/ui';
import { EXPERIENCE_CATEGORIES, LANGUAGES } from '@/constants';
import { formatCurrency } from '@/lib/utils';
import { Search, SlidersHorizontal, Clock, Users, Star, MapPin } from 'lucide-react';

export default function ExploreExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [filters, setFilters] = useState({
    category: '',
    language: '',
    maxPrice: '',
  });

  useEffect(() => {
    loadExperiences();
  }, [filters]);

  const loadExperiences = async () => {
    setIsLoading(true);
    try {
      const data = await ExperienceService.getExperiences({
        category: filters.category || undefined,
      });
      setExperiences(data.experiences);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredExperiences = experiences.filter((exp) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      exp.title.toLowerCase().includes(query) ||
      exp.description.toLowerCase().includes(query) ||
      exp.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">
              Local Experiences
            </h1>
            <p className="text-[var(--color-text-muted)] mt-2">
              Discover authentic Indian culture with local guides
            </p>
          </div>

          {/* Search and Filter Bar */}
          <Card className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search experiences..."
                  leftIcon={<Search className="h-4 w-4" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                leftIcon={<SlidersHorizontal className="h-4 w-4" />}
              >
                Filters
              </Button>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Select
                    label="Category"
                    placeholder="All categories"
                    options={[
                      { value: '', label: 'All categories' },
                      ...EXPERIENCE_CATEGORIES.map((c) => ({ value: c.value, label: c.label })),
                    ]}
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  />
                  <Select
                    label="Language"
                    placeholder="All languages"
                    options={[
                      { value: '', label: 'All languages' },
                      ...LANGUAGES.map((l) => ({ value: l.value, label: l.label })),
                    ]}
                    value={filters.language}
                    onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                  />
                  <Input
                    label="Max Price (₹)"
                    type="number"
                    placeholder="Any"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Categories */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {EXPERIENCE_CATEGORIES.map((category) => (
              <button
                key={category.value}
                onClick={() => setFilters({ ...filters, category: category.value })}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filters.category === category.value
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-white text-[var(--color-text)] border border-gray-200 hover:border-[var(--color-primary)]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-sm text-[var(--color-text-muted)]">
              {isLoading ? 'Loading...' : `${filteredExperiences.length} experiences found`}
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} padding="none" className="overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-shimmer" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-200 rounded animate-shimmer w-3/4" />
                    <div className="h-4 bg-gray-200 rounded animate-shimmer w-1/2" />
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded animate-shimmer w-20" />
                      <div className="h-4 bg-gray-200 rounded animate-shimmer w-16" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredExperiences.length === 0 ? (
            <EmptyState
              type="no-experiences"
              title="No experiences found"
              description="Try adjusting your search or filters"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperiences.map((experience) => (
                <Link key={experience.id} href={`/experiences/${experience.id}`}>
                  <Card variant="interactive" padding="none" className="overflow-hidden h-full">
                    <div className="relative h-48">
                      <Image
                        src={experience.primaryImage || '/placeholder-experience.jpg'}
                        alt={experience.title}
                        fill
                        className="object-cover"
                      />
                      <Badge variant="primary" className="absolute left-3 top-3">
                        {EXPERIENCE_CATEGORIES.find((c) => c.value === experience.category)?.label || experience.category}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-[var(--color-text)] line-clamp-1">
                        {experience.title}
                      </h3>
                      <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">
                        {experience.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3 text-sm text-[var(--color-text-muted)]">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {experience.duration}h
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Max {experience.maxParticipants}
                        </span>
                      </div>
                      <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[var(--color-warning)] text-[var(--color-warning)]" />
                          <span className="font-medium">{experience.rating.toFixed(1)}</span>
                          <span className="text-sm text-[var(--color-text-muted)]">
                            ({experience.totalReviews})
                          </span>
                        </div>
                        <div>
                          <span className="text-xl font-bold text-[var(--color-primary)]">
                            {formatCurrency(experience.pricePerPerson)}
                          </span>
                          <span className="text-sm text-[var(--color-text-muted)]">/person</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
