"use client";
import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FrontMatter } from '@/lib/markdown';

interface NoticesClientProps {
  initialNotices: FrontMatter[];
}

const NoticesClient: React.FC<NoticesClientProps> = ({ initialNotices }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    initialNotices.forEach(notice => {
      if (notice.category) categories.add(notice.category);
    });
    return ['all', ...Array.from(categories)];
  }, [initialNotices]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialNotices.forEach(notice => {
      if (notice.tags) {
        notice.tags.forEach(tag => tags.add(tag));
      }
    });
    return ['all', ...Array.from(tags)];
  }, [initialNotices]);

  const filteredNotices = useMemo(() => {
    return initialNotices.filter(notice => {
      const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            notice.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
      const matchesTag = selectedTag === 'all' || (notice.tags && notice.tags.includes(selectedTag));
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [initialNotices, searchQuery, selectedCategory, selectedTag]);

  return (
    <React.Fragment>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2f3033] to-[#264653] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Notices & Announcements
            </h1>
            <p className="text-xl sm:text-2xl text-[#6b8891] leading-relaxed">
              Stay informed with the latest news and updates from the club.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <Input
              type="text"
              placeholder="Search notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/3"
            />
            <Select onValueChange={setSelectedCategory} value={selectedCategory}>
              <SelectTrigger className="w-full md:w-1/4">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                {allCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setSelectedTag} value={selectedTag}>
              <SelectTrigger className="w-full md:w-1/4">
                <SelectValue placeholder="Filter by Tag" />
              </SelectTrigger>
              <SelectContent>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag === 'all' ? 'All Tags' : tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Notices List */}
      <section className="py-16 bg-[#f4f1de]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNotices.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNotices.map((notice) => (
                <Link href={`/notices/${notice.slug}`} key={notice.slug}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                    {(notice.banner || notice.noticeImage) && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={notice.banner || notice.noticeImage || ""}
                          alt={notice.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#2f3033] mb-2">{notice.title}</h3>
                      <p className="text-[#6b8891] text-sm mb-4 line-clamp-3">{notice.description}</p>
                      <div className="flex items-center justify-between text-sm text-[#6b8891]">
                        <span>{format(new Date(notice.date), 'MMM dd, yyyy')}</span>
                        {notice.category && (
                          <Badge variant="secondary" className="capitalize">{notice.category}</Badge>
                        )}
                      </div>
                      {notice.tags && notice.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {notice.tags.map(tag => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-[#6b8891]">No notices found matching your criteria.</p>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default NoticesClient;
