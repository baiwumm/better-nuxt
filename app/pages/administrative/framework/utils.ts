import type { Edge, Node } from '@vue-flow/core'
import dagre from 'dagre'

export function buildFlowData(tree: any[]) {
  const nodes: Node[] = []
  const edges: Edge[] = []

  function walk(node: any) {
    nodes.push({
      id: node.id,
      type: node.id === 'root' ? 'root' : 'department',
      position: { x: 0, y: 0 },
      data: node,
    })

    node.children?.forEach((child: any) => {
      edges.push({
        id: `${node.id}-${child.id}`,
        source: node.id,
        target: child.id,
        type: 'smoothstep',
      })

      walk(child)
    })
  }

  tree.forEach(walk)

  return { nodes, edges }
}

export function layoutGraph(nodes: Node[], edges: Edge[]) {
  const graph = new dagre.graphlib.Graph()

  graph.setDefaultEdgeLabel(() => ({}))

  graph.setGraph({
    rankdir: 'TB',
    nodesep: 60,
    ranksep: 120,
  })

  nodes.forEach((node) => {
    graph.setNode(node.id, {
      width: 220,
      height: 100,
    })
  })

  edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target)
  })

  dagre.layout(graph)

  nodes.forEach((node) => {
    const pos = graph.node(node.id)

    node.position = {
      x: pos.x,
      y: pos.y,
    }
  })

  return nodes
}
