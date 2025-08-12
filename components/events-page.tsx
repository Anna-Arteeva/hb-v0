"use client"

import { useState } from "react"
import { Search, Mountain, Bike, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAutoAnimate } from "@/hooks/use-auto-animate"
import Header from "@/components/header"

// Mock data...
const events = [
  {
    id: 1,
    time: "6:45",
    duration: "3 days",
    title: "Event name bla second line",
    organizer: "Larissa",
    organizerAvatar: "/placeholder.svg?height=32&width=32",
    location: "Munich Hbf, pl 29",
    transport: "Train",
    activity: "Hiking",
    distance: "18km",
    elevation: "1982",
    totalHeight: "1800",
    participants: "12 coming / 4 available",
    participantAvatars: [
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
    ],
    image: "/images/events/pottenstein-caves.png",
  },
  {
    id: 2,
    time: "6:45",
    duration: "12 hours",
    title: "Rofanspitze",
    organizer: "Freddy",
    organizerAvatar: "/placeholder.svg?height=32&width=32",
    location: "Munich Carpool",
    transport: "Carpool",
    activity: "Cycling",
    distance: "18km",
    elevation: "1982",
    totalHeight: "1800",
    participants: "20 coming / 20 in waitlist",
    participantAvatars: [
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
    ],
    image: "/images/events/rofanspitze-cycling.png",
  },
]

const upcomingEvents = [
  {
    id: 1,
    date: "Jun 30",
    day: "Sat",
    title: "Full-carpool After Work hike to Kampenwand",
    time: "6:45",
    location: "Munich",
    organizer: "Train",
    activity: "Cycling",
    distance: "18km",
    elevation: "1982",
    participants: "+14",
    organizerName: "Jean-Christian",
    status: "full",
  },
  {
    id: 2,
    date: "Jun 30",
    day: "Sat",
    title: "Full-carpool After Work hike to Kampenwand",
    time: "6:45",
    location: "Munich",
    organizer: "Train",
    activity: "Hiking",
    distance: "18km",
    elevation: "1982",
    participants: "+14",
    organizerName: "Nikolai",
    status: "1 place available",
  },
]

