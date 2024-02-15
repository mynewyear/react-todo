import React, {createContext, useState} from 'react';

export const TodoCounterContext = createContext();

export const TodoCounterProvider = ({children}) => {
    const [count, setCount] = useState(0);

    const value = {count, setCount};

    return (
        <TodoCounterContext.Provider value={value}>
            {children}
        </TodoCounterContext.Provider>
    );
};