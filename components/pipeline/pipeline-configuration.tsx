"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Play, Save, RefreshCw, Settings, Database, Microscope, Brain } from "lucide-react"

export function PipelineConfiguration() {
  const [selectedSample, setSelectedSample] = useState("")
  const [pipelineType, setPipelineType] = useState("biodiversity-analysis")
  const [enableQualityControl, setEnableQualityControl] = useState(true)
  const [enableNovelDetection, setEnableNovelDetection] = useState(false)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Configuration</CardTitle>
          <CardDescription>Configure your eDNA analysis pipeline parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sample-select">Select Sample</Label>
            <Select value={selectedSample} onValueChange={setSelectedSample}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a sample to analyze" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CMLRE-2024-001">CMLRE-2024-001 - Arabian Sea</SelectItem>
                <SelectItem value="CMLRE-2024-002">CMLRE-2024-002 - Bay of Bengal</SelectItem>
                <SelectItem value="CMLRE-2024-003">CMLRE-2024-003 - Indian Ocean</SelectItem>
                <SelectItem value="CMLRE-2024-004">CMLRE-2024-004 - Laccadive Sea</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pipeline-type">Pipeline Type</Label>
            <Select value={pipelineType} onValueChange={setPipelineType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="biodiversity-analysis">Biodiversity Analysis</SelectItem>
                <SelectItem value="taxonomy-classification">Taxonomy Classification</SelectItem>
                <SelectItem value="community-structure">Community Structure</SelectItem>
                <SelectItem value="novel-species-detection">Novel Species Detection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Analysis Parameters</h4>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                <Input id="confidence-threshold" type="number" placeholder="0.85" min="0" max="1" step="0.01" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="min-sequence-length">Min Sequence Length</Label>
                <Input id="min-sequence-length" type="number" placeholder="100" min="50" max="1000" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-gene">Target Gene Region</Label>
              <Select defaultValue="18s-rrna">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18s-rrna">18S rRNA</SelectItem>
                  <SelectItem value="coi">COI (Cytochrome c oxidase I)</SelectItem>
                  <SelectItem value="16s-rrna">16S rRNA</SelectItem>
                  <SelectItem value="its">ITS (Internal Transcribed Spacer)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Advanced Options</h4>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Quality Control</Label>
                <p className="text-xs text-muted-foreground">Enable automated quality assessment</p>
              </div>
              <Switch checked={enableQualityControl} onCheckedChange={setEnableQualityControl} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Novel Species Detection</Label>
                <p className="text-xs text-muted-foreground">Identify potentially new species</p>
              </div>
              <Switch checked={enableNovelDetection} onCheckedChange={setEnableNovelDetection} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Analysis Notes</Label>
            <Textarea id="notes" placeholder="Add any notes about this analysis..." rows={3} />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Preview</CardTitle>
            <CardDescription>Review your configuration before starting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Database className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Data Preprocessing</p>
                  <p className="text-xs text-muted-foreground">Quality filtering and sequence cleaning</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Microscope className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Taxonomic Classification</p>
                  <p className="text-xs text-muted-foreground">AI-powered species identification</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Brain className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Biodiversity Analysis</p>
                  <p className="text-xs text-muted-foreground">Community structure and diversity metrics</p>
                </div>
              </div>

              {enableNovelDetection && (
                <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <RefreshCw className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm font-medium">Novel Species Detection</p>
                    <p className="text-xs text-muted-foreground">Experimental feature enabled</p>
                  </div>
                  <Badge variant="outline">Beta</Badge>
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Estimated Runtime</span>
                <span className="font-medium">2h 30m</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Compute Cost</span>
                <span className="font-medium">₹45.20</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Priority</span>
                <span className="font-medium">Normal</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Start your analysis or save configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" size="lg">
              <Play className="w-4 h-4 mr-2" />
              Start Analysis Pipeline
            </Button>

            <div className="grid gap-2 md:grid-cols-2">
              <Button variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save Config
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Advanced
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
