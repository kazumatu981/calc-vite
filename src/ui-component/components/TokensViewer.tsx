import { JSX } from 'react';
import { Token } from '../../lib/tokenizer';
import { Location } from './Location';
import './TokensViewer.scss';

function TokenViewer({ token, withBorder }: { token: Token; withBorder?: boolean }) {
    const classNames = ['token'];
    let tokenType = '不明';

    switch (token.type) {
        case 'number':
            classNames.push('token__number');
            tokenType = '数値';
            break;
        case 'leftParen':
        case 'rightParen':
            classNames.push('token__paren');
            tokenType = '括弧';
            break;
        case 'operator':
            classNames.push('token__operator');
            tokenType = '演算子';
            break;
    }

    return (
        <div className={withBorder ? 'token-item__with-border' : 'token-item'}>
            <Location position={token.position} />
            <div className={classNames.join(' ')}>
                <div className="token__value">{token.value}</div>
                <div className="token__type">{tokenType}</div>
            </div>
        </div>
    );
}

export function TokensViewer({ tokens, withBorder }: { tokens: Token[]; withBorder?: boolean }): JSX.Element {
    return tokens.length === 0 ? (
        <></>
    ) : (
        <div className="tokens">
            {tokens.map((token) => (
                <TokenViewer key={token.id} token={token} withBorder={withBorder} />
            ))}
        </div>
    );
}
