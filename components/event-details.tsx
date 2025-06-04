"use client"

import { useState } from "react"
import { ArrowLeft, Share, Mountain, Download, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface EventDetailsProps {
  isOpen: boolean
  onClose: () => void
  mode?: "modal" | "page"
  eventId?: string
}

const eventData = {
  id: "1",
  title: "Pottenstein ring: A land of caves and castles, rivers and rocks",
  date: "May 10, Sunday",
  time: "06:40 AM - 17:00 PM",
  image: "/placeholder.svg?height=400&width=600&text=Hiking+Adventure",
  mapImage: "/placeholder.svg?height=300&width=400&text=Route+Map",
  elevationChart: "/placeholder.svg?height=200&width=400&text=Elevation+Chart",
  stats: {
    distance: "29k",
    ascent: "500",
    descent: "400",
    duration: "2-2",
    rating: "650",
    highestPoint: "1560",
  },
  activity: "Hiking",
  difficulty: "T3 Moderate",
  departsFrom: "Munich",
  transport: "Train, bus",
  organizer: {
    name: "Mira",
    title: "Mountain goat",
    avatar: "/placeholder.svg?height=40&width=40&text=M",
  },
  participants: {
    total: "12 out of 20",
    spotsLeft: "8 spots left",
    avatars: [
      "/placeholder.svg?height=32&width=32&text=J",
      "/placeholder.svg?height=32&width=32&text=A",
      "/placeholder.svg?height=32&width=32&text=S",
      "/placeholder.svg?height=32&width=32&text=M",
      "/placeholder.svg?height=32&width=32&text=L",
      "/placeholder.svg?height=32&width=32&text=K",
    ],
  },
  description:
    "Many poets and painters walked through the countryside of Franconian Switzerland hundreds years ago and catched it in word and on paintings. Franconian Switzerland is one of the largest nature parks in Germany and a real hidden gem. The area is very well known for its impressive caves, rock formations and green scenery. Also, there are many medieval castles and ruins.",
  meeting: {
    location: "Munich HBF, Platform 29",
    time: "8:40 AM",
    transport: "Train, bus 145 to Lindau",
    price: "€16 per person",
  },
  equipment: [
    "Hiking boots",
    "Food and drinks",
    "Cash for the ticket",
    "Headlamp (just in case)",
    "Helmet",
    "Poles",
    "Headlamp",
  ],
  photos: [
    "/placeholder.svg?height=200&width=300&text=Photo+1",
    "/placeholder.svg?height=200&width=300&text=Photo+2",
    "/placeholder.svg?height=200&width=300&text=Photo+3",
  ],
}

const comments = [
  {
    id: 1,
    user: "Victor",
    avatar: "/placeholder.svg?height=32&width=32&text=V",
    message:
      "Do you think winter hiking boots or lighter trail running shoes would be better for this trek? If there's no snow and it's not too cold, I'm leaning towards the trail running shoes being best.",
    time: "13 ago",
    likes: 0,
    replies: [],
  },
  {
    id: 2,
    user: "Anna",
    avatar: "/placeholder.svg?height=32&width=32&text=A",
    message: "I only carry some clothes and necessary stuff, in total less than 4 kilos. I'm staying in houses",
    time: "18 ago",
    likes: 0,
    replies: [],
  },
]

export default function EventDetails({ isOpen, onClose, mode = "modal", eventId }: EventDetailsProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [newComment, setNewComment] = useState("")

  const handleJoinEvent = () => {
    // Handle join event logic
    console.log("Joining event...")
  }

  const handleSendMessage = () => {
    if (newComment.trim()) {
      // Handle sending message logic
      console.log("Sending message:", newComment)
      setNewComment("")
    }
  }

  const DiscussionContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Discussion</h3>
        <div className="text-sm text-[#00AD7D]">+ 3 comments</div>
      </div>

      {/* Add Comment */}
      <div className="space-y-3">
        <Textarea
          placeholder="Add a message..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[80px]"
        />
        <div className="flex justify-end">
          <Button size="sm" className="bg-[#00AD7D] hover:bg-[#00AD7D]/90" onClick={handleSendMessage}>
            <Send className="h-4 w-4 mr-1" />
            Send
          </Button>
        </div>
      </div>

      <Separator />

      {/* Comments */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                <AvatarFallback>{comment.user[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-sm">{comment.user}</span>
                  <span className="text-xs text-gray-500">{comment.time}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{comment.message}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Button variant="ghost" size="sm" className="text-[#00AD7D] p-0 h-auto">
                    Like
                  </Button>
                  <Button variant="ghost" size="sm" className="text-[#00AD7D] p-0 h-auto">
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const EventPageContent = () => (
    <div className="min-h-full bg-gray-50 relative rounded-xl overflow-hidden">
      {/* Close button for modal mode */}
      {mode === "modal" && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="fixed top-7 left-7 z-50 bg-white/80 hover:bg-white shadow-sm"
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {/* Header - only show for page mode */}
      {mode === "page" && (
        <header className="bg-white border-b border-gray-200">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <Mountain className="h-8 w-8 text-[#00AD7D]" />
                  <span className="text-xl font-bold text-[#00AD7D]">Hiking Buddies</span>
                </div>
              </div>
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
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
      )}

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Maps, Stats, Organizer, Participants */}
          <div className="lg:col-span-3 space-y-6 mt-12 order-2 lg:order-1">
            {/* Route Map */}
            <Card>
              <CardContent className="p-4">
                <Image
                  src={eventData.mapImage || "/placeholder.svg"}
                  alt="Route map"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded mb-4"
                />

                {/* Elevation Chart */}
                <Image
                  src={eventData.elevationChart || "/placeholder.svg"}
                  alt="Elevation chart"
                  width={400}
                  height={150}
                  className="w-full h-24 object-cover rounded mb-4"
                />

                {/* Route Stats */}
                <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
                  <div>
                    <div className="text-gray-500">Distance</div>
                    <div className="font-semibold">{eventData.stats.distance}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Ascent</div>
                    <div className="font-semibold">{eventData.stats.ascent}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Descent</div>
                    <div className="font-semibold">{eventData.stats.descent}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="text-gray-500">Duration</div>
                    <div className="font-semibold">{eventData.stats.duration}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Rating</div>
                    <div className="font-semibold">{eventData.stats.rating}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Highest point</div>
                    <div className="font-semibold">{eventData.stats.highestPoint}</div>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Route details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-1" />
                    Download GPX
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Organizer */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Organized by</h3>
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={eventData.organizer.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{eventData.organizer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{eventData.organizer.name}</div>
                    <div className="text-sm text-gray-500">{eventData.organizer.title}</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Send a message
                </Button>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">Participants</h3>
                    <div className="text-sm text-gray-500">
                      {eventData.participants.total} / {eventData.participants.spotsLeft}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {eventData.participants.avatars.map((avatar, index) => (
                    <Avatar key={index} className="h-10 w-10">
                      <AvatarImage src={avatar || "/placeholder.svg"} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Send a message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Main Content */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">{eventData.date}</div>
                  {mode === "page" && (
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="text-xs text-gray-500">{eventData.time}</div>

                <h1 className="text-3xl font-bold text-gray-900">{eventData.title}</h1>

                {/* Activity Info */}
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Activity</div>
                    <div className="flex items-center space-x-1">
                      <Mountain className="h-4 w-4 text-[#00AD7D]" />
                      <Badge className="bg-[#00AD7D]">{eventData.activity}</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Difficulty</div>
                    <div className="font-medium">{eventData.difficulty}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Departs from</div>
                    <div className="font-medium">{eventData.departsFrom}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Transport</div>
                    <div className="font-medium">{eventData.transport}</div>
                  </div>
                </div>

                <Button className="w-full bg-[#00AD7D] hover:bg-[#00AD7D]/90" onClick={handleJoinEvent}>
                  Join event
                </Button>
              </div>

              {/* Main Image */}
              <div className="space-y-4">
                <Image
                  src={eventData.image || "/placeholder.svg"}
                  alt={eventData.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg"
                />

                {/* Photo Gallery */}
                <div className="grid grid-cols-3 gap-2">
                  {eventData.photos.map((photo, index) => (
                    <Image
                      key={index}
                      src={photo || "/placeholder.svg"}
                      alt={`Event photo ${index + 1}`}
                      width={200}
                      height={150}
                      className="w-full h-32 object-cover rounded"
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="font-semibold">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {showFullDescription ? eventData.description : `${eventData.description.slice(0, 200)}...`}
                </p>
                <Button
                  variant="link"
                  className="text-[#00AD7D] p-0 h-auto text-sm"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? "Show less" : "Show more"}
                </Button>
              </div>

              {/* Meeting and Transport */}
              <div className="space-y-3">
                <h3 className="font-semibold">Meeting and transport</h3>
                <p className="text-sm text-gray-600">We meet on platform and buy a group ticket all together.</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Meeting</div>
                    <div className="font-medium">{eventData.meeting.location}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Meeting time</div>
                    <div className="font-medium">{eventData.meeting.time}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Transport</div>
                    <div className="font-medium">{eventData.meeting.transport}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Ticket price</div>
                    <div className="font-medium">{eventData.meeting.price}</div>
                  </div>
                </div>
              </div>

              {/* Equipment */}
              <div className="space-y-3">
                <h3 className="font-semibold">Equipment</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {eventData.equipment.map((item, index) => (
                    <div key={index} className="text-gray-600">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Weather */}
              <div className="space-y-3">
                <h3 className="font-semibold">Weather</h3>
                <div className="text-sm text-gray-600">
                  Weather information will be updated closer to the event date.
                </div>
              </div>

              {/* Disclaimer */}
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2">Disclaimer</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Hiking is potentially dangerous. Understand and accept the risks involved before participating. I am
                    not a mountain guide and this is not a guided tour. You are responsible for your actions and
                    decisions. It is highly recommended to have a mountain rescue insurance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Discussion */}
          <div className="lg:col-span-3 order-3 lg:order-3">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <DiscussionContent />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )

  if (mode === "page") {
    return <EventPageContent />
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-none w-screen h-screen p-0 gap-0 [&>button]:hidden">
        <div className="w-full h-full overflow-y-auto bg-black/60">
          <div className="w-[calc(100vw-1.5rem)] min-h-[calc(100vh-1.5rem)] mx-auto my-3 bg-gray-50 rounded-xl relative border-none">
            {/* Close button for modal mode */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 left-4 z-50 bg-white/80 hover:bg-white shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Maps, Stats, Organizer, Participants */}
                <div className="lg:col-span-3 space-y-6 mt-12 order-2 lg:order-1">
                  {/* Route Map */}
                  <Card>
                    <CardContent className="p-4">
                      <Image
                        src={eventData.mapImage || "/placeholder.svg"}
                        alt="Route map"
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover rounded mb-4"
                      />

                      {/* Elevation Chart */}
                      <Image
                        src={eventData.elevationChart || "/placeholder.svg"}
                        alt="Elevation chart"
                        width={400}
                        height={150}
                        className="w-full h-24 object-cover rounded mb-4"
                      />

                      {/* Route Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
                        <div>
                          <div className="text-gray-500">Distance</div>
                          <div className="font-semibold">{eventData.stats.distance}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Ascent</div>
                          <div className="font-semibold">{eventData.stats.ascent}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Descent</div>
                          <div className="font-semibold">{eventData.stats.descent}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center text-sm">
                        <div>
                          <div className="text-gray-500">Duration</div>
                          <div className="font-semibold">{eventData.stats.duration}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Rating</div>
                          <div className="font-semibold">{eventData.stats.rating}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Highest point</div>
                          <div className="font-semibold">{eventData.stats.highestPoint}</div>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          Route details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-1" />
                          Download GPX
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Organizer */}
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Organized by</h3>
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={eventData.organizer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{eventData.organizer.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{eventData.organizer.name}</div>
                          <div className="text-sm text-gray-500">{eventData.organizer.title}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Send a message
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Participants */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">Participants</h3>
                          <div className="text-sm text-gray-500">
                            {eventData.participants.total} / {eventData.participants.spotsLeft}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {eventData.participants.avatars.map((avatar, index) => (
                          <Avatar key={index} className="h-10 w-10">
                            <AvatarImage src={avatar || "/placeholder.svg"} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Send a message
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Middle Column - Main Content */}
                <div className="lg:col-span-6 order-1 lg:order-2">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">{eventData.date}</div>
                      </div>

                      <div className="text-xs text-gray-500">{eventData.time}</div>

                      <h1 className="text-3xl font-bold text-gray-900">{eventData.title}</h1>

                      {/* Activity Info */}
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Activity</div>
                          <div className="flex items-center space-x-1">
                            <Mountain className="h-4 w-4 text-[#00AD7D]" />
                            <Badge className="bg-[#00AD7D]">{eventData.activity}</Badge>
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500">Difficulty</div>
                          <div className="font-medium">{eventData.difficulty}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Departs from</div>
                          <div className="font-medium">{eventData.departsFrom}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Transport</div>
                          <div className="font-medium">{eventData.transport}</div>
                        </div>
                      </div>

                      <Button className="w-full bg-[#00AD7D] hover:bg-[#00AD7D]/90" onClick={handleJoinEvent}>
                        Join event
                      </Button>
                    </div>

                    {/* Main Image */}
                    <div className="space-y-4">
                      <Image
                        src={eventData.image || "/placeholder.svg"}
                        alt={eventData.title}
                        width={800}
                        height={400}
                        className="w-full h-64 object-cover rounded-lg"
                      />

                      {/* Photo Gallery */}
                      <div className="grid grid-cols-3 gap-2">
                        {eventData.photos.map((photo, index) => (
                          <Image
                            key={index}
                            src={photo || "/placeholder.svg"}
                            alt={`Event photo ${index + 1}`}
                            width={200}
                            height={150}
                            className="w-full h-32 object-cover rounded"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                      <h3 className="font-semibold">Description</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {showFullDescription ? eventData.description : `${eventData.description.slice(0, 200)}...`}
                      </p>
                      <Button
                        variant="link"
                        className="text-[#00AD7D] p-0 h-auto text-sm"
                        onClick={() => setShowFullDescription(!showFullDescription)}
                      >
                        {showFullDescription ? "Show less" : "Show more"}
                      </Button>
                    </div>

                    {/* Meeting and Transport */}
                    <div className="space-y-3">
                      <h3 className="font-semibold">Meeting and transport</h3>
                      <p className="text-sm text-gray-600">We meet on platform and buy a group ticket all together.</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Meeting</div>
                          <div className="font-medium">{eventData.meeting.location}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Meeting time</div>
                          <div className="font-medium">{eventData.meeting.time}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Transport</div>
                          <div className="font-medium">{eventData.meeting.transport}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Ticket price</div>
                          <div className="font-medium">{eventData.meeting.price}</div>
                        </div>
                      </div>
                    </div>

                    {/* Equipment */}
                    <div className="space-y-3">
                      <h3 className="font-semibold">Equipment</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {eventData.equipment.map((item, index) => (
                          <div key={index} className="text-gray-600">
                            • {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Weather */}
                    <div className="space-y-3">
                      <h3 className="font-semibold">Weather</h3>
                      <div className="text-sm text-gray-600">
                        Weather information will be updated closer to the event date.
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <Card className="bg-yellow-50 border-yellow-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-sm mb-2">Disclaimer</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Hiking is potentially dangerous. Understand and accept the risks involved before
                          participating. I am not a mountain guide and this is not a guided tour. You are responsible
                          for your actions and decisions. It is highly recommended to have a mountain rescue insurance.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Right Column - Discussion */}
                <div className="lg:col-span-3 order-3 lg:order-3">
                  <Card>
                    <CardContent className="p-6">
                      <DiscussionContent />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
