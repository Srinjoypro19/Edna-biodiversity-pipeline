"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, AlertCircle, Clock, Microscope } from "lucide-react"
import { SingleSampleUpload } from "./single-sample-upload"
import { BatchSampleUpload } from "./batch-sample-upload"
import { UploadHistory } from "./upload-history"

export function SampleUploadInterface() {
  const [activeUploads, setActiveUploads] = useState([
    {
      id: "upload-001",
      filename: "arabian_sea_sample_001.fasta",
      progress: 67,
      status: "uploading",
      size: "45.2 MB",
      startTime: "14:32",
    },
    {
      id: "upload-002",
      filename: "bay_of_bengal_batch.zip",
      progress: 100,
      status: "completed",
      size: "128.7 MB",
      startTime: "14:15",
    },
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sample Upload</h1>
          <p className="text-muted-foreground mt-1">Upload eDNA samples and sequence data for biodiversity analysis</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Upload Guidelines
          </Button>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Quick Upload
          </Button>
        </div>
      </div>

      {/* Upload Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Uploads</CardTitle>
            <Upload className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Currently uploading</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Uploads</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Successfully uploaded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Queue Length</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Waiting to process</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Microscope className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3 GB</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Uploads */}
      {activeUploads.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Uploads</CardTitle>
            <CardDescription>Currently uploading files and their progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeUploads.map((upload) => (
                <div key={upload.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {upload.status === "uploading" && <Upload className="w-4 h-4 text-blue-500" />}
                        {upload.status === "completed" && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {upload.status === "failed" && <AlertCircle className="w-4 h-4 text-red-500" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{upload.filename}</p>
                        <p className="text-xs text-muted-foreground">
                          {upload.size} • Started: {upload.startTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          upload.status === "completed"
                            ? "default"
                            : upload.status === "uploading"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {upload.status}
                      </Badge>
                      <span className="text-sm font-medium">{upload.progress}%</span>
                    </div>
                  </div>
                  <Progress value={upload.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Upload Interface */}
      <Tabs defaultValue="single" className="space-y-4">
        <TabsList>
          <TabsTrigger value="single">Single Sample</TabsTrigger>
          <TabsTrigger value="batch">Batch Upload</TabsTrigger>
          <TabsTrigger value="history">Upload History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="space-y-4">
          <SingleSampleUpload />
        </TabsContent>

        <TabsContent value="batch" className="space-y-4">
          <BatchSampleUpload />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <UploadHistory />
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Templates</CardTitle>
              <CardDescription>Download templates and guidelines for sample uploads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sample Metadata Template</CardTitle>
                    <CardDescription>CSV template for sample information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Required fields:</strong>
                      </p>
                      <ul className="text-muted-foreground text-xs space-y-1 ml-4">
                        <li>• sample_id (unique identifier)</li>
                        <li>• location (coordinates or description)</li>
                        <li>• depth (sampling depth in meters)</li>
                        <li>• collection_date (YYYY-MM-DD format)</li>
                        <li>• researcher_name</li>
                      </ul>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      Download CSV Template
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sequence Data Guidelines</CardTitle>
                    <CardDescription>Format requirements for sequence files</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Supported formats:</strong>
                      </p>
                      <ul className="text-muted-foreground text-xs space-y-1 ml-4">
                        <li>• FASTA (.fasta, .fa, .fas)</li>
                        <li>• FASTQ (.fastq, .fq)</li>
                        <li>• Compressed files (.zip, .gz)</li>
                        <li>• Maximum file size: 500MB</li>
                        <li>• Quality score threshold: &gt;20</li>
                      </ul>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      View Full Guidelines
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Batch Upload Template</CardTitle>
                    <CardDescription>Template for multiple sample uploads</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Batch structure:</strong>
                      </p>
                      <ul className="text-muted-foreground text-xs space-y-1 ml-4">
                        <li>• metadata.csv (sample information)</li>
                        <li>• sequences/ (folder with FASTA files)</li>
                        <li>• Each sequence file named as sample_id.fasta</li>
                        <li>• Maximum 100 samples per batch</li>
                      </ul>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      Download Batch Template
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quality Control Checklist</CardTitle>
                    <CardDescription>Pre-upload validation checklist</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Before uploading:</strong>
                      </p>
                      <ul className="text-muted-foreground text-xs space-y-1 ml-4">
                        <li>• Verify sample IDs are unique</li>
                        <li>• Check coordinate format (decimal degrees)</li>
                        <li>• Validate sequence quality scores</li>
                        <li>• Remove adapter sequences</li>
                        <li>• Compress large files</li>
                      </ul>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      View QC Guidelines
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Document Upload Guidelines</CardTitle>
                    <CardDescription>Supported document formats and best practices</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Supported formats:</strong>
                      </p>
                      <ul className="text-muted-foreground text-xs space-y-1 ml-4">
                        <li>• PDF (.pdf) - Research papers, reports</li>
                        <li>• Word (.doc, .docx) - Analysis documents</li>
                        <li>• Text (.txt) - Field notes, observations</li>
                        <li>• Excel (.xlsx, .xls) - Data tables</li>
                        <li>• PowerPoint (.ppt, .pptx) - Presentations</li>
                        <li>• Maximum file size: 100MB</li>
                      </ul>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      View Document Guidelines
                    </Button>
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
