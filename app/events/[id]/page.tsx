"use client"

import EventDetails from "@/components/event-details"

interface EventPageProps {
  params: {
    id: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  return <EventDetails isOpen={true} onClose={() => {}} mode="page" eventId={params.id} />
}
