import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChallengeDetail from '../components/ChallengeDetail';
import UploadRecieptNav from '../components/UploadRecieptNav';
import MiniFooter from '../components/MiniFooter';
import { mapChallengeCardToDetail } from '../utils/challengeMapper';

const ChallengePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    // Find the challenge by ID
    const challengeId = parseInt(id);
    const foundChallenge = mapChallengeCardToDetail(challengeId);

    if (foundChallenge) {
      setChallenge(foundChallenge);
    } else {
      // Redirect to challenges list if challenge not found
      navigate('/join-challenge');
    }
  }, [id, navigate]);

  if (!challenge) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        backgroundColor: '#4caf50', // Exact green color from the screenshot
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <UploadRecieptNav />

      <div style={{ flex: 1, padding: '1rem' }}>
        <ChallengeDetail challenge={challenge} />
      </div>

      <MiniFooter />
    </div>
  );
};

export default ChallengePage;
