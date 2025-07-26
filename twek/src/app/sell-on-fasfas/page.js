import { SELL_ON_FASFAS_DATA } from '../../utils/data';
import { PAGE_CONTENT, BUTTON_TEXT } from '../../utils/content';

export default function SellOnFasFas() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {PAGE_CONTENT.SELL_ON_FASFAS.TITLE}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {PAGE_CONTENT.SELL_ON_FASFAS.SUBTITLE}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Benefits Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            {PAGE_CONTENT.SELL_ON_FASFAS.BENEFITS_TITLE}
          </h2>
          <div className="space-y-4">
            {SELL_ON_FASFAS_DATA.BENEFITS.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">{benefit.icon}</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {PAGE_CONTENT.SELL_ON_FASFAS.CTA_TITLE}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {PAGE_CONTENT.SELL_ON_FASFAS.CTA_SUBTITLE}
          </p>
          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
              {BUTTON_TEXT.START_SELLING}
            </button>
            <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-6 rounded-lg font-medium transition-colors duration-200">
              {BUTTON_TEXT.LEARN_MORE}
            </button>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-900 dark:text-white">
          {PAGE_CONTENT.SELL_ON_FASFAS.STEPS_TITLE}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SELL_ON_FASFAS_DATA.STEPS.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-white font-bold">{step.number}</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
