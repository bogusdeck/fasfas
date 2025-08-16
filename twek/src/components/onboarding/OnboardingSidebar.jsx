import { ONBOARDING_STEPS } from '../../utils/constants';

export default function OnboardingSidebar({ currentStep = 1 }) {
  const steps = [
    { number: 1, title: 'GSTIN Check', icon: '🏢' },
    { number: 2, title: 'Basic Information', icon: '📋' },
    { number: 3, title: 'Signature Upload', icon: '✍️' },
    { number: 4, title: 'Business Preferences', icon: '⚙️' },
    { number: 5, title: 'Warehouse Details', icon: '🏪' },
    { number: 6, title: 'Brand Details', icon: '🛍️' },
    { number: 7, title: 'Bank Details', icon: '🏦' },
    { number: 8, title: 'Declaration', icon: '✅' },
  ];

  const completedSteps = steps.filter(step => step.number < currentStep).length;
  const progressPercentage = Math.round((completedSteps / steps.length) * 100);

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white/95 backdrop-blur-md border-r-2 border-[#241331]/20 shadow-xl z-40 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-[#241331]/20 bg-gradient-to-r from-[#241331]/5 to-[#C3AF6C]/5">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-[#241331] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 font-itc-gothic">
            F
          </div>
          <h2 className="text-lg font-bold text-[#241331] font-itc-gothic">Brand Registration</h2>
        </div>
        <p className="text-sm text-[#241331]/70 font-itc-gothic">Brand Onboarding Process</p>
      </div>

      {/* Progress Section */}
      <div className="p-6 bg-[#C3AF6C]/5 border-b border-[#241331]/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#241331] font-itc-gothic">Completion Progress</span>
          <span className="text-sm font-bold text-[#C3AF6C] font-itc-gothic">{progressPercentage}% Complete</span>
        </div>
        <div className="w-full bg-[#241331]/10 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-[#241331] to-[#C3AF6C] h-3 rounded-full transition-all duration-500 shadow-lg" 
            style={{ width: `${(currentStep / 8) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Steps List */}
      <div className="p-4">
        <div className="space-y-2">
          {steps.map((step) => {
            const isActive = step.number === currentStep;
            const isCompleted = step.number < currentStep;
            const isAccessible = step.number <= currentStep;

            return (
              <div 
                key={step.number}
                className={`flex items-center p-3 rounded-lg border transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#C3AF6C]/10 border-[#C3AF6C] shadow-lg' 
                    : isCompleted
                    ? 'bg-[#241331]/5 border-[#241331]/30'
                    : isAccessible
                    ? 'bg-white border-[#241331]/20 hover:bg-[#241331]/5'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                {/* Step Icon/Number */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 font-itc-gothic ${
                  isCompleted
                    ? 'bg-[#241331] text-white'
                    : isActive
                    ? 'bg-[#C3AF6C] text-white'
                    : isAccessible
                    ? 'bg-[#241331]/20 text-[#241331]'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {isCompleted ? '✓' : step.number}
                </div>

                {/* Step Details */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold truncate font-itc-gothic ${
                    isActive 
                      ? 'text-[#C3AF6C]' 
                      : isCompleted
                      ? 'text-[#241331]'
                      : isAccessible
                      ? 'text-[#241331]'
                      : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                  {isActive && (
                    <p className="text-xs text-[#C3AF6C] mt-1 font-itc-gothic font-medium">Current Step</p>
                  )}
                  {isCompleted && (
                    <p className="text-xs text-[#241331] mt-1 font-itc-gothic font-medium">Completed</p>
                  )}
                </div>

                {/* Status Icon */}
                <span className="text-lg ml-2">{step.icon}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Help Section */}
      <div className="p-4 border-t border-[#241331]/20 bg-gradient-to-r from-[#C3AF6C]/5 to-[#241331]/5">
        <div className="text-center">
          <div className="w-12 h-12 bg-[#C3AF6C]/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-[#C3AF6C] text-xl">💡</span>
          </div>
          <h3 className="text-sm font-bold text-[#241331] mb-2 font-itc-gothic">Need Help?</h3>
          <p className="text-xs text-[#241331]/70 mb-3 font-itc-gothic">
            Our support team is here to assist you with the onboarding process.
          </p>
          <button className="w-full px-3 py-2 bg-[#241331] text-white text-xs font-bold rounded-lg hover:bg-[#1a0e24] transition-all duration-200 shadow-lg hover:shadow-xl font-itc-gothic">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
