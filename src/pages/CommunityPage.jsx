import React, { useState } from 'react';
import { Search, ThumbsUp, MessageCircle, Share2, Plus, Menu, X } from 'lucide-react';
import smileImage from '../assets/Smile.png';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// Placeholder data for posts
const posts = [
  {
    id: 1,
    author: 'Alex',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CarbonFootprint_X',
    timestamp: '2h ago',
    title: 'How I Got 500pts Fast',
    content: 'To maximize points in EcoReward, focus on completing eco-friendly tasks, using sustainable products, participating in eco-challenges, tracking progress, referring friends, and staying updated on new opportunities',
    likes: 12,
    comments: 12,
    shares: 12,
    isMe: false,
    following: false,
  },
  {
    id: 2,
    author: 'Me',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenWarrior92',
    timestamp: '2h ago',
    title: 'How I Got 500pts Fast',
    content: 'To maximize points in EcoReward, focus on completing eco-friendly tasks, using sustainable products, participating in eco-challenges, tracking progress, referring friends, and staying updated on new opportunities',
    likes: 12,
    comments: 12,
    shares: 12,
    isMe: true,
    following: true,
  },
  {
    id: 3,
    author: 'Jane',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EcoHero_Tobi',
    timestamp: '3h ago',
    title: 'Sustainable Living Tips',
    content: 'Just wanted to share some tips on sustainable living! I started composting and it\'s been great. Also, using reusable bags for shopping makes a huge difference. What are your favorite tips?',
    likes: 45,
    comments: 23,
    shares: 8,
    isMe: false,
    following: true,
  },
  {
    id: 4,
    author: 'Tobi',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SustainableQueen',
    timestamp: '5h ago',
    title: 'EcoReward New Feature Idea',
    content: 'I think it would be cool to have a feature where we can trade points with friends. What do you all think? It could encourage more people to join and participate.',
    likes: 33,
    comments: 18,
    shares: 5,
    isMe: false,
    following: false,
  },
  {
    id: 5,
    author: 'Me',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenWarrior92',
    timestamp: '1d ago',
    title: 'My Eco-Challenge Progress',
    content: 'I\'ve completed 5 eco-challenges this week! It feels amazing to contribute to a healthier planet and earn rewards at the same time.',
    likes: 50,
    comments: 20,
    shares: 10,
    isMe: true,
    following: true,
  },
  {
    id: 6,
    author: 'Me',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenWarrior92',
    timestamp: '2d ago',
    title: 'Question about recycling',
    content: 'Does anyone know if you can recycle pizza boxes? I\'ve heard conflicting information. Some say yes, some say no because of the grease.',
    likes: 8,
    comments: 15,
    shares: 2,
    isMe: true,
    following: true,
  },

  {
    id: 8,
    author: 'Ada',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZeroWasteAda',
    timestamp: '2h ago',
    title: 'How I Got 500pts Fast',
    content: 'To maximize points in EcoReward, focus on completing eco-friendly tasks, using sustainable products, participating in eco-challenges, tracking progress, referring friends, and staying updated on new opportunities',
    likes: 12,
    comments: 12,
    shares: 12,
    following: true,
  },
  {
    id: 9,
    author: 'Me',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenWarrior92',
    timestamp: '2h ago',
    title: 'How I Got 500pts Fast',
    content: 'To maximize points in EcoReward, focus on completing eco-friendly tasks, using sustainable products, participating in eco-challenges, tracking progress, referring friends, and staying updated on new opportunities',
    likes: 12,
    comments: 12,
    shares: 12,
    isMe: true,
  },
  {
    id: 10,
    author: 'Mary Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RecycleKing_Lagos',
    timestamp: '2h ago',
    title: 'How I Got 500pts Fast',
    content: 'To maximize points in EcoReward, focus on completing eco-friendly tasks, using sustainable products, participating in eco-challenges, tracking progress, referring friends, and staying updated on new opportunities',
    likes: 12,
    comments: 12,
    shares: 12,
    following: false,
  },
];

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => {
    const matchesTab = activeTab === 'All' || (activeTab === 'My posts' && post.isMe);
    const matchesSearch = 
      searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const renderHeader = () => (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <img className="h-10 w-10 rounded-full" src="https://api.dicebear.com/7.x/avataaars/svg?seed=GreenWarrior92" alt="My Avatar" />
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-eco-green-light"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            <button
              onClick={() => setActiveTab('All')}
              className={`text-base font-medium ${activeTab === 'All' ? 'text-eco-green-dark border-b-2 border-eco-green-dark' : 'text-gray-500 hover:text-gray-900'}`}>
              All
            </button>
            <button
              onClick={() => setActiveTab('My posts')}
              className={`text-base font-medium ${activeTab === 'My posts' ? 'text-eco-green-dark border-b-2 border-eco-green-dark' : 'text-gray-500 hover:text-gray-900'}`}>
              My posts
            </button>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {activeTab === 'All' && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search topic"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-light focus:border-eco-green-light"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on mobileMenuOpen state. */}
      {mobileMenuOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img className="h-10 w-10 rounded-full" src="https://api.dicebear.com/7.x/avataaars/svg?seed=GreenWarrior92" alt="My Avatar" />
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-eco-green-light"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <button 
                    onClick={() => { setActiveTab('All'); setMobileMenuOpen(false); }} 
                    className={`-m-3 p-3 flex items-center rounded-md ${activeTab === 'All' ? 'bg-eco-gray' : 'hover:bg-gray-50'}`}>
                    <span className={`ml-3 text-base font-medium ${activeTab === 'All' ? 'text-eco-green-dark' : 'text-gray-900'}`}>All</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('My posts'); setMobileMenuOpen(false); }} 
                    className={`-m-3 p-3 flex items-center rounded-md ${activeTab === 'My posts' ? 'bg-eco-gray' : 'hover:bg-gray-50'}`}>
                    <span className={`ml-3 text-base font-medium ${activeTab === 'My posts' ? 'text-eco-green-dark' : 'text-gray-900'}`}>My posts</span>
                  </button>
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              {activeTab === 'All' && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search topic"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-light focus:border-eco-green-light"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="community-page-container">
      {renderHeader()}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'My posts' && (
          <div className="mb-6">
            <button className="bg-eco-green hover:bg-eco-green-dark text-white font-bold py-2 px-4 rounded-full inline-flex items-center">
              <Plus className="-ml-1 mr-2 h-5 w-5" />
              Create Post
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-eco-black rounded-2xl shadow-medium overflow-hidden text-white flex flex-col">
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center mb-4">
                  <img className="h-12 w-12 rounded-full" src={post.avatar} alt={post.author} />
                  <div className="ml-4">
                    <div className="text-lg font-poppins font-semibold">{post.author}</div>
                    <div className="text-sm text-gray-400">{post.timestamp}</div>
                  </div>
                  {!post.isMe && (
                    <button className={`ml-auto font-semibold py-1 px-3 rounded-full text-sm ${post.following ? 'bg-white text-eco-black' : 'bg-eco-green text-white'}`}>
                      {post.following ? 'Following' : 'Follow'}
                    </button>
                  )}
                </div>
                <div className="flex-grow">
                  <h4 className="font-poppins text-xl font-bold mb-2">{post.title}</h4>
                  <p className="text-gray-300 font-poppins text-base mb-4">{post.content}</p>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 hover:text-white">
                      <ThumbsUp size={20} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-white">
                      <MessageCircle size={20} />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                  <button className="hover:text-white">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeTab === 'All' && (
        <div className="bg-[#228B22]">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-0 lg:flex-1">
              <img className="h-auto w-full lg:max-w-md" src={smileImage} alt="Community illustration" />
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8 lg:w-0 lg:flex-1">
              <h2 className="text-3xl font-extrabold font-poppins tracking-tight text-white sm:text-4xl">
                Share your thoughts, ask questions, and celebrate milestones.
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-white font-poppins">
                Connect with fellow users as you grow on your journey to rewards. Whether you’re seeking tips, showcasing your progress, or helping others, the community is here to support and inspire every step of the way.
              </p>
              <div className="mt-6">
                <Link to="/partners" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-eco-green-dark bg-white hover:bg-eco-gray shadow-soft">
                  Become a partner
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CommunityPage;
