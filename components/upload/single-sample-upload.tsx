"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, MapPin, Calendar, FileText, CheckCircle } from "lucide-react"

export function SingleSampleUpload() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [autoAnalysis, setAutoAnalysis] = useState(true)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles(files)
  }

  const handleDocumentSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedDocuments(files)
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0 && selectedDocuments.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()

      // Add sample metadata
      const sampleData = {
        sampleId: (document.getElementById("sample-id") as HTMLInputElement)?.value,
        researcher: (document.getElementById("researcher") as HTMLInputElement)?.value,
        location: (document.getElementById("location") as HTMLInputElement)?.value,
        depth: (document.getElementById("depth") as HTMLInputElement)?.value,
        collectionDate: (document.getElementById("collection-date") as HTMLInputElement)?.value,
        notes: (document.getElementById("notes") as HTMLTextAreaElement)?.value,
        autoAnalysis,
      }

      formData.append("metadata", JSON.stringify(sampleData))

      selectedFiles.forEach((file) => {
        formData.append("sequenceFiles", file)
      })

      selectedDocuments.forEach((file) => {
        formData.append("documentFiles", file)
      })

      // Upload with progress tracking
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + 10
        })
      }, 200)

      const result = await response.json()
      console.log("[v0] Upload successful:", result)

      // If auto-analysis is enabled, start the analysis pipeline
      if (autoAnalysis) {
        const analysisResponse = await fetch("/api/ml-pipeline", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sampleId: result.sample.id,
            sequenceFiles: result.sequenceFiles,
            documentFiles: result.documentFiles,
            analysisType: "full_biodiversity_analysis",
          }),
        })

        if (analysisResponse.ok) {
          console.log("[v0] Analysis pipeline started successfully")
        }
      }
    } catch (error) {
      console.error("[v0] Upload error:", error)
      setUploadProgress(0)
      alert(`Upload failed: ${error.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Sample Information</CardTitle>
          <CardDescription>Enter metadata for your eDNA sample</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sample-id">Sample ID *</Label>
              <Input id="sample-id" placeholder="CMLRE-2024-001" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="researcher">Researcher *</Label>
              <Input id="researcher" placeholder="Dr. Marine Biologist" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Sampling Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="location" placeholder="15.2°N, 68.4°E - Arabian Sea" className="pl-10" required />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="depth">Depth (meters) *</Label>
              <Input id="depth" type="number" placeholder="2450" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collection-date">Collection Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="collection-date" type="date" className="pl-10" required />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sample-type">Sample Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select sample type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sediment">Sediment</SelectItem>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="biofilm">Biofilm</SelectItem>
                <SelectItem value="tissue">Tissue</SelectItem>
              </SelectContent>
            </Select>
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

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea id="notes" placeholder="Any additional information about the sample..." rows={3} />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Sequence Data Upload</CardTitle>
            <CardDescription>Upload FASTA or FASTQ files containing sequence data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sequence-files">Sequence Files *</Label>
              <Input
                id="sequence-files"
                type="file"
                multiple
                accept=".fasta,.fa,.fas,.fastq,.fq,.zip,.gz"
                onChange={handleFileSelect}
                required
              />
              <p className="text-xs text-muted-foreground">
                Supported formats: FASTA, FASTQ, ZIP, GZ (max 500MB per file)
              </p>
            </div>

            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Sequence Files</Label>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Badge variant="outline">{(file.size / 1024 / 1024).toFixed(1)} MB</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-start Analysis</Label>
                  <p className="text-xs text-muted-foreground">Automatically begin AI analysis after upload</p>
                </div>
                <Switch checked={autoAnalysis} onCheckedChange={setAutoAnalysis} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Quality Control</Label>
                  <p className="text-xs text-muted-foreground">Run quality checks on uploaded sequences</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Upload Progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {uploadProgress < 100 ? "Uploading files..." : "Upload completed successfully!"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Research Documents</CardTitle>
            <CardDescription>Upload analysis reports, research papers, and supporting documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="document-files">Research Documents</Label>
              <Input
                id="document-files"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.xls,.ppt,.pptx,.rtf,.odt"
                onChange={handleDocumentSelect}
              />
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, DOC, DOCX, TXT, CSV, XLSX, PPT, RTF, ODT (max 100MB per file)
              </p>
            </div>

            {selectedDocuments.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Documents</Label>
                <div className="space-y-2">
                  {selectedDocuments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Badge variant="secondary">{(file.size / 1024 / 1024).toFixed(1)} MB</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-sm text-blue-900 dark:text-blue-100 mb-1">Document Types</h4>
              <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Research papers and publications</li>
                <li>• Analysis reports and methodology</li>
                <li>• Field notes and observations</li>
                <li>• Supplementary data files</li>
                <li>• Images and microscopy data</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Summary</CardTitle>
            <CardDescription>Review your sample before uploading</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Sequence Files</span>
                <span className="font-medium">{selectedFiles.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Document Files</span>
                <span className="font-medium">{selectedDocuments.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Size</span>
                <span className="font-medium">
                  {selectedFiles.length > 0 || selectedDocuments.length > 0
                    ? `${(
                        [...selectedFiles, ...selectedDocuments].reduce((acc, file) => acc + file.size, 0) / 1024 / 1024
                      ).toFixed(1)} MB`
                    : "0 MB"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Auto Analysis</span>
                <span className="font-medium">{autoAnalysis ? "Enabled" : "Disabled"}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Processing</span>
                <span className="font-medium">2-4 hours</span>
              </div>
            </div>

            <Button
              className="w-full"
              onClick={handleUpload}
              disabled={
                isUploading || (selectedFiles.length === 0 && selectedDocuments.length === 0) || uploadProgress === 100
              }
            >
              {uploadProgress === 100 ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Upload Complete
                </>
              ) : isUploading ? (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Sample & Documents
                </>
              )}
            </Button>

            {uploadProgress === 100 && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Sample uploaded successfully! {autoAnalysis && "Analysis will begin shortly."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
