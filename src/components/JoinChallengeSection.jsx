import React from 'react';
import ChallengeCard from './ChallengeCard';
import { challenges } from '../components/ChallengeData';

function JoinChallengeSection() {
  return (
    <section className="py-8 md:py-12">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center md:mb-16">
          <h1 className="sm:text-5xl font-regular text-green-700 font-itim">
            Take the Challenge. Be the Change!
          </h1>
          <p className=" mt-5 text-base font-small sm:text-lg text-gray-600 font-poppins">
            "Complete eco-challenges, climb the leaderboard, and unlock special
            rewards!"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id} // Important for list rendering
              id={challenge.id}
              title={challenge.title}
              task={challenge.task}
              duration={challenge.duration}
              description={challenge.description}
              imageUrl={challenge.imageUrl}
              imageAlt={challenge.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default JoinChallengeSection;
