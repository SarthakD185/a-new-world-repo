// This component displays a grid of images that can be clicked to open in a lightbox
// Props:
// - data: array of image objects containing src and description
// - onClick: callback function to handle image click, receives index as parameter

const Images = (props) => {
  const { data, onClick } = props;

  // Calls the onClick prop with the clicked image's index
  const handleClickImage = (index) => {
    onClick(index);
  };

  return (
    // Container div with CSS grid layout
    <div className='images-container'>
      {/* Map through the images data array, taking  */}
      {data.map((slide, index) => (
        // Wrapper div for each image with click handler
        <div
          onClick={() => handleClickImage(index)}
          key={index}
          className='image'
        >
          {/* Image element displaying data the slide source (a URL) and description commit something new */}
          <img src={slide.src} alt={slide.description} />
        </div>
      ))}
    </div>
  );
};

export default Images; 