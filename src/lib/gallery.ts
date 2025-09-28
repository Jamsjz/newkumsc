import fs from "fs";
import path from "path";

const GALLERY_BASE_PATH = path.join(process.cwd(), "public", "images", "gallery");

interface GalleryImage {
  src: string;
  alt: string;
}

interface EventData {
  [eventName: string]: GalleryImage[];
}

interface YearData {
  [year: string]: EventData;
}

export interface GalleryData {
  [year: string]: {
    [eventName: string]: GalleryImage[];
  };
}

export function getGalleryData(): GalleryData {
  const galleryData: GalleryData = {};

  if (!fs.existsSync(GALLERY_BASE_PATH)) {
    console.warn(`Gallery base path not found: ${GALLERY_BASE_PATH}`);
    return {};
  }

  const years = fs.readdirSync(GALLERY_BASE_PATH, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const year of years) {
    const yearPath = path.join(GALLERY_BASE_PATH, year);
    const events = fs.readdirSync(yearPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    galleryData[year] = {};
    for (const eventName of events) {
      const eventPath = path.join(yearPath, eventName);
      const images = fs.readdirSync(eventPath, { withFileTypes: true })
        .filter(dirent => dirent.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(dirent.name))
        .map(dirent => {
          const src = `/images/gallery/${year}/${eventName}/${dirent.name}`;
          const alt = `${eventName} - ${dirent.name}`;
          return { src, alt };
        });
      galleryData[year][eventName] = images;
    }
  }
  return galleryData;
}

export function getYears(): string[] {
  if (!fs.existsSync(GALLERY_BASE_PATH)) {
    return [];
  }
  return fs.readdirSync(GALLERY_BASE_PATH, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort((a, b) => parseInt(b) - parseInt(a)); // Sort years in descending order
}

export function getEventsForYear(year: string): EventData {
  const galleryData = getGalleryData();
  return galleryData[year] || {};
}

export function getImagesForEvent(year: string, eventName: string): GalleryImage[] {
  const yearData = getEventsForYear(year);
  return yearData[eventName] || [];
}
