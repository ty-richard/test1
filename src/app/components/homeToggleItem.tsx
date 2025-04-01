'use client'

import { useState, useEffect } from 'react'
import HomeSearchBox from './homeSearchBox'
import HomeMap from './maps/homeMap'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { roboto_serif } from '@/app/fonts';
import { Autocomplete } from '@react-google-maps/api'
import { Libraries } from '@react-google-maps/api'
import { useLoadScript } from '@react-google-maps/api'
import { useSearchParams } from 'next/navigation'

const HomeToggleItem = () => {
  const searchParams = useSearchParams()
  const [showSearch, setShowSearch] = useState(() => {
    // Initialize showSearch based on URL parameter
    return !searchParams.get('showMap')
  })
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null)
  const [autocompleteInstance, setAutocompleteInstance] = useState<google.maps.places.Autocomplete | null>(null)
  
  const libraries: Libraries = ['places']
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries,
  })

  // Add useEffect to handle URL parameters
  useEffect(() => {
    if (searchParams.get('showMap') === 'true') {
      setShowSearch(false)
    }
  }, [searchParams])

  const onPlaceSelected = (place: google.maps.places.PlaceResult) => {
    setSelectedPlace(place)
    setShowSearch(false) // Switch to map view when place is selected
  }

  return (
    <div className="relative w-screen -ml-[max(0px,calc((100vw-100%)/2))] mb-32 sm:mb-16">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full px-4 sm:px-0">
        <h4 className={`${roboto_serif.className} text-center text-navy text-sm sm:text-base lg:text-lg mb-4`}>
          discover thousands of{' '}
          <br className="sm:hidden" />
          <span className="font-bold">curated, trusted & personalized{' '}</span>
          <br className="sm:hidden" />
          travel recommendations
        </h4>
        <div className="relative w-full max-w-[300px] mx-auto h-10 bg-skyBlue border border-navy rounded-lg shadow-md p-1">
          <div
            className={`absolute inset-y-1 w-[148px] bg-navy rounded-md transition-all duration-300 ease-in-out ${
              showSearch ? 'left-1' : 'left-[148px]'
            }`}
          />
          <div className="relative flex w-full h-full">
            <button
              onClick={() => setShowSearch(true)}
              className={`flex-1 rounded-md transition-colors duration-300 z-10 ${
                showSearch ? 'text-white' : 'text-navy'
              }`}
            >
              DESTINATIONS
            </button>
            <button
              onClick={() => setShowSearch(false)}
              className={`flex-1 rounded-md transition-colors duration-300 z-10 ${
                !showSearch ? 'text-white' : 'text-navy'
              }`}
            >
              MAP
            </button>
          </div>
        </div>
        <div className="relative mt-4 mb-4 w-full max-w-[300px] mx-auto">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          {isLoaded ? (
            <Autocomplete
              onLoad={(autocomplete) => {
                setAutocompleteInstance(autocomplete)
                autocomplete.setFields(['address_components', 'geometry', 'name'])
              }}
              onPlaceChanged={() => {
                const place = autocompleteInstance?.getPlace()
                if (place) {
                  onPlaceSelected(place)
                }
              }}
            >
              <input
                type="text"
                placeholder="JUST SAY WHERE"
                className="w-full pl-10 pr-4 py-2 bg-white rounded-lg shadow-md outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </Autocomplete>
          ) : (
            <input
              type="text"
              placeholder="Loading..."
              disabled
              className="w-full pl-10 pr-4 py-2 bg-white rounded-lg shadow-md outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          )}
        </div>
      </div>
      
      <div className="w-screen -ml-[max(0px,calc((100vw-100%)/2))]">
        {showSearch ? <HomeSearchBox /> : <HomeMap selectedPlace={selectedPlace} />}
      </div>
    </div>
  )
}

export default HomeToggleItem
