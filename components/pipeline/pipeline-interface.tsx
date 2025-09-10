"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Pause, Settings, Brain, FileText, TrendingUp, Cpu, Activity, Clock, Zap } from "lucide-react"
import { PipelineMonitor } from "./pipeline-monitor"
import { PipelineResults } from "./pipeline-results"
import { PipelineConfiguration } from "./pipeline-configuration"

export function PipelineInterface() {
  const [selectedPipeline, setSelectedPipeline] = useState("biodiversity-analysis")
  const [isRunning, setIsRunning] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Pipeline Interface</h1>
          <p className="text-muted-foreground mt-1">Configure and monitor eDNA biodiversity analysis workflows</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Pipeline Settings
          </Button>
          <Button>
            <Brain className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
        </div>
      </div>

      {/* Pipeline Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Pipelines</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Currently processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Queue Length</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Waiting to process</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compute Usage</CardTitle>
            <Cpu className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <p className="text-xs text-muted-foreground">GPU cluster utilization</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Interface */}
      <Tabs defaultValue="configure" className="space-y-4">
        <TabsList>
          <TabsTrigger value="configure">Configure Pipeline</TabsTrigger>
          <TabsTrigger value="monitor">Monitor Progress</TabsTrigger>
          <TabsTrigger value="results">View Results</TabsTrigger>
          <TabsTrigger value="models">AI Models</TabsTrigger>
        </TabsList>

        <TabsContent value="configure" className="space-y-4">
          <PipelineConfiguration />
        </TabsContent>

        <TabsContent value="monitor" className="space-y-4">
          <PipelineMonitor />
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <PipelineResults />
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Management</CardTitle>
              <CardDescription>Configure and manage machine learning models for biodiversity analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Taxonomy Classifier</CardTitle>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <CardDescription>Deep learning model for species identification</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Model Version</span>
                        <span className="font-medium">v2.1.3</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Accuracy</span>
                        <span className="font-medium">94.2%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Training Data</span>
                        <span className="font-medium">2.3M sequences</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Updated</span>
                        <span className="font-medium">2024-01-10</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Settings className="w-3 h-3 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="w-3 h-3 mr-1" />
                        Logs
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Biodiversity Estimator</CardTitle>
                      <Badge variant="secondary">Training</Badge>
                    </div>
                    <CardDescription>Model for estimating species richness and diversity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Model Version</span>
                        <span className="font-medium">v1.8.2</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Accuracy</span>
                        <span className="font-medium">87.5%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Training Progress</span>
                        <span className="font-medium">73%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>ETA</span>
                        <span className="font-medium">2h 15m</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Pause className="w-3 h-3 mr-1" />
                        Pause
                      </Button>
                      <Button size="sm" variant="outline">
                        <Activity className="w-3 h-3 mr-1" />
                        Monitor
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Quality Control</CardTitle>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <CardDescription>Automated quality assessment for eDNA sequences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Model Version</span>
                        <span className="font-medium">v3.0.1</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Precision</span>
                        <span className="font-medium">96.8%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Recall</span>
                        <span className="font-medium">92.1%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Processing Speed</span>
                        <span className="font-medium">1.2k seq/min</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Settings className="w-3 h-3 mr-1" />
                        Tune
                      </Button>
                      <Button size="sm" variant="outline">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Metrics
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Novel Species Detector</CardTitle>
                      <Badge variant="outline">Beta</Badge>
                    </div>
                    <CardDescription>Experimental model for identifying unknown species</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Model Version</span>
                        <span className="font-medium">v0.9.1-beta</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Sensitivity</span>
                        <span className="font-medium">78.3%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>False Positive Rate</span>
                        <span className="font-medium">12.4%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Status</span>
                        <span className="font-medium">Experimental</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Zap className="w-3 h-3 mr-1" />
                        Test
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="w-3 h-3 mr-1" />
                        Docs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
