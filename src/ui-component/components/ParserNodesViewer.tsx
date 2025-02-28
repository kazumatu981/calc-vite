import { JSX } from 'react';
import { OrganizationChart, OrganizationChartNodeData } from 'primereact/organizationchart';

import './ParserNodesViewer.scss';
import { BinaryNode, ParenNode, type ParserNode, SingleNode } from '../../lib/parser/parser-node';
import { ResolveEventArg } from '../../lib/resolver';
import { TokensViewer } from './TokensViewer';

interface ParsedChardNodeData extends OrganizationChartNodeData {
    id: string;
    key: string;
    data: ParserNode;
}
interface ParserNodesViewerProps {
    parsedNode?: ParserNode;
    resolveEventArgs?: ResolveEventArg[];
}

function parserNodeToTreeNode(prop: ParserNodesViewerProps): ParsedChardNodeData {
    const parserNode = prop.parsedNode;
    if (!parserNode) {
        throw new Error('parserNode is not found');
    }
    if (parserNode.nodeType === 'paren') {
        const node = parserNode as ParenNode;
        return {
            id: node.tokens[0].id,
            key: node.tokens[0].id,
            label: '()',
            data: node,
            children: [parserNodeToTreeNode({ parsedNode: node.childRoot, resolveEventArgs: prop.resolveEventArgs })],
            expanded: true,
        };
    } else if (parserNode.nodeType === 'binary') {
        const node = parserNode as BinaryNode;
        return {
            id: node.tokens[0].id,
            key: node.tokens[0].id,
            label: node.operator,
            data: node,
            children: [
                parserNodeToTreeNode({ parsedNode: node.left, resolveEventArgs: prop.resolveEventArgs }),
                parserNodeToTreeNode({ parsedNode: node.right, resolveEventArgs: prop.resolveEventArgs }),
            ],
            expanded: true,
        };
    } else if (parserNode.nodeType === 'single') {
        const node = parserNode as SingleNode;
        return {
            id: node.tokens[0].id,
            key: node.tokens[0].id,
            label: node.isNegative ? `-${node.value}` : node.value,
            data: node,
            expanded: true,
        };
    }
    throw new Error('not implemented');
}

function nodeTemplate(node: OrganizationChartNodeData): JSX.Element {
    const data = (node as ParsedChardNodeData).data as ParserNode;
    return (
        <div className="parser-node-item">
            <TokensViewer tokens={data.tokens} withBorder={false} />
            <div className="parser-node-item_expression">{data.toString()}</div>
        </div>
    );
}

export function ParserNodesViewer(prop: ParserNodesViewerProps): JSX.Element {
    return prop.parsedNode ? (
        <OrganizationChart value={[parserNodeToTreeNode(prop)]} nodeTemplate={nodeTemplate} />
    ) : (
        <></>
    );
}
