"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, Search, Download, AlertCircle, CheckCircle, XCircle } from "lucide-react"

interface AccessLog {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  status: "success" | "failed" | "warning"
  ipAddress: string
  userAgent: string
}

export function AccessLogs() {
  const [logs] = useState<AccessLog[]>([
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
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || log.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-400" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500/20 text-green-400"
      case "failed":
        return "bg-red-500/20 text-red-400"
      case "warning":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-500" />
            Security Access Logs
          </CardTitle>
          <CardDescription>Monitor all access attempts and security events in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search logs by user, action, or resource..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <Card key={log.id} className="bg-gray-700/50 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(log.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white">{log.user}</span>
                          <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-300 mb-1">
                          <span className="font-medium">{log.action.replace("_", " ")}</span> on{" "}
                          <span className="text-cyan-400">{log.resource}</span>
                        </p>
                        <div className="text-xs text-gray-400 space-y-1">
                          <div>
                            IP: {log.ipAddress} | {log.timestamp}
                          </div>
                          <div className="truncate max-w-md">User Agent: {log.userAgent}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8 text-gray-400">No logs found matching your search criteria.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
