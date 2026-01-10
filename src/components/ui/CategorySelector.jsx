"use client";

import { ChevronDown } from "lucide-react";

const CategorySelector = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full sm:w-auto relative group">
      {/* Floating Label */}
      <label className="text-[10px] uppercase tracking-wider text-(--muted-gray) absolute -top-2.5 left-3 bg-(--bg-dark) px-1 z-10 transition-colors group-hover:text-(--accent-yellow)">
        Category
      </label>

      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          aria-label="Filter by category"
          className="w-full sm:w-64 bg-(--bg-surface) border border-white/10 text-white text-sm rounded-md pl-4 pr-10 py-2.5 focus:border-(--accent-yellow) focus:ring-1 focus:ring-(--accent-yellow) outline-none cursor-pointer font-heading tracking-wide appearance-none transition-all"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name} ({category.count})
            </option>
          ))}
        </select>

        {/* Custom Icon Overlay */}
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none w-4 h-4 group-hover:text-white transition-colors" />
      </div>
    </div>
  );
};

export default CategorySelector;
