"use client"

import { Suspense } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CredentialVault } from "@/components/security/credential-vault"
import { SecuritySettings } from "@/components/security/security-settings"
import { AccessLogs } from "@/components/security/access-logs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Key, Activity } from "lucide-react"

export default function SecurityPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-cyan-500" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Security Firewall</h1>
            <p className="text-muted-foreground">Secure credential management and access control</p>
          </div>
        </div>

        <Tabs defaultValue="vault" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vault" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Credential Vault
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security Settings
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Access Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vault">
            <Suspense fallback={<div>Loading credential vault...</div>}>
              <CredentialVault />
            </Suspense>
          </TabsContent>

          <TabsContent value="settings">
            <SecuritySettings />
          </TabsContent>

          <TabsContent value="logs">
            <AccessLogs />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
