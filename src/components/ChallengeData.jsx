import pana from '../assets/pana.png';
import amico from '../assets/amico.png';
import mico from '../assets/mico.png';
import community from '../assets/community.png';
import nature from '../assets/nature.png';
import water from '../assets/water.png';


export const challenges = [
  {
    id: 1,
    title: 'Recycling Challenges',
    task: 'Recycle 10 items',
    duration: '2-3 days',
    description: 'Collect and drop off 10 plastic bottles, cans, or paper',
    imageUrl: pana,
    imageAlt: 'Illustration of a person recycling waste',
  },
  {
    id: 2,
    title: 'Green Living Challenges',
    task: 'Use reusable utensils',
    duration: '5-7 days',
    description: 'Bring a reusable cup/spoon/plate instead of plastic ones',
    imageUrl: amico,
    imageAlt: 'Illustration of a healthy salad bowl with reusable spoon',
  },
  {
    id: 3,
    title: 'Fun & Easy Challenges',
    task: '5 Day Streak',
    duration: '5 days',
    description: 'Do one eco-friendly action every day for 5 days',
    imageUrl: mico,
    imageAlt: 'Illustration of a person checking progress on a screen',
  },
  {
    id: 4,
    title: 'Community Challenges',
    task: 'Pick Up Litter',
    duration: '1 days',
    description: 'Clean up a small area near you',
    imageUrl: community,
    imageAlt: 'Illustration of people cleaning up',
  },
  {
    id: 5,
    title: 'Nature Challenges',
    task: 'Plant Something',
    duration: '14 days',
    description: 'Plant a tree or start a small garden',
    imageUrl: nature,
    imageAlt: 'Illustration of people planting a tree',
  },
  {
    id: 6,
    title: 'Save Water Challenges',
    task: 'Reuse Water',
    duration: '7 days',
    description: 'Use leftover water from washing food to water plants',
    imageUrl: water,
    imageAlt: 'Illustration of a person watering plants',
  },
];
