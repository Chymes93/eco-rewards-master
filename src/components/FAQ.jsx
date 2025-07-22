import React, { useState, useMemo } from 'react';
import SFAQ from '../assets/SFAQ.png';
import MiniFooter from './MiniFooter';

const faqData = [
  {
    question: 'What is Ecorewards and how does it work?',
    answer: (
      <>
        <span>
          Ecorewards is a digital rewards platform that encourages <br />{' '}
          individuals and businesses to adopt eco-friendly habits. By taking
          sustainable actions — like using reusable shopping bags, buying
          products in biodegradable packaging, or switching to refillable
          containers — users earn EcoPoints when they scan a unique QR code at
          participating locations. These points can be redeemed for rewards,
          discounts, or green giveaways.
        </span>
      </>
    ),
  },
  {
    question: 'How can I earn EcoPoints as a shopper?',
    answer: (
      <div className="text-left">
        <span>
          You can earn EcoPoints by taking simple, sustainable actions such as:
        </span>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Using your own reusable eco bag during shopping</li>
          <li>Buying products in recyclable or biodegradable packaging</li>
          <li>Choosing refillable bottles over single-use plastics</li>
          <li>Purchasing reconditioned or refurbished electronics</li>
          <li>
            Just scan the Ecorewards QR code at checkout or on the product to
            log your action and earn points instantly.
          </li>
        </ul>
      </div>
    ),
  },
  {
    question:
      'Which supermarkets and brands are currently partnered with Ecorewards?',
    answer: (
      <div className="text-left">
        <span>
          We’re proud to partner with eco-conscious retailers and brands that
          share our vision. You can find a full and regularly updated list of
          partner supermarkets, stores, and product brands on our [Partners
          Page]. Look out for Ecorewards signage in-store or on packaging to
          know where you can scan and earn!
        </span>
      </div>
    ),
  },
  {
    question: 'What can I redeem my EcoPoints for?',
    answer: (
      <div className="text-left">
        <span>
          Your EcoPoints can be redeemed for a variety of eco-friendly rewards,
          including:
        </span>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Discounts on groceries and sustainable products</li>
          <li>Gift vouchers and coupons from partner stores</li>
          <li>Entries into our monthly green lifestyle raffles</li>
          <li>Tree-planting contributions in your name</li>
          <li>
            You’ll be able to track and redeem your rewards via your <br />{' '}
            Ecorewards app or dashboard.
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: 'How does Ecorewards support businesses in going green?',
    answer: (
      <div className="text-left">
        <span>
          Ecorewards helps businesses transition to sustainability by offering
          visibility and incentives to customers who buy their eco-friendly
          products. We provide QR code tracking tools, eco-behavior <br />{' '}
          analytics, and co-branding opportunities that reward both the <br />{' '}
          business and the customer for reducing environmental impact.
        </span>
      </div>
    ),
  },
  {
    question: 'Can I track my carbon footprint reduction on the platform?',
    answer: (
      <div className="text-left">
        <span>
          Yes! Ecorewards allows users to view a summary of their eco-actions
          and how those actions contribute to reducing plastic waste, CO₂
          emissions, and landfill pressure. Over time, you’ll be able to measure
          your personal or organizational impact and even share your
          eco-milestones with your community.
        </span>
      </div>
    ),
  },
  {
    question: 'How can my company or store partner with Ecorewards?',
    answer: (
      <div className="text-left">
        <span>
          We welcome partnerships with businesses committed to sustainability.
          Whether you’re a retailer, product manufacturer, or service provider,
          we can help integrate our QR-based system into your operations. Visit
          our{' '}
          <a href="/partnership" className="text-blue-500">
            Partnership Page
          </a>{' '}
          or contact us directly to start the conversation.
        </span>
      </div>
    ),
  },
];

const FAQ = () => {
  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState('');

  // Filter questions and answers based on search
  const filteredFaq = useMemo(() => {
    if (!search.trim()) return faqData;
    const q = search.trim().toLowerCase();
    return faqData.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [search]);

  // Auto-select first result when searching
  React.useEffect(() => {
    if (filteredFaq.length === 0) return;
    setSelected(0);
  }, [search]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-8">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-2xl shadow-lg overflow-hidden bg-white md:gap-8 gap-4">
        {/* Left Column: Questions */}
        <div className="w-full md:w-1/3 bg-white flex flex-col py-6 md:py-10 px-2 md:px-0 gap-2">
          {filteredFaq.length === 0 ? (
            <div className="text-gray-400 px-4 md:px-8 py-4 text-center">
              No questions found.
            </div>
          ) : (
            filteredFaq.map((item, idx) => (
              <button
                key={idx}
                className={`text-left px-4 md:px-8 py-3 md:py-4 mb-2 rounded-xl transition font-medium text-base md:text-lg focus:outline-none whitespace-normal ${
                  idx === selected
                    ? 'bg-[#228B22] text-white font-semibold'
                    : 'bg-transparent text-gray-900 hover:bg-green-50'
                }`}
                onClick={() => setSelected(idx)}
              >
                {item.question}
              </button>
            ))
          )}
        </div>
        {/* Right Column: Answer */}
        <div className="w-full md:w-2/3 flex flex-col bg-gray-50">
          {/* Top Green Section */}
          <div className="bg-[#228B22]  rounded-tl-none md:px-12 px-4 pt-8 md:pt-10 pb-6 md:pb-8 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center w-full">
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="flex items-center justify-center w-full max-w-md mx-auto relative">
              <input
                className="w-full px-4 md:px-6 py-2 md:py-3 rounded-md border-none focus:ring-2 focus:ring-green-400 focus:outline-none text-base md:text-lg bg-white placeholder-gray-500 pr-14 shadow-md"
                type="text"
                placeholder="Type your question"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="absolute right-3 flex items-center h-full">
                <span className="flex items-center justify-center w-8 md:w-10 h-8 md:h-10">
                  <img
                    src={SFAQ}
                    alt="search"
                    className="w-6 h-6 md:w-8 md:h-8"
                  />
                </span>
              </span>
            </div>
          </div>
          {/* Question & Answer Section */}
          <div className="flex flex-col mt-6 md:mt-10 flex-1 px-4 md:px-12">
            {filteredFaq.length === 0 ? (
              <div className="text-gray-400 text-base md:text-lg text-center">
                No answer found for your query.
              </div>
            ) : (
              <>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6 text-center w-full">
                  {filteredFaq[selected].question}
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed w-full max-w-2xl text-left">
                  {typeof filteredFaq[selected].answer === 'string'
                    ? filteredFaq[selected].answer
                    : filteredFaq[selected].answer}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default FAQ;
