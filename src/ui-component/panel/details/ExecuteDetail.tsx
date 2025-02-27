import { JSX } from 'react';
import { type AnalyzedDetailProps, ProcessDetail } from './ProcessDetail';
import { Location } from '../../components/Location';
function ExecuteSteps(prop: AnalyzedDetailProps): JSX.Element {
    const steps = prop.result?.resolveEventArgs ?? [];

    return (
        <table className="execute-steps">
            <thead>
                <tr>
                    <th>Step</th>
                    <th>Position</th>
                    <th>Expression</th>
                </tr>
            </thead>
            <tbody>
                {steps.map((step, index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>
                            <Location position={step.node.tokens[0].position} />
                        </td>
                        <td>
                            {step.left} {step.operator} {step.right} = {step.result}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
const description = (
    <>
        <h2>意味解析</h2>

        <ul>
            <li>計算式を解析する最後のステップです。</li>
            <li>構文に従って、計算式の意味を解析しながら実行します。</li>
            <li>例えば、演算子'+'は加算を意味し、演算子'-'は減算を意味するといった具合です。</li>
            <li>演算子や括弧の優先度を考慮するため、ツリー構造の末端から順に解決していきます。</li>
        </ul>
    </>
);

export function ExecuteDetail(prop: AnalyzedDetailProps): JSX.Element {
    return <ProcessDetail figure={<ExecuteSteps result={prop.result} />} description={description} />;
}
