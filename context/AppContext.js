import React from 'react';

const AppContext = React.createContext();

export function AppWrapper({ children }) {
    const initialState = {
        ad_data: []
    }
    const [state, setState] = React.useState(initialState);

    return (
        <AppContext.Provider value={[state, setState]}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
  return React.useContext(AppContext);
}