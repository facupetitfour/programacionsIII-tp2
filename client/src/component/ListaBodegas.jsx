import React from 'react';
import { listBodegas } from "../assets/data";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WineBarIcon from '@mui/icons-material/WineBar';
import {Comment} from './Comment'

const renderRating = (rating) => {
  const maxRating = 5;
  const fullGlasses = Math.min(rating, maxRating);
  const emptyGlasses = maxRating - fullGlasses;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
      {[...Array(fullGlasses)].map((_, index) => (
        <WineBarIcon key={`full-${index}`} />
      ))}
      {[...Array(emptyGlasses)].map((_, index) => (
        <WineBarIcon key={`empty-${index}`} style={{ color: '#ccc' }} />
      ))}
    </Box>
  );
}

const ListaBodega = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 2 }}>
      {listBodegas.map((bodega, index) => (
        <Card key={index} sx={{ maxWidth: 345, margin: 2 }}>
          <CardMedia
            component="img"
            height="140"
            image={bodega.url}
            alt={bodega.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {bodega.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {bodega.descripcion}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold'}}>
              {bodega.location}
            </Typography>
            {renderRating(bodega.rating)}
          <Comment/>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ListaBodega;
