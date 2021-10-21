import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import MasonryItem from '@mui/lab/MasonryItem';

export default function TrendingDestinations() {
  return (
    <Box sx={{ m: 3 ,width: '100vw - 6', minHeight: 829 }}>
      <Masonry columns={3} spacing={1}>
        {itemData.map((item) => (
          <MasonryItem key={item.img}>
            <img
              src={`${item.img}?w=162&auto=format`}
              srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
              alt={item.title}
            />
          </MasonryItem>
        ))}
      </Masonry>
    </Box>
  );
}

const itemData = [
  {
    img: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    title: 'Hot Air Balloon',
  },
  {
    img: 'https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    title: 'Mt. Fuji',
  },
  {
    img: 'https://images.pexels.com/photos/1310788/pexels-photo-1310788.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    title: 'Japanese',
  },
  {
    img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383',
    title: 'Tower',
  },
  {
    img: 'https://images.pexels.com/photos/397431/pexels-photo-397431.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    title: 'The Colosseum',
  },
  {
    img: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    title: 'Eiffel Tower',
  },
  {
    img: 'https://images.pexels.com/photos/3214958/pexels-photo-3214958.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    title: 'Petra',
  },
  {
    img: 'https://images.pexels.com/photos/1448136/pexels-photo-1448136.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    title: 'Stonehedge',
  },
  {
    img: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    title: 'Moraine Lake',
  },
  {
    img: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    title: 'Maldives',
  },
  {
    img: 'https://images.pexels.com/photos/2901215/pexels-photo-2901215.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    title: 'Canals',
  },
  {
    img: 'https://images.pexels.com/photos/2440009/pexels-photo-2440009.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    title: 'Waterfall',
  },
];