import React from 'react';
import UpsellCard from '@/app/components/cards/upsellCard';
import FreeCard from '@/app/components/cards/freeCard';

export default function UpsellPage() {
  return (
    <main className="container mx-auto px-4 py-8 mb-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Discover The Xplorist Premium!</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="upsell-container h-[600px]">
          <FreeCard />
        </div>
        <div className="upsell-container h-[600px]">
          <UpsellCard />
        </div>
      </div>
    </main>
  );
}
