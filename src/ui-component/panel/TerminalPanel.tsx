import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';
import { useEffect, JSX, useContext, useState } from 'react';
import { ExpressionContext } from '../ExpressionContext';

import { resolveAsync } from '../../lib/resolver';
import './TerminalPanel.scss';

const welcomeMessage = '対話式計算機: 四則演算の数式を入力して"Enter"キーを押してください。';
export function TerminalPanel(): JSX.Element {
    const [isProcessing, setIsProcessing] = useState(false);
    const context = useContext(ExpressionContext);
    useEffect(() => {
        TerminalService.on('command', onCommand);
        return () => {
            TerminalService.off('command', () => {});
        };
    }, [context]);

    function onCommand(expression: string) {
        setIsProcessing(true);
        context?.setExpression(expression);
        resolveAsync(expression)
            .then((result) => {
                TerminalService.emit('response', result);
            })
            .catch((error) => {
                TerminalService.emit('response', error.message);
            })
            .finally(() => {
                setIsProcessing(false);
            });
    }

    return (
        <div className="m-4">
            <Terminal welcomeMessage={welcomeMessage} prompt="計算式> "></Terminal>
        </div>
    );
}
