import React from 'react';
import { HeaderSearch } from 'design-react-kit';
import { SearchProvider } from '../../contexts/searchContext';
import { ALL_SITE } from '../../utils/constants';
import { useModal } from '../../hooks/useModal';
import { SearchModal } from './SearchModal';

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
