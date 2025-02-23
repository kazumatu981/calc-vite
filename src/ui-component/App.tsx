import { Panel } from 'primereact/panel';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TerminalPanel } from './panel/TerminalPanel';
import { MechanismPanel } from './panel/MechanismPanel';
import { ExpressionProvider } from './context/ExpressionContext';
import { AnalyzedProvider } from './context/AnalyzedContext';
import './App.scss';

function App() {
    return (
        <div className="app">
            <h1>数式計算機</h1>
            <AnalyzedProvider>
                <ExpressionProvider>
                    <h2>
                        <FontAwesomeIcon icon={faTerminal} /> 計算コンソール
                        <TerminalPanel />
                    </h2>
                    <Panel header="計算機の仕組み" collapsed toggleable>
                        <p>計算機の仕組みについて説明します。</p>
                        <MechanismPanel />
                    </Panel>
                </ExpressionProvider>
            </AnalyzedProvider>
        </div>
    );
}

export default App;
