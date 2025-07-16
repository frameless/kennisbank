import Link from 'next/link';

import { KnowledgeCardGrid } from '../KnowledgeCardGrid';
import { KnowledgeCard } from '../KnowledgeCard';
import { ButtonGroup } from '../index';
import { Markdown } from '../Markdown';
import { mappedIcons } from '../Icon';

import { HomePageSection, SectionsTypes } from '@/types';
import { mappedCategory } from '@/utils';

export interface SectionsProps {
  components: SectionsTypes[] | HomePageSection[];
}

export const Sections = ({ components }: SectionsProps) => {
  return components.map((component, index: number) => {
    switch (component.component) {
      case 'ComponentSharedContentBlock':
        return <Markdown key={index} content={component?.content} />;
      case 'ComponentSharedCategory':
        return (
          <KnowledgeCardGrid key={index}>
            {Array.isArray(component?.item) &&
              component.item.map((element, index) => (
                <KnowledgeCard
                  key={index}
                  title={mappedCategory[element.categories as keyof typeof mappedCategory]}
                  description={element.description}
                  icon={element.icons as keyof typeof mappedIcons}
                />
              ))}
          </KnowledgeCardGrid>
        );
      case 'ComponentSharedCallToAction':
        return (
          component?.href &&
          component?.textContent && (
            <ButtonGroup key={index}>
              <Link
                className="utrecht-button-link utrecht-button-link--html-a utrecht-button-link--primary-action"
                href={component.href}
              >
                {component.textContent}
              </Link>
            </ButtonGroup>
          )
        );
      default:
        return null;
    }
  });
};
