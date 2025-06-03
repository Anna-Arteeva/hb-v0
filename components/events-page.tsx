"use client"

import type React from "react"

import { useState } from "react"
import { Search, Mountain, Bike, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EventDetails from "@/components/event-details"
import Image from "next/image"

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
    image: "/placeholder.svg?height=80&width=80&text=Mountain",
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
    image: "/placeholder.svg?height=80&width=80&text=Cycling",
  },
  {
    id: 3,
    time: "6:45",
    duration: "1 day",
    title: "Tannheimer Berge",
    organizer: "Jessica",
    organizerAvatar: "/placeholder.svg?height=32&width=32",
    location: "Munich by Bus",
    transport: "Bus",
    activity: "Hiking",
    distance: "18km",
    elevation: "1982",
    totalHeight: "2234",
    participants: "12 coming / 4 available",
    participantAvatars: [
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
    ],
    image: "/placeholder.svg?height=80&width=80&text=Berge",
  },
  {
    id: 4,
    time: "8:00",
    duration: "12 days",
    title: "Event name bla second line",
    organizer: "Laurence",
    organizerAvatar: "/placeholder.svg?height=32&width=32",
    location: "Munich Hbf No transport",
    transport: "No transport",
    activity: "Hiking",
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
    image: "/placeholder.svg?height=80&width=80&text=Hike",
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
      "/placeholder.svg?height=60&width=60&text=Photo1",
      "/placeholder.svg?height=60&width=60&text=Photo2",
      "/placeholder.svg?height=60&width=60&text=Photo3",
      "/placeholder.svg?height=60&width=60&text=Photo4",
    ],
    morePhotos: "+12",
  },
]

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false)

  const handleEventClick = (eventId: string, event: React.MouseEvent) => {
    // Check if user wants to open in new tab (Ctrl+click, Cmd+click, or middle click)
    if (event.ctrlKey || event.metaKey || event.button === 1) {
      event.preventDefault()
      window.open(`/events/${eventId}`, "_blank")
    } else {
      // Open in modal
      setSelectedEvent(eventId)
      setEventDetailsOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <Mountain className="h-8 w-8 text-[#00AD7D]" />
                <span className="text-xl font-bold text-[#00AD7D]">Hiking Buddies</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-900 font-medium">
                Events
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Routes
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Community
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Organize event
              </a>
            </nav>

            {/* Search and Profile */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search..." className="pl-10 w-64" />
              </div>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Events</h1>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#00AD7D]"
                >
                  Upcoming events
                </TabsTrigger>
                <TabsTrigger value="today">Happening today</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>

              {/* Search Bar */}
              <div className="mt-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search events..." className="pl-10" />
                </div>
              </div>

              <TabsContent value="upcoming" className="space-y-8">
                {/* Tomorrow, Saturday */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Tomorrow, Saturday</h2>
                  <div className="space-y-4">
                    {events.map((event) => (
                      <Card
                        key={event.id}
                        className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                        onClick={(e) => handleEventClick(event.id.toString(), e)}
                        onMouseDown={(e) => {
                          // Handle middle mouse button
                          if (e.button === 1) {
                            e.preventDefault()
                            handleEventClick(event.id.toString(), e)
                          }
                        }}
                      >
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            {/* Time and Image */}
                            <div className="flex md:flex-col items-center md:items-start p-4 md:w-32">
                              <div className="text-center md:mb-4">
                                <div className="text-lg font-semibold">{event.time}</div>
                                <div className="text-sm text-gray-500">{event.duration}</div>
                              </div>
                              <div className="ml-4 md:ml-0">
                                <Image
                                  src={event.image || "/placeholder.svg"}
                                  alt={event.title}
                                  width={80}
                                  height={80}
                                  className="rounded-lg object-cover"
                                />
                              </div>
                            </div>

                            {/* Event Details */}
                            <div className="flex-1 p-4 md:p-6">
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Event Info */}
                                <div className="md:col-span-1">
                                  <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                                  <div className="flex items-center text-sm text-gray-500 mb-1">
                                    <Avatar className="h-4 w-4 mr-1">
                                      <AvatarImage src={event.organizerAvatar || "/placeholder.svg"} />
                                      <AvatarFallback>{event.organizer[0]}</AvatarFallback>
                                    </Avatar>
                                    by {event.organizer}
                                  </div>
                                </div>

                                {/* Departing From */}
                                <div className="md:col-span-1">
                                  <div className="text-sm text-gray-500 mb-1">Departing from</div>
                                  <div className="text-sm font-medium">{event.location}</div>
                                  <div className="text-sm text-gray-500">by {event.transport}</div>
                                </div>

                                {/* Activity */}
                                <div className="md:col-span-1">
                                  <div className="text-sm text-gray-500 mb-1">Activity</div>
                                  <div className="flex items-center space-x-2">
                                    {event.activity === "Hiking" ? (
                                      <Mountain className="h-4 w-4 text-[#00AD7D]" />
                                    ) : (
                                      <Bike className="h-4 w-4 text-red-500" />
                                    )}
                                    <Badge
                                      variant={event.activity === "Hiking" ? "default" : "destructive"}
                                      className={event.activity === "Hiking" ? "bg-[#00AD7D]" : ""}
                                    >
                                      {event.activity}
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-gray-500 mt-1">
                                    {event.distance} • {event.elevation} elevation • {event.totalHeight} total height
                                  </div>
                                </div>

                                {/* Participants */}
                                <div className="md:col-span-1">
                                  <div className="text-sm text-gray-500 mb-1">Participants</div>
                                  <div className="text-sm font-medium mb-2">{event.participants}</div>
                                  <div className="flex -space-x-1">
                                    {event.participantAvatars.map((avatar, index) => (
                                      <Avatar key={index} className="h-6 w-6 border-2 border-white">
                                        <AvatarImage src={avatar || "/placeholder.svg"} />
                                        <AvatarFallback>U</AvatarFallback>
                                      </Avatar>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Jun 23, Sunday */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Jun 23, Sunday</h2>
                  <div className="space-y-4">
                    {events.slice(0, 2).map((event) => (
                      <Card
                        key={`sunday-${event.id}`}
                        className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                        onClick={(e) => handleEventClick(event.id.toString(), e)}
                        onMouseDown={(e) => {
                          // Handle middle mouse button
                          if (e.button === 1) {
                            e.preventDefault()
                            handleEventClick(event.id.toString(), e)
                          }
                        }}
                      >
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="flex md:flex-col items-center md:items-start p-4 md:w-32">
                              <div className="text-center md:mb-4">
                                <div className="text-lg font-semibold">{event.time}</div>
                                <div className="text-sm text-gray-500">{event.duration}</div>
                              </div>
                              <div className="ml-4 md:ml-0">
                                <Image
                                  src={event.image || "/placeholder.svg"}
                                  alt={event.title}
                                  width={80}
                                  height={80}
                                  className="rounded-lg object-cover"
                                />
                              </div>
                            </div>
                            <div className="flex-1 p-4 md:p-6">
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="md:col-span-1">
                                  <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                                  <div className="flex items-center text-sm text-gray-500 mb-1">
                                    <Avatar className="h-4 w-4 mr-1">
                                      <AvatarImage src={event.organizerAvatar || "/placeholder.svg"} />
                                      <AvatarFallback>{event.organizer[0]}</AvatarFallback>
                                    </Avatar>
                                    by Helena
                                  </div>
                                </div>
                                <div className="md:col-span-1">
                                  <div className="text-sm text-gray-500 mb-1">Departing from</div>
                                  <div className="text-sm font-medium">Zurich Hbf</div>
                                  <div className="text-sm text-gray-500">by Bus</div>
                                </div>
                                <div className="md:col-span-1">
                                  <div className="text-sm text-gray-500 mb-1">Activity</div>
                                  <div className="flex items-center space-x-2">
                                    <Mountain className="h-4 w-4 text-[#00AD7D]" />
                                    <Badge className="bg-[#00AD7D]">Hiking</Badge>
                                  </div>
                                  <div className="text-sm text-gray-500 mt-1">
                                    18km • 1982 elevation • 2234 total height
                                  </div>
                                </div>
                                <div className="md:col-span-1">
                                  <div className="text-sm text-gray-500 mb-1">Participants</div>
                                  <div className="text-sm font-medium mb-2">12 coming / 4 available</div>
                                  <div className="flex -space-x-1">
                                    {event.participantAvatars.map((avatar, index) => (
                                      <Avatar key={index} className="h-6 w-6 border-2 border-white">
                                        <AvatarImage src={avatar || "/placeholder.svg"} />
                                        <AvatarFallback>U</AvatarFallback>
                                      </Avatar>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-center space-x-4 pt-8">
                  <Button variant="outline">Previous week</Button>
                  <Button variant="outline">Next week</Button>
                </div>
              </TabsContent>

              <TabsContent value="today">
                <div className="text-center py-12">
                  <p className="text-gray-500">No events happening today</p>
                </div>
              </TabsContent>

              <TabsContent value="past">
                <div className="text-center py-12">
                  <p className="text-gray-500">Past events will be shown here</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Your upcoming events */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Your upcoming events</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
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
                              <Bike className="h-3 w-3" />
                            ) : (
                              <Mountain className="h-3 w-3" />
                            )}
                            <span>{event.activity}</span>
                            <span>•</span>
                            <span>{event.distance}</span>
                            <span>•</span>
                            <span>{event.elevation} elevation</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-1">
                              <Avatar className="h-4 w-4">
                                <AvatarFallback className="text-xs">J</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-500">
                                {event.participants} by {event.organizerName}
                              </span>
                            </div>
                            {event.status === "full" && (
                              <Badge variant="secondary" className="text-xs">
                                full
                              </Badge>
                            )}
                            {event.status !== "full" && (
                              <Badge variant="outline" className="text-xs text-[#00AD7D] border-[#00AD7D]">
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

            {/* Your past events */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Your past events</h3>
                <div className="space-y-4">
                  {pastEvents.map((event) => (
                    <div key={event.id}>
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="text-center">
                          <div className="text-sm font-medium">{event.date}</div>
                          <div className="text-xs text-gray-500">{event.day}</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                            <Mountain className="h-3 w-3" />
                            <span>{event.activity}</span>
                            <span>•</span>
                            <span>{event.distance}</span>
                            <span>•</span>
                            <span>{event.elevation} elevation</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Avatar className="h-4 w-4">
                              <AvatarFallback className="text-xs">J</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-500">
                              {event.participants} by {event.organizerName}
                            </span>
                            <Button variant="link" className="text-xs text-[#00AD7D] p-0 h-auto">
                              Write reviews
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Photo Gallery */}
                      <div className="grid grid-cols-4 gap-1 mb-2">
                        {event.photos.map((photo, index) => (
                          <div key={index} className="relative">
                            <Image
                              src={photo || "/placeholder.svg"}
                              alt={`Event photo ${index + 1}`}
                              width={60}
                              height={60}
                              className="rounded object-cover w-full h-15"
                            />
                            {index === 3 && event.morePhotos && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-medium">{event.morePhotos}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <Button variant="link" className="text-xs text-[#00AD7D] p-0 h-auto">
                        <Camera className="h-3 w-3 mr-1" />
                        Upload photos
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Show earlier events link */}
            <div className="text-center">
              <Button variant="link" className="text-[#00AD7D]">
                Show earlier events
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      <EventDetails
        isOpen={eventDetailsOpen}
        onClose={() => setEventDetailsOpen(false)}
        mode="modal"
        eventId={selectedEvent || undefined}
      />
    </div>
  )
}
