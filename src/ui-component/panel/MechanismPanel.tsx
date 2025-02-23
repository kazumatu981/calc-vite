import { JSX, useContext } from 'react';
import { ExpressionContext } from '../context/ExpressionContext';
import { AnalyzedContext } from '../context/AnalyzedContext';
import { PositionViewer } from '../components/PositionViewer';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';

import { TokenizeDetail } from './details/TokenizeDetail';
import { ParseDetail } from './details/ParseDetail';
import { ExecuteDetail } from './details/ExecuteDetail';

export function MechanismPanel(): JSX.Element {
    const expressionContext = useContext(ExpressionContext);
    const analyzedContext = useContext(AnalyzedContext);
    const detailContent = (
        <>
            <Stepper orientation="vertical">
                <StepperPanel header="字句解析">
                    <TokenizeDetail tokens={analyzedContext?.analyzed?.tokens || []} />
                </StepperPanel>
                <StepperPanel header="構文解析">
                    <ParseDetail parsedNode={analyzedContext?.analyzed?.nodes} />
                </StepperPanel>
                <StepperPanel header="意味解析">
                    <ExecuteDetail steps={analyzedContext?.analyzed?.resolveEventArgs || []} />
                </StepperPanel>
            </Stepper>
        </>
    );
    const analyzedDetailContent = (
        <>
            <p>{expressionContext?.expression}を分析します。</p>

            <PositionViewer expression={expressionContext?.expression || ''} />

            <div>{analyzedContext?.analyzed ? detailContent : <></>}</div>
        </>
    );
    return <div>{expressionContext?.expression && analyzedDetailContent}</div>;
}
