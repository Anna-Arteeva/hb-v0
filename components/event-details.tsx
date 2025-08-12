"use client"

import { useState, useEffect, useRef } from "react"
import { Mountain, MessageCircle, Heart, X, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAutoAnimate } from "@/hooks/use-auto-animate"

interface EventDetailsProps {
  isOpen: boolean
  onClose: () => void
  mode: "modal" | "page"
  eventId?: string
}

const eventData = {
  id: 1,
  title: "Pottenstein ring: A land of caves and castles, rivers and rocks",
  organizer: {
    name: "Luisa",
    avatar: "/placeholder.svg?height=40&width=40&text=L",
    joinedDate: "Joined 2 years ago",
  },
  date: "Saturday, July 6",
  time: "6:40",
  duration: "4h 30min",
  location: "Munich",
  transport: "Train",
  meetingPoint: "Munich Hbf, platform 29",
  activity: "Hiking",
  difficulty: "Moderate",
  distance: "18km",
  elevation: "1982m",
  totalHeight: "1800m",
  maxParticipants: 16,
  currentParticipants: 12,
  availableSpots: 4,
  price: "Free (transport costs apply)",
  description: `Join us for an incredible hiking adventure through the Pottenstein ring! This scenic route takes us through a landscape rich in natural caves, historic castles, and stunning rock formations.

We'll start our journey from Munich and take the train to reach our starting point. The hike covers approximately 18km with moderate difficulty, making it perfect for hikers with some experience.`,
  images: [
    "/images/events/pottenstein-caves.png",
    "/images/events/castle-ruins.png",
    "/images/events/forest-trail.png",
    "/images/events/alpine-lake-hike.png",
  ],
  participants: [
    { id: 1, name: "Anna", avatar: "/placeholder.svg?height=32&width=32&text=A" },
    { id: 2, name: "Max", avatar: "/placeholder.svg?height=32&width=32&text=M" },
  ],
  comments: [
    {
      id: 1,
      user: { name: "Anna", avatar: "/placeholder.svg?height=32&width=32&text=A" },
      text: "Looking forward to this hike! Will there be any stops for lunch along the way?",
      time: "2 hours ago",
      likes: 3,
      liked: false,
    },
  ],
}

export default function EventDetails({ isOpen, onClose, mode, eventId }: EventDetailsProps) {
  const [newComment, setNewComment] = useState("")
  const [isJoined, setIsJoined] = useState(false)
  const [comments, setComments] = useState(eventData.comments)
  const modalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const participantsRef = useAutoAnimate<HTMLDivElement>()
  const commentsRef = useAutoAnimate<HTMLDivElement>()
  const imagesRef = useAutoAnimate<HTMLDivElement>()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mode === "modal") {
        event.preventDefault()
        onClose()
      }
    }

    if (isOpen && mode === "modal") {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"

      return () => {
        document.removeEventListener("keydown", handleKeyDown)
        document.body.style.overflow = "unset"
      }
    }
  }, [isOpen, onClose, mode])

  // Modal accessibility: Focus trapping
  useEffect(() => {
    if (isOpen && mode === "modal" && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      firstElement?.focus()

      const handleTabKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Tab") {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }
      modalRef.current.addEventListener("keydown", handleTabKeyPress)
      return () => {
        modalRef.current?.removeEventListener("keydown", handleTabKeyPress)
      }
    }
  }, [isOpen, mode])

  if (mode === "modal" && !isOpen) return null

  const handleLike = (commentId: number) => {
    setComments(
      comments.map((c) =>
        c.id === commentId ? { ...c, likes: c.liked ? c.likes - 1 : c.likes + 1, liked: !c.liked } : c,
      ),
    )
  }

  const content = (
    <main className="bg-white min-h-screen">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/events")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Events</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Event Details</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Date & Time</div>
                    <div className="font-medium">
                      {eventData.date} at {eventData.time}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="font-medium">{eventData.duration}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Meeting Point</div>
                    <div className="font-medium">{eventData.meetingPoint}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Transport</div>
                    <div className="font-medium">{eventData.transport}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Distance</div>
                    <div className="font-medium">{eventData.distance}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Elevation</div>
                    <div className="font-medium">{eventData.elevation}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Price</div>
                    <div className="font-medium">{eventData.price}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Organizer</h3>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={eventData.organizer.avatar || "/placeholder.svg"}
                      alt={`${eventData.organizer.name}'s avatar`}
                    />
                    <AvatarFallback>{eventData.organizer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{eventData.organizer.name}</div>
                    <div className="text-sm text-gray-500">{eventData.organizer.joinedDate}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">
                  Participants ({eventData.currentParticipants}/{eventData.maxParticipants})
                </h3>
                <div className="space-y-3" ref={participantsRef}>
                  {eventData.participants.map((participant) => (
                    <div key={participant.id} className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={participant.avatar || "/placeholder.svg"}
                          alt={`${participant.name}'s avatar`}
                        />
                        <AvatarFallback>{participant.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{participant.name}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <Button
                  className="w-full"
                  variant={isJoined ? "outline" : "default"}
                  onClick={() => setIsJoined(!isJoined)}
                >
                  {isJoined ? "Leave Event" : `Join Event (${eventData.availableSpots} spots left)`}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="aspect-[3/2] rounded-lg overflow-hidden mb-6">
              <Image
                src={eventData.images[0] || "/placeholder.svg"}
                alt={eventData.title}
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
                  {eventData.activity}
                </Badge>
                <Badge variant="outline">{eventData.difficulty}</Badge>
              </div>
              <h1 id="event-title" className="text-3xl font-bold text-gray-900 mb-4">
                {eventData.title}
              </h1>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">About this event</h2>
              <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">{eventData.description}</div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Photos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4" ref={imagesRef}>
                {eventData.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Event photo ${index + 2}`}
                      width={300}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-3 order-3">
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Discussion</h3>
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

  if (mode === "modal") {
    return (
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 bg-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-title"
      >
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
          <div className="flex justify-between items-center max-w-10xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-900">Event Details</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close event details"
              className="hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rounded-full p-2"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <div className="overflow-y-auto h-full">{content}</div>
      </div>
    )
  }

  return content
}
