// import HomeVideo from "../components/homeVideo";
import HomeImage from "../components/homeImage";
import HomeToggleItem from "../components/homeToggleItem";
import { dm_sans } from "../fonts";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 ${dm_sans.className}`}>
      <Suspense fallback={<div>Loading...</div>}>
        <main className="flex flex-col gap-4 sm:gap-8 row-start-2 items-center sm:items-start w-full">
          {/* <HomeVideo videoUrl="https://www.youtube.com/watch?v=5Peo-ivmupE" /> */}
          <HomeImage imagePath="/static/images/stockTravelPhoto.jpg" alt="Home travel photo" />
          <HomeToggleItem />
        </main>
      </Suspense>
    </div>
  );
}
