"use client"
import { Search, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useAutoAnimate } from "@/hooks/use-auto-animate"
import Header from "@/components/header"

const activityCategories = [
  {
    id: 1,
    title: "Hiking",
    image: "/images/home/hiking-activity.png",
  },
  {
    id: 2,
    title: "Climbing",
    image: "/images/home/climbing-activity.png",
  },
  {
    id: 3,
    title: "Cycling",
    image: "/images/home/cycling-activity.png",
  },
  {
    id: 4,
    title: "Water sports",
    image: "/images/home/water-sports-activity.png",
  },
  {
    id: 5,
    title: "All activities",
    image: "/images/home/all-activities.png",
    isViewAll: true,
  },
]

const hikingRoutes = [
  {
    id: 1,
    title: "Bavaria, Germany",
    subtitle: "Bavaria, Germany",
    image: "/images/home/bavarian-alps-1.png",
  },
  {
    id: 2,
    title: "Bavaria, Germany",
    subtitle: "Bavaria, Germany",
    image: "/images/home/bavarian-alps-2.png",
  },
  {
    id: 3,
    title: "Bavaria, Germany",
    subtitle: "Bavaria, Germany",
    image: "/images/home/bavarian-alps-3.png",
  },
  {
    id: 4,
    title: "Bavaria, Germany",
    subtitle: "Bavaria, Germany",
    image: "/images/home/bavarian-alps-4.png",
  },
  {
    id: 5,
    title: "Bavaria, Germany",
    subtitle: "Bavaria, Germany",
    image: "/images/home/bavarian-alps-5.png",
  },
  {
    id: 6,
    title: "Bavaria, Germany",
    subtitle: "Bavaria, Germany",
    image: "/images/home/bavarian-alps-6.png",
  },
]

const cityCommunities = [
  {
    id: 1,
    title: "Munich",
    image: "/images/home/munich-city.png",
  },
  {
    id: 2,
    title: "Zurich",
    image: "/images/home/zurich-city.png",
  },
  {
    id: 3,
    title: "Geneva",
    image: "/images/home/geneva-city.png",
  },
  {
    id: 4,
    title: "Innsbruck",
    image: "/images/home/innsbruck-city.png",
  },
  {
    id: 5,
    title: "Virginia",
    image: "/images/home/virginia-landscape.png",
  },
]

const pastEvents = [
  {
    id: 1,
    title: "Bavaria, Germany",
    subtitle: "Bavaria, Germany",
    image: "/images/home/past-event-1.png",
  },
  {
    id: 2,
    title: "Bavaria, Germany",
    subtitle: "Bavaria, Germany",
    image: "/images/home/past-event-2.png",
  },
  {
    id: 3,
    title: "Bavaria, Germany",
    subtitle: "Bavaria, Germany",
    image: "/images/home/past-event-3.png",
  },
  {
    id: 4,
    title: "Bavaria, Germany",
    subtitle: "Bavaria, Germany",
    image: "/images/home/past-event-4.png",
  },
]

