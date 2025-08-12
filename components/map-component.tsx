"use client"

import { useEffect, useRef } from "react"

interface MapComponentProps {
  routeCoordinates?: [number, number][]
  center?: [number, number]
  zoom?: number
  height?: string
  className?: string
}

// Sample route coordinates for Pottenstein ring
const sampleRouteCoordinates: [number, number][] = [
  [49.7676, 11.4236], // Pottenstein start
  [49.7689, 11.4298], // Cave entrance
  [49.7712, 11.4356], // Castle viewpoint
  [49.7734, 11.4412], // Rock formation
  [49.7756, 11.4468], // Forest path
  [49.7778, 11.4524], // River crossing
  [49.7801, 11.458], // Mountain peak
  [49.7823, 11.4636], // Valley descent
  [49.7845, 11.4692], // Historic ruins
  [49.7867, 11.4748], // Final viewpoint
  [49.7676, 11.4236], // Back to start
]

export default function MapComponent({
  routeCoordinates = sampleRouteCoordinates,
  center = [49.7756, 11.4468],
  zoom = 13,
  height = "h-64",
  className = "",
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    // Dynamically import Leaflet to avoid SSR issues
    const initMap = async () => {
      const L = await import("leaflet")

      // Fix for default markers in Leaflet with Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      })

      // Initialize map
      const map = L.map(mapRef.current!).setView(center, zoom)

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      // Add route polyline
      if (routeCoordinates.length > 0) {
        const polyline = L.polyline(routeCoordinates, {
          color: "#00AD7D",
          weight: 4,
          opacity: 0.8,
        }).addTo(map)

        // Add start marker
        L.marker(routeCoordinates[0]).addTo(map).bindPopup("Start Point")

        // Add end marker (if different from start)
        if (routeCoordinates.length > 1) {
          const endPoint = routeCoordinates[routeCoordinates.length - 1]
          if (endPoint[0] !== routeCoordinates[0][0] || endPoint[1] !== routeCoordinates[0][1]) {
            L.marker(endPoint).addTo(map).bindPopup("End Point")
          }
        }

        // Fit map to route bounds
        map.fitBounds(polyline.getBounds(), { padding: [20, 20] })
      }

      mapInstanceRef.current = map
    }

    initMap()

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [routeCoordinates, center, zoom])

  return (
    <>
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
      <div className={`${height} rounded-lg overflow-hidden border ${className}`}>
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </>
  )
}
