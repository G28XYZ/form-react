import React, { createContext, useReducer, useMemo, useContext } from 'react';

export interface InitialState {
  date: Date;
  user: string;
  cities: any;
  university: any;
  checkInfo: boolean;
  tooltip: { text: string; isOpen: boolean };
  place: { [key: string]: { name: string; isOpen: boolean } };
  inputs: { [key: string]: { [key: string]: string } };
  isLoading: boolean;
}

const defaultState: any | InitialState = {
  date: new Date(),
  user: '',
  cities: [],
  university: [],
  checkInfo: true,
  tooltip: {
    text: '',
    isOpen: false,
  },
  place: {
    city: { name: '', isOpen: false },
    university: { name: '', isOpen: false },
  },
  inputs: {
    password: { error: '', value: '' },
    passwordConfirm: { error: '', value: '' },
    email: { error: '', value: '' },
  },
  isLoading: true,
};

const globalContext = createContext(defaultState);

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_DATE':
      return {
        ...state,
        date: action.payload || new Date(),
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_TOOLTIP':
      return {
        ...state,
        tooltip: { ...state.tooltip, text: action.payload },
      };
    case 'TOGGLE_TOOLTIP':
      return {
        ...state,
        tooltip: { ...state.tooltip, isOpen: !state.tooltip.isOpen },
      };
    case 'SET_CITIES':
      return {
        ...state,
        cities: action.payload,
      };
    case 'SET_UNIVERSITIES':
      return {
        ...state,
        university: action.payload,
      };

    case 'SET_INPUTS':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          ...action.payload,
        },
      };
    case 'SET_PLACE':
      return {
        ...state,
        place: { ...state.place, ...action.payload },
      };
    case 'TOGGLE_CHECK_INFO':
      return { ...state, checkInfo: !state.checkInfo };
    default:
      return state;
  }
};

export function StoreProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const contextValue = useMemo(
    (): [InitialState, any] => [state, dispatch],
    [state, dispatch],
  );

  return (
    <globalContext.Provider value={contextValue}>
      {children}
    </globalContext.Provider>
  );
}

export function useStore() {
  return useContext(globalContext);
}
