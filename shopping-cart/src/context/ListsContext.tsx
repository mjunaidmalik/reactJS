import React, { createContext, useCallback, useReducer, ReactNode } from 'react';

// Define types for lists and state
interface List {
  id: number;
  title: string;
  // Add other properties of a list as needed
}

interface State {
  lists: List[];
  list: List | {title: string};
  loading: boolean;
  error: string;
}

interface FetchListsSuccessAction {
  type: 'GET_LISTS_SUCCESS';
  payload: List[];
}

interface FetchListsErrorAction {
  type: 'GET_LISTS_ERROR';
  payload: string;
}

interface FetchListSuccessAction {
  type: 'GET_LIST_SUCCESS';
  payload: List;
}

interface FetchListErrorAction {
  type: 'GET_LIST_ERROR';
  payload: string;
}

type Action = FetchListsSuccessAction | FetchListsErrorAction | FetchListSuccessAction | FetchListErrorAction;

interface ListsContextProps extends State {
  fetchLists: () => Promise<void>;
  fetchList: (listId: string) => Promise<void>;
}

const initialState: State = {
  lists: [],
  list: {title: ''},
  loading: true,
  error: '',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'GET_LISTS_SUCCESS':
      return {
        ...state,
        lists: action.payload,
        loading: false,
      };
    case 'GET_LISTS_ERROR':
      return {
        ...state,
        lists: [],
        loading: false,
        error: action.payload,
      };
    case 'GET_LIST_SUCCESS':
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case 'GET_LIST_ERROR':
      return {
        ...state,
        list: {title: ''},
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ListsContext = createContext<ListsContextProps>({ ...initialState, fetchLists: () => Promise.resolve(), fetchList: () => Promise.resolve() });

interface ListsContextProviderProps {
  children: ReactNode;
}

export const ListsContextProvider: React.FC<ListsContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchLists = useCallback(async () => {
    try {
      const data = await fetch(
        `https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists`,
      );
      const result: List[] = await data.json();

      if (result) {
        dispatch({ type: 'GET_LISTS_SUCCESS', payload: result });
      }
    } catch (e: any) {
      dispatch({ type: 'GET_LISTS_ERROR', payload: e.message });
    }
  }, []);

  const fetchList = useCallback(async (listId: string) => {
    try {
      const data = await fetch(
        `https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists/${listId}`,
      );
      const result: List = await data.json();

      if (result) {
        dispatch({ type: 'GET_LIST_SUCCESS', payload: result });
      }
    } catch (e: any) {
      dispatch({ type: 'GET_LIST_ERROR', payload: e.message });
    }
  }, []);

  return (
    <ListsContext.Provider value={{ ...state, fetchLists, fetchList }}>
      {children}
    </ListsContext.Provider>
  );
};

export default ListsContext;
