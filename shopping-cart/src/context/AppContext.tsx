import React, { ReactNode } from 'react';
import { ListsContextProvider } from './ListsContext';
import { ItemsContextProvider } from './ItemsContext';

interface AppContextProps {
  children: ReactNode;
}

const AppContext: React.FC<AppContextProps> = ({ children }) => {
  return (
    <ListsContextProvider>
      <ItemsContextProvider>{children}</ItemsContextProvider>
    </ListsContextProvider>
  );
};

export default AppContext;
