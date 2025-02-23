import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';
import { useEffect, JSX, useContext, useState } from 'react';
import { ExpressionContext } from '../context/ExpressionContext';
import { AnalyzedContext } from '../context/AnalyzedContext';

import './TerminalPanel.scss';
import { Token, tokenizeAsync } from '../../lib/tokenizer';
import { parse, ParserNode } from '../../lib/parser';
import { resolveAsync, ResolveEventArg, ResolveEventHandler } from '../../lib/resolver';

const welcomeMessage = '対話式計算機: 四則演算の数式を入力して"Enter"キーを押してください。';
export function TerminalPanel(): JSX.Element {
    const [isProcessing, setIsProcessing] = useState(false);

    const expressionContext = useContext(ExpressionContext);
    const analyzedContext = useContext(AnalyzedContext);
    useEffect(() => {
        TerminalService.on('command', onCommand);
        return () => {
            TerminalService.off('command', () => {});
        };
    }, [expressionContext, analyzedContext]);

    function onCommand(expression: string) {
        setIsProcessing(true);
        expressionContext?.setExpression(expression);
        let tokens: Token[];
        let nodes: ParserNode;
        const resolveEventArgs: ResolveEventArg[] = [];
        const onProcess: ResolveEventHandler = (event, eventArg) => {
            if (event === 'operate') {
                resolveEventArgs.push(eventArg);
            }
        };
        if (expression !== '') {
            tokenizeAsync(expression)
                .then((result) => {
                    tokens = result;
                    return parse(tokens);
                })
                .then((result) => {
                    nodes = result;
                    return resolveAsync(nodes, onProcess);
                })
                .then((result) => {
                    analyzedContext?.setAnalyzed({ expression, tokens, nodes, result, resolveEventArgs });
                    TerminalService.emit('response', `計算結果: ${result}`);
                })
                .catch((error) => {
                    expressionContext?.setExpression('');
                    analyzedContext?.setAnalyzed(undefined);
                    TerminalService.emit('response', `エラー: ${error.message}`);
                })
                .finally(() => {
                    setIsProcessing(false);
                });
        }
    }

    return (
        <div className="m-4">
            <Terminal welcomeMessage={welcomeMessage} prompt={isProcessing ? '計算中' : '計算式> '}></Terminal>
        </div>
    );
}
