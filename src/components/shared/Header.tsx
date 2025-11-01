'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Calculator, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clubData from '@/data/clubInfo.json';

import { ExpandableSearch } from "./ExpandableSearch";

interface ContentItem {
  slug: string;
  title: string;
  description: string;
  image?: string;
  type: "event" | "notice";
}

export interface SearchProps {
  events: ContentItem[];
  notices: ContentItem[];
}

type HeaderProps = {
  searchData: SearchProps;
};

const Header: React.FC<HeaderProps> = ({ searchData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false); // New state for search expansion
  const currentPath = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', path: '/' },
    {
      name: 'Events',
      path: '/events',
      sublinks: [
        { name: 'All Events', path: '/events' },
        { name: 'Infinity', path: '/infinity' },
        { name: 'Codewave', path: '/codewave' },
        { name: 'Olympiad', path: '/olympiad' },
      ],
    },
    { name: 'Notices', path: '/notices' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Committee', path: '/committee' },
    { name: 'Our Story', path: '/our-story' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Contact', path: '/contact' },
  ];

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
            className={`flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 ${isSearchExpanded ? 'hidden' : ''}`}
          >
            <div className="relative">
              <Calculator className="h-8 w-8 text-[#ff8c42]" />
            </div>
            <div className="text-white">
              <div className="font-bold text-lg">{clubData.clubInfo.name}</div>
              <div className="text-xs text-[#f4f1de] hidden sm:block">{clubData.clubInfo.department}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  href={item.path}
                  onClick={handleNavClick}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 relative group ${
                    currentPath === item.path
                      ? 'text-[#ff8c42] font-bold'
                      : 'text-[#f4f1de] hover:text-[#ffd700]'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#ff8c42] transform transition-transform duration-200 ${
                    currentPath === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
                {item.sublinks && (
                  <div className="absolute top-full left-0 bg-[#2f3033]/95 backdrop-blur-md shadow-lg rounded-md mt-2 py-2 w-48 hidden group-hover:block">
                    {item.sublinks.map((sublink) => (
                      <Link
                        key={sublink.path}
                        href={sublink.path}
                        onClick={handleNavClick}
                        className="block px-4 py-2 text-sm text-[#f4f1de] hover:bg-[#454850]/50 hover:text-[#ffd700]"
                      >
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <ExpandableSearch events={searchData.events} notices={searchData.notices} />
          </div>

          {/* Mobile Search and Menu */}
          <div className="lg:hidden flex items-center">
            <div className={`${isSearchExpanded ? 'w-full' : 'w-auto'} transition-all duration-300`}>
              <ExpandableSearch 
                events={searchData.events} 
                notices={searchData.notices} 
                onExpandChange={(expanded) => {
                  setIsSearchExpanded(expanded);
                  if (expanded) {
                    setIsMenuOpen(false); // Close mobile menu when search expands
                  }
                }} // Pass callback to update parent state
              />
            </div>
            {!isSearchExpanded && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#f4f1de] hover:text-[#ff8c42] transition-colors duration-200 ml-4"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-[#2f3033]/95 backdrop-blur-md border-t border-[#454850]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                item.sublinks ? (
                  <Collapsible key={item.path}>
                    <CollapsibleTrigger className="w-full">
                      <div className={`flex justify-between items-center w-full px-3 py-2 text-base font-medium text-left transition-colors duration-200 ${
                        currentPath.startsWith(item.path)
                          ? 'text-[#ff8c42] bg-[#454850]/50 font-bold'
                          : 'text-[#f4f1de] hover:text-[#ffd700] hover:bg-[#454850]/30'
                      }`}>
                        {item.name}
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="pl-4">
                        {item.sublinks.map((sublink) => (
                          <Link
                            key={sublink.path}
                            href={sublink.path}
                            onClick={handleNavClick}
                            className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200 ${
                              currentPath === sublink.path
                                ? 'text-[#ff8c42] bg-[#454850]/50 font-bold'
                                : 'text-[#f4f1de] hover:text-[#ffd700] hover:bg-[#454850]/30'
                            }`}
                          >
                            {sublink.name}
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={handleNavClick}
                    className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200 ${
                      currentPath === item.path
                        ? 'text-[#ff8c42] bg-[#454850]/50 font-bold'
                        : 'text-[#f4f1de] hover:text-[#ffd700] hover:bg-[#454850]/30'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
