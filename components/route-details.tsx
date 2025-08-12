"use client"

import { useState, useEffect } from "react"
import { Mountain, MessageCircle, Heart, ArrowLeft, Share2, Download, Car, Train } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAutoAnimate } from "@/hooks/use-auto-animate"
import MapComponent from "@/components/map-component"
import ElevationChart from "@/components/elevation-chart"

interface RouteDetailsProps {
  routeId?: string
}

// Mock route data
const routeData = {
  "1": {
    id: 1,
    title: "Pottenstein ring: A land of caves and castles, rivers and rocks",
    creator: {
      name: "Luisa",
      avatar: "/placeholder.svg?height=40&width=40&text=L",
      joinedDate: "12 repeated • 1192 points",
    },
    activityType: "Hiking",
    difficulty: "Moderate",
    distance: "18km",
    elevation: "1982m",
    duration: "4h 30min",
    highestPoint: "1983m",
    description: `Many poets and painters walked through the countryside of Franconian Switzerland hundreds of years ago and caught it in word and on paintings. Franconian Switzerland offers a unique landscape with its characteristic rock formations, medieval castles, and crystal-clear rivers.

This scenic route takes us through a landscape rich in natural caves, historic castles, and stunning rock formations. The hike covers approximately 18km with moderate difficulty, making it perfect for hikers with some experience.`,
    images: [
      "/images/routes/rock-formations.png",
      "/images/routes/pottenstein-cave.png",
      "/images/routes/castle-ruins.png",
      "/images/routes/forest-trail.png",
      "/images/routes/mountain-vista.png",
    ],
    gettingThere: {
      byCar: "https://www.google.com/maps/place/Be...",
      byPublicTransport: "Train station near start point: Zürich Brunau (0.5 km from start point)",
    },
    pastEvents: 15,
    comments: [
      {
        id: 1,
        user: { name: "Leo", avatar: "/placeholder.svg?height=32&width=32&text=L" },
        text: "He just likes leaving smart comments and asking intelligent questions",
        time: "2 hours ago",
        likes: 2,
        liked: false,
      },
      {
        id: 2,
        user: { name: "Jessica", avatar: "/placeholder.svg?height=32&width=32&text=J" },
        text: "I would like to come by car, what time do you start hiking?",
        time: "1 hour ago",
        likes: 1,
        liked: false,
      },
    ],
  },
}

const sampleRouteCoordinates = [
  [49.7676, 11.4236], // Pottenstein start
  [49.7689, 11.4298], // Point 1
  [49.7712, 11.4356], // Point 2
  [49.7734, 11.4389], // Point 3
  [49.7756, 11.4412], // Point 4
  [49.7778, 11.4445], // Point 5
  [49.7801, 11.4478], // Point 6
  [49.7823, 11.4511], // Point 7
  [49.7845, 11.4544], // Point 8
  [49.7867, 11.4577], // Point 9
  [49.7676, 11.4236], // Back to start
]

const sampleElevationData = [
  { distance: 0, elevation: 350 },
  { distance: 2, elevation: 420 },
  { distance: 4, elevation: 580 },
  { distance: 6, elevation: 720 },
  { distance: 8, elevation: 890 },
  { distance: 10, elevation: 1050 },
  { distance: 12, elevation: 1200 },
  { distance: 14, elevation: 1350 },
  { distance: 16, elevation: 1450 },
  { distance: 18, elevation: 1350 },
]

export default function RouteDetails({ routeId }: RouteDetailsProps) {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<any[]>([])
  const [route, setRoute] = useState<any>(null)
  const router = useRouter()

  const participantsRef = useAutoAnimate<HTMLDivElement>()
  const commentsRef = useAutoAnimate<HTMLDivElement>()
  const imagesRef = useAutoAnimate<HTMLDivElement>()

  useEffect(() => {
    if (routeId) {
      const foundRoute = routeData[routeId as keyof typeof routeData]
      if (foundRoute) {
        setRoute(foundRoute)
        setComments(foundRoute.comments)
      }
    }
  }, [routeId])

  if (!route) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Route not found</h2>
          <Button onClick={() => router.push("/routes")}>Back to Routes</Button>
        </div>
      </div>
    )
  }

  const handleLike = (commentId: number) => {
    setComments(
      comments.map((c) =>
        c.id === commentId ? { ...c, likes: c.liked ? c.likes - 1 : c.likes + 1, liked: !c.liked } : c,
      ),
    )
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/routes")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Routes</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Route Details</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Distance</div>
                    <div className="font-medium">{route.distance}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Elevation Gain</div>
                    <div className="font-medium">{route.elevation}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Highest Point</div>
                    <div className="font-medium">{route.highestPoint}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="font-medium">{route.duration}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Difficulty</div>
                    <div className="font-medium">{route.difficulty}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Created By</h3>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={route.creator.avatar || "/placeholder.svg"}
                      alt={`${route.creator.name}'s avatar`}
                    />
                    <AvatarFallback>{route.creator.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{route.creator.name}</div>
                    <div className="text-sm text-gray-500">{route.creator.joinedDate}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Getting There</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="h-4 w-4 text-gray-600" />
                      <span className="font-medium text-sm">By car</span>
                    </div>
                    <a
                      href={route.gettingThere.byCar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {route.gettingThere.byCar}
                    </a>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Train className="h-4 w-4 text-gray-600" />
                      <span className="font-medium text-sm">By public transport</span>
                    </div>
                    <p className="text-sm text-gray-700">{route.gettingThere.byPublicTransport}</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex gap-2 flex-col items-start">
                  <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                    <Share2 className="h-3 w-3 mr-1" />
                    Duplicate and modify route
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                    <Download className="h-3 w-3 mr-1" />
                    Download GPX
                  </Button>
                </div>
                <Button className="w-full mt-3" size="sm">
                  Create an event
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="aspect-[3/2] rounded-lg overflow-hidden mb-6">
              <Image
                src={route.images[0] || "/placeholder.svg"}
                alt={route.title}
                width={600}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Badge>
                  <Mountain className="h-3 w-3 mr-1" aria-hidden="true" />
                  {route.activityType}
                </Badge>
                <Badge variant="outline">{route.difficulty}</Badge>
              </div>
              <h1 id="route-title" className="text-3xl font-bold text-gray-900 mb-4">
                {route.title}
              </h1>
            </div>

            <div className="mb-6">
              <MapComponent coordinates={sampleRouteCoordinates} title={route.title} />
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Elevation Profile</h2>
              <ElevationChart data={sampleElevationData} />
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">About this route</h2>
              <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {route.description}
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Photos from Previous Events</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4" ref={imagesRef}>
                {route.images.slice(1).map((image: string, index: number) => (
                  <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Route photo ${index + 2}`}
                      width={300}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">{route.pastEvents} past events with this route</p>
            </div>
          </div>

          <aside className="lg:col-span-3 order-3">
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Comments</h3>
                <div className="space-y-4 mb-4" ref={commentsRef}>
                  {comments.map((comment) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={comment.user.avatar || "/placeholder.svg"}
                            alt={`${comment.user.name}'s avatar`}
                          />
                          <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{comment.user.name}</span>
                            <span className="text-xs text-gray-500">{comment.time}</span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs"
                              onClick={() => handleLike(comment.id)}
                              aria-pressed={comment.liked}
                            >
                              <Heart className="h-3 w-3 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-3">
                  <label htmlFor="comment-input" className="sr-only">
                    Add a comment
                  </label>
                  <Textarea
                    id="comment-input"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                  <Button disabled={!newComment.trim()} size="sm" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Post Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  )
}
