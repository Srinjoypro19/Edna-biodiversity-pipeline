"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Play, Save, Download, Copy, BookOpen } from "lucide-react"

export function DatabaseQuery() {
  const [query, setQuery] = useState("")
  const [queryResult, setQueryResult] = useState(null)
  const [isExecuting, setIsExecuting] = useState(false)

  const sampleQueries = [
    {
      name: "Species by Location",
      description: "Find all species identified in a specific location",
      query: `SELECT s.species_name, s.confidence, sa.location, sa.depth
FROM species s
JOIN samples sa ON s.sample_id = sa.sample_id
WHERE sa.location LIKE '%Arabian Sea%'
ORDER BY s.confidence DESC;`,
    },
    {
      name: "Novel Species Count",
      description: "Count potential novel species by confidence threshold",
      query: `SELECT 
  COUNT(*) as novel_species_count,
  AVG(confidence) as avg_confidence
FROM species 
WHERE status = 'Novel' 
  AND confidence > 80;`,
    },
    {
      name: "Biodiversity by Depth",
      description: "Analyze species diversity across different depth ranges",
      query: `SELECT 
  CASE 
    WHEN CAST(REPLACE(depth, 'm', '') AS INTEGER) < 1000 THEN '0-1000m'
    WHEN CAST(REPLACE(depth, 'm', '') AS INTEGER) < 3000 THEN '1000-3000m'
    ELSE '3000m+'
  END as depth_range,
  COUNT(DISTINCT species_name) as species_count
FROM species s
JOIN samples sa ON s.sample_id = sa.sample_id
GROUP BY depth_range
ORDER BY species_count DESC;`,
    },
  ]

  const executeQuery = () => {
    setIsExecuting(true)
    // Simulate query execution
    setTimeout(() => {
      setQueryResult({
        columns: ["species_name", "confidence", "location", "depth"],
        rows: [
          ["Bathymodiolus thermophilus", "98.2", "Arabian Sea", "2,450m"],
          ["Alvinella pompejana", "95.7", "Arabian Sea", "2,450m"],
          ["Riftia pachyptila", "97.1", "Arabian Sea", "2,450m"],
        ],
        executionTime: "0.245s",
        rowCount: 3,
      })
      setIsExecuting(false)
    }, 1500)
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>SQL Query Editor</CardTitle>
          <CardDescription>Execute custom queries against the biodiversity database</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Enter your SQL query here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={8}
              className="font-mono text-sm"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={executeQuery} disabled={isExecuting || !query.trim()}>
              <Play className="w-4 h-4 mr-2" />
              {isExecuting ? "Executing..." : "Execute Query"}
            </Button>
            <Button variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Save Query
            </Button>
            <Button variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>

          {queryResult && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="default">Success</Badge>
                  <span className="text-sm text-muted-foreground">
                    {queryResult.rowCount} rows returned in {queryResult.executionTime}
                  </span>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-2">
                  <div className="grid grid-cols-4 gap-2 text-xs font-medium">
                    {queryResult.columns.map((col, index) => (
                      <div key={index}>{col}</div>
                    ))}
                  </div>
                </div>
                <div className="divide-y">
                  {queryResult.rows.map((row, index) => (
                    <div key={index} className="grid grid-cols-4 gap-2 p-2 text-sm">
                      {row.map((cell, cellIndex) => (
                        <div key={cellIndex}>{cell}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Sample Queries</CardTitle>
            <CardDescription>Common queries for biodiversity research</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {sampleQueries.map((sample, index) => (
              <div
                key={index}
                className="p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => setQuery(sample.query)}
              >
                <h4 className="font-medium text-sm">{sample.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{sample.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Query History</CardTitle>
            <CardDescription>Recently executed queries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { query: "SELECT COUNT(*) FROM species WHERE...", time: "2 min ago", status: "success" },
              { query: "SELECT * FROM samples WHERE location...", time: "5 min ago", status: "success" },
              { query: "UPDATE species SET status = 'Verified'...", time: "10 min ago", status: "error" },
            ].map((item, index) => (
              <div key={index} className="p-2 bg-muted/50 rounded text-xs">
                <div className="flex items-center justify-between">
                  <code className="text-xs truncate flex-1">{item.query}</code>
                  <Badge variant={item.status === "success" ? "default" : "destructive"} className="ml-2">
                    {item.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1">{item.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>Database schema and query help</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              <BookOpen className="w-4 h-4 mr-2" />
              View Schema Docs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
