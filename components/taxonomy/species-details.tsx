"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, ExternalLink, Download, Microscope } from "lucide-react"

interface SpeciesDetailsProps {
  species: any
}

export function SpeciesDetails({ species }: SpeciesDetailsProps) {
  if (!species) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center text-slate-500">
            <Info className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Species Selected</h3>
            <p>Select a species from the taxonomy tree to view detailed information</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const mockSpeciesData = {
    scientificName: "Gadus morhua",
    commonName: "Atlantic Cod",
    taxonomicRank: "Species",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Actinopterygii",
    order: "Gadiformes",
    family: "Gadidae",
    genus: "Gadus",
    description:
      "The Atlantic cod is a benthopelagic fish of the family Gadidae, widely consumed by humans. It is also commercially known as cod or codling.",
    habitat: "Cold waters of the North Atlantic Ocean",
    distribution: "North Atlantic, from Greenland to North Carolina",
    conservationStatus: "Vulnerable",
    samples: 45,
    sequences: 127,
    lastUpdated: "2024-01-15",
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl italic">{mockSpeciesData.scientificName}</CardTitle>
              <p className="text-lg text-slate-600 mt-1">{mockSpeciesData.commonName}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                NCBI
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-cyan-600">{mockSpeciesData.samples}</div>
              <div className="text-sm text-slate-600">Samples</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{mockSpeciesData.sequences}</div>
              <div className="text-sm text-slate-600">Sequences</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <Badge className="bg-orange-100 text-orange-800">{mockSpeciesData.conservationStatus}</Badge>
              <div className="text-sm text-slate-600 mt-1">Status</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-sm font-medium">{mockSpeciesData.lastUpdated}</div>
              <div className="text-sm text-slate-600">Last Updated</div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="taxonomy">Taxonomy</TabsTrigger>
              <TabsTrigger value="ecology">Ecology</TabsTrigger>
              <TabsTrigger value="samples">Samples</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-slate-700">{mockSpeciesData.description}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Habitat</h4>
                <p className="text-slate-700">{mockSpeciesData.habitat}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Distribution</h4>
                <p className="text-slate-700">{mockSpeciesData.distribution}</p>
              </div>
            </TabsContent>

            <TabsContent value="taxonomy" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries({
                  Kingdom: mockSpeciesData.kingdom,
                  Phylum: mockSpeciesData.phylum,
                  Class: mockSpeciesData.class,
                  Order: mockSpeciesData.order,
                  Family: mockSpeciesData.family,
                  Genus: mockSpeciesData.genus,
                }).map(([rank, name]) => (
                  <div key={rank} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium text-slate-600">{rank}</span>
                    <span className="text-slate-900">{name}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ecology" className="space-y-4">
              <div className="text-center py-8 text-slate-500">
                <Microscope className="h-12 w-12 mx-auto mb-4" />
                <p>Ecological data and environmental preferences</p>
                <p className="text-sm">Temperature, depth, salinity requirements</p>
              </div>
            </TabsContent>

            <TabsContent value="samples" className="space-y-4">
              <div className="text-center py-8 text-slate-500">
                <Info className="h-12 w-12 mx-auto mb-4" />
                <p>Sample collection data and analysis results</p>
                <p className="text-sm">Geographic locations and temporal distribution</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
