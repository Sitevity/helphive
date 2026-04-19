'use client';

import Link from 'next/link';

export function Footer() {
  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Blog', href: '/blog' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Safety', href: '/safety' },
      { label: 'Cancellation', href: '/cancellation' },
      { label: 'Contact Us', href: '/contact' },
    ],
    hosts: [
      { label: 'List Your Vehicle', href: '/host/onboarding' },
      { label: 'Host Resources', href: '/host/resources' },
      { label: 'Community Forum', href: '/community' },
      { label: 'Responsible Hosting', href: '/responsible' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
  };

  const socialLinks = [
    { label: 'Facebook', icon: '📘', href: '#' },
    { label: 'Twitter', icon: '🐦', href: '#' },
    { label: 'Instagram', icon: '📷', href: '#' },
    { label: 'YouTube', icon: '📺', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🛺</span>
              <span className="text-xl font-bold text-white font-[var(--font-heading)]">
                TukTukIndia
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 max-w-xs">
              Discover the spirit of India with our iconic tuk-tuks, scooters, and bikes.
              Experience local culture through guided tours and adventures.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors text-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[var(--color-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[var(--color-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">For Hosts</h4>
            <ul className="space-y-2">
              {footerLinks.hosts.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[var(--color-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} TukTukIndia. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}