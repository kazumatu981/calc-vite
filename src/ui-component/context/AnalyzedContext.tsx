import React, { createContext, ReactNode, useState } from 'react';
import { Token } from '../../lib/tokenizer';
import { ParserNode } from '../../lib/parser/parser-node';
import { ResolveEventArg } from '../../lib/resolver';

interface Analyzed {
    expression: string;
    tokens: Token[];
    nodes: ParserNode;
    result: number;
    resolveEventArgs: ResolveEventArg[];
}

interface AnalyzedContextType {
    analyzed: Analyzed | undefined;
    setAnalyzed: (analyzed: Analyzed | undefined) => void;
}

// コンテキストの作成
const AnalyzedContext = createContext<AnalyzedContextType | undefined>(undefined);

interface AnalyzedProviderProps {
    children: ReactNode;
}

const AnalyzedProvider: React.FC<AnalyzedProviderProps> = ({ children }) => {
    const [analyzed, setAnalyzed] = useState<Analyzed | undefined>(undefined);

    return <AnalyzedContext.Provider value={{ analyzed, setAnalyzed }}>{children}</AnalyzedContext.Provider>;
};

export { type Analyzed, AnalyzedProvider, AnalyzedContext };