const pastEvents = [
  {
    id: 1,
    date: "Jun 30",
    day: "Sat",
    title: "Notkarspitze from Ettal",
    activity: "Hiking",
    distance: "18km",
    elevation: "1982",
    participants: "+14",
    organizerName: "Jean-Christian",
    photos: [
      "/images/events/notkarspitze-summit.png",
      "/images/events/alpine-lake-hike.png",
      "/images/events/forest-trail.png",
      "/images/events/mountain-sunrise.png",
    ],
    morePhotos: "+12",
  },
]

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredEvents, setFilteredEvents] = useState(events)

  const eventsListRef = useAutoAnimate<HTMLDivElement>()
  const sidebarRef = useAutoAnimate<HTMLDivElement>()
  const tabContentRef = useAutoAnimate<HTMLDivElement>()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredEvents(events)
    } else {
      const filtered = events.filter(
        (event) =>
          event.title.toLowerCase().includes(query.toLowerCase()) ||
          event.location.toLowerCase().includes(query.toLowerCase()) ||
          event.organizer.toLowerCase().includes(query.toLowerCase()) ||
          event.activity.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredEvents(filtered)
    }
  }

  return (
    <>
      {/* Header */}
      <Header />
      <main className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Events</h1>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
                  <TabsList className="w-auto grid-cols-3">
                    <TabsTrigger value="upcoming">Upcoming events</TabsTrigger>
                    <TabsTrigger value="today">Happening today</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>
                </Tabs>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="transition-all hover:scale-105 bg-transparent"
                      aria-label="More event actions"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Export events</DropdownMenuItem>
                    <DropdownMenuItem>Create event</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="relative ml-6">
                <label htmlFor="events-search" className="sr-only">
                  Search events
                </label>
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                  aria-hidden="true"
                />
                <Input
                  id="events-search"
                  placeholder="Search events..."
                  className="pl-10 w-64 transition-all focus:w-72"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="upcoming" ref={tabContentRef} className="space-y-8">
                <section aria-labelledby="tomorrow-events-heading">
                  <h2 id="tomorrow-events-heading" className="text-xl font-semibold text-gray-900 mb-4">
                    Tomorrow, Saturday
                  </h2>
                  <div className="space-y-0" ref={eventsListRef} aria-live="polite" aria-atomic="true">
                    {filteredEvents.map((event, index) => (
                      <article key={event.id} aria-labelledby={`event-title-${event.id}`} className="relative group">
                        <div className="py-6 hover:bg-gray-50 transition-all duration-200 rounded-lg">
                          <div className="flex flex-col md:flex-row">
                            <div className="flex md:flex-col items-center md:items-start md:w-32 mb-4 md:mb-0">
                              <div className="text-center md:mb-4">
                                <div className="text-lg font-semibold">{event.time}</div>
                                <div className="text-sm text-gray-500">{event.duration}</div>
                              </div>
                              <div className="ml-4 md:ml-0">
                                <Image
                                  src={event.image || "/placeholder.svg"}
                                  alt=""
                                  width={80}
                                  height={80}
                                  className="rounded-lg object-cover"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                            <div className="flex-1 md:ml-6">
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="md:col-span-1">
                                  <h3 className="font-semibold text-gray-900 mb-2" id={`event-title-${event.id}`}>
                                    <Link
                                      href={`/events/${event.id}`}
                                      className="focus:outline-none before:absolute before:inset-0 before:content-['']"
                                    >
                                      {event.title}
                                    </Link>
                                  </h3>
                                  <div className="flex items-center text-sm text-gray-500 mb-1">
                                    <Avatar className="h-4 w-4 mr-1">
                                      <AvatarImage
                                        src={event.organizerAvatar || "/placeholder.svg"}
                                        alt={`${event.organizer}'s avatar`}
                                      />
                                      <AvatarFallback>{event.organizer[0]}</AvatarFallback>
                                    </Avatar>
                                    by {event.organizer}
                                  </div>
                                </div>
                                <div className="md:col-span-1">
                                  <div className="text-sm text-gray-500 mb-1">Departing from</div>
                                  <div className="text-sm font-medium">{event.location}</div>
                                  <div className="text-sm text-gray-500">by {event.transport}</div>
                                </div>
                                <div className="md:col-span-1">
                                  <div className="text-sm text-gray-500 mb-1">Activity</div>
                                  <div className="flex items-center space-x-2">
                                    {event.activity === "Hiking" ? (
                                      <Mountain className="h-4 w-4 text-primary" aria-hidden="true" />
                                    ) : (
                                      <Bike className="h-4 w-4 text-red-500" aria-hidden="true" />
                                    )}
                                    <Badge variant={event.activity === "Hiking" ? "default" : "destructive"}>
                                      {event.activity}
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-gray-500 mt-1">
                                    {event.distance} • {event.elevation} elevation • {event.totalHeight} total height
                                  </div>
                                </div>
                                <div className="md:col-span-1">
                                  <div className="text-sm text-gray-500 mb-1">Participants</div>
                                  <div className="text-sm font-medium mb-2">{event.participants}</div>
                                  <div className="flex -space-x-1">
                                    {event.participantAvatars.map((avatar, pIndex) => (
                                      <Avatar key={pIndex} className="h-6 w-6 border-2 border-white">
                                        <AvatarImage
                                          src={avatar || "/placeholder.svg"}
                                          alt={`Participant ${pIndex + 1}`}
                                        />
                                        <AvatarFallback>U</AvatarFallback>
                                      </Avatar>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < filteredEvents.length - 1 && <Separator />}
                      </article>
                    ))}
                  </div>
                </section>
              </TabsContent>
              <TabsContent value="today" ref={tabContentRef}>
                <div className="text-center py-12">
                  <p className="text-gray-500">No events happening today</p>
                </div>
              </TabsContent>
              <TabsContent value="past" ref={tabContentRef}>
                <div className="text-center py-12">
                  <p className="text-gray-500">Past events will be shown here</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6" ref={sidebarRef}>
            <Card className="bg-gray-100">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Your upcoming events</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-start space-x-3">
                        <div className="text-center">
                          <div className="text-sm font-medium">{event.date}</div>
                          <div className="text-xs text-gray-500">{event.day}</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                          <div className="text-xs text-gray-500 mb-2">
                            at {event.time} • from {event.location} • by {event.organizer}
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            {event.activity === "Cycling" ? (
                              <Bike className="h-3 w-3" aria-hidden="true" />
                            ) : (
                              <Mountain className="h-3 w-3" aria-hidden="true" />
                            )}
                            <span>{event.activity}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-1">
                              <Avatar className="h-4 w-4">
                                <AvatarImage src="/placeholder.svg" alt={`${event.organizerName}'s avatar`} />
                                <AvatarFallback className="text-xs">J</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-500">
                                {event.participants} by {event.organizerName}
                              </span>
                            </div>
                            {event.status === "full" ? (
                              <Badge variant="secondary" className="text-xs">
                                full
                              </Badge>
                            ) : (
                              <Badge variant="default" className="text-xs">
                                {event.status}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </>
  )
}
