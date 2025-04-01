'use client';

import { PencilIcon } from '@heroicons/react/24/outline';
import User from '@/types/user';
import userData from '@/data/user.json';
import { dm_sans, inter, roboto_serif } from '@/app/fonts';
import Link from 'next/link';
import ProfileForm from '@/app/components/forms/profileform';
import { useState } from 'react';
import { getUserEntitlement } from '@/utils/helpers';

export default function Profile() {
  const user: User = userData.user;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="p-6 border-2 border-navy rounded-lg mb-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-semibold ${roboto_serif.className}`}>Personal Information</h2>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className={`flex items-center gap-2 text-navy hover:text-navy ${inter.className}`}
          >
            <PencilIcon className="h-5 w-5" />
            <span>Edit</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className={`text-sm font-bold text-navy mb-1 ${inter.className}`}>First Name</h3>
            <p className={`text-navy ${inter.className}`}>{user.firstName}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-navy mb-1">Last Name</h3>
            <p className="text-navy">{user.lastName}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-navy mb-1">Email Address</h3>
            <p className={`text-navy ${inter.className}`}>{user.email}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-navy mb-1">Phone Number</h3>
            <p className={`text-navy ${inter.className}`}>{user.phoneNumber}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-navy mb-1">Country of Residence</h3>
            <p className={`text-navy ${inter.className}`}>{user.country}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-navy mb-1">Home Airport</h3>
            <p className={`text-navy ${inter.className}`}>{user.homeAirport}</p>
          </div>
        </div>
      </div>
      <div className="p-6 border-2 border-navy rounded-lg">
        <h2 className={`text-2xl font-semibold mb-6 ${roboto_serif.className}`}>Account Type</h2>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className={`text-navy ${inter.className}`}>
            {getUserEntitlement(user) ? "Premium Account" : "Free Account"}
          </p>
          {!getUserEntitlement(user) && (
            <Link href="/upsell" className={`px-4 py-2 border-2 border-navy rounded-lg bg-mint text-navy hover:bg-mint transition-colors font-bold ${dm_sans.className}`}>
              Upgrade to Premium
            </Link>
          )}
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-navy/50 flex items-center justify-center p-4 z-50">
          <div className="bg-light w-full max-w-lg rounded-xl">
            <ProfileForm onClose={() => setIsEditModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
