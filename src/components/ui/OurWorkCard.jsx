"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next-image-export-optimizer";
import { MapPin, ArrowRight } from "lucide-react";

const OurWorkCard = ({ project }) => {
  // State to handle image fallback safely
  const [imgSrc, setImgSrc] = useState(project.image);

  return (
    <Link href={`/our-works/${project.slug}`} className="group block h-full">
      <div className="relative overflow-hidden rounded-xl bg-(--card-blue) border border-white/10 hover:border-(--accent-yellow) transition-all duration-300 h-full flex flex-col hover:-translate-y-1 hover:shadow-2xl">
        {/* Image Area */}
        <div className="relative aspect-16/10 overflow-hidden bg-black/20">
          <Image
            src={imgSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgSrc("/images/genset-repair-services.webp")}
          />

          <div className="absolute inset-0 bg-linear-to-t from-(--bg-dark)/80 to-transparent pointer-events-none" />

          <div className="absolute top-4 left-4 z-10">
            <span className="bg-(--accent-yellow) text-black text-[10px] font-bold font-heading uppercase tracking-wider px-3 py-1 rounded-sm shadow-md">
              {project.category || "Service"}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Title */}
            {/* Fixed: group-hover:text-[var(--accent-yellow)] -> group-hover:text-(--accent-yellow) */}
            <h3 className="font-heading text-xl font-bold uppercase leading-tight mb-3 text-white group-hover:text-(--accent-yellow) transition-colors">
              {project.title}
            </h3>

            {/* Location */}
            {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
            <div className="flex items-center gap-2 text-(--muted-gray) text-xs font-bold uppercase tracking-wider mb-2">
              {/* Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow) */}
              <MapPin className="size-3 text-(--accent-yellow)" />
              {project.location}
            </div>

            {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
            <p className="text-(--muted-gray) text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Footer Metadata */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
            <span className="font-heading uppercase tracking-wide">
              Completed: {project.details?.completedDate || "Recently"}
            </span>
            {/* Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow) */}
            <ArrowRight className="size-4 text-(--accent-yellow) -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OurWorkCard;
