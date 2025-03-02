import { JSX } from 'react';
import { OrganizationChart, OrganizationChartNodeData } from 'primereact/organizationchart';

import './ParserNodesViewer.scss';
import { BinaryNode, ParenNode, type ParserNode } from '../../lib/parser/parser-node';
import { resolveNode } from '../../lib/resolver/node-resolver';
import { ResolveEventArg } from '../../lib/resolver';
import { TokensViewer } from './TokensViewer';

interface ParsedChardNodeData extends OrganizationChartNodeData {
    executingOrder?: number;
    data: ParserNode;
}
interface ParserNodesViewerProps {
    parsedNode?: ParserNode;
    resolveEventArgs?: ResolveEventArg[];
    showExecutingOrder?: boolean;
    withLocation?: boolean;
}

export function ParserNodesViewer(prop: ParserNodesViewerProps): JSX.Element {
    function nodeTemplate(node: OrganizationChartNodeData): JSX.Element {
        const data = node as ParsedChardNodeData;
        const parserNode = data.data;
        const expression =
            prop.showExecutingOrder && data.executingOrder ? (
                <div className="parser-node-item_expression">
                    <div className="parser-node-item_executing-order">{data.executingOrder}</div>
                    <div className="parser-node-item_expression">
                        {parserNode.toString('executing')} = {resolveNode(parserNode)}
                    </div>
                </div>
            ) : (
                <></>
            );
        return (
            <div className="parser-node-item">
                <TokensViewer tokens={parserNode.tokens} withBorder={false} withLocation={prop.withLocation} />
                {expression}
            </div>
        );
    }
    return prop.parsedNode ? (
        <OrganizationChart value={[parserNodeToTreeNode(prop)]} nodeTemplate={nodeTemplate} />
    ) : (
        <></>
    );
}

function parserNodeToTreeNode(prop: ParserNodesViewerProps): ParsedChardNodeData {
    const parserNode = prop.parsedNode;
    if (!parserNode) {
        throw new Error('parserNode is not found');
    }
    const executingOrder = prop.resolveEventArgs?.findIndex((x) => x.node === parserNode) ?? -1;
    const commonProps = {
        label: parserNode.toString(),
        data: parserNode,
        expanded: true,
        executingOrder: executingOrder === -1 ? undefined : executingOrder + 1,
    };
    let children: ParsedChardNodeData[] | undefined;
    if (parserNode.nodeType === 'paren') {
        const node = parserNode as ParenNode;

        children = [parserNodeToTreeNode({ parsedNode: node.childRoot, resolveEventArgs: prop.resolveEventArgs })];
    } else if (parserNode.nodeType === 'binary') {
        const node = parserNode as BinaryNode;
        children = [
            parserNodeToTreeNode({ parsedNode: node.left, resolveEventArgs: prop.resolveEventArgs }),
            parserNodeToTreeNode({ parsedNode: node.right, resolveEventArgs: prop.resolveEventArgs }),
        ];
    }
    return { ...commonProps, children };
}
