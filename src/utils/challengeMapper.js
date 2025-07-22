import challenges from '../data/challenges';
import { challenges as challengeCards } from '../components/ChallengeData';

// This function maps a challenge card ID to the corresponding detailed challenge
export const mapChallengeCardToDetail = (cardId) => {
  // Find the challenge card to get its title for better mapping
  const challengeCard = challengeCards.find((card) => card.id === cardId);

  // Map between card IDs and detailed challenge IDs
  // We could also use the challenge card title to determine the best match
  const idMapping = {
    1: 1, // Recycling Challenge
    2: 2, // Energy Conservation Challenge
    3: 3, // Water Conservation Challenge
    4: 4, // Sustainable Transportation Challenge
    5: 2, // Map to Energy Conservation as fallback
    6: 3, // Map to Water Conservation as fallback
  };

  // Log the challenge card being mapped for debugging
  console.log(`Mapping challenge card: ${challengeCard?.title || 'Unknown'}`);

  const detailId = idMapping[cardId] || 1; // Default to recycling challenge if no mapping
  return challenges.find((challenge) => challenge.id === detailId);
};

export default mapChallengeCardToDetail;