export default function HomePage() {
  const activitiesRef = useAutoAnimate<HTMLDivElement>()
  const routesRef = useAutoAnimate<HTMLDivElement>()
  const communitiesRef = useAutoAnimate<HTMLDivElement>()
  const pastEventsRef = useAutoAnimate<HTMLDivElement>()

  return (
    <>
      {/* Header */}
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-10xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
              {/* Left Content */}
              <div className="flex items-center px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="max-w-lg">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Let the Adventure Begin
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">
                    Find an event organized by the community of outdoor lovers, or explore the collection of routes to
                    plan your own
                  </p>
                  <div className="relative">
                    <label htmlFor="hero-search" className="sr-only">
                      Search for an event
                    </label>
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                      aria-hidden="true"
                    />
                    <Input
                      id="hero-search"
                      placeholder="Munich Hbf..."
                      className="pl-10 h-12 text-base bg-white border-gray-300 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative">
                <Image
                  src="/images/home/hero-mountain-landscape.png"
                  alt="A stunning mountain landscape at sunset with a trail leading towards the peaks."
                  width={600}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Activity Categories */}
        <section className="py-8" aria-labelledby="activity-categories-heading">
          <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="activity-categories-heading" className="sr-only">
              Activity Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" ref={activitiesRef}>
              {activityCategories.map((activity) => (
                <div key={activity.id} className="relative group cursor-pointer transition-transform hover:scale-105">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={activity.image || "/placeholder.svg"}
                      alt={`View events for ${activity.title}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4 group-hover:bg-opacity-40 transition-all">
                      <div className="text-white">
                        <h3 className="font-semibold text-lg">
                          <a href="#" className="focus:outline-none before:absolute before:inset-0 before:content-['']">
                            {activity.title}
                            {activity.isViewAll && (
                              <ArrowRight
                                className="inline-block ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                                aria-hidden="true"
                              />
                            )}
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we stand for */}
        <section className="py-16 bg-gray-50" aria-labelledby="what-we-stand-for-heading">
          <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Image */}
              <div className="relative">
                <Image
                  src="/images/home/rock-climbing-scene.png"
                  alt="A person rock climbing on a sunny day, viewed from below."
                  width={400}
                  height={400}
                  className="w-full h-96 object-cover rounded-lg transition-transform hover:scale-105"
                />
              </div>

              {/* Right Content */}
              <div>
                <h2 id="what-we-stand-for-heading" className="text-3xl font-bold text-gray-900 mb-6">
                  What we stand for
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  We are a community of outdoor sports lovers and restless mountain explorers and we believe it is more
                  fun to do it together. Most of events are organized by passionate community members, just like you,
                  and therefore free of charge except transportation and personal costs.
                </p>
                <Button asChild variant="link" className="text-primary p-0 text-base transition-all hover:scale-105">
                  <a href="#">
                    More about community rules and values
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform hover:translate-x-1" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Explore hiking routes */}
        <section className="py-16" aria-labelledby="explore-hiking-routes-heading">
          <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="explore-hiking-routes-heading" className="text-3xl font-bold text-gray-900 mb-8">
              Explore hiking routes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" ref={routesRef}>
              {hikingRoutes.map((route) => (
                <div key={route.id} className="group relative cursor-pointer transition-transform hover:scale-105">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3">
                    <Image
                      src={route.image || "/placeholder.svg"}
                      alt={`Scenic view of a hiking route in ${route.title}`}
                      width={300}
                      height={225}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    <a href="#" className="focus:outline-none before:absolute before:inset-0 before:content-['']">
                      {route.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 text-sm">{route.subtitle}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button asChild variant="link" className="text-primary text-base transition-all hover:scale-105">
                <a href="#" aria-label="Explore more hiking routes">
                  Explore more routes
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform hover:translate-x-1" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Active city communities */}
        <section className="py-16 bg-gray-50" aria-labelledby="active-city-communities-heading">
          <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="active-city-communities-heading" className="text-3xl font-bold text-gray-900 mb-8">
              Active city communities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8" ref={communitiesRef}>
              {cityCommunities.map((city) => (
                <div key={city.id} className="group relative cursor-pointer transition-transform hover:scale-105">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={city.image || "/placeholder.svg"}
                      alt={`A view of the city of ${city.title}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4 group-hover:bg-opacity-40 transition-all">
                      <h3 className="text-white font-semibold">
                        <a href="#" className="focus:outline-none before:absolute before:inset-0 before:content-['']">
                          {city.title}
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button asChild variant="link" className="text-primary text-base transition-all hover:scale-105">
                <a href="#" aria-label="Explore more city communities">
                  Explore more communities
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform hover:translate-x-1" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Past events */}
        <section className="py-16" aria-labelledby="past-events-heading">
          <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="past-events-heading" className="text-3xl font-bold text-gray-900 mb-8">
              Past events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" ref={pastEventsRef}>
              {pastEvents.map((event) => (
                <div key={event.id} className="group relative cursor-pointer transition-transform hover:scale-105">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={`Photo from a past event in ${event.title}`}
                      width={300}
                      height={225}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    <a href="#" className="focus:outline-none before:absolute before:inset-0 before:content-['']">
                      {event.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 text-sm">{event.subtitle}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button asChild variant="link" className="text-primary text-base transition-all hover:scale-105">
                <a href="#" aria-label="Explore more past events">
                  Explore more past events
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform hover:translate-x-1" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="hover:text-gray-900 transition-colors">
                Imprint
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                About
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Terms and Conditions
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Contact
              </a>
            </div>
            <div>© 2024 Hiking Buddies</div>
          </div>
        </div>
      </footer>
    </>
  )
}
