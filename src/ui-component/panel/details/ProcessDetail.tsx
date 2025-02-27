import { JSX } from 'react';
import './ProcessDetail.scss';
import { Analyzed } from '../../context/AnalyzedContext';

export interface AnalyzedDetailProps {
    result?: Analyzed;
}

interface ProcessDetailProps {
    figure: JSX.Element;
    description: JSX.Element;
}

export function ProcessDetail(args: ProcessDetailProps): JSX.Element {
    return (
        <div className="process-detail">
            <div className="process-detail__figure">{args.figure}</div>
            <div>{args.description}</div>
        </div>
    );
}
