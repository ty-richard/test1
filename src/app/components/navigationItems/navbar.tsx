'use client'

import Link from "next/link"
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import userData from '@/data/user.json'
import { inter } from '@/app/fonts';
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { Autocomplete, useLoadScript, Libraries } from '@react-google-maps/api'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [autocompleteInstance, setAutocompleteInstance] = useState<google.maps.places.Autocomplete | null>(null);
    const router = useRouter();
    const user = userData.user;
    const [searchInputRef, setSearchInputRef] = useState<HTMLInputElement | null>(null);

    const libraries: Libraries = ['places']
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries: libraries,
    })

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const onPlaceSelected = (place: google.maps.places.PlaceResult) => {
        if (!place.geometry?.location) {
            console.warn('Place selected has no geometry');
            return;
        }
        
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const name = place.name || '';
        
        router.push(`/home?lat=${lat}&lng=${lng}&name=${encodeURIComponent(name)}&showMap=true`);
        
        // Clear the input
        if (searchInputRef) {
            searchInputRef.value = '';
        }
    }

    const getButtonText = () => {
        if (!user.signedUp) return "SIGN UP";
        return "SIGN IN";
    };

    const renderAuthOrSearch = () => {
        if (user.signedUp && user.signedIn) {
            return (
                <div className="relative flex items-center">
                    <MagnifyingGlassIcon
                        className="h-5 w-5 absolute left-3 text-navy z-10"
                    />
                    {isLoaded ? (
                        <Autocomplete
                            onLoad={(autocomplete) => {
                                setAutocompleteInstance(autocomplete);
                                autocomplete.setFields(['address_components', 'geometry', 'name']);
                            }}
                            onPlaceChanged={() => {
                                const place = autocompleteInstance?.getPlace();
                                if (place) {
                                    onPlaceSelected(place);
                                }
                            }}
                        >
                            <input
                                ref={(input) => setSearchInputRef(input)}
                                type="text"
                                placeholder={isMobile ? "WHERE TO!" : "JUST SAY WHERE"}
                                className={`pl-10 pr-4 py-2 bg-light border border-navy rounded-md font-dm-sans text-navy font-bold w-44 sm:w-56 ${inter.className}`}
                            />
                        </Autocomplete>
                    ) : (
                        <input
                            type="text"
                            placeholder="Loading..."
                            disabled
                            className={`pl-10 pr-4 py-2 bg-light border border-navy rounded-md font-dm-sans text-navy font-bold w-44 sm:w-56 ${inter.className}`}
                        />
                    )}
                </div>
            );
        }

        return (
            <Link 
                href="/api/auth/signin" 
                className="relative px-4 py-2 bg-light border border-navy rounded-md font-dm-sans text-navy font-bold"
            >
                {getButtonText()}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-sage rounded-full"></span>
            </Link>
        );
    };

    return (
        <nav className="relative flex items-center justify-between px-6 py-4 bg-light shadow-sm z-50">
            <div className="flex items-center">
                <Link href="/" className="text-navy hover:text-gray-300">
                    <Image 
                        src="/static/logos/TheXplorist_Logo_DarkBlue.svg"
                        alt="xplorist logo"
                        width={120}
                        height={40}
                        priority
                    />
                </Link>
            </div>
            
            <div className="flex items-center gap-2">
                {renderAuthOrSearch()}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-navy hover:text-mint"
                >
                    <EllipsisVerticalIcon className="h-6 w-6" />
                </button>
            </div>
            <ul className={`
                ${isMenuOpen ? 'flex' : 'hidden'}
                flex-col absolute top-full right-0 w-full 
                bg-light mt-2 p-4 z-50
            `}>
                <li>
                    <Link 
                        href="/home" 
                        onClick={() => setIsMenuOpen(false)} 
                        className="block py-2 text-navy hover:text-gray-300"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link 
                        href="/travelogue" 
                        onClick={() => setIsMenuOpen(false)} 
                        className="block py-2 text-navy hover:text-gray-300"
                    >
                        Travelogue
                    </Link>
                </li>
                <li>
                    <Link 
                        href="/account" 
                        onClick={() => setIsMenuOpen(false)} 
                        className="block py-2 text-navy hover:text-gray-300"
                    >
                        Account
                    </Link>
                </li>
                <li>
                    <Link 
                        href="/api/auth/signout" 
                        onClick={() => setIsMenuOpen(false)} 
                        className="block py-2 text-navy hover:text-gray-300"
                    >
                        Sign Out
                    </Link>
                </li>
            </ul>
        </nav>
    )
}