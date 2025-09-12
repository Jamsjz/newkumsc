"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { NotepadTextIcon, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageModal } from "./ImageModal";

export interface SearchProps {
  events: ContentItem[];
  notices: ContentItem[];
  onExpandChange?: (isExpanded: boolean) => void; // New prop
}

interface ContentItem {
  slug: string;
  title: string;
  description: string;
  image?: string;
  banner?: string;
  type: "event" | "notice";
}

export function ExpandableSearch({ events, notices, onExpandChange }: SearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [results, setResults] = useState<ContentItem[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAllContent([...events, ...notices]);
  }, [events, notices]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const filteredResults = allContent
      .filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, 5);

    setResults(filteredResults);
  }, [query, allContent]);

  const handleToggleSearch = () => {
    const newIsExpanded = !isExpanded;
    setIsExpanded(newIsExpanded);
    if (onExpandChange) {
      onExpandChange(newIsExpanded); // Call the callback
    }
    if (newIsExpanded) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        if (isExpanded) { // Only collapse if currently expanded
          setIsExpanded(false);
          setQuery("");
          if (onExpandChange) {
            onExpandChange(false); // Call the callback when collapsing
          }
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, onExpandChange]); // Add isExpanded to dependencies

  const handleResultClick = () => {
    setIsExpanded(false);
    setQuery("");
    if (onExpandChange) {
      onExpandChange(false); // Call the callback when collapsing
    }
  };

  return (
    <div
      ref={searchContainerRef}
      className="relative flex items-center justify-end"
    >
      <div
        className={`flex items-center rounded-full border bg-background ${
          isExpanded ? "border-primary" : "border-transparent"
        } transition-all duration-300 w-full md:w-auto`}
      >
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search events & notices..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`h-9 transition-all duration-300 ease-in-out ${
            isExpanded
              ? "w-full pl-4 pr-2 md:w-64 scale-x-100"
              : "w-0 scale-x-0 md:w-0"
          } border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0`}
        />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={handleToggleSearch}
        >
          {isExpanded ? (
            <X className="h-5 w-5" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile & Desktop Search Results Dropdown */}
      {isExpanded && query && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 w-full md:w-96">
          <Card className="overflow-hidden shadow-lg animate-in fade-in-0 zoom-in-95">
            <ScrollArea className="max-h-[60vh]">
              <div className="p-2">
                {results.length > 0 ? (
                  results.map((item) => (
                    <div
                      key={`${item.type}-${item.slug}`}
                      className="flex cursor-pointer items-start gap-4 rounded-lg p-3 text-left transition-colors hover:bg-muted/50"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        {item.banner ? (
                          item.type === "notice" ? (
                            <ImageModal
                              imageUrl={item.banner}
                              alt={item.title}
                            >
                              {(openModal) => (
                                <Image
                                  src={item.banner!}
                                  alt={item.title}
                                  fill
                                  className="object-cover cursor-pointer"
                                  sizes="64px"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    openModal();
                                  }}
                                />
                              )}
                            </ImageModal>
                          ) : (
                            <Image
                              src={item.banner}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          )
                        ) : (
                          <NotepadTextIcon className="h-16 w-16 text-muted-foreground" />
                        )}
                      </div>
                      <Link
                        href={`/${item.type}s/${item.slug}`}
                        className="block flex-1"
                      >
                        <div onClick={handleResultClick}>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No results found for &quot;{query}&quot;
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>
      )}
    </div>
  );
}
