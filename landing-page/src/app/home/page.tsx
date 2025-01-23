// import HomeVideo from "../components/homeVideo";
import HomeImage from "../components/homeImage";
import HomeToggleItem from "../components/homeToggleItem";
// import Footer from "./components/footer";

export default function HomePage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <HomeVideo videoUrl="https://www.youtube.com/watch?v=5Peo-ivmupE" /> */}
        <HomeImage imagePath="/static/images/stockTravelPhoto.jpg" alt="Home travel photo" />
        <HomeToggleItem />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* <Footer /> */}
      </footer>
    </div>
  );
}
