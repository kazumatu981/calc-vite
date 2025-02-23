import React, { createContext, ReactNode, useState } from 'react';

interface ExpressionContextType {
    expression: string;
    setExpression: (text: string) => void;
}

// コンテキストの作成
const ExpressionContext = createContext<ExpressionContextType | undefined>(undefined);

interface ExpressionProviderProps {
    children: ReactNode;
}

const ExpressionProvider: React.FC<ExpressionProviderProps> = ({ children }) => {
    const [expression, setExpression] = useState('');

    return <ExpressionContext.Provider value={{ expression, setExpression }}>{children}</ExpressionContext.Provider>;
};

export { ExpressionProvider, ExpressionContext };
