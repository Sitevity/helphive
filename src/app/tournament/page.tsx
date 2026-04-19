'use client';

import { useState, useEffect } from 'react';
import { Header, Footer } from '@/components/layout';
import { Card, Button, Badge, Avatar, EmptyState } from '@/components/ui';
import { TournamentService } from '@/services/tournament.service';
import { Tournament, LeaderboardEntry } from '@/types';
import { Trophy, Medal, TrendingUp, Zap, Calendar, Gift } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function TournamentPage() {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTournamentData();
  }, []);

  const loadTournamentData = async () => {
    setIsLoading(true);
    try {
      const activeTournament = await TournamentService.getActiveTournament();
      if (activeTournament) {
        setTournament(activeTournament);
        const leaderboardData = await TournamentService.getLeaderboard(activeTournament.id);
        setLeaderboard(leaderboardData);
      }
    } catch (error) {
      console.error('Error loading tournament:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRewardBadge = (rank: number) => {
    if (rank === 1) return { emoji: '🥇', label: 'Gold', color: 'gold' };
    if (rank === 2) return { emoji: '🥈', label: 'Silver', color: 'silver' };
    if (rank === 3) return { emoji: '🥉', label: 'Bronze', color: 'bronze' };
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="relative bg-gradient-to-r from-[var(--color-accent)] to-[#7B2CBF] rounded-2xl p-8 mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoNHY0aC0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="h-8 w-8 text-[var(--color-warning)]" />
                <span className="text-white/80 text-sm font-medium">Weekly Challenge</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Driver Tournament
              </h1>
              <p className="text-white/80 mt-2 max-w-xl">
                Compete with fellow drivers, climb the leaderboard, and unlock exclusive rewards.
                The top drivers earn fee discounts and cash bonuses!
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Card className="bg-white/10 border-0 backdrop-blur-sm text-white">
                  <div className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-[var(--color-warning)]" />
                    <div>
                      <div className="text-sm text-white/70">Rewards Pool</div>
                      <div className="font-bold">{formatCurrency(10000)}</div>
                    </div>
                  </div>
                </Card>
                <Card className="bg-white/10 border-0 backdrop-blur-sm text-white">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[var(--color-warning)]" />
                    <div>
                      <div className="text-sm text-white/70">Ends In</div>
                      <div className="font-bold">3 Days</div>
                    </div>
                  </div>
                </Card>
                <Card className="bg-white/10 border-0 backdrop-blur-sm text-white">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-[var(--color-warning)]" />
                    <div>
                      <div className="text-sm text-white/70">Participants</div>
                      <div className="font-bold">{leaderboard.length || 156}</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Rewards Tiers */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">Rewards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { rank: 'Gold 🥇', discount: '30%', bonus: formatCurrency(2000), features: ['Featured listing', 'Priority support', 'Badge on profile'] },
                { rank: 'Silver 🥈', discount: '20%', bonus: formatCurrency(1000), features: ['Featured listing', 'Badge on profile'] },
                { rank: 'Bronze 🥉', discount: '10%', bonus: formatCurrency(500), features: ['Badge on profile'] },
              ].map((tier) => (
                <Card key={tier.rank} className="text-center">
                  <div className="text-2xl mb-2">{tier.rank.split(' ')[0]}</div>
                  <div className="text-sm text-[var(--color-text-muted)] mb-3">{tier.rank.split(' ')[1]}</div>
                  <div className="text-3xl font-bold text-[var(--color-primary)]">{tier.discount}</div>
                  <div className="text-sm text-[var(--color-text-muted)]">Fee Discount</div>
                  <div className="text-lg font-semibold text-[var(--color-success)] mt-2">{tier.bonus}</div>
                  <div className="text-sm text-[var(--color-text-muted)]">Cash Bonus</div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {tier.features.map((f) => (
                      <div key={f} className="text-sm text-[var(--color-text-muted)] flex items-center justify-center gap-1">
                        <TrendingUp className="h-3 w-3" /> {f}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[var(--color-text)]">Leaderboard</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-[var(--color-primary)]">
                  This Week
                </Button>
                <Button variant="ghost" size="sm">
                  This Month
                </Button>
                <Button variant="ghost" size="sm">
                  All Time
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg animate-shimmer h-16" />
                ))}
              </div>
            ) : leaderboard.length === 0 ? (
              <EmptyState
                type="no-data"
                title="No participants yet"
                description="Be the first to join the tournament!"
              />
            ) : (
              <div className="space-y-3">
                {/* Top 3 */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[1, 0, 2].map((index) => {
                    const entry = leaderboard[index];
                    if (!entry) return null;
                    const badge = getRewardBadge(entry.rank);
                    return (
                      <div
                        key={entry.rank}
                        className={`relative text-center p-4 rounded-xl ${
                          entry.rank === 1
                            ? 'bg-gradient-to-b from-[#FFD700]/20 to-transparent order-2'
                            : entry.rank === 2
                            ? 'bg-gradient-to-b from-[#C0C0C0]/20 to-transparent'
                            : 'bg-gradient-to-b from-[#CD7F32]/20 to-transparent'
                        }`}
                      >
                        <div className="relative inline-block">
                          <Avatar size="xl" fallback={`U${index}`} />
                          {badge && (
                            <div className="absolute -bottom-1 -right-1 text-xl">{badge.emoji}</div>
                          )}
                        </div>
                        <div className="mt-2 font-semibold text-[var(--color-text)]">
                          Driver #{entry.rank}
                        </div>
                        <div className="text-sm text-[var(--color-text-muted)]">
                          {entry.metrics.totalRides} rides
                        </div>
                        <div className="text-lg font-bold text-[var(--color-primary)]">
                          {entry.points} pts
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Rest of the leaderboard */}
                {leaderboard.slice(3).map((entry) => (
                  <div
                    key={entry.rank}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 text-center font-bold text-[var(--color-text-muted)]">
                      #{entry.rank}
                    </div>
                    <Avatar size="md" fallback={`U${entry.rank}`} />
                    <div className="flex-1">
                      <div className="font-medium text-[var(--color-text)]">
                        Top Driver {entry.rank}
                      </div>
                      <div className="text-sm text-[var(--color-text-muted)]">
                        {entry.metrics.totalRides} rides • {entry.metrics.averageRating.toFixed(1)}★ avg
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[var(--color-primary)]">{entry.points}</div>
                      <div className="text-xs text-[var(--color-text-muted)]">points</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Challenges */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">Active Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: '🚗 King of the Road', desc: 'Complete the most rides this week', metric: 'rides', target: 25, progress: 12 },
                { name: '⭐ 5-Star Streak', desc: 'Maintain the highest average rating', metric: 'rating', target: 4.8, progress: 4.6 },
                { name: '⏰ Early Bird', desc: 'Have the most on-time pickups', metric: 'onTime', target: 100, progress: 95 },
                { name: '🛣️ Road Warrior', desc: 'Cover the most distance', metric: 'distance', target: 500, progress: 320 },
              ].map((challenge, i) => (
                <Card key={i}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-[var(--color-text)]">{challenge.name}</h3>
                      <p className="text-sm text-[var(--color-text-muted)]">{challenge.desc}</p>
                    </div>
                    <Badge variant="primary">Active</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[var(--color-text-muted)]">Progress</span>
                      <span className="font-medium">
                        {challenge.progress}/{challenge.target}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--color-primary)] rounded-full transition-all"
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
