import { Token } from '../../lib/tokenizer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './TokensViewer.scss';

function TokenItem({ token }: { token: Token }) {
    const classNames = ['token'];
    if (token.isOperator) {
        classNames.push('operator');
    }
    if (token.isParen) {
        classNames.push('paren');
    }
    return (
        <div className="token-item">
            <div>
                <small>
                    <FontAwesomeIcon icon={faLocationDot} size="xs" />
                    {token.position}
                </small>
            </div>
            <div className={classNames.join(' ')}>
                <div>
                    <big>{token.value}</big>
                </div>
                <div>
                    <small>{token.type}</small>
                </div>
            </div>
        </div>
    );
}

export function TokensViewer({ tokens }: { tokens: Token[] }) {
    return tokens.length === 0 ? (
        <></>
    ) : (
        <div className="tokens">
            {tokens.map((token) => (
                <TokenItem key={token.id} token={token} />
            ))}
        </div>
    );
}
