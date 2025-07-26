// Navigation constants
export const NAVIGATION_CONSTANTS = {
  BRAND_NAME: "FasFas",
  BRAND_INITIAL: "F",
  
  // Navigation links
  NAV_LINKS: [
    {
      href: "/sell-on-fasfas",
      label: "Sell On FasFas",
      primary: true
    },
    {
      href: "/services",
      label: "Services",
      primary: false
    },
    {
      href: "/faqs",
      label: "FAQs",
      primary: false
    }
  ],
  
  // Authentication links
  AUTH_LINKS: {
    LOGIN: {
      href: "/login",
      label: "Login"
    },
    REGISTER: {
      href: "/registration",
      label: "Registration"
    }
  }
};

// Color constants
export const COLORS = {
  GRADIENTS: {
    PRIMARY: "from-blue-500 to-purple-600",
    PRIMARY_HOVER: "from-blue-600 to-purple-700",
    TEXT: "from-blue-600 to-purple-600"
  },
  BACKGROUNDS: {
    NAV: "bg-white/80 dark:bg-gray-900/80",
    MOBILE_MENU: "bg-white/95 dark:bg-gray-900/95"
  },
  BORDERS: {
    PRIMARY: "border-gray-200 dark:border-gray-700",
    BUTTON: "border-gray-300 dark:border-gray-600"
  },
  TEXT: {
    PRIMARY: "text-gray-900 dark:text-gray-100",
    SECONDARY: "text-gray-700 dark:text-gray-300",
    HOVER: "hover:text-blue-600 dark:hover:text-blue-400"
  }
};

// Business types for registration
export const BUSINESS_TYPES = [
  { value: "", label: "Select business type" },
  { value: "individual", label: "Individual Seller" },
  { value: "small-business", label: "Small Business" },
  { value: "corporation", label: "Corporation" },
  { value: "partnership", label: "Partnership" }
];

// Registration steps
export const REGISTRATION_STEPS = {
  MOBILE_VERIFICATION: 1,
  EMAIL_VERIFICATION: 2
};

export const REGISTRATION_STEP_NAMES = {
  [REGISTRATION_STEPS.MOBILE_VERIFICATION]: "Mobile Verification",
  [REGISTRATION_STEPS.EMAIL_VERIFICATION]: "Email Verification"
};

// Animation constants
export const ANIMATIONS = {
  TRANSITIONS: {
    DEFAULT: "transition-colors duration-200",
    BUTTON: "transition-all duration-200 transform hover:scale-105"
  },
  EFFECTS: {
    BACKDROP_BLUR: "backdrop-blur-lg",
    SHADOW: "shadow-lg hover:shadow-xl"
  }
};
