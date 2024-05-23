import React, { createContext, useCallback, useReducer, ReactNode, Dispatch } from 'react';

// Define types for items and state
interface Item {
  id: number;
  listId: number;
  title: string;
  quantity: string;
  price: string;
}

interface State {
  items: Item[];
  loading: boolean;
  error: string;
}

interface FetchItemsSuccessAction {
  type: 'GET_ITEMS_SUCCESS';
  payload: Item[];
}

interface FetchItemsErrorAction {
  type: 'GET_ITEMS_ERROR';
  payload: string;
}

interface AddItemSuccessAction {
  type: 'ADD_ITEM_SUCCESS';
  payload: Item;
}

type Action = FetchItemsSuccessAction | FetchItemsErrorAction | AddItemSuccessAction;

interface ItemsContextProps extends State {
  fetchItems: (listId: string) => Promise<void>;
  addItem: (item: Omit<Item, 'id'>) => Promise<void>;
}

const initialState: State = {
  items: [],
  loading: true,
  error: '',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'GET_ITEMS_SUCCESS':
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case 'GET_ITEMS_ERROR':
      return {
        ...state,
        items: [],
        loading: false,
        error: action.payload,
      };
    case 'ADD_ITEM_SUCCESS':
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };
    default:
      return state;
  }
};

export const ItemsContext = createContext<ItemsContextProps>( { ...initialState, fetchItems: () => Promise.resolve(), addItem: () => Promise.resolve() } as ItemsContextProps);

interface ItemsContextProviderProps {
  children: ReactNode;
}

export const ItemsContextProvider: React.FC<ItemsContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchItems = useCallback(async (listId: string) => {
    try {
      const data = await fetch(
        `https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists/${listId}/items`,
      );
      const result: Item[] = await data.json();

      if (result) {
        dispatch({ type: 'GET_ITEMS_SUCCESS', payload: result });
      }
    } catch (e: any) {
      dispatch({ type: 'GET_ITEMS_ERROR', payload: e.message });
    }
  }, []);

  const addItem = useCallback(async (item: Omit<Item, 'id'>) => {
    const itemId = Math.floor(Math.random() * 100);

    try {
      const data = await fetch(
        `https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/items`,
        {
          method: 'POST',
          body: JSON.stringify({
            id: itemId,
            ...item,
          }),
        },
      );
      const result = await data.json();

      if (result) {
        dispatch({
          type: 'ADD_ITEM_SUCCESS',
          payload: { id: itemId, ...item },
        });
      }
    } catch {}
  }, []);

  return (
    <ItemsContext.Provider value={{ ...state, fetchItems, addItem }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;
