"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Database, Search, Download, Settings, Table, Filter, RefreshCw, HardDrive, Activity } from "lucide-react"
import { DatabaseQuery } from "./database-query"
import { DatabaseSchema } from "./database-schema"
import { DataImportExport } from "./data-import-export"

export function DatabaseInterface() {
  const [selectedTable, setSelectedTable] = useState("samples")
  const [queryResult, setQueryResult] = useState(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Database Management</h1>
          <p className="text-muted-foreground mt-1">Manage marine biodiversity research data and taxonomy</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Database Settings
          </Button>
          <Button>
            <Database className="w-4 h-4 mr-2" />
            New Query
          </Button>
        </div>
      </div>

      {/* Database Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <Database className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847,392</div>
            <p className="text-xs text-muted-foreground">Across all tables</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Species Records</CardTitle>
            <Table className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,672</div>
            <p className="text-xs text-muted-foreground">Unique species entries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847 GB</div>
            <p className="text-xs text-muted-foreground">67% of total capacity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Current database sessions</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Database Interface */}
      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Browse Data</TabsTrigger>
          <TabsTrigger value="query">SQL Query</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="import-export">Import/Export</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Database Tables</CardTitle>
                <CardDescription>Select a table to browse its data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { name: "samples", count: "2,847", description: "eDNA sample records" },
                  { name: "species", count: "45,672", description: "Species identification data" },
                  { name: "taxonomy", count: "128,394", description: "Taxonomic hierarchy" },
                  { name: "sequences", count: "2,456,789", description: "DNA sequence data" },
                  { name: "analyses", count: "8,234", description: "Analysis results" },
                  { name: "locations", count: "1,247", description: "Sampling locations" },
                  { name: "researchers", count: "156", description: "User accounts" },
                ].map((table) => (
                  <div
                    key={table.name}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedTable === table.name ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                    }`}
                    onClick={() => setSelectedTable(table.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{table.name}</p>
                        <p className="text-xs opacity-80">{table.description}</p>
                      </div>
                      <Badge variant="outline">{table.count}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Table: {selectedTable}</CardTitle>
                    <CardDescription>Browse and filter table data</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Filter className="w-3 h-3 mr-1" />
                      Filter
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline">
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input placeholder="Search records..." className="flex-1" />
                    <Button size="sm">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>

                  {selectedTable === "samples" && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-6 gap-2 text-xs font-medium text-muted-foreground border-b pb-2">
                        <div>Sample ID</div>
                        <div>Location</div>
                        <div>Depth</div>
                        <div>Date</div>
                        <div>Status</div>
                        <div>Species</div>
                      </div>
                      {[
                        {
                          id: "CMLRE-2024-001",
                          location: "Arabian Sea",
                          depth: "2,450m",
                          date: "2024-01-15",
                          status: "Completed",
                          species: 23,
                        },
                        {
                          id: "CMLRE-2024-002",
                          location: "Bay of Bengal",
                          depth: "1,850m",
                          date: "2024-01-14",
                          status: "Processing",
                          species: 0,
                        },
                        {
                          id: "CMLRE-2024-003",
                          location: "Indian Ocean",
                          depth: "3,200m",
                          date: "2024-01-13",
                          status: "Completed",
                          species: 31,
                        },
                        {
                          id: "CMLRE-2024-004",
                          location: "Laccadive Sea",
                          depth: "1,200m",
                          date: "2024-01-12",
                          status: "Failed",
                          species: 0,
                        },
                        {
                          id: "CMLRE-2024-005",
                          location: "Arabian Sea",
                          depth: "2,800m",
                          date: "2024-01-11",
                          status: "Completed",
                          species: 18,
                        },
                      ].map((row, index) => (
                        <div key={index} className="grid grid-cols-6 gap-2 text-sm py-2 border-b border-border/50">
                          <div className="font-medium">{row.id}</div>
                          <div>{row.location}</div>
                          <div>{row.depth}</div>
                          <div>{row.date}</div>
                          <div>
                            <Badge
                              variant={
                                row.status === "Completed"
                                  ? "default"
                                  : row.status === "Processing"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {row.status}
                            </Badge>
                          </div>
                          <div>{row.species > 0 ? row.species : "-"}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedTable === "species" && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-5 gap-2 text-xs font-medium text-muted-foreground border-b pb-2">
                        <div>Species Name</div>
                        <div>Taxonomy</div>
                        <div>Confidence</div>
                        <div>Samples</div>
                        <div>Status</div>
                      </div>
                      {[
                        {
                          name: "Bathymodiolus thermophilus",
                          taxonomy: "Mollusca > Bivalvia",
                          confidence: 98.2,
                          samples: 15,
                          status: "Verified",
                        },
                        {
                          name: "Alvinella pompejana",
                          taxonomy: "Annelida > Polychaeta",
                          confidence: 95.7,
                          samples: 8,
                          status: "Verified",
                        },
                        {
                          name: "Unknown Cnidarian sp. 1",
                          taxonomy: "Cnidaria > Unknown",
                          confidence: 87.3,
                          samples: 3,
                          status: "Novel",
                        },
                        {
                          name: "Riftia pachyptila",
                          taxonomy: "Annelida > Siboglinidae",
                          confidence: 97.1,
                          samples: 12,
                          status: "Verified",
                        },
                        {
                          name: "Calyptogena magnifica",
                          taxonomy: "Mollusca > Bivalvia",
                          confidence: 94.8,
                          samples: 9,
                          status: "Verified",
                        },
                      ].map((row, index) => (
                        <div key={index} className="grid grid-cols-5 gap-2 text-sm py-2 border-b border-border/50">
                          <div className="font-medium">{row.name}</div>
                          <div className="text-muted-foreground">{row.taxonomy}</div>
                          <div>{row.confidence}%</div>
                          <div>{row.samples}</div>
                          <div>
                            <Badge variant={row.status === "Verified" ? "default" : "secondary"}>{row.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="query" className="space-y-4">
          <DatabaseQuery />
        </TabsContent>

        <TabsContent value="schema" className="space-y-4">
          <DatabaseSchema />
        </TabsContent>

        <TabsContent value="import-export" className="space-y-4">
          <DataImportExport />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Database Performance</CardTitle>
                <CardDescription>Query performance and usage statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Query Time</span>
                    <span className="font-medium">245ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Queries per Hour</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cache Hit Rate</span>
                    <span className="font-medium">87.3%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Active Connections</span>
                    <span className="font-medium">23/100</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Growth</CardTitle>
                <CardDescription>Database size and growth trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Size</span>
                    <span className="font-medium">847 GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Monthly Growth</span>
                    <span className="font-medium">+23.4 GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Largest Table</span>
                    <span className="font-medium">sequences (623 GB)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Backup Size</span>
                    <span className="font-medium">234 GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Database access and user statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Users</span>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Users</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Admin Users</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Last Login</span>
                    <span className="font-medium">2 minutes ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Quality</CardTitle>
                <CardDescription>Data integrity and quality metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Data Completeness</span>
                    <span className="font-medium">94.7%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duplicate Records</span>
                    <span className="font-medium">0.3%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Validation Errors</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Last Cleanup</span>
                    <span className="font-medium">3 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
