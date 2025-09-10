import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const sequenceFiles = formData.getAll("sequenceFiles") as File[]
    const documentFiles = formData.getAll("documentFiles") as File[]
    const sampleMetadata = JSON.parse(formData.get("metadata") as string)

    // Validate files
    const validationResult = await validateFiles(sequenceFiles, documentFiles)
    if (!validationResult.valid) {
      return NextResponse.json(
        {
          error: validationResult.error,
          details: validationResult.details,
        },
        { status: 400 },
      )
    }

    // Process sequence files
    const sequenceResults = await processSequenceFiles(sequenceFiles)

    // Process document files
    const documentResults = await processDocumentFiles(documentFiles)

    // Store sample with file references
    const storedSample = await storeSampleWithFiles(sampleMetadata, sequenceResults, documentResults)

    return NextResponse.json({
      success: true,
      sample: storedSample,
      sequenceFiles: sequenceResults,
      documentFiles: documentResults,
      message: "Sample and documents uploaded successfully",
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload files" }, { status: 500 })
  }
}

async function validateFiles(sequenceFiles: File[], documentFiles: File[]) {
  const errors: string[] = []

  // Validate sequence files
  for (const file of sequenceFiles) {
    const validSequenceTypes = [".fasta", ".fa", ".fas", ".fastq", ".fq", ".zip", ".gz"]
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf("."))

    if (!validSequenceTypes.includes(fileExtension)) {
      errors.push(`Invalid sequence file type: ${file.name}`)
    }

    if (file.size > 500 * 1024 * 1024) {
      // 500MB limit
      errors.push(`Sequence file too large: ${file.name}`)
    }
  }

  // Validate document files
  for (const file of documentFiles) {
    const validDocumentTypes = [
      ".pdf",
      ".doc",
      ".docx",
      ".txt",
      ".csv",
      ".xlsx",
      ".xls",
      ".ppt",
      ".pptx",
      ".rtf",
      ".odt",
    ]
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf("."))

    if (!validDocumentTypes.includes(fileExtension)) {
      errors.push(`Invalid document file type: ${file.name}`)
    }

    if (file.size > 100 * 1024 * 1024) {
      // 100MB limit for documents
      errors.push(`Document file too large: ${file.name}`)
    }
  }

  return {
    valid: errors.length === 0,
    error: errors.length > 0 ? "File validation failed" : null,
    details: errors,
  }
}

async function processSequenceFiles(files: File[]) {
  const results = []

  for (const file of files) {
    // Simulate file processing
    const processedFile = {
      originalName: file.name,
      size: file.size,
      type: "sequence",
      status: "processed",
      sequenceCount: Math.floor(Math.random() * 1000) + 100,
      qualityScore: Math.floor(Math.random() * 30) + 20,
      storagePath: `/uploads/sequences/${Date.now()}_${file.name}`,
    }
    results.push(processedFile)
  }

  return results
}

async function processDocumentFiles(files: File[]) {
  const results = []

  for (const file of files) {
    // Simulate document processing
    const processedFile = {
      originalName: file.name,
      size: file.size,
      type: "document",
      status: "processed",
      documentType: getDocumentType(file.name),
      extractedText: file.name.includes(".txt") ? "Text content extracted" : null,
      storagePath: `/uploads/documents/${Date.now()}_${file.name}`,
    }
    results.push(processedFile)
  }

  return results
}

function getDocumentType(filename: string): string {
  const extension = filename.toLowerCase().substring(filename.lastIndexOf("."))
  const typeMap: { [key: string]: string } = {
    ".pdf": "Research Paper",
    ".doc": "Document",
    ".docx": "Document",
    ".txt": "Text File",
    ".csv": "Data File",
    ".xlsx": "Spreadsheet",
    ".xls": "Spreadsheet",
    ".ppt": "Presentation",
    ".pptx": "Presentation",
    ".rtf": "Rich Text",
    ".odt": "Document",
  }
  return typeMap[extension] || "Unknown"
}

async function storeSampleWithFiles(metadata: any, sequenceFiles: any[], documentFiles: any[]) {
  // Simulate storing sample with file references
  const sample = {
    id: `SAMPLE_${Date.now()}`,
    ...metadata,
    sequenceFiles,
    documentFiles,
    status: "uploaded",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return sample
}
