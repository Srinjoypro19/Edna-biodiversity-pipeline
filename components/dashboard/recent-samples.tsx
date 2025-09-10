"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Download, MapPin, Calendar, Microscope } from "lucide-react"

const recentSamples = [
  {
    id: "CMLRE-2024-001",
    location: "Arabian Sea - 15.2°N, 68.4°E",
    depth: "2,450m",
    date: "2024-01-15",
    status: "Completed",
    species: 23,
    confidence: 94.2,
  },
  {
    id: "CMLRE-2024-002",
    location: "Bay of Bengal - 18.1°N, 89.2°E",
    depth: "1,850m",
    date: "2024-01-14",
    status: "Processing",
    species: 0,
    confidence: 0,
  },
  {
    id: "CMLRE-2024-003",
    location: "Indian Ocean - 12.5°N, 75.8°E",
    depth: "3,200m",
    date: "2024-01-13",
    status: "Completed",
    species: 31,
    confidence: 91.7,
  },
  {
    id: "CMLRE-2024-004",
    location: "Laccadive Sea - 10.8°N, 72.1°E",
    depth: "1,200m",
    date: "2024-01-12",
    status: "Failed",
    species: 0,
    confidence: 0,
  },
  {
    id: "CMLRE-2024-005",
    location: "Arabian Sea - 16.7°N, 67.9°E",
    depth: "2,800m",
    date: "2024-01-11",
    status: "Completed",
    species: 18,
    confidence: 89.3,
  },
]

export function RecentSamples() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Samples</CardTitle>
        <CardDescription>Latest eDNA samples and their analysis status</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sample ID</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Depth</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Species</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentSamples.map((sample) => (
              <TableRow key={sample.id}>
                <TableCell className="font-medium">{sample.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm">{sample.location}</span>
                  </div>
                </TableCell>
                <TableCell>{sample.depth}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm">{sample.date}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      sample.status === "Completed"
                        ? "default"
                        : sample.status === "Processing"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {sample.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {sample.species > 0 ? (
                    <div className="flex items-center gap-1">
                      <Microscope className="w-3 h-3 text-muted-foreground" />
                      <span>{sample.species}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {sample.confidence > 0 ? (
                    <span className="text-sm">{sample.confidence}%</span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
