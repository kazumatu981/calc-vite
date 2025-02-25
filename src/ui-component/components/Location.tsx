import { JSX } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './Location.scss';

interface LocationProps {
    position: number;
}

export function Location({ position }: LocationProps): JSX.Element {
    return (
        <div className="location">
            <div className="location__icon">
                <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <div className="location__text">{position}</div>
        </div>
    );
}
