import DescriptionItem from './descriptionItem';

const HomeDescriptionItems = () => {
  return (
    <div className="w-full mb-8 bg-light">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 px-4">
        <DescriptionItem 
          title="eat"
          description="the unique flavors that define each destination"
        />
        <DescriptionItem 
          title="stay"
          description="accomodations to suit every preference"
        />
        <DescriptionItem 
          title="go"
          description="destinations to explore and lose yourself in"
        />
        <DescriptionItem 
          title="read"
          description="books to dive into for a deep cultural experience"
        />
        <DescriptionItem 
          title="watch"
          description="shows and films to immerse yourself in the culture"
        />
        <DescriptionItem 
          title="listen"
          description="experience the music and sounds that define the community"
        />
      </div>
    </div>
  );
};

export default HomeDescriptionItems;
