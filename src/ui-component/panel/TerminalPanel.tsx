import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';
import { useEffect, JSX, useContext } from 'react';
import { ExpressionContext } from '../ExpressionContext';

import { resolveAsync } from '../../lib/resolver';
import './TerminalPanel.scss';

export function TerminalPanel(): JSX.Element {
    const context = useContext(ExpressionContext);
    useEffect(() => {
        TerminalService.on('command', (command: string) => {
            context?.setExpression(command);
            resolveAsync(command)
                .then((result) => {
                    TerminalService.emit('response', result);
                })
                .catch((error) => {
                    TerminalService.emit('response', error.message);
                });
        });
        return () => {
            TerminalService.off('command', () => {});
        };
    }, [context]);
    return (
        <div className="m-4">
            <Terminal
                welcomeMessage='Welcome to the Calculator.Please enter an "expression" and press Enter'
                prompt="expression>"
            />
        </div>
    );
}
