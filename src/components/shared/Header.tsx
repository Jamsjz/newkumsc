'use client';

import React, { useState, useEffect } from 'react';
import { Menu, Calculator } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clubData from '@/data/clubInfo.json';
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Our Story', path: '/our-story' },
    { name: 'Events', path: '/events' },
    { name: 'Our Work', path: '/our-work' },
    { name: 'Leadership', path: '/committee' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Get Involved', path: '/contact' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#2f3033]/95 backdrop-blur-md shadow-lg' : 'bg-[#2f3033]/80 backdrop-blur-sm'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/"
            onClick={handleNavClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="relative">
              <Calculator className="h-8 w-8 text-footer-accent" />
            </div>
            <div className="text-white">
              <div className="font-bold text-lg">{clubData.clubInfo.name}</div>
              <div className="text-xs hidden sm:block text-header-text">{clubData.clubInfo.department}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={handleNavClick}
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 relative group ${
                  currentPath === item.path
                    ? 'text-footer-accent font-bold'
                    : 'text-header-text hover:text-header-text-hover'
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-footer-accent transform transition-transform duration-200 ${
                  currentPath === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-header-text"/>
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#2f3033]/95 backdrop-blur-md border-l-0">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={handleNavClick}
                      className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200 ${
                        currentPath === item.path
                          ? 'text-footer-accent bg-[#454850]/50 font-bold'
                          : 'text-header-text hover:text-header-text-hover hover:bg-[#454850]/30'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
