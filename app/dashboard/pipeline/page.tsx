import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PipelineInterface } from "@/components/pipeline/pipeline-interface"

export default function PipelinePage() {
  return (
    <DashboardLayout>
      <PipelineInterface />
    </DashboardLayout>
  )
}
