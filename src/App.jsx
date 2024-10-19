import React, { useState } from 'react';
import SubredditArena from './components/SubredditArena';
import { PlusIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import './index.css';

const App = () => {
  const [subreddits, setSubreddits] = useState([]);
  const [newSubreddit, setNewSubreddit] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);

  const handleAddSubreddit = () => {
    if (newSubreddit.trim() !== '') {
      setSubreddits([...subreddits, newSubreddit.trim()]);
      setNewSubreddit('');
      setIsModalOpen(false);
      setIsWelcomeVisible(false);
    }
  };

  const handleDeleteSubreddit = (indexToDelete) => {
    setSubreddits(subreddits.filter((_, index) => index !== indexToDelete));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen flex flex-col`}>
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <img 
              src="/images/redditLogo.gif" 
              alt="Reddit Arena" 
              className="h-12 w-12 rounded-full cursor-pointer"
              onClick={() => setIsWelcomeVisible(true)}
            />
          </div>

          {/* Right Section - Dark Mode Toggle and Add Lane */}
          <div className="flex items-center space-x-4">
            {!isWelcomeVisible && (
              <>
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
                  onClick={() => setIsModalOpen(true)}
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add Lane
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
                  onClick={() => setSubreddits([])}
                >
                  Clear All
                </button>
              </>
            )}
            <button
              className={`font-bold py-2 px-4 rounded flex items-center 
                ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-300 hover:bg-gray-200 text-black'}`}
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <SunIcon className="h-5 w-5 mr-2" /> : <MoonIcon className="h-5 w-5 mr-2" />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </header>

      <div className="relative w-full flex-1 pt-16"> {/* Added pt-16 to account for header height */}
        {/* Welcome Screen */}
        <div 
          className={`absolute inset-0 flex items-center justify-center z-20
            ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}
            transition-all duration-500 
            ${isWelcomeVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          <div className={`p-8 rounded-lg shadow-lg w-full max-w-3xl text-center relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h1 className="text-3xl font-bold mb-4">Welcome to Reddit Arena!</h1>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
              Stay updated with multiple subreddits at once! Add your favorite subreddits as lanes and track their latest posts side by side. 
              Perfect for moderators, power users, or anyone who loves to keep up with multiple communities simultaneously.
            </p>
            <div className="flex justify-center mb-4">
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
                onClick={() => setIsModalOpen(true)}
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Your First Lane
              </button>
            </div>
          </div>
        </div>

        {/* Subreddit Arena */}
        <div 
          className={`absolute inset-0 z-10 pt-16
            ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}
            transition-opacity duration-500 
            ${isWelcomeVisible ? 'opacity-0' : 'opacity-100'}`}
          style={{ pointerEvents: isWelcomeVisible ? 'none' : 'auto' }}
        >
          <SubredditArena 
            subreddits={subreddits} 
            isDarkMode={isDarkMode} 
            onDeleteSubreddit={handleDeleteSubreddit}
          />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className={`p-6 rounded-lg shadow-lg w-full max-w-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <h2 className="text-xl font-bold mb-4">Enter subreddit name</h2>
              <input
                type="text"
                placeholder="Enter subreddit name (without r/)"
                className={`border px-4 py-2 mb-4 w-full rounded
                  ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-400'}`}
                value={newSubreddit}
                onChange={(e) => setNewSubreddit(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddSubreddit();
                  }
                }}
                autoFocus
              />
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAddSubreddit}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {isWelcomeVisible && (
        <footer className="bg-orange-500 text-white py-4">
          <div className="container mx-auto flex justify-center space-x-4">
            <a href="https://github.com/pranjalTripathi2003/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/pranjaltripathi2003/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;