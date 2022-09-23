import * as React from "react";

import { SearchBar } from '../components/SearchBar';
import { SearchResult } from '../types/search-result';

import { useTranslation } from 'react-i18next';

import '../i18n';
import {useState} from "react";

const SearchPage = () => {
  const [resultsState, setResults] = useState<SearchResult[]>([]);

  const onChange = () => {
    setResults([...resultsState, {name: "Hello", description: "Desc", categories: []}])
  }

  return (
    <>
      <div className="container">
        <div className="d-flex align-items-center min-vh-100">
          <div className="w-100">
            <div className="text-primary fs-4 fw-bold">EU Public Code</div>
            <SearchBar onChange={onChange} searchResults={resultsState} placeholder="Open source software" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
