interface DescriptionItemProps {
  title: string;
  description: string;
}

const DescriptionItem: React.FC<DescriptionItemProps> = ({ title, description }) => {
  return (
    <div className="text-center">
      <h3 className="mb-2 text-3xl">{title}</h3>
      <p className="text-xs">{description}</p>
    </div>
  );
};

export default DescriptionItem;
