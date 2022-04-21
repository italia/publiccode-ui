import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { search } from '../../services/searchEngine';
import { ALL_SITE } from '../../utils/constants';
import { SearchItems } from './SearchItems';

jest.mock('../../utils/l10n');
jest.mock('../../services/searchEngine');

describe('SearchItems', () => {
  it('renders a list of searched items', async () => {
    const [items] = await search(ALL_SITE);
    render(<SearchItems items={items} />);
    expect(screen.queryByTestId('search-modal-items')).not.toBeEmptyDOMElement();
  });
  it('renders no results', async () => {
    render(<SearchItems items={[]} />);
    expect(screen.queryByTestId('search-modal-no-results')).toBeInTheDocument();
  });
});
