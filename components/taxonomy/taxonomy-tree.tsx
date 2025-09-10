"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, ChevronDown, Leaf, Fish, Bug } from "lucide-react"

interface TaxonomyNode {
  id: string
  name: string
  rank: string
  count: number
  children?: TaxonomyNode[]
  expanded?: boolean
}

interface TaxonomyTreeProps {
  onSpeciesSelect: (species: any) => void
}

export function TaxonomyTree({ onSpeciesSelect }: TaxonomyTreeProps) {
  const [taxonomyData, setTaxonomyData] = useState<TaxonomyNode[]>([
    {
      id: "1",
      name: "Animalia",
      rank: "Kingdom",
      count: 8456,
      expanded: true,
      children: [
        {
          id: "2",
          name: "Chordata",
          rank: "Phylum",
          count: 2341,
          expanded: false,
          children: [
            {
              id: "3",
              name: "Actinopterygii",
              rank: "Class",
              count: 1876,
              children: [
                { id: "4", name: "Gadus morhua", rank: "Species", count: 45 },
                { id: "5", name: "Pleuronectes platessa", rank: "Species", count: 32 },
              ],
            },
          ],
        },
        {
          id: "6",
          name: "Arthropoda",
          rank: "Phylum",
          count: 3245,
          expanded: false,
          children: [
            {
              id: "7",
              name: "Copepoda",
              rank: "Class",
              count: 1234,
              children: [{ id: "8", name: "Calanus finmarchicus", rank: "Species", count: 156 }],
            },
          ],
        },
        {
          id: "9",
          name: "Mollusca",
          rank: "Phylum",
          count: 1876,
          expanded: false,
          children: [
            {
              id: "10",
              name: "Bivalvia",
              rank: "Class",
              count: 987,
              children: [{ id: "11", name: "Mytilus edulis", rank: "Species", count: 89 }],
            },
          ],
        },
      ],
    },
    {
      id: "12",
      name: "Plantae",
      rank: "Kingdom",
      count: 2341,
      expanded: false,
      children: [
        {
          id: "13",
          name: "Rhodophyta",
          rank: "Phylum",
          count: 876,
          children: [{ id: "14", name: "Porphyra umbilicalis", rank: "Species", count: 23 }],
        },
      ],
    },
  ])

  const toggleNode = (nodeId: string) => {
    const updateNode = (nodes: TaxonomyNode[]): TaxonomyNode[] => {
      return nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, expanded: !node.expanded }
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) }
        }
        return node
      })
    }
    setTaxonomyData(updateNode(taxonomyData))
  }

  const getRankIcon = (rank: string) => {
    switch (rank.toLowerCase()) {
      case "species":
        return <Leaf className="h-4 w-4 text-green-600" />
      case "class":
      case "phylum":
        return <Fish className="h-4 w-4 text-blue-600" />
      default:
        return <Bug className="h-4 w-4 text-purple-600" />
    }
  }

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case "kingdom":
        return "bg-purple-100 text-purple-800"
      case "phylum":
        return "bg-blue-100 text-blue-800"
      case "class":
        return "bg-cyan-100 text-cyan-800"
      case "species":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderNode = (node: TaxonomyNode, level = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = node.expanded

    return (
      <div key={node.id} className="space-y-1">
        <div
          className={`flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer ${
            level > 0 ? "ml-" + (level * 4) : ""
          }`}
          onClick={() => {
            if (hasChildren) {
              toggleNode(node.id)
            } else {
              onSpeciesSelect(node)
            }
          }}
        >
          <div className="flex items-center gap-2 flex-1">
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="h-4 w-4 text-slate-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-slate-400" />
              )
            ) : (
              <div className="w-4" />
            )}

            {getRankIcon(node.rank)}

            <span className="font-medium text-slate-900">{node.name}</span>

            <Badge variant="secondary" className={getRankColor(node.rank)}>
              {node.rank}
            </Badge>
          </div>

          <Badge variant="outline" className="text-xs">
            {node.count} samples
          </Badge>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-1">{node.children!.map((child) => renderNode(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="h-5 w-5 text-purple-600" />
          Taxonomic Hierarchy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-96 overflow-y-auto">{taxonomyData.map((node) => renderNode(node))}</div>
      </CardContent>
    </Card>
  )
}
