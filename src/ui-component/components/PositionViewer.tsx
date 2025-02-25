import { JSX } from 'react';
import { Location } from './Location';
import './PositionViewer.scss';

export function PositionViewer({ expression }: { expression: string }): JSX.Element {
    if (expression.length === 0) {
        return <></>;
    }

    return (
        <div className="position-viewer">
            <table className="position-viewer_table">
                <tr>
                    {expression.split('').map((_, index) => {
                        return (
                            <td className="position-viewer_index" key={index}>
                                <Location position={index} />
                            </td>
                        );
                    })}
                </tr>
                <tr>
                    {expression.split('').map((char, index) => {
                        return (
                            <td className="position-viewer_char" key={index}>
                                {char}
                            </td>
                        );
                    })}
                </tr>
            </table>
        </div>
    );
}
