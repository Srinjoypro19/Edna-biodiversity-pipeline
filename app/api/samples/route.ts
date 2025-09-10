import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const sampleData = await request.json()

    // Validate required fields
    const requiredFields = ["sampleId", "collectionDate", "location"]
    for (const field of requiredFields) {
      if (!sampleData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Store sample data (simulate database storage)
    const storedSample = await storeSample(sampleData)

    return NextResponse.json({
      success: true,
      sample: storedSample,
      message: "Sample uploaded successfully",
    })
  } catch (error) {
    console.error("Sample upload error:", error)
    return NextResponse.json({ error: "Failed to upload sample" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const status = searchParams.get("status")

  try {
    const samples = await getSamples(page, limit, status)
    return NextResponse.json(samples)
  } catch (error) {
    console.error("Get samples error:", error)
    return NextResponse.json({ error: "Failed to fetch samples" }, { status: 500 })
  }
}

async function storeSample(sampleData: any) {
  // Simulate storing sample in database
  const sample = {
    id: `SAMPLE_${Date.now()}`,
    ...sampleData,
    status: "uploaded",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return sample
}

async function getSamples(page: number, limit: number, status?: string) {
  // Mock sample data
  const mockSamples = [
    {
      id: "SAMPLE_001",
      sampleId: "NS_2024_001",
      collectionDate: "2024-01-15",
      location: { name: "North Sea Station A", lat: 56.0, lng: 3.0 },
      depth: 25,
      temperature: 8.5,
      salinity: 34.2,
      researcher: "Dr. Marine Biologist",
      status: "analyzed",
      sequenceCount: 234,
      speciesIdentified: 12,
    },
    {
      id: "SAMPLE_002",
      sampleId: "BS_2024_002",
      collectionDate: "2024-01-16",
      location: { name: "Baltic Sea Station B", lat: 58.0, lng: 20.0 },
      depth: 15,
      temperature: 6.2,
      salinity: 30.8,
      researcher: "Dr. Ocean Explorer",
      status: "processing",
      sequenceCount: 189,
      speciesIdentified: 8,
    },
  ]

  const filteredSamples = status ? mockSamples.filter((s) => s.status === status) : mockSamples

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedSamples = filteredSamples.slice(startIndex, endIndex)

  return {
    samples: paginatedSamples,
    pagination: {
      page,
      limit,
      total: filteredSamples.length,
      totalPages: Math.ceil(filteredSamples.length / limit),
    },
  }
}
