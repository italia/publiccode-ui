import React from 'react';
import { HeaderSearch } from 'design-react-kit';
import { SearchProvider } from '../../contexts/searchContext.js';
import { ALL_SITE } from '../../utils/constants.js';
import { useModal } from '../../hooks/useModal.js';
import { SearchModal } from './SearchModal.js';

export const SearchContainer = () => {
  const [isModalOpen, closeModal, openModal] = useModal();

  return (
    <>
      <HeaderSearch onClick={openModal} iconName="it-search" label="Cerca" />
      {isModalOpen && (
        <SearchProvider initialType={ALL_SITE}>
          <SearchModal onClose={closeModal} />
        </SearchProvider>
      )}
    </>
  );
};
