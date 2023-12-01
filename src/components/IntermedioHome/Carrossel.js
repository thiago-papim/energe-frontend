import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import torres from '../../imagens/torres.jpg';
import banner from '../../imagens/banner.jpg';

class Carrosel extends React.Component {
  render() {
    const images = [
      torres,
      banner,
    ];

    const settings = {
      dots: false,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
    };

    return (
      <Slider { ...settings } className="bg-black w-[80%] h-[500px]">
        {images.map((imageUrl, index) => (
          <div key={ index } className="h-[500px] w-full">
            <img
              src={ imageUrl }
              alt={ `Slide ${index + 1}` }
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </Slider>
    );
  }
}

export default Carrosel;
