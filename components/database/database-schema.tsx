"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, Key, Link, Download } from "lucide-react"

const tables = [
  {
    name: "samples",
    description: "eDNA sample collection records",
    columns: [
      {
        name: "sample_id",
        type: "VARCHAR(50)",
        key: "PRIMARY",
        nullable: false,
        description: "Unique sample identifier",
      },
      {
        name: "location",
        type: "VARCHAR(255)",
        key: "",
        nullable: false,
        description: "Sampling location coordinates",
      },
      { name: "depth", type: "VARCHAR(20)", key: "", nullable: false, description: "Sampling depth" },
      { name: "collection_date", type: "DATE", key: "", nullable: false, description: "Date of sample collection" },
      { name: "status", type: "ENUM", key: "", nullable: false, description: "Processing status" },
      { name: "researcher_id", type: "INT", key: "FOREIGN", nullable: false, description: "Collecting researcher" },
    ],
    relationships: [
      { table: "researchers", type: "belongs_to", key: "researcher_id" },
      { table: "species", type: "has_many", key: "sample_id" },
    ],
  },
  {
    name: "species",
    description: "Species identification and classification data",
    columns: [
      { name: "species_id", type: "INT", key: "PRIMARY", nullable: false, description: "Auto-incrementing species ID" },
      { name: "sample_id", type: "VARCHAR(50)", key: "FOREIGN", nullable: false, description: "Reference to sample" },
      { name: "species_name", type: "VARCHAR(255)", key: "", nullable: false, description: "Scientific species name" },
      {
        name: "confidence",
        type: "DECIMAL(5,2)",
        key: "",
        nullable: false,
        description: "Classification confidence %",
      },
      { name: "status", type: "ENUM", key: "", nullable: false, description: "Verification status" },
      { name: "taxonomy_id", type: "INT", key: "FOREIGN", nullable: true, description: "Taxonomic classification" },
    ],
    relationships: [
      { table: "samples", type: "belongs_to", key: "sample_id" },
      { table: "taxonomy", type: "belongs_to", key: "taxonomy_id" },
      { table: "sequences", type: "has_many", key: "species_id" },
    ],
  },
  {
    name: "taxonomy",
    description: "Hierarchical taxonomic classification system",
    columns: [
      { name: "taxonomy_id", type: "INT", key: "PRIMARY", nullable: false, description: "Unique taxonomy identifier" },
      { name: "kingdom", type: "VARCHAR(100)", key: "", nullable: true, description: "Taxonomic kingdom" },
      { name: "phylum", type: "VARCHAR(100)", key: "", nullable: true, description: "Taxonomic phylum" },
      { name: "class", type: "VARCHAR(100)", key: "", nullable: true, description: "Taxonomic class" },
      { name: "order", type: "VARCHAR(100)", key: "", nullable: true, description: "Taxonomic order" },
      { name: "family", type: "VARCHAR(100)", key: "", nullable: true, description: "Taxonomic family" },
      { name: "genus", type: "VARCHAR(100)", key: "", nullable: true, description: "Taxonomic genus" },
      { name: "species", type: "VARCHAR(100)", key: "", nullable: true, description: "Taxonomic species" },
    ],
    relationships: [{ table: "species", type: "has_many", key: "taxonomy_id" }],
  },
  {
    name: "sequences",
    description: "DNA sequence data and quality metrics",
    columns: [
      {
        name: "sequence_id",
        type: "BIGINT",
        key: "PRIMARY",
        nullable: false,
        description: "Unique sequence identifier",
      },
      { name: "species_id", type: "INT", key: "FOREIGN", nullable: false, description: "Associated species" },
      { name: "sequence_data", type: "TEXT", key: "", nullable: false, description: "DNA sequence string" },
      { name: "quality_score", type: "DECIMAL(5,2)", key: "", nullable: false, description: "Sequence quality score" },
      { name: "length", type: "INT", key: "", nullable: false, description: "Sequence length in base pairs" },
      { name: "gene_region", type: "VARCHAR(50)", key: "", nullable: false, description: "Target gene region" },
    ],
    relationships: [{ table: "species", type: "belongs_to", key: "species_id" }],
  },
]

export function DatabaseSchema() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Database Schema</h3>
          <p className="text-sm text-muted-foreground">Marine biodiversity database structure and relationships</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Schema
        </Button>
      </div>

      <Tabs defaultValue="tables" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="relationships">Relationships</TabsTrigger>
          <TabsTrigger value="indexes">Indexes</TabsTrigger>
        </TabsList>

        <TabsContent value="tables" className="space-y-4">
          <div className="grid gap-4">
            {tables.map((table) => (
              <Card key={table.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Table className="w-5 h-5 text-primary" />
                      <CardTitle className="text-lg">{table.name}</CardTitle>
                    </div>
                    <Badge variant="outline">{table.columns.length} columns</Badge>
                  </div>
                  <CardDescription>{table.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-5 gap-2 text-xs font-medium text-muted-foreground border-b pb-2">
                      <div>Column</div>
                      <div>Type</div>
                      <div>Key</div>
                      <div>Nullable</div>
                      <div>Description</div>
                    </div>
                    {table.columns.map((column, index) => (
                      <div key={index} className="grid grid-cols-5 gap-2 text-sm py-1">
                        <div className="font-medium flex items-center gap-1">
                          {column.key === "PRIMARY" && <Key className="w-3 h-3 text-yellow-500" />}
                          {column.key === "FOREIGN" && <Link className="w-3 h-3 text-blue-500" />}
                          {column.name}
                        </div>
                        <div className="text-muted-foreground">{column.type}</div>
                        <div>
                          {column.key && (
                            <Badge variant="outline" className="text-xs">
                              {column.key}
                            </Badge>
                          )}
                        </div>
                        <div className="text-muted-foreground">{column.nullable ? "Yes" : "No"}</div>
                        <div className="text-muted-foreground text-xs">{column.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="relationships" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Table Relationships</CardTitle>
              <CardDescription>Foreign key relationships between tables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tables.map((table) => (
                  <div key={table.name} className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Table className="w-4 h-4" />
                      {table.name}
                    </h4>
                    <div className="ml-6 space-y-1">
                      {table.relationships.map((rel, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Link className="w-3 h-3" />
                          <span>{rel.type}</span>
                          <Badge variant="outline">{rel.table}</Badge>
                          <span className="text-xs">via {rel.key}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="indexes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Indexes</CardTitle>
              <CardDescription>Indexes for query optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground border-b pb-2">
                  <div>Index Name</div>
                  <div>Table</div>
                  <div>Columns</div>
                  <div>Type</div>
                </div>
                {[
                  { name: "idx_samples_location", table: "samples", columns: "location", type: "BTREE" },
                  { name: "idx_samples_date", table: "samples", columns: "collection_date", type: "BTREE" },
                  { name: "idx_species_confidence", table: "species", columns: "confidence", type: "BTREE" },
                  { name: "idx_species_status", table: "species", columns: "status", type: "BTREE" },
                  { name: "idx_sequences_quality", table: "sequences", columns: "quality_score", type: "BTREE" },
                  { name: "idx_taxonomy_kingdom", table: "taxonomy", columns: "kingdom", type: "BTREE" },
                ].map((index, i) => (
                  <div key={i} className="grid grid-cols-4 gap-2 text-sm py-1">
                    <div className="font-medium">{index.name}</div>
                    <div>{index.table}</div>
                    <div className="text-muted-foreground">{index.columns}</div>
                    <div>
                      <Badge variant="outline">{index.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
