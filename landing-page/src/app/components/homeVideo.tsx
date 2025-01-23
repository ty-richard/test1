interface HomeVideoProps {
  videoUrl: string;
}

const HomeVideo = ({ videoUrl }: HomeVideoProps) => {
  return (
    <div className="w-full">
      <video
        className="w-full h-auto"
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HomeVideo;
