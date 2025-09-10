"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Key, Clock, AlertTriangle, CheckCircle } from "lucide-react"

export function SecuritySettings() {
  const [settings, setSettings] = useState({
    encryptionEnabled: true,
    autoLockTimeout: "15",
    requireMFA: true,
    auditLogging: true,
    passwordPolicy: "strong",
    sessionTimeout: "60",
    ipWhitelist: "",
    backupEnabled: true,
  })

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-cyan-500" />
            Encryption Settings
          </CardTitle>
          <CardDescription>Configure encryption and security parameters for credential storage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">AES-256 Encryption</Label>
              <p className="text-sm text-gray-400">Enable military-grade encryption for all stored credentials</p>
            </div>
            <Switch
              checked={settings.encryptionEnabled}
              onCheckedChange={(checked) => updateSetting("encryptionEnabled", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Automatic Backup</Label>
              <p className="text-sm text-gray-400">Automatically backup encrypted credentials daily</p>
            </div>
            <Switch
              checked={settings.backupEnabled}
              onCheckedChange={(checked) => updateSetting("backupEnabled", checked)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Auto-lock Timeout (minutes)</Label>
            <Select value={settings.autoLockTimeout} onValueChange={(value) => updateSetting("autoLockTimeout", value)}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Key className="h-5 w-5 text-cyan-500" />
            Access Control
          </CardTitle>
          <CardDescription>Manage authentication and authorization settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Multi-Factor Authentication</Label>
              <p className="text-sm text-gray-400">Require MFA for accessing sensitive credentials</p>
            </div>
            <Switch checked={settings.requireMFA} onCheckedChange={(checked) => updateSetting("requireMFA", checked)} />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Password Policy</Label>
            <Select value={settings.passwordPolicy} onValueChange={(value) => updateSetting("passwordPolicy", value)}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                <SelectItem value="strong">Strong (12+ chars, mixed case, numbers)</SelectItem>
                <SelectItem value="enterprise">Enterprise (16+ chars, symbols required)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Session Timeout (minutes)</Label>
            <Input
              value={settings.sessionTimeout}
              onChange={(e) => updateSetting("sessionTimeout", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="60"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">IP Whitelist</Label>
            <Input
              value={settings.ipWhitelist}
              onChange={(e) => updateSetting("ipWhitelist", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="192.168.1.0/24, 10.0.0.0/8"
            />
            <p className="text-sm text-gray-400">Comma-separated list of allowed IP ranges</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-cyan-500" />
            Audit & Monitoring
          </CardTitle>
          <CardDescription>Configure logging and monitoring for security events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Audit Logging</Label>
              <p className="text-sm text-gray-400">Log all credential access and modifications</p>
            </div>
            <Switch
              checked={settings.auditLogging}
              onCheckedChange={(checked) => updateSetting("auditLogging", checked)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm font-medium text-green-400">Security Status</p>
                <p className="text-xs text-green-300">All systems secure</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-sm font-medium text-yellow-400">Pending Updates</p>
                <p className="text-xs text-yellow-300">2 security patches available</p>
              </div>
            </div>
          </div>

          <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Save Security Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}
