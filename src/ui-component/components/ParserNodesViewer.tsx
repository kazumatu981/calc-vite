import { JSX } from 'react';
import { OrganizationChart, OrganizationChartNodeData } from 'primereact/organizationchart';

import './ParserNodesViewer.scss';
import { BinaryNode, ParenNode, type ParserNode, SingleNode } from '../../lib/parser/parser-node';
import { TokensViewer } from './TokensViewer';

interface ParsedChardNodeData extends OrganizationChartNodeData {
    id: string;
    key: string;
    data: ParserNode;
}

function parserNodeToTreeNode(parserNode: ParserNode): ParsedChardNodeData {
    if (parserNode.nodeType === 'paren') {
        const node = parserNode as ParenNode;
        return {
            id: node.tokens[0].id,
            key: node.tokens[0].id,
            label: '()',
            data: node,
            children: [parserNodeToTreeNode(node.childRoot)],
            expanded: true,
        };
    } else if (parserNode.nodeType === 'binary') {
        const node = parserNode as BinaryNode;
        return {
            id: node.tokens[0].id,
            key: node.tokens[0].id,
            label: node.operator,
            data: node,
            children: [parserNodeToTreeNode(node.left), parserNodeToTreeNode(node.right)],
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

export function ParserNodesViewer({ parsedNode }: { parsedNode: ParserNode | undefined }) {
    return parsedNode ? (
        <OrganizationChart value={[parserNodeToTreeNode(parsedNode)]} nodeTemplate={nodeTemplate} />
    ) : (
        <></>
    );
}
