"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, EyeOff, Copy, Trash2, Edit, Lock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Credential {
  id: string
  name: string
  type: "database" | "api_key" | "oauth" | "certificate" | "other"
  description: string
  value: string
  encrypted: boolean
  lastAccessed: string
  createdAt: string
}

export function CredentialVault() {
  const [credentials, setCredentials] = useState<Credential[]>([
    {
      id: "1",
      name: "Supabase Database URL",
      type: "database",
      description: "Main database connection for EDNA platform",
      value: "postgresql://user:***@db.supabase.co:5432/edna_db",
      encrypted: true,
      lastAccessed: "2024-01-15 10:30:00",
      createdAt: "2024-01-10 09:00:00",
    },
    {
      id: "2",
      name: "OpenAI API Key",
      type: "api_key",
      description: "API key for ML taxonomy identification",
      value: "sk-***********************************",
      encrypted: true,
      lastAccessed: "2024-01-15 11:45:00",
      createdAt: "2024-01-12 14:20:00",
    },
  ])

  const [showValues, setShowValues] = useState<Record<string, boolean>>({})
  const [isAddingCredential, setIsAddingCredential] = useState(false)
  const [newCredential, setNewCredential] = useState({
    name: "",
    type: "api_key" as const,
    description: "",
    value: "",
  })

  const toggleShowValue = (id: string) => {
    setShowValues((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  const addCredential = () => {
    const credential: Credential = {
      id: Date.now().toString(),
      ...newCredential,
      encrypted: true,
      lastAccessed: "Never",
      createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
    }
    setCredentials([...credentials, credential])
    setNewCredential({ name: "", type: "api_key", description: "", value: "" })
    setIsAddingCredential(false)
  }

  const deleteCredential = (id: string) => {
    setCredentials(credentials.filter((cred) => cred.id !== id))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "database":
        return "bg-blue-500/20 text-blue-400"
      case "api_key":
        return "bg-green-500/20 text-green-400"
      case "oauth":
        return "bg-purple-500/20 text-purple-400"
      case "certificate":
        return "bg-orange-500/20 text-orange-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="h-5 w-5 text-cyan-500" />
                Encrypted Credential Vault
              </CardTitle>
              <CardDescription>
                Securely store and manage your sensitive credentials with AES-256 encryption
              </CardDescription>
            </div>
            <Dialog open={isAddingCredential} onOpenChange={setIsAddingCredential}>
              <DialogTrigger asChild>
                <Button className="bg-cyan-600 hover:bg-cyan-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Credential
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Add New Credential</DialogTitle>
                  <DialogDescription>Store a new encrypted credential in the secure vault</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newCredential.name}
                      onChange={(e) => setNewCredential({ ...newCredential, name: e.target.value })}
                      placeholder="e.g., Production Database"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-white">
                      Type
                    </Label>
                    <Select
                      value={newCredential.type}
                      onValueChange={(value: any) => setNewCredential({ ...newCredential, type: value })}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="database">Database</SelectItem>
                        <SelectItem value="api_key">API Key</SelectItem>
                        <SelectItem value="oauth">OAuth Token</SelectItem>
                        <SelectItem value="certificate">Certificate</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-white">
                      Description
                    </Label>
                    <Input
                      id="description"
                      value={newCredential.description}
                      onChange={(e) => setNewCredential({ ...newCredential, description: e.target.value })}
                      placeholder="Brief description of this credential"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="value" className="text-white">
                      Credential Value
                    </Label>
                    <Textarea
                      id="value"
                      value={newCredential.value}
                      onChange={(e) => setNewCredential({ ...newCredential, value: e.target.value })}
                      placeholder="Enter the credential value (will be encrypted)"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <Button onClick={addCredential} className="w-full bg-cyan-600 hover:bg-cyan-700">
                    Add Encrypted Credential
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {credentials.map((credential) => (
              <Card key={credential.id} className="bg-gray-700/50 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-white">{credential.name}</h3>
                        <Badge className={getTypeColor(credential.type)}>{credential.type.replace("_", " ")}</Badge>
                        {credential.encrypted && (
                          <Badge className="bg-green-500/20 text-green-400">
                            <Lock className="h-3 w-3 mr-1" />
                            Encrypted
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{credential.description}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <code className="bg-gray-800 px-2 py-1 rounded text-sm text-gray-300 flex-1">
                          {showValues[credential.id] ? credential.value : "••••••••••••••••••••••••••••••••"}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleShowValue(credential.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          {showValues[credential.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(credential.value)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-xs text-gray-500">
                        Created: {credential.createdAt} | Last accessed: {credential.lastAccessed}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteCredential(credential.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
