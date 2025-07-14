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
        <ul style={{ display: 'flex', gap: '10px', listStyle: 'none', padding: 0, margin: 0 }} role="list">
          <li>
            <button type="button" onClick={() => setSectionData(sections)}>
              All
            </button>
          </li>
          {filteredSections.map((section, index: number) => (
            <li key={index}>
              <button type="button" onClick={() => onCategoryButtonClickedHandler(section.category)}>
                {mappedCategory[section.category]}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <Sections components={sectionData} />
    </div>
  );
};
