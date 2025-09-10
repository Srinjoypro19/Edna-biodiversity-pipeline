"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { TaxonomyInterface } from "@/components/taxonomy/taxonomy-interface"

export default function TaxonomyPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Taxonomy Viewer</h1>
          <p className="text-muted-foreground">Explore marine biodiversity classifications and species relationships</p>
        </div>

        <TaxonomyInterface />
      </div>
    </DashboardLayout>
  )
}
