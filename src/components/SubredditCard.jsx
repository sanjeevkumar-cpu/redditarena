import React from 'react';
import SubredditLane from './SubredditLane';

const SubredditCard = ({ subreddit, isDarkMode, onDelete, index }) => {
  return (
    <div className="flex-shrink-0 w-[350px] h-full">
      <div className="h-full mx-2 rounded-lg shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 flex flex-col bg-white dark:bg-gray-800">
          <SubredditLane
            subreddit={subreddit}
            isDarkMode={isDarkMode}
            onDelete={onDelete}
            index={index}
          />
        </div>
      </div>
    </div>
  );
};

export default SubredditCard;