'use client';

import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { dm_sans, inter, roboto_serif } from '@/app/fonts';
import Link from 'next/link';

export default function Personalization() {
  const completedDates = [
    '10/14/2024',
    '08/22/2024',
    '05/15/2024'
  ];

  return (
    <div className="p-6 border-2 border-navy rounded-lg">
      <h2 className={`text-2xl font-semibold mb-6 ${roboto_serif.className}`}>
        Personalization Quiz
      </h2>
      
      <div className="space-y-3 mb-6">
        {completedDates.map((date, index) => (
          <div key={index} className="flex items-center space-x-2">
            <CheckCircleIcon className="h-5 w-5 text-navy" />
            <span className={`text-navy ${inter.className}`}>
              Completed {date}
            </span>
          </div>
        ))}
      </div>

      <Link
        href="/personalization"
        className={`inline-block px-4 py-2 border-2 border-navy rounded-lg bg-mint text-navy hover:bg-mint transition-colors font-bold ${dm_sans.className}`}
      >
        Retake Quiz
      </Link>
    </div>
  );
}
