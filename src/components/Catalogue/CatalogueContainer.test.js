import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CatalogueContainer } from './CatalogueContainer';

jest.mock('../../utils/l10n');
jest.mock('../../services/searchEngine');
jest.mock('../../hooks/useScrollIntoView');

describe('CatalogueContainer', () => {
  it('renders the catalogue', async () => {
    render(<CatalogueContainer />);
    expect(await screen.findByTestId('catalogue-container')).toBeInTheDocument();
  });
});
