import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DatabaseInterface } from "@/components/database/database-interface"

export default function DatabasePage() {
  return (
    <DashboardLayout>
      <DatabaseInterface />
    </DashboardLayout>
  )
}
