"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TreePine } from "lucide-react"
import { TaxonomyTree } from "./taxonomy-tree"
import { SpeciesDetails } from "./species-details"
import { DistributionMap } from "./distribution-map"

export function TaxonomyInterface() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecies, setSelectedSpecies] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("browse")

  const recentSearches = ["Calanus finmarchicus", "Gadus morhua", "Mytilus edulis", "Fucus vesiculosus"]

  const taxonomicStats = [
    { label: "Total Species", value: "12,847", change: "+234" },
    { label: "Phyla", value: "47", change: "+2" },
    { label: "Classes", value: "312", change: "+8" },
    { label: "Families", value: "2,156", change: "+45" },
  ]

  return (
    <div className="space-y-6">
      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-cyan-600" />
              Species Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search by scientific name, common name, or taxonomy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-cyan-600 hover:bg-cyan-700">Search</Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Recent Searches:</p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-cyan-100"
                    onClick={() => setSearchQuery(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Database Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {taxonomicStats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-slate-600">{stat.label}</span>
                <div className="text-right">
                  <div className="font-semibold">{stat.value}</div>
                  <div className="text-xs text-green-600">{stat.change}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse Taxonomy</TabsTrigger>
          <TabsTrigger value="species">Species Details</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="relationships">Relationships</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <TaxonomyTree onSpeciesSelect={setSelectedSpecies} />
        </TabsContent>

        <TabsContent value="species" className="space-y-6">
          <SpeciesDetails species={selectedSpecies} />
        </TabsContent>

        <TabsContent value="distribution" className="space-y-6">
          <DistributionMap species={selectedSpecies} />
        </TabsContent>

        <TabsContent value="relationships" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Phylogenetic Relationships</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-slate-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <TreePine className="h-12 w-12 mx-auto mb-2" />
                  <p>Phylogenetic tree visualization</p>
                  <p className="text-sm">Select a species to view relationships</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
