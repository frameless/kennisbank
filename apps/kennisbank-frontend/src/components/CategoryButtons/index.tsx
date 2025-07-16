'use client';

import { useState } from 'react';

import { Sections } from '../Sections';
import { Button } from '../index';

import { Category, SectionsTypes } from '@/types';
import { categories, mappedCategory } from '@/utils';

import './styles.css';

export const CategoryButtons = ({ sections }: { sections: SectionsTypes[] }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');

  const handleCategoryClick = (category: Category | 'all') => {
    setActiveCategory(category);
  };

  const uniqueFilteredCategories = Array.from(
    new Set(
      sections
        .map((section) => section.category)
        .filter((category): category is Category => categories.includes(category)),
    ),
  );

  const displayedSections =
    activeCategory === 'all' ? sections : sections.filter((section) => section.category === activeCategory);

  return (
    <div className="frameless-category-buttons">
      <nav className="frameless-category-buttons__nav" aria-label="Category Filters">
        <ul role="list" className="frameless-category-buttons__list">
          <li>
            <Button
              appearance={activeCategory === 'all' ? 'secondary-action-button' : 'primary-action-button'}
              type="button"
              aria-pressed={activeCategory === 'all'}
              onClick={() => handleCategoryClick('all')}
            >
              All
            </Button>
          </li>

          {uniqueFilteredCategories.map((category) => (
            <li key={category}>
              <Button
                appearance={activeCategory === category ? 'secondary-action-button' : 'primary-action-button'}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => handleCategoryClick(category)}
              >
                {mappedCategory[category]}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="utrecht-rich-text">
        <Sections components={displayedSections} />
      </div>
    </div>
  );
};
