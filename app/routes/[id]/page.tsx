"use client"

import RouteDetails from "@/components/route-details"

interface RoutePageProps {
  params: {
    id: string
  }
}

export default function RoutePage({ params }: RoutePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <RouteDetails isOpen={true} onClose={() => window.history.back()} routeId={params.id} />
    </div>
  )
}
