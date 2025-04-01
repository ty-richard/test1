'use client';
import { useState } from 'react';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { inter, dm_sans } from '@/app/fonts';

interface ContactInfo {
    phoneNumber: string;
    website: string;
    address: string;
}

interface ExpandedInfoCellProps {
    title: string;
    contactInfo?: ContactInfo;
}

export default function ExpandedInfoCell({ title, contactInfo }: ExpandedInfoCellProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const renderContent = () => {
        if (!isExpanded) return null;

        switch (title) {
            case 'Contact Info':
                return contactInfo && (
                    <div className={`mt-4 space-y-2 text-navy-light ${inter.className}`}>
                        <p>{contactInfo.phoneNumber}</p>
                        <p>{contactInfo.address}</p>
                        <a 
                            href={contactInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-navy hover:underline"
                        >
                            {contactInfo.website}
                        </a>
                    </div>
                );
            case 'Other Reviews':
                return (
                    <div className={`mt-4 text-navy ${dm_sans.className}`}>
                        Other Reviews
                    </div>
                );
            case 'All Booking Providers':
                return (
                    <div className={`mt-4 text-navy ${inter.className}`}>
                        Booking Providers
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="border-b-navy border-b-2">
            <div 
                className="py-4 px-6 flex justify-between items-center cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h3 className={`text-lg text-navy ${inter.className}`}>{title}</h3>
                {isExpanded ? (
                    <ChevronDownIcon className="h-5 w-5 text-navy" />
                ) : (
                    <ChevronRightIcon className="h-5 w-5 text-navy" />
                )}
            </div>
            <div className={`px-6 pb-4 ${isExpanded ? 'block' : 'hidden'}`}>
                {renderContent()}
            </div>
        </div>
    );
}
