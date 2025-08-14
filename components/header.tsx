"use client"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import CreateEventModal from "./create-event-modal"

export default function Header() {
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false)

  const handleSearchIconClick = () => {
    setIsSearchActive(true)
  }

  return (
    <>
      <header className="bg-white">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/hiking-buddies-logo.svg"
                  alt="Hiking Buddies Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* Search and Profile */}
            <div className="flex items-center space-x-4">
              {/* Navigation */}
              <nav aria-label="Main">
                <div className="hidden md:flex space-x-8">
                  <Link href="/events" className="text-gray-500 hover:text-gray-900 transition-colors">
                    Events
                  </Link>
                  <Link href="/routes" className="text-gray-500 hover:text-gray-900 transition-colors">
                    Routes
                  </Link>
                  <button
                    onClick={() => setIsCreateEventModalOpen(true)}
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Organize event
                  </button>
                </div>
              </nav>

              <div className="relative hidden md:block">
                <label htmlFor="header-search" className="sr-only">
                  Search
                </label>
                <div className={`relative transition-all duration-300 ease-in-out ${isSearchActive ? "w-64" : "w-10"}`}>
                  <Search
                    className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-all duration-300 cursor-pointer hover:text-gray-600 z-10 ${
                      isSearchActive ? "left-3 pointer-events-none" : "left-1/2 -translate-x-1/2 pointer-events-auto"
                    }`}
                    aria-hidden="true"
                    onClick={handleSearchIconClick}
                  />
                  <Input
                    id="header-search"
                    placeholder={isSearchActive ? "Search..." : ""}
                    className={`transition-all duration-300 ease-in-out focus:border-[#00AD7D] focus:ring-2 focus:ring-[#00AD7D]/20 ${
                      isSearchActive
                        ? "pl-10 pr-4 w-full rounded-md"
                        : "w-10 h-10 rounded-full pl-0 pr-0 cursor-pointer"
                    }`}
                    onFocus={() => setIsSearchActive(true)}
                    onBlur={() => setIsSearchActive(false)}
                  />
                </div>
              </div>
              <Link href="/profile">
                <Avatar className="transition-transform hover:scale-105 cursor-pointer">
                  <AvatarImage src="/images/profile/anna-profile.png" alt="Anna's profile picture" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <CreateEventModal isOpen={isCreateEventModalOpen} onClose={() => setIsCreateEventModalOpen(false)} />
    </>
  )
}
