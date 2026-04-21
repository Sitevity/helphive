'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { label: 'Browse Vehicles', href: '/explore/vehicles' },
      { label: 'Local Experiences', href: '/explore/experiences' },
      { label: 'All Cities', href: '/cities' },
      { label: 'Tournaments', href: '/tournament' },
    ],
    hosting: [
      { label: 'List Your Vehicle', href: '/host/onboarding' },
      { label: 'Become a Guide', href: '/guide/onboarding' },
      { label: 'Host Dashboard', href: '/dashboard/host' },
      { label: 'Rewards Program', href: '/pass' },
    ],
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
  };

  return (
    <footer className="bg-[#1A1A2E] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#FF5722] to-[#FF8A65]">
                <span className="text-white text-xl">🛵</span>
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>
                HELP<span className="text-[#FF5722]">HIVE</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm mb-4">
              India's premier platform for TukTuks, bikes, and local experiences. Explore, compete, and discover.
            </p>
            <div className="flex items-center gap-3">
              {['facebook', 'twitter', 'instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-[#FF5722] transition-colors"
                >
                  <span className="text-xs uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Explore</h4>
            <ul className="space-y-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-[#FF5722] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Hosting</h4>
            <ul className="space-y-2.5">
              {footerLinks.hosting.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-[#FF5722] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-[#FF5722] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Support</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-[#FF5722] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            © {currentYear} HELPHIVE Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-white/60 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-white/60 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/sitemap" className="text-sm text-white/60 hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      {/* Premium Badge */}
      <div className="bg-gradient-to-r from-[#FF5722] to-[#FF8A65] py-3">
        <p className="text-center text-white/90 text-sm font-medium">
          🛵 India's #1 TukTuk & Ride Platform • 15 Cities • 50K+ Happy Explorers
        </p>
      </div>
    </footer>
  );
}
