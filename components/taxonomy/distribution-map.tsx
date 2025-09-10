"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Map, MapPin, Thermometer, Droplets } from "lucide-react"

interface DistributionMapProps {
  species: any
}

export function DistributionMap({ species }: DistributionMapProps) {
  const sampleLocations = [
    { id: 1, name: "North Sea", lat: 56.0, lng: 3.0, samples: 23, temp: "8-12°C" },
    { id: 2, name: "Baltic Sea", lat: 58.0, lng: 20.0, samples: 15, temp: "6-10°C" },
    { id: 3, name: "Norwegian Sea", lat: 65.0, lng: 2.0, samples: 31, temp: "4-8°C" },
    { id: 4, name: "Barents Sea", lat: 74.0, lng: 36.0, samples: 18, temp: "2-6°C" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-blue-600" />
            Geographic Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg relative overflow-hidden">
            {/* Simplified map visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-slate-500">
                <Map className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg font-medium">Interactive Distribution Map</p>
                <p className="text-sm">Sample locations and environmental data</p>
              </div>
            </div>

            {/* Sample location markers */}
            {sampleLocations.map((location, index) => (
              <div
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${20 + index * 20}%`,
                  top: `${30 + index * 15}%`,
                }}
              >
                <div className="relative group">
                  <div className="w-4 h-4 bg-cyan-600 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white p-2 rounded-lg shadow-lg border text-xs whitespace-nowrap">
                      <div className="font-medium">{location.name}</div>
                      <div className="text-slate-600">{location.samples} samples</div>
                      <div className="text-slate-600">{location.temp}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Sample Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sampleLocations.map((location) => (
                <div key={location.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-medium">{location.name}</div>
                    <div className="text-sm text-slate-600">
                      {location.lat}°N, {Math.abs(location.lng)}°{location.lng >= 0 ? "E" : "W"}
                    </div>
                  </div>
                  <Badge variant="secondary">{location.samples} samples</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-red-600" />
              Environmental Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-red-500" />
                  <span className="font-medium">Temperature Range</span>
                </div>
                <span className="text-slate-700">2-12°C</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Salinity Range</span>
                </div>
                <span className="text-slate-700">30-35 PSU</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Depth Range</span>
                </div>
                <span className="text-slate-700">10-200m</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
