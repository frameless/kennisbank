'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { onSearchBarChangeHandle, onSearchBarSubmit } from '../../actions';
import { Button, Textbox } from '../index';

// import { styles } from './style';
import './styles.css';

// type SetSearchResults = {
//   value: string;
// };

type Product = {
  title: string;
  description: string;
  slug: string;
};

export function SearchBar() {
  //   const [optimisticSearchValue, addOptimisticSearchValue] = useOptimistic<SetSearchResults[], string>(
  //     [],
  //     (state, newValue) => [...state, { value: newValue }],
  //   );
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const router = useRouter();

  const formAction = async (formData: FormData) => {
    const query = formData.get('query') as string;

    // addOptimisticSearchValue(query);
    const kennisartikelen = await onSearchBarSubmit(query);
    if (!kennisartikelen?.slug) return;
    router.push(`/kennisartikelen/${kennisartikelen.slug}`);
    setSearchResults([]);
  };

  const handleInputChange = async (value: string) => {
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }
    const data = await onSearchBarChangeHandle(value);
    setSearchResults(data || []);
  };

  return (
    <div className="frameless-search-container">
      <form action={formAction}>
        <Textbox onChange={(event) => handleInputChange(event.target.value)} type="text" name="query" />
        <Button appearance="primary-action-button" type="submit">
          Zoek
        </Button>
      </form>

      {searchResults.length > 0 && (
        <div className="frameless-search-dropdown">
          {searchResults.map((item, index) => (
            <a key={index} href={`/kennisartikelen/${item.slug}`} className="frameless-search-item">
              <div className="frameless-search-title">{item.title}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
