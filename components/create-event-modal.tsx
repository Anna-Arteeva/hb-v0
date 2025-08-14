"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  MapPin,
  Clock,
  Filter,
  TrendingUp,
  Star,
  Navigation,
  Mountain,
  Search,
  ChevronRight,
  ArrowLeft,
  X,
  Upload,
  ImageIcon,
  Car,
  Train,
} from "lucide-react"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { Toggle } from "@/components/ui/toggle"

interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
}

type EventCreationStep =
  | "choice"
  | "activity-type"
  | "route-selection"
  | "event-type"
  | "event-details"
  | "transport"
  | "transport-mixed-choice"
  | "transport-join-car"
  | "transport-public"
  | "transport-share-car"
  | "transport-own"
  | "confirmation"

interface RouteData {
  id: number
  title: string
  location: string
  duration: string
  distance: string
  elevation: string
  difficulty: string
  rating: number
  reviews: number
  completions: number
  author: {
    name: string
    avatar: string
  }
  image: string
  coordinates: number[][]
  elevationProfile: number[]
  description: string
  bestSeason: string
  activityType: string
}

const mockRoutes: RouteData[] = [
  {
    id: 1,
    title: "Uetliberg (from Albisgütli)",
    location: "Zurich, Switzerland",
    duration: "01:12",
    distance: "3.5km",
    elevation: "323m",
    difficulty: "Easy",
    rating: 4.5,
    reviews: 93,
    completions: 512,
    author: {
      name: "Julien",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    image: "/images/routes/uetliberg-trail.png",
    coordinates: [
      [8.4918, 47.3769],
      [8.4901, 47.3734],
      [8.4889, 47.3712],
    ],
    elevationProfile: [400, 450, 520, 580, 650, 723],
    description: "A beautiful trail through the forests of Uetliberg with stunning views of Zurich and the Alps.",
    bestSeason: "All year",
    activityType: "Hiking",
  },
  {
    id: 2,
    title: "Wank",
    location: "Garmisch-Partenkirchen, Germany",
    duration: "05:19",
    distance: "13.3km",
    elevation: "1107m",
    difficulty: "Medium",
    rating: 4.2,
    reviews: 62,
    completions: 1064,
    author: {
      name: "Amit",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    image: "/images/routes/wank-mountain.png",
    coordinates: [
      [11.1094, 47.4979],
      [11.1156, 47.5023],
      [11.1234, 47.5089],
    ],
    elevationProfile: [700, 850, 1000, 1200, 1400, 1780],
    description: "Challenging mountain hike with panoramic views of the Bavarian Alps.",
    bestSeason: "May - October",
    activityType: "Hiking",
  },
  {
    id: 3,
    title: "Schliersee to Tegernsee in 5h",
    location: "Bavaria, Germany",
    duration: "04:56",
    distance: "14.6km",
    elevation: "643m",
    difficulty: "Medium",
    rating: 4.8,
    reviews: 49,
    completions: 1066,
    author: {
      name: "Patrick",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    image: "/images/routes/lake-trail.png",
    coordinates: [
      [11.8594, 47.7369],
      [11.8756, 47.7423],
      [11.8934, 47.7489],
    ],
    elevationProfile: [730, 800, 950, 1100, 1200, 1373],
    description: "Scenic lake-to-lake hike through the Bavarian countryside.",
    bestSeason: "April - November",
    activityType: "Hiking",
  },
  {
    id: 4,
    title: "Hoher Kranzberg and three panorama lakes",
    location: "Mittenwald, Germany",
    duration: "04:37",
    distance: "14.6km",
    elevation: "614m",
    difficulty: "Easy",
    rating: 4.6,
    reviews: 45,
    completions: 936,
    author: {
      name: "Lars",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    image: "/images/routes/alpine-lakes.png",
    coordinates: [
      [11.2594, 47.4369],
      [11.2756, 47.4423],
      [11.2934, 47.4489],
    ],
    elevationProfile: [900, 1000, 1150, 1300, 1400, 1514],
    description: "Beautiful alpine hike featuring three stunning mountain lakes.",
    bestSeason: "June - September",
    activityType: "Hiking",
  },
  {
    id: 5,
    title: "Pottenstein Ring Trail",
    location: "Franconia, Germany",
    duration: "04:30",
    distance: "18km",
    elevation: "1982m",
    difficulty: "Difficult",
    rating: 4.7,
    reviews: 78,
    completions: 1192,
    author: {
      name: "Luisa",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    image: "/images/routes/rock-formations.png",
    coordinates: [
      [11.3594, 49.7369],
      [11.3756, 49.7423],
      [11.3934, 49.7489],
    ],
    elevationProfile: [400, 600, 900, 1200, 1600, 1983],
    description:
      "A land of caves and castles, rivers and rocks. Many poets and painters walked through the countryside of Franconian Switzerland hundreds of years ago.",
    bestSeason: "March - November",
    activityType: "Hiking",
  },
  {
    id: 6,
    title: "Zugspitze via Reintal",
    location: "Garmisch-Partenkirchen, Germany",
    duration: "08:45",
    distance: "21km",
    elevation: "2200m",
    difficulty: "Very Difficult",
    rating: 4.9,
    reviews: 156,
    completions: 2847,
    author: {
      name: "Michael",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    image: "/images/routes/zugspitze-peak.png",
    coordinates: [
      [11.0594, 47.4169],
      [11.0756, 47.4223],
      [11.0934, 47.4289],
    ],
    elevationProfile: [700, 1000, 1400, 1800, 2400, 2962],
    description: "Germany's highest peak via the classic Reintal route. A challenging but rewarding climb.",
    bestSeason: "July - September",
    activityType: "Mountaineering",
  },
]

const difficultyLevels = ["Very Easy", "Easy", "Medium", "Medium Difficult", "Difficult", "Very Difficult"]
const countries = ["All countries", "Germany", "Switzerland", "Austria", "France", "Italy"]
const sortOptions = [
  { value: "newest", label: "Newest", icon: "🆕" },
  { value: "gain", label: "Gain", icon: "📈" },
  { value: "distance", label: "Distance", icon: "📏" },
  { value: "duration", label: "Duration", icon: "⏱️" },
  { value: "rating", label: "Rating", icon: "⭐" },
  { value: "popularity", label: "Popularity", icon: "👥" },
]

export default function CreateEventModal({ isOpen, onClose }: CreateEventModalProps) {
  const [currentStep, setCurrentStep] = useState<EventCreationStep>("choice")
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null)
  const [eventType, setEventType] = useState<"with-route" | "without-route" | null>(null)
  const [eventData, setEventData] = useState({
    activityType: "",
    title: "",
    description: "",
    date: "",
    time: "",
    meetingPoint: "",
    maxParticipants: "",
    transport: "",
    transportDetails: {
      type: "", // "mixed" or "public"
      mixedOption: "", // "join-car", "public-transport", "share-car", "own"
      meetingPoint: "",
      pickupPoint: "",
      time: "",
      price: "",
      contact: "",
      seats: "",
      notes: "",
    },
    hasDisclaimer: false,
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredRoutes, setFilteredRoutes] = useState(mockRoutes)
  const [selectedCountry, setSelectedCountry] = useState("All countries")
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [distanceRange, setDistanceRange] = useState([0, 200])
  const [elevationRange, setElevationRange] = useState([0, 10000])
  const [heightRange, setHeightRange] = useState([0, 10000])
  const [durationRange, setDurationRange] = useState([0, 50])
  const [sortBy, setSortBy] = useState("newest")
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"

      return () => {
        document.removeEventListener("keydown", handleKeyDown)
        document.body.style.overflow = "unset"
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const applyFilters = (
    query: string,
    country: string,
    difficulties: string[],
    distance: number[],
    elevation: number[],
    height: number[],
    duration: number[],
  ) => {
    const filtered = mockRoutes.filter((route) => {
      const matchesSearch =
        query.trim() === "" ||
        route.title.toLowerCase().includes(query.toLowerCase()) ||
        route.location.toLowerCase().includes(query.toLowerCase()) ||
        route.author.name.toLowerCase().includes(query.toLowerCase())

      const matchesCountry = country === "All countries" || route.location.includes(country)
      const matchesDifficulty = difficulties.length === 0 || difficulties.includes(route.difficulty)

      const routeDistance = Number.parseFloat(route.distance.replace("km", ""))
      const matchesDistance = routeDistance >= distance[0] && routeDistance <= distance[1]

      const routeElevation = Number.parseInt(route.elevation.replace("m", ""))
      const matchesElevation = routeElevation >= elevation[0] && routeElevation <= elevation[1]

      const routeDuration = Number.parseFloat(route.duration.replace(":", "."))
      const matchesDuration = routeDuration >= duration[0] && routeDuration <= duration[1]

      return (
        matchesSearch && matchesCountry && matchesDifficulty && matchesDistance && matchesElevation && matchesDuration
      )
    })

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "gain":
          return Number.parseInt(b.elevation.replace("m", "")) - Number.parseInt(a.elevation.replace("m", ""))
        case "distance":
          return Number.parseFloat(b.distance.replace("km", "")) - Number.parseFloat(a.distance.replace("km", ""))
        case "duration":
          return Number.parseFloat(b.duration.replace(":", ".")) - Number.parseFloat(a.duration.replace(":", "."))
        case "rating":
          return b.rating - a.rating
        case "popularity":
          return b.completions - a.completions
        default:
          return b.id - a.id
      }
    })

    setFilteredRoutes(filtered)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    applyFilters(
      query,
      selectedCountry,
      selectedDifficulties,
      distanceRange,
      elevationRange,
      heightRange,
      durationRange,
    )
  }

  const toggleDifficulty = (difficulty: string) => {
    const newDifficulties = selectedDifficulties.includes(difficulty)
      ? selectedDifficulties.filter((d) => d !== difficulty)
      : [...selectedDifficulties, difficulty]
    setSelectedDifficulties(newDifficulties)
    applyFilters(
      searchQuery,
      selectedCountry,
      newDifficulties,
      distanceRange,
      elevationRange,
      heightRange,
      durationRange,
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Very Easy":
        return "bg-green-100 text-green-800"
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Medium Difficult":
        return "bg-orange-100 text-orange-800"
      case "Difficult":
        return "bg-red-100 text-red-800"
      case "Very Difficult":
        return "bg-red-200 text-red-900"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleRouteSelect = (route: RouteData) => {
    setSelectedRoute(route)
    setCurrentStep("event-type")
  }

  const handleStepNavigation = (step: EventCreationStep) => {
    setCurrentStep(step)
  }

  const handleClose = () => {
    setShowCloseConfirmation(true)
  }

  const handleConfirmClose = () => {
    setCurrentStep("choice")
    setSelectedRoute(null)
    setEventType(null)
    setEventData({
      activityType: "",
      title: "",
      description: "",
      date: "",
      time: "",
      meetingPoint: "",
      maxParticipants: "",
      transport: "",
      transportDetails: {
        type: "",
        mixedOption: "",
        meetingPoint: "",
        pickupPoint: "",
        time: "",
        price: "",
        contact: "",
        seats: "",
        notes: "",
      },
      hasDisclaimer: false,
    })
    setSearchQuery("")
    setSelectedCountry("All countries")
    setSelectedDifficulties([])
    setDistanceRange([0, 200])
    setElevationRange([0, 10000])
    setHeightRange([0, 10000])
    setDurationRange([0, 50])
    setSortBy("newest")
    setFilteredRoutes(mockRoutes)
    setShowCloseConfirmation(false)
    onClose()
  }

  const getProgressPercentage = () => {
    const steps =
      eventType === "with-route"
        ? ["choice", "route-selection", "event-type", "event-details", "transport", "confirmation"]
        : ["choice", "activity-type", "event-details", "transport", "confirmation"]

    const currentIndex = steps.indexOf(currentStep)
    return ((currentIndex + 1) / steps.length) * 100
  }

  const renderChoiceStep = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Choose a type for your event</h2>
      </div>
      <div className="w-full max-w-md space-y-4">
        <button
          onClick={() => {
            setEventType("with-route")
            setCurrentStep("route-selection")
          }}
          className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Navigation className="h-5 w-5 text-gray-600" />
            <span className="font-medium">Event with a route</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>
        <button
          onClick={() => {
            setEventType("without-route")
            setCurrentStep("activity-type")
          }}
          className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-600" />
            <span className="font-medium">Event without route</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  )

  const renderActivityTypeStep = () => (
    <div className="flex flex-col min-h-[60vh]">
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">ACTIVITY TYPE</h3>
          <div className="flex flex-wrap gap-2">
            {["Skiing", "Climbing", "Social"].map((type) => (
              <Toggle
                key={type}
                pressed={eventData.activityType === type}
                onPressedChange={(pressed) => {
                  if (pressed) {
                    setEventData((prev) => ({ ...prev, activityType: type }))
                  }
                }}
                className="px-4 py-2 data-[state=on]:bg-[#00AD7D] data-[state=on]:text-white"
              >
                {type}
              </Toggle>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderRouteSelectionStep = () => (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Select a route</h3>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search routes..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 focus:border-[#00AD7D] focus:ring-2 focus:ring-[#00AD7D]/20"
        />
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="h-4 w-4 text-gray-600" />
            <h4 className="text-sm font-semibold text-gray-900">Filters</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedCountry("All countries")
                setSelectedDifficulties([])
                setDistanceRange([0, 200])
                setElevationRange([0, 10000])
                setHeightRange([0, 10000])
                setDurationRange([0, 50])
                applyFilters("", "All countries", [], [0, 200], [0, 10000], [0, 10000], [0, 50])
              }}
              className="text-xs text-gray-500 hover:text-gray-700 ml-auto"
            >
              Clear all
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <MapPin className="h-3 w-3 text-gray-500" />
                  <label className="text-xs font-medium text-gray-700">Location</label>
                </div>
                <Select
                  value={selectedCountry}
                  onValueChange={(value) => {
                    setSelectedCountry(value)
                    applyFilters(
                      searchQuery,
                      value,
                      selectedDifficulties,
                      distanceRange,
                      elevationRange,
                      heightRange,
                      durationRange,
                    )
                  }}
                >
                  <SelectTrigger className="h-8 text-xs border-gray-200">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-2">
                  <TrendingUp className="h-3 w-3 text-gray-500" />
                  <label className="text-xs font-medium text-gray-700">Difficulty</label>
                </div>
                <div className="flex flex-wrap gap-1">
                  {difficultyLevels.map((difficulty) => (
                    <Button
                      key={difficulty}
                      variant={selectedDifficulties.includes(difficulty) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleDifficulty(difficulty)}
                      className={`h-6 px-2 text-xs font-medium ${
                        selectedDifficulties.includes(difficulty)
                          ? getDifficultyColor(difficulty)
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Navigation className="h-3 w-3 text-gray-500" />
                  <label className="text-xs font-medium text-gray-700">Distance</label>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">{distanceRange[0]} km</span>
                    <span className="text-xs text-gray-500">{distanceRange[1]} km</span>
                  </div>
                  <Slider
                    value={distanceRange}
                    onValueChange={(value) => {
                      setDistanceRange(value)
                      applyFilters(
                        searchQuery,
                        selectedCountry,
                        selectedDifficulties,
                        value,
                        elevationRange,
                        heightRange,
                        durationRange,
                      )
                    }}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Mountain className="h-3 w-3 text-gray-500" />
                  <label className="text-xs font-medium text-gray-700">Elevation</label>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">{elevationRange[0]} m</span>
                    <span className="text-xs text-gray-500">{elevationRange[1]} m</span>
                  </div>
                  <Slider
                    value={elevationRange}
                    onValueChange={(value) => {
                      setElevationRange(value)
                      applyFilters(
                        searchQuery,
                        selectedCountry,
                        selectedDifficulties,
                        distanceRange,
                        value,
                        heightRange,
                        durationRange,
                      )
                    }}
                    max={10000}
                    step={100}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500">{filteredRoutes.length} routes found</div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-1 bg-gray-200 rounded-lg p-1">
        {sortOptions.map((option) => (
          <Button
            key={option.value}
            variant={sortBy === option.value ? "secondary" : "ghost"}
            size="sm"
            onClick={() => {
              setSortBy(option.value)
              applyFilters(
                searchQuery,
                selectedCountry,
                selectedDifficulties,
                distanceRange,
                elevationRange,
                heightRange,
                durationRange,
              )
            }}
            className={`flex items-center gap-2 text-xs ${
              sortBy === option.value ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span>{option.icon}</span>
            {option.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {filteredRoutes.map((route) => (
          <Card
            key={route.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleRouteSelect(route)}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Image
                  src={route.image || "/placeholder.svg"}
                  alt={route.title}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold mb-2 line-clamp-2">{route.title}</h4>
                  <div className="flex gap-3 text-xs text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {route.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Navigation className="h-3 w-3" />
                      {route.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {route.elevation}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <span className="text-xs font-medium">{route.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({route.reviews})</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {route.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <Avatar className="h-4 w-4 mr-2">
                      <AvatarImage src={route.author.avatar || "/placeholder.svg"} alt={route.author.name} />
                      <AvatarFallback className="text-xs">{route.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-600">By {route.author.name}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRoutes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No routes found matching your criteria</p>
        </div>
      )}
    </div>
  )

  const renderEventTypeStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {selectedRoute && (
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <img
              src={selectedRoute.image || "/placeholder.svg"}
              alt={selectedRoute.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-semibold">{selectedRoute.title}</h4>
              <p className="text-sm text-gray-600">
                {selectedRoute.distance} • {selectedRoute.duration}
              </p>
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="activity-type">Activity type</Label>
          <Select
            value={eventData.activityType}
            onValueChange={(value) => setEventData({ ...eventData, activityType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select activity type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hiking">Hiking</SelectItem>
              <SelectItem value="cycling">Cycling</SelectItem>
              <SelectItem value="climbing">Climbing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

  const renderEventDetailsStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Event Details</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              placeholder="Enter event title"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={eventData.date}
                onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={eventData.time}
                onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              placeholder="Type your description here"
              rows={6}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="disclaimer"
              checked={eventData.hasDisclaimer}
              onCheckedChange={(checked) => setEventData({ ...eventData, hasDisclaimer: !!checked })}
            />
            <Label htmlFor="disclaimer" className="text-sm">
              Add disclaimer
            </Label>
          </div>

          {eventData.hasDisclaimer && (
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
              Hiking can be dangerous. I am not a mountain guide. Everybody is responsible for her/himself. Make
              yourself familiar with the route and its requirements. It's recommended to download a map and bring a cell
              phone and first aid kit for emergencies.
            </div>
          )}

          <div className="space-y-2">
            <Label>COVER PHOTO</Label>
            <Button variant="outline" className="w-full justify-start text-[#00AD7D] border-[#00AD7D] bg-transparent">
              <Upload className="h-4 w-4 mr-2" />
              Upload new photo
            </Button>
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-gray-400" />
            </div>
          </div>

          <div>
            <Label htmlFor="max-participants">Maximum Participants</Label>
            <Input
              id="max-participants"
              type="number"
              value={eventData.maxParticipants}
              onChange={(e) => setEventData({ ...eventData, maxParticipants: e.target.value })}
              placeholder="Enter maximum number of participants"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderTransportStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="transport">Transport Options</Label>
          <div className="space-y-3 mt-3">
            <div
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                eventData.transportDetails.type === "mixed"
                  ? "border-[#00AD7D] bg-[#00AD7D]/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() =>
                setEventData({
                  ...eventData,
                  transportDetails: { ...eventData.transportDetails, type: "mixed", mixedOption: "" },
                })
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    {eventData.transportDetails.type === "mixed" && (
                      <div className="w-3 h-3 rounded-full bg-[#00AD7D]"></div>
                    )}
                  </div>
                  <span className="font-medium">Mixed transport</span>
                </div>
              </div>
            </div>

            <div
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                eventData.transportDetails.type === "public"
                  ? "border-[#00AD7D] bg-[#00AD7D]/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() =>
                setEventData({
                  ...eventData,
                  transportDetails: { ...eventData.transportDetails, type: "public", mixedOption: "" },
                })
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    {eventData.transportDetails.type === "public" && (
                      <div className="w-3 h-3 rounded-full bg-[#00AD7D]"></div>
                    )}
                  </div>
                  <span className="font-medium">Public transport</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {eventData.transportDetails.type === "mixed" && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <Label className="text-sm font-medium text-gray-700">TRANSPORT TO EVENT</Label>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Car className="w-4 h-4" />
                  <span className="text-sm">Mixed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Train className="w-4 h-4" />
                  <span className="text-sm">All together by public transport</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">Other participants can add their transport options</p>
            </div>

            <div>
              <Label htmlFor="event-meeting-point">EVENT MEETING POINT</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  id="event-meeting-point"
                  value={eventData.transportDetails.meetingPoint || ""}
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      transportDetails: { ...eventData.transportDetails, meetingPoint: e.target.value },
                    })
                  }
                  placeholder="Parking near Jochberg"
                />
                <Button variant="ghost" size="sm" className="text-[#00AD7D] hover:text-[#00AD7D]/80">
                  Copy the route name
                </Button>
              </div>
            </div>
          </div>
        )}

        {eventData.transportDetails.type === "public" && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <Label className="text-sm font-medium text-gray-700">TRANSPORT TO EVENT</Label>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Car className="w-4 h-4" />
                  <span className="text-sm">Mixed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Train className="w-4 h-4" />
                  <span className="text-sm">Only together by public transport</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">Other participants can not add their transport options</p>
            </div>

            <div>
              <Label htmlFor="transport-meeting-point">TRANSPORT MEETING POINT</Label>
              <Input
                id="transport-meeting-point"
                value={eventData.transportDetails.meetingPoint || ""}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    transportDetails: { ...eventData.transportDetails, meetingPoint: e.target.value },
                  })
                }
                placeholder="Munich Hbf"
              />
            </div>

            <div>
              <Label htmlFor="transport-time">TIME</Label>
              <Input
                id="transport-time"
                type="time"
                value={eventData.transportDetails.time || ""}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    transportDetails: { ...eventData.transportDetails, time: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="transport-notes">ADDITIONAL NOTES</Label>
              <Textarea
                id="transport-notes"
                value={eventData.transportDetails.notes || ""}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    transportDetails: { ...eventData.transportDetails, notes: e.target.value },
                  })
                }
                placeholder="Ticket costs 5 euro"
                rows={3}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderTransportMixedChoiceStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>My transport options</Label>
          <div className="space-y-3 mt-3">
            <div
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                eventData.transportDetails.mixedOption === "join-car"
                  ? "border-[#00AD7D] bg-[#00AD7D]/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() =>
                setEventData({
                  ...eventData,
                  transportDetails: { ...eventData.transportDetails, mixedOption: "join-car" },
                })
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    {eventData.transportDetails.mixedOption === "join-car" && (
                      <div className="w-3 h-3 rounded-full bg-[#00AD7D]"></div>
                    )}
                  </div>
                  <span className="font-medium">I join someone else's car</span>
                </div>
              </div>
            </div>

            <div
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                eventData.transportDetails.mixedOption === "public-transport"
                  ? "border-[#00AD7D] bg-[#00AD7D]/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() =>
                setEventData({
                  ...eventData,
                  transportDetails: { ...eventData.transportDetails, mixedOption: "public-transport" },
                })
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    {eventData.transportDetails.mixedOption === "public-transport" && (
                      <div className="w-3 h-3 rounded-full bg-[#00AD7D]"></div>
                    )}
                  </div>
                  <span className="font-medium">I go by public transport</span>
                </div>
              </div>
            </div>

            <div
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                eventData.transportDetails.mixedOption === "share-car"
                  ? "border-[#00AD7D] bg-[#00AD7D]/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() =>
                setEventData({
                  ...eventData,
                  transportDetails: { ...eventData.transportDetails, mixedOption: "share-car" },
                })
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    {eventData.transportDetails.mixedOption === "share-car" && (
                      <div className="w-3 h-3 rounded-full bg-[#00AD7D]"></div>
                    )}
                  </div>
                  <span className="font-medium">I go with my own car</span>
                </div>
              </div>
            </div>

            <div
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                eventData.transportDetails.mixedOption === "own"
                  ? "border-[#00AD7D] bg-[#00AD7D]/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() =>
                setEventData({
                  ...eventData,
                  transportDetails: { ...eventData.transportDetails, mixedOption: "own" },
                })
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    {eventData.transportDetails.mixedOption === "own" && (
                      <div className="w-3 h-3 rounded-full bg-[#00AD7D]"></div>
                    )}
                  </div>
                  <span className="font-medium">I go on my own</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTransportJoinCarStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">You can join someone's car or add transport options later.</p>
        </div>
      </div>
    </div>
  )

  const renderTransportPublicStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="transport-meeting-point">Public transport meeting point</Label>
          <Input
            id="transport-meeting-point"
            value={eventData.transportDetails.meetingPoint}
            onChange={(e) =>
              setEventData({
                ...eventData,
                transportDetails: { ...eventData.transportDetails, meetingPoint: e.target.value },
              })
            }
            placeholder="e.g., Munich Hbf"
          />
        </div>

        <div>
          <Label htmlFor="transport-time">Time</Label>
          <Input
            id="transport-time"
            type="time"
            value={eventData.transportDetails.time}
            onChange={(e) =>
              setEventData({
                ...eventData,
                transportDetails: { ...eventData.transportDetails, time: e.target.value },
              })
            }
          />
        </div>

        <div>
          <Label htmlFor="transport-notes">Additional notes</Label>
          <Textarea
            id="transport-notes"
            value={eventData.transportDetails.notes}
            onChange={(e) =>
              setEventData({
                ...eventData,
                transportDetails: { ...eventData.transportDetails, notes: e.target.value },
              })
            }
            placeholder="e.g., Ticket costs 5 euro"
            rows={3}
          />
        </div>
      </div>
    </div>
  )

  const renderTransportShareCarStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="transport-pickup-point">Pickup point</Label>
          <Input
            id="transport-pickup-point"
            value={eventData.transportDetails.pickupPoint}
            onChange={(e) =>
              setEventData({
                ...eventData,
                transportDetails: { ...eventData.transportDetails, pickupPoint: e.target.value },
              })
            }
            placeholder="e.g., Freisassing Hbf"
          />
        </div>

        <div>
          <Label htmlFor="transport-time">Time</Label>
          <Input
            id="transport-time"
            type="time"
            value={eventData.transportDetails.time}
            onChange={(e) =>
              setEventData({
                ...eventData,
                transportDetails: { ...eventData.transportDetails, time: e.target.value },
              })
            }
          />
        </div>

        <div>
          <Label htmlFor="transport-price">Price</Label>
          <Input
            id="transport-price"
            value={eventData.transportDetails.price}
            onChange={(e) =>
              setEventData({
                ...eventData,
                transportDetails: { ...eventData.transportDetails, price: e.target.value },
              })
            }
            placeholder="e.g., 5 euro"
          />
        </div>

        <div>
          <Label htmlFor="transport-contact">Contact</Label>
          <Input
            id="transport-contact"
            value={eventData.transportDetails.contact}
            onChange={(e) =>
              setEventData({
                ...eventData,
                transportDetails: { ...eventData.transportDetails, contact: e.target.value },
              })
            }
            placeholder="e.g., +49 213 342 43 59"
          />
        </div>

        <div>
          <Label htmlFor="transport-seats">Number of seats</Label>
          <Input
            id="transport-seats"
            type="number"
            value={eventData.transportDetails.seats}
            onChange={(e) =>
              setEventData({
                ...eventData,
                transportDetails: { ...eventData.transportDetails, seats: e.target.value },
              })
            }
            placeholder="e.g., 3"
          />
        </div>

        <div>
          <Label htmlFor="transport-notes">Notes / Car description</Label>
          <Textarea
            id="transport-notes"
            value={eventData.transportDetails.notes}
            onChange={(e) =>
              setEventData({
                ...eventData,
                transportDetails: { ...eventData.transportDetails, notes: e.target.value },
              })
            }
            placeholder="e.g., VW Tiguan"
            rows={3}
          />
        </div>
      </div>
    </div>
  )

  const renderTransportOwnStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-700">You walk or can't share your transport</p>
        </div>
      </div>
    </div>
  )

  const renderConfirmationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Preview</h2>
        <p className="text-gray-600">Review your event details before publishing</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="aspect-[3/2] bg-gray-100 flex items-center justify-center">
          <ImageIcon className="w-12 h-12 text-gray-400" />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{eventData.title || "Event Title"}</h3>
              <p className="text-gray-600 mt-1">
                {eventData.date} at {eventData.time}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {eventData.activityType || "Activity"}
              </span>
            </div>
          </div>

          {selectedRoute && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-1">Route</h4>
              <p className="text-sm text-gray-600">{selectedRoute.title}</p>
              <p className="text-xs text-gray-500">
                {selectedRoute.distance} • {selectedRoute.duration}
              </p>
            </div>
          )}

          {eventData.description && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600 text-sm">{eventData.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-900">Max Participants:</span>
              <span className="ml-2 text-gray-600">{eventData.maxParticipants || "Not specified"}</span>
            </div>
            <div>
              <span className="font-medium text-gray-900">Transport:</span>
              <span className="ml-2 text-gray-600 capitalize">{eventData.transport || "Not specified"}</span>
            </div>
          </div>

          {eventData.hasDisclaimer && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                ⚠️ Disclaimer: Hiking can be dangerous. Participants are responsible for their own safety.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case "choice":
        return renderChoiceStep()
      case "activity-type":
        return renderActivityTypeStep()
      case "route-selection":
        return renderRouteSelectionStep()
      case "event-type":
        return renderEventTypeStep()
      case "event-details":
        return renderEventDetailsStep()
      case "transport":
        return renderTransportStep()
      case "transport-mixed-choice":
        return renderTransportMixedChoiceStep()
      case "transport-join-car":
        return renderTransportJoinCarStep()
      case "transport-public":
        return renderTransportPublicStep()
      case "transport-share-car":
        return renderTransportShareCarStep()
      case "transport-own":
        return renderTransportOwnStep()
      case "confirmation":
        return renderConfirmationStep()
      default:
        return null
    }
  }

  const handleBack = () => {
    const stepOrder: EventCreationStep[] =
      eventType === "with-route"
        ? ["choice", "route-selection", "event-type", "event-details", "transport", "confirmation"]
        : ["choice", "activity-type", "event-details", "transport", "confirmation"]

    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1])
    }
  }

  const canContinue = () => {
    switch (currentStep) {
      case "choice":
        return false // No continue button needed
      case "activity-type":
        return !!eventData.activityType
      case "route-selection":
        return !!selectedRoute
      case "event-type":
        return !!eventData.activityType
      case "event-details":
        return !!(eventData.title && eventData.date && eventData.time)
      case "transport":
        return !!eventData.transportDetails.type
      default:
        return true
    }
  }

  const handleContinue = () => {
    switch (currentStep) {
      case "activity-type":
        setCurrentStep("event-details")
        break
      case "route-selection":
        setCurrentStep("event-type")
        break
      case "event-type":
        setCurrentStep("event-details")
        break
      case "event-details":
        setCurrentStep("transport")
        break
      case "transport":
        if (eventData.transportDetails.type === "mixed") {
          setCurrentStep("transport-mixed-choice")
        } else {
          setCurrentStep("confirmation")
        }
        break
      case "transport-mixed-choice":
      case "transport-join-car":
      case "transport-public":
      case "transport-share-car":
      case "transport-own":
        setCurrentStep("confirmation")
        break
      default:
        setCurrentStep("confirmation")
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-white flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-event-title"
    >
      {/* Header with back button and progress */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button onClick={handleBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 id="create-event-title" className="text-lg font-semibold">
            Create a new event
          </h1>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-[#00AD7D] transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div
          className={`p-6 mx-auto ${currentStep === "route-selection" ? "max-w-none" : "max-w-2xl"} ${currentStep !== "choice" ? "pb-24" : ""}`}
        >
          {renderStepContent()}
        </div>
      </div>

      {currentStep !== "choice" && (
        <div className="flex-shrink-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-2xl mx-auto flex justify-end">
            <Button
              onClick={currentStep === "confirmation" ? handleConfirmClose : handleContinue}
              className="bg-[#00AD7D] hover:bg-[#00AD7D]/90 text-white px-8"
              disabled={!canContinue()}
            >
              {currentStep === "confirmation" ? "Create Event" : "Continue"}
            </Button>
          </div>
        </div>
      )}

      {/* Close confirmation modal */}
      {showCloseConfirmation && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Discard event creation?</h3>
            <p className="text-gray-600 mb-6">Your progress will be lost and you'll need to start over.</p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowCloseConfirmation(false)} className="px-6">
                Continue editing
              </Button>
              <Button onClick={handleConfirmClose} className="bg-red-600 hover:bg-red-700 text-white px-6">
                Scrap event
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
