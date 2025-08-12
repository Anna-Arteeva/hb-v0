"use client"
import { useState } from "react"
import { ArrowLeft, Settings, Camera, Star, MapPin, Calendar, Trophy, Share2, MessageCircle, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Header from "@/components/header"

const difficultyStats = [
  { level: "T1", count: 0, color: "bg-[#00B0FF]" },
  { level: "T2", count: 34, color: "bg-[#0059A2]" },
  { level: "T3", count: 23, color: "bg-[#00AD7D]" },
  { level: "T4", count: 3, color: "bg-[#FFB400]" },
  { level: "T5", count: 15, color: "bg-[#FF4A33]" },
  { level: "T6", count: 4, color: "bg-[#FF3366]" },
]

const achievements = [
  { id: "T3", label: "T3", color: "bg-[#00AD7D]" },
  { id: "T4", label: "T4", color: "bg-[#FFB400]" },
  { id: "T6", label: "T6", color: "bg-[#FF3366]" },
  { id: "cycling", label: "61 hikes completed", color: "bg-[#0059A2]" },
  { id: "routes", label: "52 routes created", color: "bg-purple-500" },
  { id: "ferrata", label: "8 Via Ferrata activities", color: "bg-orange-500" },
]

const reviews = [
  {
    id: 1,
    author: "Karina",
    location: "Hochstaufen (1771m)",
    date: "June 2024",
    text: "Anna, thank you for organising an excellent 'tramping trip'. Certainly a fit and furious hike. See you on the next one",
    avatar: "/images/profile/karina-avatar.png",
  },
  {
    id: 2,
    author: "Marcus",
    location: "Zugspitze (2962m)",
    date: "May 2024",
    text: "Great leadership and excellent route planning. Anna made sure everyone felt included and safe throughout the challenging climb.",
    avatar: "/images/profile/marcus-avatar.png",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Jochberg hike and swim",
    date: "at 6:45",
    location: "from Munich",
    transport: "by Train",
    difficulty: "T2",
    activity: "Hiking",
    distance: "18km",
    elevation: "1982 elevation",
    duration: "4h 30min",
    status: "You are going",
    spotsLeft: null,
    organizer: "Vera, +14",
    organizerStatus: "Closed",
  },
  {
    id: 2,
    title: "Jochberg hike and swim",
    date: "at 6:45",
    location: "from Munich",
    transport: "by Train",
    difficulty: "T2",
    activity: "Hiking",
    distance: "18km",
    elevation: "1982 elevation",
    duration: "4h 30min",
    status: "You are organiser",
    spotsLeft: "1 spot available",
    organizer: "Anna, +14",
    organizerStatus: null,
  },
]

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("last-month")
  const [activityFilter, setActivityFilter] = useState("hiking")
  const [eventsTab, setEventsTab] = useState("upcoming")

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                {/* Profile Image and Basic Info */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src="/images/profile/anna-profile.png" alt="Anna's profile picture" />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Anna</h2>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Trail Rookie
                    </Badge>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 mr-1" />
                      34 reviews
                    </div>
                  </div>
                </div>

                {/* User Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">32 y.o.</span>
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 mr-1 text-gray-400" />
                      <span>Sustainer</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      <span>Based in Germany</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>5 years hiking</span>
                    <span>43 events organised</span>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Achievements</h3>
                  <div className="flex flex-wrap gap-2">
                    {achievements.map((achievement) => (
                      <Badge
                        key={achievement.id}
                        variant="secondary"
                        className={`${achievement.color} text-white text-xs`}
                      >
                        {achievement.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span>4 Cycling activities</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activity Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="last-month">Last Month | 9</TabsTrigger>
                    <TabsTrigger value="all-time">All Time | 49</TabsTrigger>
                    <TabsTrigger value="last-year">Last Year | 43</TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab} className="mt-6">
                    {/* Activity Filter */}
                    <div className="flex space-x-4 mb-6">
                      <Button
                        variant={activityFilter === "hiking" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActivityFilter("hiking")}
                      >
                        Hiking | 43
                      </Button>
                      <Button
                        variant={activityFilter === "cycling" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActivityFilter("cycling")}
                      >
                        Cycling | 4
                      </Button>
                      <Button
                        variant={activityFilter === "climbing" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActivityFilter("climbing")}
                      >
                        Climbing | 1
                      </Button>
                      <Button
                        variant={activityFilter === "social" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActivityFilter("social")}
                      >
                        Social | 1
                      </Button>
                    </div>

                    {activityFilter === "hiking" && (
                      <div>
                        {/* Distance and Elevation */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <p className="text-sm text-gray-600">Distance</p>
                            <p className="text-2xl font-bold">34km</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Elevation</p>
                            <p className="text-2xl font-bold">3,982m</p>
                          </div>
                        </div>

                        {/* Difficulty Distribution */}
                        <div>
                          <h4 className="font-semibold mb-4">Difficulty Distribution</h4>
                          <div className="flex space-x-2">
                            {difficultyStats.map((stat) => (
                              <div key={stat.level} className="text-center">
                                <div
                                  className={`w-12 h-16 ${stat.color} rounded-t flex items-end justify-center text-white text-xs font-semibold pb-1`}
                                >
                                  {stat.count > 0 && stat.count}
                                </div>
                                <div className="text-xs mt-1 font-semibold">{stat.level}</div>
                                <div className="text-xs text-gray-500">{stat.count}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Anna's Reviews (34)</CardTitle>
                  <Button variant="link" className="text-primary">
                    Show all
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <p className="text-gray-700 mb-3">{review.text}</p>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={review.avatar || "/placeholder.svg"} alt={`${review.author}'s avatar`} />
                          <AvatarFallback>{review.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-semibold">{review.author}</p>
                          <p className="text-gray-500">
                            {review.location}, {review.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Events Section */}
            <Card>
              <CardHeader>
                <CardTitle>Anna's Events</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={eventsTab} onValueChange={setEventsTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="upcoming">Upcoming | 2</TabsTrigger>
                    <TabsTrigger value="recent">Recent | 1</TabsTrigger>
                    <TabsTrigger value="past">Past | 60</TabsTrigger>
                    <TabsTrigger value="organised">Organised | 43</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="mt-6">
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src="/images/profile/anna-profile.png" alt="Event organizer" />
                                <AvatarFallback>A</AvatarFallback>
                              </Avatar>
                              <div className="text-sm">
                                <p className="font-semibold">{event.organizer}</p>
                                {event.organizerStatus && (
                                  <Badge variant="secondary" className="text-xs">
                                    {event.organizerStatus}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {event.spotsLeft && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                {event.spotsLeft}
                              </Badge>
                            )}
                          </div>

                          <h3 className="font-semibold text-lg mb-2">{event.title}</h3>

                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <Badge
                              variant="outline"
                              className={
                                event.status === "You are going"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-orange-100 text-orange-800"
                              }
                            >
                              {event.status}
                            </Badge>
                            <span>{event.date}</span>
                            <span>{event.location}</span>
                            <span>{event.transport}</span>
                          </div>

                          <div className="flex items-center space-x-4 text-sm mb-4">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {event.difficulty}
                            </Badge>
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {event.activity}
                            </span>
                            <span>{event.distance}</span>
                            <span>{event.elevation}</span>
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {event.duration}
                            </span>
                          </div>

                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Comment
                            </Button>
                            {event.status === "You are going" ? (
                              <Button variant="destructive" size="sm">
                                Unjoin
                              </Button>
                            ) : (
                              <Button variant="default" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="recent">
                    <p className="text-gray-500 text-center py-8">Recent events will be displayed here</p>
                  </TabsContent>

                  <TabsContent value="past">
                    <p className="text-gray-500 text-center py-8">Past events will be displayed here</p>
                  </TabsContent>

                  <TabsContent value="organised">
                    <p className="text-gray-500 text-center py-8">Organised events will be displayed here</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
