"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Download, FileText, CheckCircle, AlertCircle, Clock } from "lucide-react"

export function DataImportExport() {
  const [importProgress, setImportProgress] = useState(0)
  const [isImporting, setIsImporting] = useState(false)

  const recentImports = [
    { id: "import-001", file: "cmlre_samples_2024.csv", status: "completed", records: 1247, date: "2024-01-15 14:30" },
    { id: "import-002", file: "taxonomy_update.json", status: "completed", records: 856, date: "2024-01-14 09:15" },
    { id: "import-003", file: "sequence_data.fasta", status: "failed", records: 0, date: "2024-01-13 16:45" },
    {
      id: "import-004",
      file: "species_verification.csv",
      status: "processing",
      records: 423,
      date: "2024-01-13 11:20",
    },
  ]

  const exportTemplates = [
    { name: "Sample Data Export", description: "Export sample collection records", tables: ["samples", "locations"] },
    {
      name: "Species Analysis Export",
      description: "Export species identification results",
      tables: ["species", "taxonomy"],
    },
    { name: "Complete Database Export", description: "Full database backup", tables: ["all"] },
    {
      name: "Research Report Export",
      description: "Formatted data for research publications",
      tables: ["samples", "species", "analyses"],
    },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="import" className="space-y-4">
        <TabsList>
          <TabsTrigger value="import">Import Data</TabsTrigger>
          <TabsTrigger value="export">Export Data</TabsTrigger>
          <TabsTrigger value="history">Import History</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Import Data</CardTitle>
                <CardDescription>Upload and import research data into the database</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="import-type">Import Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select data type to import" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="samples">Sample Data (CSV)</SelectItem>
                      <SelectItem value="species">Species Data (CSV/JSON)</SelectItem>
                      <SelectItem value="sequences">Sequence Data (FASTA)</SelectItem>
                      <SelectItem value="taxonomy">Taxonomy Data (JSON)</SelectItem>
                      <SelectItem value="analyses">Analysis Results (JSON)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-upload">Select File</Label>
                  <Input id="file-upload" type="file" accept=".csv,.json,.fasta,.txt" />
                </div>

                <div className="space-y-2">
                  <Label>Import Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="validate-data" className="rounded" />
                      <Label htmlFor="validate-data" className="text-sm">
                        Validate data before import
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="skip-duplicates" className="rounded" />
                      <Label htmlFor="skip-duplicates" className="text-sm">
                        Skip duplicate records
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="create-backup" className="rounded" defaultChecked />
                      <Label htmlFor="create-backup" className="text-sm">
                        Create backup before import
                      </Label>
                    </div>
                  </div>
                </div>

                <Button className="w-full" disabled={isImporting}>
                  <Upload className="w-4 h-4 mr-2" />
                  {isImporting ? "Importing..." : "Start Import"}
                </Button>

                {isImporting && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Import Progress</span>
                      <span>{importProgress}%</span>
                    </div>
                    <Progress value={importProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground">Processing records...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Import Guidelines</CardTitle>
                <CardDescription>Data format requirements and best practices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm">Sample Data (CSV)</h4>
                    <p className="text-xs text-muted-foreground">
                      Required columns: sample_id, location, depth, collection_date
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Species Data (CSV/JSON)</h4>
                    <p className="text-xs text-muted-foreground">
                      Required fields: sample_id, species_name, confidence
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Sequence Data (FASTA)</h4>
                    <p className="text-xs text-muted-foreground">Standard FASTA format with sequence headers</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">File Size Limits</h4>
                    <p className="text-xs text-muted-foreground">Maximum 500MB per file, 10,000 records per batch</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <FileText className="w-3 h-3 mr-1" />
                    Download Sample Template
                  </Button>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <FileText className="w-3 h-3 mr-1" />
                    View Import Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Export Templates</CardTitle>
                <CardDescription>Pre-configured export formats for common use cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {exportTemplates.map((template, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{template.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                        <div className="flex gap-1 mt-2">
                          {template.tables.map((table, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {table}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Export</CardTitle>
                <CardDescription>Create a custom data export</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Tables</Label>
                  <div className="space-y-2">
                    {["samples", "species", "taxonomy", "sequences", "analyses"].map((table) => (
                      <div key={table} className="flex items-center space-x-2">
                        <input type="checkbox" id={`export-${table}`} className="rounded" />
                        <Label htmlFor={`export-${table}`} className="text-sm">
                          {table}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="export-format">Export Format</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="excel">Excel (XLSX)</SelectItem>
                      <SelectItem value="sql">SQL Dump</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-range">Date Range (Optional)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" placeholder="From" />
                    <Input type="date" placeholder="To" />
                  </div>
                </div>

                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Create Export
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import History</CardTitle>
              <CardDescription>Recent data import operations and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentImports.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {item.status === "completed" && <CheckCircle className="w-5 h-5 text-green-500" />}
                        {item.status === "failed" && <AlertCircle className="w-5 h-5 text-red-500" />}
                        {item.status === "processing" && <Clock className="w-5 h-5 text-yellow-500" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.file}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.records > 0 ? `${item.records} records` : "No records"} • {item.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          item.status === "completed"
                            ? "default"
                            : item.status === "failed"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {item.status}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <FileText className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
