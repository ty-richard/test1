'use client';
import { useState } from 'react';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

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
                    <div className="mt-4 space-y-2 text-gray-600">
                        <p>{contactInfo.phoneNumber}</p>
                        <p>{contactInfo.address}</p>
                        <a 
                            href={contactInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {contactInfo.website}
                        </a>
                    </div>
                );
            case 'Other Reviews':
                return (
                    <div className="mt-4 text-gray-600">
                        Other Reviews
                    </div>
                );
            case 'All Booking Providers':
                return (
                    <div className="mt-4 text-gray-600">
                        Booking Providers
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="border-b-blue-500 border-b-2">
            <div 
                className="py-4 px-6 flex justify-between items-center cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h3 className="text-lg text-gray-700">{title}</h3>
                {isExpanded ? (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                ) : (
                    <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                )}
            </div>
            <div className={`px-6 pb-4 ${isExpanded ? 'block' : 'hidden'}`}>
                {renderContent()}
            </div>
        </div>
    );
}
