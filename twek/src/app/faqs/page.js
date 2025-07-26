'use client';

import { useState } from 'react';
import { FAQ_DATA } from '../../utils/data';
import { PAGE_CONTENT, BUTTON_TEXT } from '../../utils/content';

export default function FAQs() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {PAGE_CONTENT.FAQS.TITLE}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {PAGE_CONTENT.FAQS.SUBTITLE}
        </p>
      </div>

      <div className="space-y-4">
        {FAQ_DATA.map((faq, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium text-gray-900 dark:text-white">
                {faq.question}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-xl">
                {openItem === index ? '−' : '+'}
              </span>
            </button>
            {openItem === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          {PAGE_CONTENT.FAQS.CONTACT_TITLE}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {PAGE_CONTENT.FAQS.CONTACT_SUBTITLE}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
            {BUTTON_TEXT.CONTACT_SUPPORT}
          </button>
          <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
            {BUTTON_TEXT.EMAIL_US}
          </button>
        </div>
      </div>
    </div>
  );
}
