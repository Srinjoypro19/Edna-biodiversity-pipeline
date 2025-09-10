"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Download, Eye, BarChart3, Microscope, Share, CheckCircle, TrendingUp } from "lucide-react"

const completedAnalyses = [
  {
    id: "CMLRE-2024-001",
    name: "Arabian Sea Biodiversity Analysis",
    completedAt: "2024-01-15 16:45",
    duration: "2h 52m",
    status: "completed",
    speciesFound: 23,
    confidence: 94.2,
    novelSpecies: 2,
    location: "15.2°N, 68.4°E",
    depth: "2,450m",
  },
  {
    id: "CMLRE-2024-003",
    name: "Indian Ocean Community Structure",
    completedAt: "2024-01-13 14:22",
    duration: "3h 15m",
    status: "completed",
    speciesFound: 31,
    confidence: 91.7,
    novelSpecies: 1,
    location: "12.5°N, 75.8°E",
    depth: "3,200m",
  },
  {
    id: "CMLRE-2024-005",
    name: "Laccadive Sea Analysis",
    completedAt: "2024-01-11 12:30",
    duration: "2h 18m",
    status: "completed",
    speciesFound: 18,
    confidence: 89.3,
    novelSpecies: 0,
    location: "10.8°N, 72.1°E",
    depth: "1,200m",
  },
]

export function PipelineResults() {
  return (
    <div className="space-y-6">
      {/* Results Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Analyses</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Species Identified</CardTitle>
            <Microscope className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novel Species</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Potential new discoveries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.1%</div>
            <p className="text-xs text-muted-foreground">Classification accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Analysis Results</CardTitle>
          <CardDescription>Completed biodiversity analyses and their outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Analysis</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Species</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Novel</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedAnalyses.map((analysis) => (
                <TableRow key={analysis.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{analysis.id}</p>
                      <p className="text-xs text-muted-foreground">{analysis.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{analysis.location}</p>
                      <p className="text-xs text-muted-foreground">Depth: {analysis.depth}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{analysis.completedAt}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{analysis.duration}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Microscope className="w-3 h-3 text-muted-foreground" />
                      <span className="font-medium">{analysis.speciesFound}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{analysis.confidence}%</span>
                      </div>
                      <Progress value={analysis.confidence} className="h-1 w-16" />
                    </div>
                  </TableCell>
                  <TableCell>
                    {analysis.novelSpecies > 0 ? (
                      <Badge variant="secondary">{analysis.novelSpecies} new</Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detailed Results View */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis Details: CMLRE-2024-001</CardTitle>
          <CardDescription>Detailed results from Arabian Sea biodiversity analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary" className="w-full">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="species">Species List</TabsTrigger>
              <TabsTrigger value="diversity">Diversity Metrics</TabsTrigger>
              <TabsTrigger value="novel">Novel Findings</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Analysis Overview</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Sequences Processed</span>
                      <span className="font-medium">45,672</span>
                    </div>
                    <div className="flex justify-between">
                      <span>High Quality Sequences</span>
                      <span className="font-medium">42,891 (94.1%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Successfully Classified</span>
                      <span className="font-medium">40,456 (94.3%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unique Species</span>
                      <span className="font-medium">23</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Taxonomic Distribution</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Cnidarians</span>
                        <span>8 species (35%)</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Mollusks</span>
                        <span>6 species (26%)</span>
                      </div>
                      <Progress value={26} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Arthropods</span>
                        <span>5 species (22%)</span>
                      </div>
                      <Progress value={22} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Others</span>
                        <span>4 species (17%)</span>
                      </div>
                      <Progress value={17} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="species" className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Identified Species</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {[
                    { name: "Bathymodiolus thermophilus", confidence: 98.2, abundance: "High", status: "Known" },
                    { name: "Alvinella pompejana", confidence: 95.7, abundance: "Medium", status: "Known" },
                    { name: "Riftia pachyptila", confidence: 97.1, abundance: "Low", status: "Known" },
                    { name: "Unknown Cnidarian sp. 1", confidence: 87.3, abundance: "Medium", status: "Novel" },
                    { name: "Calyptogena magnifica", confidence: 94.8, abundance: "High", status: "Known" },
                    { name: "Unknown Polychaete sp. 1", confidence: 82.1, abundance: "Low", status: "Novel" },
                  ].map((species, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div>
                        <p className="text-sm font-medium">{species.name}</p>
                        <p className="text-xs text-muted-foreground">Abundance: {species.abundance}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">{species.confidence}%</span>
                        <Badge variant={species.status === "Novel" ? "secondary" : "outline"}>{species.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="diversity" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Diversity Indices</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Shannon Diversity (H')</span>
                      <span className="font-medium">2.847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Simpson Diversity (D)</span>
                      <span className="font-medium">0.923</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Species Richness (S)</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Evenness (J')</span>
                      <span className="font-medium">0.678</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Community Structure</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Dominant Species</span>
                      <span className="font-medium">B. thermophilus</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rare Species (&lt;1%)</span>
                      <span className="font-medium">7 species</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Endemic Potential</span>
                      <span className="font-medium">2 species</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="novel" className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium">Potential Novel Species</h4>
                <div className="space-y-3">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h5 className="font-medium">Unknown Cnidarian sp. 1</h5>
                          <p className="text-sm text-muted-foreground">
                            Closest match: Actinia equina (72.3% similarity)
                          </p>
                          <div className="flex gap-2">
                            <Badge variant="secondary">Novel</Badge>
                            <Badge variant="outline">High Priority</Badge>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <p className="font-medium">87.3%</p>
                          <p className="text-muted-foreground">Confidence</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h5 className="font-medium">Unknown Polychaete sp. 1</h5>
                          <p className="text-sm text-muted-foreground">
                            Closest match: Nereis diversicolor (68.9% similarity)
                          </p>
                          <div className="flex gap-2">
                            <Badge variant="secondary">Novel</Badge>
                            <Badge variant="outline">Medium Priority</Badge>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <p className="font-medium">82.1%</p>
                          <p className="text-muted-foreground">Confidence</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
