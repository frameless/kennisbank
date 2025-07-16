'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { onSearchBarChangeHandle, onSearchBarSubmit } from '../../actions';

import { styles } from './style';

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
    <div style={styles.container}>
      <form style={styles.form} action={formAction}>
        <input
          style={styles.input}
          onChange={(event) => handleInputChange(event.target.value)}
          type="text"
          name="query"
        />
        <button style={styles.button} type="submit">
          Zoek
        </button>
      </form>

      <div style={styles.resultsContainer}>
        {searchResults &&
          searchResults.map((kennisartikelen, index) => (
            <div key={index} style={styles.resultItem}>
              <a href={`/kennisartikelen/${kennisartikelen.slug}`} style={styles.resultLink}>
                <h3 style={styles.resultTitle}>{kennisartikelen.title}</h3>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
