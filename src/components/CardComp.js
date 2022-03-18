import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

const CardComp = ({ playlist }) => {
  return (
    <a href={playlist.track.external_urls.spotify}>
      <Card sx={{ maxWidth: 150, m: 1 }} >
        <CardActions w='90%'>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={playlist.track.album.images[0].url}
            alt={playlist.track.album.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h9" component="a">
              {playlist.track.album.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        </CardActions>
      </Card>
    </a>
  )
}

export default CardComp