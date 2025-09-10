"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Download, RefreshCw, Search, CheckCircle, AlertCircle, Clock } from "lucide-react"

const uploadHistory = [
  {
    id: "upload-001",
    filename: "arabian_sea_samples.zip",
    type: "batch",
    samples: 15,
    uploadDate: "2024-01-15 14:30",
    status: "completed",
    size: "234.5 MB",
    researcher: "Dr. Marine Biologist",
  },
  {
    id: "upload-002",
    filename: "CMLRE-2024-001.fasta",
    type: "single",
    samples: 1,
    uploadDate: "2024-01-14 16:45",
    status: "completed",
    size: "12.3 MB",
    researcher: "Dr. Ocean Explorer",
  },
  {
    id: "upload-003",
    filename: "bay_of_bengal_batch.zip",
    type: "batch",
    samples: 8,
    uploadDate: "2024-01-14 09:15",
    status: "failed",
    size: "156.7 MB",
    researcher: "Dr. Marine Biologist",
  },
  {
    id: "upload-004",
    filename: "indian_ocean_sample.fasta",
    type: "single",
    samples: 1,
    uploadDate: "2024-01-13 11:20",
    status: "processing",
    size: "8.9 MB",
    researcher: "Dr. Deep Sea Researcher",
  },
  {
    id: "upload-005",
    filename: "laccadive_sea_samples.zip",
    type: "batch",
    samples: 12,
    uploadDate: "2024-01-12 13:45",
    status: "completed",
    size: "189.2 MB",
    researcher: "Dr. Marine Biologist",
  },
  {
    id: "upload-006",
    filename: "CMLRE-2024-002.fastq",
    type: "single",
    samples: 1,
    uploadDate: "2024-01-11 15:30",
    status: "completed",
    size: "15.6 MB",
    researcher: "Dr. Ocean Explorer",
  },
]

export function UploadHistory() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Upload History</CardTitle>
          <CardDescription>View and manage your previous sample uploads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Input placeholder="Search uploads..." className="w-full" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-types">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="batch">Batch</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Search className="w-4 h-4" />
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Upload</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Samples</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Researcher</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uploadHistory.map((upload) => (
                <TableRow key={upload.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{upload.filename}</p>
                      <p className="text-xs text-muted-foreground">{upload.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{upload.type}</Badge>
                  </TableCell>
                  <TableCell>{upload.samples}</TableCell>
                  <TableCell className="text-sm">{upload.uploadDate}</TableCell>
                  <TableCell className="text-sm">{upload.size}</TableCell>
                  <TableCell className="text-sm">{upload.researcher}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        upload.status === "completed"
                          ? "default"
                          : upload.status === "processing"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {upload.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {upload.status === "processing" && <RefreshCw className="w-3 h-3 mr-1 animate-spin" />}
                      {upload.status === "failed" && <AlertCircle className="w-3 h-3 mr-1" />}
                      {upload.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="w-3 h-3" />
                      </Button>
                      {upload.status === "failed" && (
                        <Button size="sm" variant="ghost">
                          <RefreshCw className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upload Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.7%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Uploaded</CardTitle>
            <Download className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.3 GB</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">Per sample</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
