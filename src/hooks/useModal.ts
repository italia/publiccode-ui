import { useReducer } from "react";

const initialState = {
  isModalOpen: false,
};

enum ActionType {
  OPEN_MODAL,
  CLOSE_MODAL,
}
interface ActionOpenModal {
  type: ActionType.OPEN_MODAL;
}
interface ActionCloseModal {
  type: ActionType.CLOSE_MODAL;
}

type Actions = ActionCloseModal | ActionOpenModal;

const reducer = (state: typeof initialState, action: Actions) => {
  switch (action.type) {
    case ActionType.OPEN_MODAL:
      return { ...state, isModalOpen: true };
    case ActionType.CLOSE_MODAL:
      return { ...state, isModalOpen: false };
    default:
      return state;
  }
};

export const useModal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const closeModal = () => dispatch({ type: ActionType.CLOSE_MODAL });
  const openModal = () => dispatch({ type: ActionType.OPEN_MODAL });

  return [state.isModalOpen, closeModal, openModal];
};
