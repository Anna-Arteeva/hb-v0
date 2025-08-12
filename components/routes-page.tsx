"use client"

import { useState } from "react"
import {
  Mountain,
  Filter,
  SlidersHorizontal,
  MapPin,
  Clock,
  TrendingUp,
  Star,
  Users,
  Navigation,
  Triangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { useAutoAnimate } from "@/hooks/use-auto-animate"
import Header from "@/components/header"

// Mock route data
const routes = [
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

export default function RoutesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredRoutes, setFilteredRoutes] = useState(routes)
  const [selectedCountry, setSelectedCountry] = useState("All countries")
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [distanceRange, setDistanceRange] = useState([0, 200])
  const [elevationRange, setElevationRange] = useState([0, 10000])
  const [heightRange, setHeightRange] = useState([0, 10000])
  const [durationRange, setDurationRange] = useState([0, 50])
  const [sortBy, setSortBy] = useState("newest")

  const routesListRef = useAutoAnimate<HTMLDivElement>()

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

  const applyFilters = (
    query: string,
    country: string,
    difficulties: string[],
    distance: number[],
    elevation: number[],
    height: number[],
    duration: number[],
  ) => {
    const filtered = routes.filter((route) => {
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

  return (
    <>
      <Header />
      <main className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Routes</h1>

        {/* Filters Section */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="h-4 w-4 text-gray-600" />
              <h2 className="text-base font-semibold text-gray-900">Filters</h2>
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
                }}
                className="text-xs text-gray-500 hover:text-gray-700 ml-auto"
              >
                Clear all
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Location & Difficulty */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin className="h-3 w-3 text-gray-500" />
                    <label className="text-xs font-medium text-gray-700">Location</label>
                  </div>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
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

              {/* Distance */}
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
                    onValueChange={setDistanceRange}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="mt-3">
                  <div className="flex items-center gap-1 mb-2">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <label className="text-xs font-medium text-gray-700">Duration</label>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">{durationRange[0]} hrs</span>
                      <span className="text-xs text-gray-500">{durationRange[1]} hrs</span>
                    </div>
                    <Slider
                      value={durationRange}
                      onValueChange={setDurationRange}
                      max={50}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Elevation Gain */}
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Mountain className="h-3 w-3 text-gray-500" />
                  <label className="text-xs font-medium text-gray-700">Elevation Gain</label>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">{elevationRange[0]} m</span>
                    <span className="text-xs text-gray-500">{elevationRange[1]} m</span>
                  </div>
                  <Slider
                    value={elevationRange}
                    onValueChange={setElevationRange}
                    max={10000}
                    step={100}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Max Height */}
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Triangle className="h-3 w-3 text-gray-500" />
                  <label className="text-xs font-medium text-gray-700">Max Height</label>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">{heightRange[0]} m</span>
                    <span className="text-xs text-gray-500">{heightRange[1]} m</span>
                  </div>
                  <Slider
                    value={heightRange}
                    onValueChange={setHeightRange}
                    max={10000}
                    step={100}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500">{filteredRoutes.length} routes found</div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">{/* Removed show filters button */}</div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Sort by:</span>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {filteredRoutes.length} routes found
            </Badge>
          </div>
        </div>

        {/* Sort Buttons */}
        <div className="flex items-center gap-1 mb-8 bg-gray-200 rounded-lg p-1">
          {sortOptions.map((option) => (
            <Button
              key={option.value}
              variant={sortBy === option.value ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSortBy(option.value)}
              className={`flex items-center gap-2 ${
                sortBy === option.value ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{option.icon}</span>
              {option.label}
            </Button>
          ))}
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" ref={routesListRef}>
          {filteredRoutes.map((route) => (
            <Link key={route.id} href={`/routes/${route.id}`} className="block">
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] relative">
                    <Image src={route.image || "/placeholder.svg"} alt={route.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{route.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {route.duration}
                      </div>
                      <div className="flex items-center">
                        <Navigation className="h-4 w-4 mr-1" />
                        {route.distance}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {route.elevation}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{route.rating}</span>
                          <span className="text-sm text-gray-500 ml-1">({route.reviews})</span>
                        </div>
                        <Badge variant="outline">{route.difficulty}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {route.completions}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={route.author.avatar || "/placeholder.svg"} alt={route.author.name} />
                          <AvatarFallback>{route.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">By {route.author.name}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No routes found matching your criteria</p>
          </div>
        )}
      </main>
    </>
  )
}
