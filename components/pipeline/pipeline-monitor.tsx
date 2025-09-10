"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pause, Square, RefreshCw, CheckCircle, Clock, Activity, Cpu, HardDrive, Zap } from "lucide-react"

const activePipelines = [
  {
    id: "pipeline-001",
    name: "Biodiversity Analysis - CMLRE-2024-002",
    status: "running",
    progress: 67,
    stage: "Taxonomic Classification",
    startTime: "14:30",
    estimatedCompletion: "16:45",
    currentStep: "Processing sequences with AI model",
    steps: [
      { name: "Data Preprocessing", status: "completed", duration: "12m" },
      { name: "Quality Control", status: "completed", duration: "8m" },
      { name: "Taxonomic Classification", status: "running", duration: "45m" },
      { name: "Biodiversity Analysis", status: "pending", duration: "25m" },
      { name: "Report Generation", status: "pending", duration: "5m" },
    ],
  },
  {
    id: "pipeline-002",
    name: "Novel Species Detection - CMLRE-2024-006",
    status: "queued",
    progress: 0,
    stage: "Waiting for resources",
    startTime: "-",
    estimatedCompletion: "18:30",
    currentStep: "Queued for processing",
    steps: [
      { name: "Data Preprocessing", status: "pending", duration: "15m" },
      { name: "Quality Control", status: "pending", duration: "10m" },
      { name: "Novel Detection", status: "pending", duration: "120m" },
      { name: "Validation", status: "pending", duration: "30m" },
      { name: "Report Generation", status: "pending", duration: "8m" },
    ],
  },
]

export function PipelineMonitor() {
  return (
    <div className="space-y-6">
      {/* System Resources */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <Progress value={73} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GPU Usage</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <Progress value={89} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <Progress value={45} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <Progress value={67} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Active Pipelines */}
      <Card>
        <CardHeader>
          <CardTitle>Active Pipelines</CardTitle>
          <CardDescription>Monitor real-time progress of running analyses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {activePipelines.map((pipeline) => (
              <div key={pipeline.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-lg font-medium">{pipeline.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Started: {pipeline.startTime} • ETA: {pipeline.estimatedCompletion}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        pipeline.status === "running"
                          ? "default"
                          : pipeline.status === "queued"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {pipeline.status === "running" && <RefreshCw className="w-3 h-3 mr-1 animate-spin" />}
                      {pipeline.status === "queued" && <Clock className="w-3 h-3 mr-1" />}
                      {pipeline.status.charAt(0).toUpperCase() + pipeline.status.slice(1)}
                    </Badge>
                    <div className="flex gap-1">
                      {pipeline.status === "running" && (
                        <Button size="sm" variant="ghost">
                          <Pause className="w-3 h-3" />
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
                    <span className="text-muted-foreground">{pipeline.currentStep}</span>
                    <span className="font-medium">{pipeline.progress}%</span>
                  </div>
                  <Progress value={pipeline.progress} className="h-3" />
                </div>

                <Tabs defaultValue="steps" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="steps">Pipeline Steps</TabsTrigger>
                    <TabsTrigger value="logs">Live Logs</TabsTrigger>
                  </TabsList>

                  <TabsContent value="steps" className="mt-4">
                    <div className="space-y-3">
                      {pipeline.steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="flex-shrink-0">
                            {step.status === "completed" && <CheckCircle className="w-5 h-5 text-green-500" />}
                            {step.status === "running" && <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />}
                            {step.status === "pending" && <Clock className="w-5 h-5 text-muted-foreground" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{step.name}</p>
                            <p className="text-xs text-muted-foreground">Duration: {step.duration}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {step.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="logs" className="mt-4">
                    <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-xs space-y-1 max-h-64 overflow-y-auto">
                      <div>[14:32:15] Starting taxonomic classification...</div>
                      <div>[14:32:16] Loading AI model: taxonomy_classifier_v2.1.3</div>
                      <div>[14:32:18] Model loaded successfully</div>
                      <div>[14:32:19] Processing batch 1/47 (2.1%)</div>
                      <div>[14:35:22] Processing batch 15/47 (31.9%)</div>
                      <div>[14:38:45] Processing batch 28/47 (59.6%)</div>
                      <div>[14:41:12] Processing batch 32/47 (68.1%)</div>
                      <div className="text-yellow-400">[14:41:13] Current batch: 32/47 - ETA: 12m 30s</div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
