'use client';

import React from 'react';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-5 py-2 font-medium rounded-lg whitespace-nowrap transition-all ${
          activeCategory === 'all'
            ? 'bg-white text-black'
            : 'bg-white/5 text-neutral-300 hover:bg-white/10'
        }`}
      >
        All Books
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={`px-5 py-2 font-medium rounded-lg whitespace-nowrap transition-all ${
            activeCategory === category.slug
              ? 'bg-white text-black'
              : 'bg-white/5 text-neutral-300 hover:bg-white/10'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
