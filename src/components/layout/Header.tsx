'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Avatar, Badge } from '@/components/ui';
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  PlusCircle,
  Trophy,
  MessageCircle,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const { user, userProfile, isAuthenticated, logout, role } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/explore/vehicles', label: 'Vehicles' },
    { href: '/explore/experiences', label: 'Experiences' },
    { href: '/tournament', label: 'Tournament' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🛺</span>
              <span className="text-xl font-bold text-[var(--color-primary)] font-[var(--font-heading)]">
                TukTukIndia
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/chat">
                  <Button variant="ghost" size="icon" className="relative">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100"
                  >
                    <Avatar
                      src={user?.photoURL}
                      fallback={user?.displayName || user?.email || 'U'}
                      size="sm"
                    />
                    <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
                  </button>

                  {profileDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0"
                        onClick={() => setProfileDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 rounded-[var(--radius-lg)] bg-white shadow-lg border border-gray-100 py-2">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="font-medium text-sm truncate">
                            {user?.displayName || 'User'}
                          </p>
                          <p className="text-xs text-[var(--color-text-muted)] truncate">
                            {user?.email}
                          </p>
                          {role && (
                            <Badge variant="primary" size="sm" className="mt-1 capitalize">
                              {role}
                            </Badge>
                          )}
                        </div>

                        <div className="py-1">
                          <Link
                            href="/dashboard/user"
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                          </Link>
                          {(role === 'host' || role === 'admin') && (
                            <Link
                              href="/dashboard/host"
                              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                              onClick={() => setProfileDropdownOpen(false)}
                            >
                              <PlusCircle className="h-4 w-4" />
                              My Vehicles
                            </Link>
                          )}
                          {(role === 'guide' || role === 'admin') && (
                            <Link
                              href="/dashboard/guide"
                              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                              onClick={() => setProfileDropdownOpen(false)}
                            >
                              <PlusCircle className="h-4 w-4" />
                              My Experiences
                            </Link>
                          )}
                          <Link
                            href="/dashboard/user/settings"
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <Settings className="h-4 w-4" />
                            Settings
                          </Link>
                        </div>

                        <div className="border-t border-gray-100 pt-1">
                          <button
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              logout();
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[var(--color-error)] hover:bg-gray-50"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary">Sign Up</Button>
                </Link>
              </>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
