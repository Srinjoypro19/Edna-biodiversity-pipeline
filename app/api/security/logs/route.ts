import { type NextRequest, NextResponse } from "next/server"

// Mock access logs - in production, this would come from your secure logging system
const mockLogs = [
  {
    id: "1",
    timestamp: "2024-01-15 14:30:25",
    user: "dr.smith@marine.org",
    action: "ACCESS_CREDENTIAL",
    resource: "Supabase Database URL",
    status: "success",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "2",
    timestamp: "2024-01-15 14:25:12",
    user: "researcher@cmlre.org",
    action: "CREATE_CREDENTIAL",
    resource: "OpenAI API Key",
    status: "success",
    ipAddress: "10.0.0.50",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  },
  {
    id: "3",
    timestamp: "2024-01-15 14:20:08",
    user: "unknown@suspicious.com",
    action: "FAILED_LOGIN",
    resource: "Security Dashboard",
    status: "failed",
    ipAddress: "203.0.113.42",
    userAgent: "curl/7.68.0",
  },
  {
    id: "4",
    timestamp: "2024-01-15 14:15:33",
    user: "admin@edna.platform",
    action: "UPDATE_SETTINGS",
    resource: "Security Configuration",
    status: "warning",
    ipAddress: "192.168.1.10",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const limit = Number.parseInt(searchParams.get("limit") || "100")

    let filteredLogs = mockLogs

    // Filter by status
    if (status && status !== "all") {
      filteredLogs = filteredLogs.filter((log) => log.status === status)
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      filteredLogs = filteredLogs.filter(
        (log) =>
          log.user.toLowerCase().includes(searchLower) ||
          log.action.toLowerCase().includes(searchLower) ||
          log.resource.toLowerCase().includes(searchLower),
      )
    }

    // Apply limit
    filteredLogs = filteredLogs.slice(0, limit)

    return NextResponse.json({
      success: true,
      logs: filteredLogs,
      total: filteredLogs.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch access logs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user, action, resource, status, ipAddress, userAgent } = body

    // In production, this would log to your secure audit system
    const logEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
      user,
      action,
      resource,
      status,
      ipAddress,
      userAgent,
    }

    // Store in secure audit log database
    console.log("Security Event:", logEntry)

    return NextResponse.json({
      success: true,
      message: "Security event logged successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to log security event" }, { status: 500 })
  }
}
