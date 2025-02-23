import { JSX, useContext } from 'react';
import { ExpressionContext } from '../ExpressionContext';

export function MechanismPanel(): JSX.Element {
    const context = useContext(ExpressionContext);
    return (
        <div>
            <p>{context?.expression}</p>
        </div>
    );
}
