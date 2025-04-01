import Image from 'next/image';
import { dm_sans } from '../fonts';

interface HomeImageProps {
  imagePath: string;
  alt: string;
}

const HomeImage: React.FC<HomeImageProps> = ({ imagePath, alt }) => {
  return (
    <div className="w-full relative h-[300px] sm:h-[400px]">
      <Image
        src={imagePath}
        alt={alt}
        fill
        className="object-cover brightness-75"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-start p-8">
        <h1 className={`${dm_sans.className} text-mint text-6xl font-extrabold lowercase z-10`}>
          Inspiration for every direction
        </h1>
      </div>
    </div>
  );
};

export default HomeImage;
