import Image from 'next/image';

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
        className="object-cover"
        priority
      />
    </div>
  );
};

export default HomeImage;
