import React from 'react';
import { Calculator, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, ExternalLink } from 'lucide-react';
import clubData from '@/data/clubInfo.json';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{backgroundColor: 'var(--footer-bg)'}} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Club Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Calculator className="h-8 w-8" style={{color: 'var(--footer-accent)'}} />
              </div>
              <div>
                <div className="font-bold text-lg">{clubData.clubInfo.name}</div>
                <div className="text-xs" style={{color: 'var(--footer-text)'}}>{clubData.clubInfo.department}</div>
              </div>
            </div>
            <p style={{color: 'var(--footer-text)'}} className="leading-relaxed">
              {clubData.clubInfo.mission}
            </p>
            <div className="flex space-x-4">
              <a href={clubData.clubInfo.socialMedia.facebook} style={{color: 'var(--footer-text)'}} className="hover:text-footer-accent transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={clubData.clubInfo.socialMedia.instagram} style={{color: 'var(--footer-text)'}} className="hover:text-footer-accent transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={clubData.clubInfo.socialMedia.linkedin} style={{color: 'var(--footer-text)'}} className="hover:text-footer-accent transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Our Story', href: '/our-story' },
                { name: 'Upcoming Events', href: '/events#upcoming-events' },
                { name: 'Bismaya Magazine', href: '#' },
                { name: 'Membership', href: '/contact#contact-form' },
                { name: 'Contact Us', href: '/contact#contact-form' },
                { name: 'Gallery', href: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} style={{color: 'var(--footer-text)'}} className="hover:text-footer-accent transition-colors duration-200 flex items-center space-x-1 group">
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Events & Programs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Programs</h3>
            <ul className="space-y-2">
              {[
                { name: 'Mathematical Workshops', href: '/events?category=workshop' },
                { name: 'Guest Lectures', href: '/events?category=lecture' },
                { name: 'Competition Training', href: '/events?category=competition' },
                { name: 'Research Projects', href: '/events?category=research' },
                { name: 'Community Outreach', href: '/events?category=outreach' },
                { name: 'Alumni Network', href: '/events?category=alumni' }
              ].map((program) => (
                <li key={program.name}>
                  <a href={program.href} style={{color: 'var(--footer-text)'}} className="hover:text-footer-accent transition-colors duration-200">
                    {program.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-footer-accent mt-1 flex-shrink-0" style={{color: 'var(--footer-accent)'}} />
                <div>
                  <div className="font-medium">{clubData.clubInfo.university}</div>
                  <div style={{color: 'var(--footer-text)'}} className="text-sm">{clubData.clubInfo.department}</div>
                  <div style={{color: 'var(--footer-text)'}} className="text-sm">{clubData.clubInfo.contact.address.line3}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-footer-accent" style={{color: 'var(--footer-accent)'}} />
                <div>
                  <div style={{color: 'var(--footer-text)'}}>{clubData.clubInfo.contact.phone}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-footer-accent" style={{color: 'var(--footer-accent)'}} />
                <div>
                  <a href={`mailto:${clubData.clubInfo.contact.email}`} style={{color: 'var(--footer-text)'}} className="hover:text-footer-accent transition-colors duration-200">
                    {clubData.clubInfo.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{borderColor: 'var(--footer-border)'}} className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div style={{color: 'var(--footer-text)'}} className="text-sm">
              © {currentYear} {clubData.clubInfo.name}. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" style={{color: 'var(--footer-text)'}} className="hover:text-footer-accent text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" style={{color: 'var(--footer-text)'}} className="hover:text-footer-accent text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" style={{color: 'var(--footer-text)'}} className="hover:text-footer-accent text-sm transition-colors duration-200">
                Code of Conduct
              </a>
            </div>
          </div>

          <div className="mt-4 text-center">
            <div style={{color: 'var(--footer-text)'}} className="text-xs">
              Built with ❤️ by KU Math Club Web Team | Powered by Mathematical Excellence
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
