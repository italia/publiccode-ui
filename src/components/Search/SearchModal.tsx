import React, { useContext, useCallback } from "react";
import { Modal, ModalBody } from "design-react-kit";
import { createUseStyles } from "react-jss";
import { useSearchEngine } from "../../hooks/useSearchEngine";
import { l10NLabels, lang } from "../../utils/l10n";
import {
  searchContextDispatch,
  searchContextState,
  setSearchValue,
} from "../../contexts/searchContext";
import { SearchBar } from "../SearchBar";
import { Error } from "../Error";
import { SearchItems } from "./SearchItems";
import { SearchType } from "./SearchType";

const useStyles = createUseStyles({
  modalFullScreen: {
    minWidth: "100% !important",
    margin: "0 !important",
  },
  closeButton: {
    composes: "close",
    fontSize: "3rem",
    marginLeft: "auto",
  },
});

export const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const [errorMessage, items] = useSearchEngine({ pageSize: 9 });
  const classes = useStyles();
  const { searchValue } = useContext(searchContextState);
  const dispatch = useContext(searchContextDispatch);

  const handleSearch = useCallback(
    (value) => dispatch(setSearchValue(value)),
    [dispatch]
  );

  return (
    <Modal
      className={classes.modalFullScreen}
      isOpen={true}
      role="dialog"
      toggle={onClose}
      data-testid="search-modal"
      autoFocus={false}
    >
      <ModalBody className="mt-3" tag="div">
        <div className="container">
          <div className="row px-1 px-md-2">
            <h1>{l10NLabels["search_form_label"]}</h1>
            <button
              className={classes.closeButton}
              onClick={onClose}
              data-testid="close-search-modal"
            >
              ×
            </button>
          </div>
          <div className="mb-5">
            <SearchBar
              onChange={handleSearch}
              placeholder={l10NLabels.search_form_placeholder}
            />
          </div>
          <SearchType />
          {errorMessage ? (
            <div className="m-4">
              <Error description={errorMessage} />
            </div>
          ) : (
            <>
              <h5 className="form-group text-uppercase">
                <a href={`/${lang}/search?search_value=${searchValue}`}>
                  {l10NLabels.search_form_catalogue}
                </a>
              </h5>
              {items !== null && <SearchItems items={items} />}
            </>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

interface SearchModalProps {
  onClose: () => void;
}
