// Import challenge images
import recyclingImage from '../assets/recycling-challenge-real.png'; // Updated to use the real image from the screenshot
import energyImage from '../assets/energy-challenge.png';
import waterImage from '../assets/water-challenge.png';
import transportImage from '../assets/transport-challenge.png';

const challenges = [
  {
    id: 1,
    title: 'Recycle 10 items in 2-3 days',
    type: 'Recycling & Waste Challenges',
    description: [
      'Collect and drop off 10 plastic bottles, cans, or paper within 2-3 days.',
      'Upload the images of yourself carrying out the task.',
      'Mark ask done, after the successful completion of the task.',
    ],
    image: recyclingImage,
    points: 50,
  },
  {
    id: 2,
    title: 'Reduce Energy Consumption',
    type: 'Energy Conservation Challenges',
    description: [
      'Reduce your energy consumption by 15% for 3 days.',
      'Upload screenshots of your energy meter readings before and after.',
      'Mark ask done, after the successful completion of the task.',
    ],
    image: energyImage,
    points: 75,
  },
  {
    id: 3,
    title: 'Save Water Challenge',
    type: 'Water Conservation Challenges',
    description: [
      'Reduce your water usage by 20% for one week.',
      'Upload proof of your water-saving methods and meter readings.',
      'Mark ask done, after the successful completion of the task.',
    ],
    image: waterImage,
    points: 60,
  },
  {
    id: 4,
    title: 'Green Transportation Week',
    type: 'Sustainable Transportation Challenges',
    description: [
      'Use public transportation, bike, or walk for all your commutes for 5 days.',
      'Upload photos of your green transportation methods.',
      'Mark ask done, after the successful completion of the task.',
    ],
    image: transportImage,
    points: 80,
  },
];

export default challenges;
