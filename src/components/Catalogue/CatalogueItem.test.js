import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { search } from '../../services/searchEngine';
import { ALL_CATALOGUE } from '../../utils/constants';
import { CatalogueItem } from './CatalogueItem';

jest.mock('../../utils/l10n');
jest.mock('../../services/searchEngine');

describe('CatalogueItem', () => {
  it('renders a catalogue item', async () => {
    const [items] = await search(ALL_CATALOGUE);
    render(<CatalogueItem {...items[0]} />);
    expect(screen.queryByTestId(items[0].id)).toBeInTheDocument();
    expect(screen.queryByTestId('item-anchor')).toHaveAttribute('href', items[0].url);
  });
});
