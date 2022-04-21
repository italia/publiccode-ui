/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { SearchProvider } from '../../contexts/searchContext';
import { ALL_SITE } from '../../utils/constants';
import { SearchType } from './SearchType';

jest.mock('../../utils/l10n');

describe('SearchType', () => {
  it('renders search type buttons', async () => {
    render(
      <SearchProvider initialType={ALL_SITE}>
        <SearchType />
      </SearchProvider>
    );
    expect(await screen.findByTestId('search-type-buttons')).toBeInTheDocument();
    expect(await screen.findByTestId('search-type-all')).toHaveClass('btn-primary');
    expect(await screen.findByTestId('search-type-administration')).toHaveClass('btn-default');
  });

  it('changes the active filter type on click', async () => {
    render(
      <SearchProvider initialType={ALL_SITE}>
        <SearchType />
      </SearchProvider>
    );
    const administrationTypeButton = await screen.findByTestId('search-type-administration');
    userEvent.click(administrationTypeButton);
    expect(await screen.findByTestId('search-type-administration')).toHaveClass('btn-primary');
    expect(await screen.findByTestId('search-type-all')).toHaveClass('btn-default');
  });
});
