import { roboto_serif, inter } from '@/app/fonts';

interface DescriptionItemProps {
  title: string;
  description: string;
}

const DescriptionItem: React.FC<DescriptionItemProps> = ({ title, description }) => {
  return (
    <div className="text-center text-navy">
      <h3 className={`mb-2 text-3xl ${roboto_serif.className}`}>{title}</h3>
      <p className={`text-xs ${inter.className}`}>{description}</p>
    </div>
  );
};

export default DescriptionItem;
