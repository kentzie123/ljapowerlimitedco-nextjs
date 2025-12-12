"use client";

import { useState } from "react";
import Image from "next-image-export-optimizer";
import Link from "next/link";
import { Zap, ShieldCheck, Fuel, Gauge } from "lucide-react";

const ProductCard = ({ product }) => {
  // State to handle image fallback logic safely
  const [imgSrc, setImgSrc] = useState(product.images[0]);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group overflow-hidden flex flex-col h-full bg-(--card-blue) rounded-lg border border-(--accent-yellow)/20 hover:border-(--accent-yellow)/60 hover:shadow-[0_4px_20px_rgba(246,231,42,0.15)] hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-black/20">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="group-hover:scale-110 transition-transform duration-700 object-cover"
          onError={() => setImgSrc("/images/lja-logo.webp")}
        />

        {/* Dark Gradient Overlay for text readability */}
        {/* Fixed: from-[var(--card-blue)] -> from-(--card-blue) */}
        <div className="absolute inset-0 bg-linear-to-t from-(--card-blue) via-transparent to-transparent opacity-80" />

        {/* Power Badge */}
        {/* Fixed: bg-[var(--accent-yellow)] -> bg-(--accent-yellow) */}
        <div className="absolute top-3 right-3 bg-(--accent-yellow) text-black px-3 py-1 rounded-md text-xs font-bold font-heading uppercase tracking-wide shadow-md z-10">
          {product.standbyPower.split("/")[1].trim()}
        </div>
      </div>

      {/* Content */}
      <div className="card-content p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          {/* Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow) */}
          <h3 className="text-xl font-bold font-heading uppercase tracking-wide text-(--accent-yellow) mb-3 leading-tight group-hover:text-white transition-colors">
            {product.engine}
          </h3>

          {/* Power Specifications Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4 bg-black/20 p-2 rounded-md border border-white/5">
            <div className="flex flex-col">
              {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
              <span className="text-[10px] uppercase tracking-wider text-(--muted-gray)">
                Standby
              </span>
              <span className="text-white font-bold text-sm">
                {product.standbyPower}
              </span>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-2">
              <span className="text-[10px] uppercase tracking-wider text-(--muted-gray)">
                Prime
              </span>
              <span className="text-white font-bold text-sm">
                {product.primePower}
              </span>
            </div>
          </div>

          {/* Key Features List */}
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-(--accent-yellow) shrink-0 mt-0.5" />
              <div className="text-xs text-(--muted-gray) leading-snug">
                <span className="text-gray-300 font-medium">
                  {product.engine}
                </span>{" "}
                Engine
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Fuel className="w-4 h-4 text-(--accent-yellow) shrink-0 mt-0.5" />
              <div className="text-xs text-(--muted-gray)">
                {product.fuelType} • {product.speed}
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Gauge className="w-4 h-4 text-(--accent-yellow) shrink-0 mt-0.5" />
              <div className="text-xs text-(--muted-gray) truncate">
                {product.voltageOptions.split(",")[0]}...{" "}
              </div>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-(--accent-yellow) shrink-0" />
              <div className="text-xs text-(--muted-gray)">
                Sound Proof Enclosure
              </div>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <button className="w-full bg-(--accent-yellow) text-black hover:bg-(--panel-blue) hover:text-white py-3 px-4 rounded-md transition-all duration-300 font-heading font-bold uppercase tracking-wider text-sm shadow-sm hover:shadow-md cursor-pointer border border-transparent hover:border-white/20">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
