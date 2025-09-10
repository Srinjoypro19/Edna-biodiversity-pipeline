import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const limit = Number.parseInt(searchParams.get("limit") || "20")

  try {
    if (query) {
      // Search taxonomy database
      const results = await searchTaxonomy(query, limit)
      return NextResponse.json(results)
    } else {
      // Get taxonomy hierarchy
      const hierarchy = await getTaxonomyHierarchy()
      return NextResponse.json(hierarchy)
    }
  } catch (error) {
    console.error("Taxonomy API error:", error)
    return NextResponse.json({ error: "Failed to fetch taxonomy data" }, { status: 500 })
  }
}

async function searchTaxonomy(query: string, limit: number) {
  // Mock taxonomy search results
  const mockResults = [
    {
      id: "1",
      scientificName: "Gadus morhua",
      commonName: "Atlantic Cod",
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Gadiformes",
      family: "Gadidae",
      genus: "Gadus",
      species: "Gadus morhua",
      conservationStatus: "Vulnerable",
      sampleCount: 45,
    },
    {
      id: "2",
      scientificName: "Calanus finmarchicus",
      commonName: "Copepod",
      kingdom: "Animalia",
      phylum: "Arthropoda",
      class: "Copepoda",
      order: "Calanoida",
      family: "Calanidae",
      genus: "Calanus",
      species: "Calanus finmarchicus",
      conservationStatus: "Least Concern",
      sampleCount: 156,
    },
  ]
    .filter(
      (species) =>
        species.scientificName.toLowerCase().includes(query.toLowerCase()) ||
        species.commonName.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, limit)

  return {
    query,
    results: mockResults,
    totalCount: mockResults.length,
  }
}

async function getTaxonomyHierarchy() {
  // Mock taxonomy hierarchy
  return {
    kingdoms: [
      {
        name: "Animalia",
        phyla: [
          {
            name: "Chordata",
            classes: ["Actinopterygii", "Mammalia", "Aves"],
            speciesCount: 2341,
          },
          {
            name: "Arthropoda",
            classes: ["Copepoda", "Malacostraca", "Insecta"],
            speciesCount: 3245,
          },
          {
            name: "Mollusca",
            classes: ["Bivalvia", "Gastropoda", "Cephalopoda"],
            speciesCount: 1876,
          },
        ],
        totalSpecies: 8456,
      },
      {
        name: "Plantae",
        phyla: [
          {
            name: "Rhodophyta",
            classes: ["Florideophyceae", "Bangiophyceae"],
            speciesCount: 876,
          },
        ],
        totalSpecies: 2341,
      },
    ],
    totalSpecies: 12847,
    lastUpdated: "2024-01-15T10:30:00Z",
  }
}
