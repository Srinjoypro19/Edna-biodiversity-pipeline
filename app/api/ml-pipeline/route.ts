import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { sampleId, sequenceFiles, documentFiles, analysisType } = await request.json()

    if (!sampleId) {
      return NextResponse.json({ error: "Sample ID is required" }, { status: 400 })
    }

    // Generate unique run ID
    const runId = `ML_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    console.log(`[v0] Starting ML pipeline for sample ${sampleId} with run ID ${runId}`)

    let documentAnalysisResults = null
    if (documentFiles && documentFiles.length > 0) {
      console.log(`[v0] Processing ${documentFiles.length} documents`)
      documentAnalysisResults = await processDocuments(documentFiles)
    }

    // Process sequence files if available
    let sequenceAnalysisResults = null
    if (sequenceFiles && sequenceFiles.length > 0) {
      console.log(`[v0] Processing ${sequenceFiles.length} sequence files`)
      sequenceAnalysisResults = await processSequenceFiles(sequenceFiles)
    }

    const pipelineResults = await processMlPipeline(
      sampleId,
      sequenceAnalysisResults,
      documentAnalysisResults,
      analysisType,
    )

    return NextResponse.json({
      success: true,
      runId,
      sampleId,
      results: pipelineResults,
      timestamp: new Date().toISOString(),
      message: "ML pipeline started successfully",
    })
  } catch (error) {
    console.error("[v0] ML Pipeline error:", error)
    return NextResponse.json({ error: "Pipeline processing failed" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const runId = searchParams.get("runId")

  if (!runId) {
    return NextResponse.json({ error: "Run ID required" }, { status: 400 })
  }

  // Get pipeline status
  const status = await getPipelineStatus(runId)

  return NextResponse.json(status)
}

async function processDocuments(documentFiles: any[]) {
  console.log("[v0] Starting document analysis")

  // Simulate document processing results
  const documentResults = {
    totalDocuments: documentFiles.length,
    processedDocuments: documentFiles.length,
    extractedSpecies: [
      { name: "Gadus morhua", confidence: 0.95, source: "research_paper.pdf" },
      { name: "Calanus finmarchicus", confidence: 0.88, source: "field_notes.txt" },
      { name: "Mytilus edulis", confidence: 0.92, source: "analysis_report.docx" },
    ],
    extractedLocations: ["Arabian Sea", "15.2°N, 68.4°E", "Bay of Bengal"],
    methodologyKeywords: ["environmental DNA", "metabarcoding", "PCR amplification", "taxonomic classification"],
    confidenceScore: 0.87,
    processingTime: 15.5,
  }

  console.log("[v0] Document analysis completed")
  return documentResults
}

async function processSequenceFiles(sequenceFiles: any[]) {
  console.log("[v0] Starting sequence analysis")

  // Simulate sequence processing
  const totalSequences = sequenceFiles.reduce((acc, file) => acc + (file.sequenceCount || 500), 0)

  const sequenceResults = {
    totalFiles: sequenceFiles.length,
    totalSequences,
    processedSequences: Math.floor(totalSequences * 0.95),
    qualityFilteredSequences: Math.floor(totalSequences * 0.85),
    averageQualityScore: 28.5 + Math.random() * 5,
    averageSequenceLength: 450 + Math.random() * 100,
    processingTime: 45.2,
  }

  console.log("[v0] Sequence analysis completed")
  return sequenceResults
}

async function processMlPipeline(sampleId: string, sequenceResults: any, documentResults: any, analysisType: string) {
  console.log(`[v0] Running comprehensive ML analysis for ${analysisType}`)

  // Combine results from both sequence and document analysis
  const combinedSpecies = new Set()

  // Add species from sequence analysis (simulated)
  const sequenceSpecies = [
    "Gadus morhua",
    "Calanus finmarchicus",
    "Mytilus edulis",
    "Pleuronectes platessa",
    "Fucus vesiculosus",
    "Asterias rubens",
  ]
  sequenceSpecies.forEach((species) => combinedSpecies.add(species))

  // Add species from document analysis
  if (documentResults?.extractedSpecies) {
    documentResults.extractedSpecies.forEach((species: any) => combinedSpecies.add(species.name))
  }

  const mlResults = {
    analysisType,
    sampleId,
    runId: `ML_${Date.now()}`,

    // Sequence analysis results
    sequenceAnalysis: sequenceResults || {
      message: "No sequence files provided",
    },

    // Document analysis results
    documentAnalysis: documentResults || {
      message: "No documents provided",
    },

    // Combined biodiversity metrics
    biodiversityMetrics: {
      totalSpeciesIdentified: combinedSpecies.size,
      speciesList: Array.from(combinedSpecies),
      shannonDiversity: 2.1 + Math.random() * 0.8,
      simpsonIndex: 0.7 + Math.random() * 0.2,
      evenness: 0.6 + Math.random() * 0.3,
    },

    // Taxonomic composition
    taxonomicComposition: {
      phyla: {
        Chordata: 35,
        Arthropoda: 28,
        Mollusca: 22,
        Cnidaria: 10,
        Others: 5,
      },
      classes: {
        Actinopterygii: 30,
        Malacostraca: 25,
        Gastropoda: 20,
        Bivalvia: 15,
        Others: 10,
      },
    },

    // Analysis confidence and quality
    qualityMetrics: {
      overallConfidence: 0.85 + Math.random() * 0.1,
      dataCompleteness: 0.92,
      analysisReliability: "High",
      recommendedActions: [
        "Review low-confidence identifications",
        "Consider additional sampling for rare species",
        "Validate results with morphological analysis",
      ],
    },

    // Processing metadata
    processingMetadata: {
      startTime: new Date().toISOString(),
      estimatedCompletionTime: new Date(Date.now() + 7200000).toISOString(), // 2 hours
      processingSteps: [
        "Document text extraction",
        "Sequence quality filtering",
        "Taxonomic classification",
        "Biodiversity analysis",
        "Result integration",
      ],
      status: "in_progress",
    },
  }

  console.log("[v0] ML pipeline analysis completed")
  return mlResults
}

async function getPipelineStatus(runId: string) {
  // Simulate realistic pipeline status
  const statuses = ["queued", "processing", "analyzing", "completing", "completed"]
  const currentStatus = statuses[Math.floor(Math.random() * statuses.length)]

  return {
    runId,
    status: currentStatus,
    progress: currentStatus === "completed" ? 100 : Math.floor(Math.random() * 90) + 10,
    startTime: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
    endTime: currentStatus === "completed" ? new Date().toISOString() : null,
    currentStep: currentStatus === "completed" ? "Analysis complete" : "Processing sequences",
    estimatedTimeRemaining: currentStatus === "completed" ? 0 : Math.floor(Math.random() * 120) + 30,
    message: `Pipeline ${currentStatus}`,
    logs: [
      "Pipeline initialized",
      "Documents processed successfully",
      "Sequence analysis in progress",
      "Taxonomic classification running",
    ],
  }
}
