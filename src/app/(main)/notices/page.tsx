import { getAllFrontMatter } from "@/lib/markdown";
import NoticesClient from "@/components/features/notices/NoticesClient";

export const metadata = {
  title: "Notices",
  description: "Official announcements and updates from the KUMSC.",
};

export default function NoticesPage() {
  const notices = getAllFrontMatter("notices");

  return <NoticesClient initialNotices={notices} />;
}
