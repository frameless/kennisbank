'use client';

import { useState } from 'react';

import { Sections } from '../Sections';

import { Category, SectionsTypes } from '@/types';
import { categories, mappedCategory } from '@/utils';

export const CategoryButtons = ({ sections }: { sections: SectionsTypes[] }) => {
  const filteredSections = sections.filter((section) => categories.includes(section.category));
  const [sectionData, setSectionData] = useState<SectionsTypes[]>(sections);

  const onCategoryButtonClickedHandler = (category: Category) => {
    const filteredSections = sections.filter((section) => section.category === category);
    setSectionData(filteredSections);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBlock: '1rem',
        alignItems: 'center',
      }}
    >
      <nav
        style={{
          display: 'flex',
          gap: '10px',
          marginBlock: '1rem',
        }}
        aria-label="Category Filters"
      >
        <button onClick={() => setSectionData(sections)}>All</button>
        {filteredSections.map((section) => (
          <button key={section.category} onClick={() => onCategoryButtonClickedHandler(section.category)}>
            {mappedCategory[section.category]}
          </button>
        ))}
      </nav>
      <Sections components={sectionData} />
    </div>
  );
};
