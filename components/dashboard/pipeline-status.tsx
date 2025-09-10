"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Play, Pause, Square, RefreshCw, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const pipelines = [
  {
    id: "pipeline-001",
    name: "Deep Sea Sediment Analysis",
    sample: "CMLRE-2024-002",
    status: "running",
    progress: 67,
    stage: "Taxonomic Classification",
    estimatedTime: "2h 15m",
    startTime: "14:30",
  },
  {
    id: "pipeline-002",
    name: "Hydrothermal Vent Community",
    sample: "CMLRE-2024-006",
    status: "queued",
    progress: 0,
    stage: "Waiting for resources",
    estimatedTime: "3h 45m",
    startTime: "-",
  },
  {
    id: "pipeline-003",
    name: "Abyssal Plain Diversity",
    sample: "CMLRE-2024-001",
    status: "completed",
    progress: 100,
    stage: "Analysis Complete",
    estimatedTime: "2h 52m",
    startTime: "11:15",
  },
  {
    id: "pipeline-004",
    name: "Seamount Ecosystem Study",
    sample: "CMLRE-2024-004",
    status: "failed",
    progress: 45,
    stage: "Quality Control Failed",
    estimatedTime: "-",
    startTime: "09:30",
  },
]

export function PipelineStatus() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Pipelines</CardTitle>
            <Play className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Currently processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Queued</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Waiting to start</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Successfully finished</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline Queue</CardTitle>
          <CardDescription>Current AI analysis pipelines and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {pipelines.map((pipeline) => (
              <div key={pipeline.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">{pipeline.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      Sample: {pipeline.sample} • Started: {pipeline.startTime}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        pipeline.status === "completed"
                          ? "default"
                          : pipeline.status === "running"
                            ? "secondary"
                            : pipeline.status === "failed"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {pipeline.status === "running" && <RefreshCw className="w-3 h-3 mr-1 animate-spin" />}
                      {pipeline.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {pipeline.status === "failed" && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {pipeline.status === "queued" && <Clock className="w-3 h-3 mr-1" />}
                      {pipeline.status.charAt(0).toUpperCase() + pipeline.status.slice(1)}
                    </Badge>
                    <div className="flex gap-1">
                      {pipeline.status === "running" && (
                        <Button size="sm" variant="ghost">
                          <Pause className="w-3 h-3" />
                        </Button>
                      )}
                      {pipeline.status === "queued" && (
                        <Button size="sm" variant="ghost">
                          <Play className="w-3 h-3" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <Square className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{pipeline.stage}</span>
                    <span className="text-muted-foreground">
                      {pipeline.estimatedTime !== "-" && `ETA: ${pipeline.estimatedTime}`}
                    </span>
                  </div>
                  <Progress value={pipeline.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{pipeline.progress}% complete</span>
                    {pipeline.status === "running" && <span>Processing...</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
