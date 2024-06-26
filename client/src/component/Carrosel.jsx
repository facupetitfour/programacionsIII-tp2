import React from 'react';
import Slider from 'react-slick';
import { listBodegas } from "../assets/data";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carrosel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false 
  };

  return (
    <Box sx={{ width: '80%', margin: 'auto', marginTop: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Bodegas Maipucinas
      </Typography>
      <Slider {...settings}>
        {listBodegas.map((bodega, index) => (
          <Card key={index} sx={{ maxWidth: '100%', boxShadow: 3, borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="400"
              image={bodega.url}
              alt={bodega.name}
              sx={{ borderRadius: 2 }}
            />
          </Card>
        ))}
      </Slider>
    </Box>
  );
}

export default Carrosel;
