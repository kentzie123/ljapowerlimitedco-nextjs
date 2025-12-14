import Link from "next/link";
import { AlertTriangle } from "lucide-react";

// 1. SEO METADATA
export const metadata = {
  title: "Page Not Found | LJA Power Limited Co",
  description: "The page you are looking for could not be found.",
  // ✅ Explicitly block Google from indexing error pages
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-(--bg-dark) text-white text-center px-6">
      <AlertTriangle
        size={72}
        className="text-(--accent-yellow) mb-6 animate-pulse"
      />

      {/* 2. INDUSTRIAL FONT APPLICATION */}
      <h1 className="font-heading text-8xl md:text-9xl font-bold mb-2 text-white/50 select-none tracking-tight leading-none">
        404
      </h1>

      <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase mb-4 tracking-wide text-white">
        Page Not Found
      </h2>

      <p className="max-w-md text-(--muted-gray) mb-8 text-lg leading-relaxed">
        Oops! The page you’re looking for doesn’t exist or has been moved. Let’s
        get you back to the right place.
      </p>

      {/* 3. CHANGED: 'Link to' -> 'Link href' for Next.js */}
      <Link
        href="/"
        className="btn-yellow px-8 py-3 rounded-lg font-heading font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-(--accent-yellow)/50"
      >
        Go Back Home
      </Link>
    </div>
  );
}
