import { SectionsTypes } from '@/types';

export interface SectionsProps {
  components: SectionsTypes[];
}

export const Sections = ({ components }: SectionsProps) => {
  return components.map((item, index: number) => {
    switch (item.component) {
      case 'ComponentSharedContentBlock':
        return <div key={index} dangerouslySetInnerHTML={{ __html: item.content ?? '' }} />;
      default:
        return null;
    }
  });
};
