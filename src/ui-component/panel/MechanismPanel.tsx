import { JSX, useContext, useRef } from 'react';
import { ExpressionContext } from '../ExpressionContext';
import {PositionViewer} from '../components/PositionViewer';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';

export function MechanismPanel(): JSX.Element {
    const context = useContext(ExpressionContext);
    const stepperRef = useRef(null);
    return (
        <div>
            <p>{context?.expression}を分析します。</p>

            <PositionViewer expression={context?.expression || ''} />

            <Stepper ref={stepperRef} orientation='vertical'>
                <StepperPanel header='字句解析'>
                    <p>Step 1 Content</p>
                </StepperPanel>
                <StepperPanel header='構文解析'>
                    <p>Step 2 Content</p>
                </StepperPanel>
                <StepperPanel header='意味解析'>
                    <p>Step 3 Content</p>
                </StepperPanel>
            </Stepper>
        </div>
    );
}

