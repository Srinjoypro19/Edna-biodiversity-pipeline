"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileText, CheckCircle, AlertCircle, Download, Eye } from "lucide-react"

export function BatchSampleUpload() {
  const [batchProgress, setBatchProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResults, setUploadResults] = useState<any[]>([])

  const sampleBatchData = [
    { id: "CMLRE-2024-001", location: "Arabian Sea", depth: "2,450m", status: "ready", fileSize: "12.3 MB" },
    { id: "CMLRE-2024-002", location: "Bay of Bengal", depth: "1,850m", status: "ready", fileSize: "8.7 MB" },
    { id: "CMLRE-2024-003", location: "Indian Ocean", depth: "3,200m", status: "error", fileSize: "15.1 MB" },
    { id: "CMLRE-2024-004", location: "Laccadive Sea", depth: "1,200m", status: "ready", fileSize: "9.4 MB" },
    { id: "CMLRE-2024-005", location: "Arabian Sea", depth: "2,800m", status: "ready", fileSize: "11.8 MB" },
  ]

  const handleBatchUpload = () => {
    setIsUploading(true)
    // Simulate batch upload progress
    const interval = setInterval(() => {
      setBatchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadResults([
            { id: "CMLRE-2024-001", status: "success", message: "Upload successful" },
            { id: "CMLRE-2024-002", status: "success", message: "Upload successful" },
            { id: "CMLRE-2024-003", status: "error", message: "Invalid sequence format" },
            { id: "CMLRE-2024-004", status: "success", message: "Upload successful" },
            { id: "CMLRE-2024-005", status: "success", message: "Upload successful" },
          ])
          return 100
        }
        return prev + 20
      })
    }, 800)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Batch Upload</CardTitle>
            <CardDescription>Upload multiple samples with metadata and sequence files</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metadata-file">Metadata File (CSV) *</Label>
              <Input id="metadata-file" type="file" accept=".csv" required />
              <p className="text-xs text-muted-foreground">
                CSV file containing sample information (sample_id, location, depth, etc.)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sequence-archive">Sequence Archive *</Label>
              <Input id="sequence-archive" type="file" accept=".zip,.tar.gz" required />
              <p className="text-xs text-muted-foreground">
                ZIP or TAR.GZ archive containing FASTA/FASTQ files named by sample_id
              </p>
            </div>

            <div className="space-y-2">
              <Label>Upload Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="validate-batch" className="rounded" defaultChecked />
                  <Label htmlFor="validate-batch" className="text-sm">
                    Validate files before upload
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="auto-analysis-batch" className="rounded" defaultChecked />
                  <Label htmlFor="auto-analysis-batch" className="text-sm">
                    Auto-start analysis for valid samples
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="skip-errors" className="rounded" />
                  <Label htmlFor="skip-errors" className="text-sm">
                    Skip samples with errors
                  </Label>
                </div>
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Batch Upload Progress</span>
                  <span>{batchProgress}%</span>
                </div>
                <Progress value={batchProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Processing {Math.ceil(batchProgress / 20)} of 5 samples...
                </p>
              </div>
            )}

            <Button className="w-full" onClick={handleBatchUpload} disabled={isUploading}>
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "Uploading Batch..." : "Upload Batch"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Batch Templates</CardTitle>
            <CardDescription>Download templates and examples for batch uploads</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download Metadata Template
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <FileText className="w-4 h-4 mr-2" />
              View Batch Structure Guide
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <Eye className="w-4 h-4 mr-2" />
              Example Batch Files
            </Button>

            <div className="mt-4 p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm mb-2">Batch Structure</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>📁 batch_upload.zip</div>
                <div className="ml-4">📄 metadata.csv</div>
                <div className="ml-4">📁 sequences/</div>
                <div className="ml-8">📄 CMLRE-2024-001.fasta</div>
                <div className="ml-8">📄 CMLRE-2024-002.fasta</div>
                <div className="ml-8">📄 ...</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Batch Preview/Results */}
      <Card>
        <CardHeader>
          <CardTitle>{uploadResults.length > 0 ? "Upload Results" : "Batch Preview"}</CardTitle>
          <CardDescription>
            {uploadResults.length > 0
              ? "Results from the batch upload operation"
              : "Preview of samples detected in the batch"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sample ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Depth</TableHead>
                <TableHead>File Size</TableHead>
                <TableHead>Status</TableHead>
                {uploadResults.length > 0 && <TableHead>Message</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleBatchData.map((sample, index) => {
                const result = uploadResults.find((r) => r.id === sample.id)
                return (
                  <TableRow key={sample.id}>
                    <TableCell className="font-medium">{sample.id}</TableCell>
                    <TableCell>{sample.location}</TableCell>
                    <TableCell>{sample.depth}</TableCell>
                    <TableCell>{sample.fileSize}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          result?.status === "success"
                            ? "default"
                            : result?.status === "error"
                              ? "destructive"
                              : sample.status === "error"
                                ? "destructive"
                                : "secondary"
                        }
                      >
                        {result?.status === "success" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {(result?.status === "error" || sample.status === "error") && (
                          <AlertCircle className="w-3 h-3 mr-1" />
                        )}
                        {result?.status || sample.status}
                      </Badge>
                    </TableCell>
                    {uploadResults.length > 0 && (
                      <TableCell className="text-sm text-muted-foreground">{result?.message || "No message"}</TableCell>
                    )}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
