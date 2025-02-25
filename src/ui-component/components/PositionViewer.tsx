import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { JSX } from 'react';
import './PositionViewer.scss';

export function PositionViewer({ expression }: { expression: string }): JSX.Element {
    if (expression.length === 0) {
        return <></>;
    }

    return (
        <div className="position-viewer">
            <table className="position-viewer-table">
                <tr>
                    {expression.split('').map((_, index) => {
                        return (
                            <td className="position-viewer-index" key={index}>
                                <small>
                                    <FontAwesomeIcon icon={faLocationDot} size="xs" /> {index}
                                </small>
                            </td>
                        );
                    })}
                </tr>
                <tr>
                    {expression.split('').map((char, index) => {
                        return (
                            <td className="position-viewer-char" key={index}>
                                <big>{char === ' ' ? '&nbsp;' : char}</big>
                            </td>
                        );
                    })}
                </tr>
            </table>
        </div>
    );
}
