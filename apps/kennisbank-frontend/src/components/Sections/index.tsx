import { SectionsTypes } from '@/types';

export interface SectionsProps {
  components: SectionsTypes[];
}

export const Sections = ({ components }: SectionsProps) => {
  return components.map((item, index: number) => {
    switch (item.component) {
      case 'ComponentSharedContentBlock':
        return (
          <section key={index}>
            <div dangerouslySetInnerHTML={{ __html: item.content ?? '' }} />
          </section>
        );
      default:
        return null;
    }
  });
};
