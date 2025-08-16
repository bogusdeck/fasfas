// ==============================================
// BRAND CONFIGURATION
// ==============================================
export const BRAND_CONFIG = {
  name: 'FASFAS',
  tagline: 'Your Brand, Our Platform',
  logo: {
    text: 'FASFAS',
    alt: 'FASFAS - Brand Marketplace Platform',
  },
};

// ==============================================
// HOMEPAGE CONTENT
// ==============================================

export const HERO_CONTENT = {
  title: "Launch Your Fashion Brand with FASFAS — 60-Min Delivery Marketplace",
  subtitle:
    "Sell fashion, not logistics. FASFAS handles storage, delivery, and customer service so you can focus on your brand. Reach customers faster, reduce returns, and grow with full onboarding support — all in our quick commerce ecosystem.",
  stats: [
    { value: "60 mins", label: "Fast Delivery to Customers" },
    { value: "↓ Returns", label: "Lower Return Rates with Speed" },
    { value: "100%", label: "Inventory Control with You" },
  ],
  buttons: {
    primary: {
      label: "Start Selling on FASFAS",
      href: "/signup",
    },
    secondary: {
      label: "Learn How It Works",
      href: "/how-it-works",
    },
  },
};


export const FEATURES_CONTENT = [
  {
    id: 1,
    title: 'Quick Onboarding',
    description: 'Get verified and start selling in just 24-48 hours with our streamlined onboarding process.',
    icon: 'lightning',
    iconColor: 'blue',
  },
  {
    id: 2,
    title: 'Verified Brands',
    description: 'Join a trusted marketplace with verified brands and secure payment processing.',
    icon: 'check',
    iconColor: 'green',
  },
  {
    id: 3,
    title: 'Customer Support',
    description: '24/7 dedicated support to help you grow your brand and resolve any issues quickly.',
    icon: 'heart',
    iconColor: 'purple',
  },
  {
    id: 4,
    title: 'Analytics Dashboard',
    description: 'Track your sales, inventory, and customer insights with powerful analytics tools.',
    icon: 'chart',
    iconColor: 'indigo',
  },
  {
    id: 5,
    title: 'Multi-Channel Sales',
    description: 'Sell across multiple channels including website, mobile app, and partner platforms.',
    icon: 'globe',
    iconColor: 'teal',
  },
  {
    id: 6,
    title: 'Inventory Management',
    description: 'Smart inventory tracking with automated reorder alerts and warehouse integration.',
    icon: 'package',
    iconColor: 'orange',
  },
];

// ==============================================
// AUTH FORMS CONTENT
// ==============================================
export const LOGIN_CONTENT = {
  title: 'Sign in to your account',
  subtitle: 'Welcome back! Please enter your credentials.',
  fields: {
    email: {
      label: 'Email address',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
    },
    password: {
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      required: true,
    },
  },
  buttons: {
    submit: 'Sign In',
    forgotPassword: 'Forgot your password?',
  },
  links: {
    signup: {
      text: "Don't have an account?",
      linkText: 'Sign up',
      href: '/signup',
    },
  },
};

export const SIGNUP_CONTENT = {
  title: 'Create your account',
  subtitle: 'Join us today! Please fill in your information.',
  fields: {
    firstName: {
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter your first name',
      required: true,
    },
    lastName: {
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter your last name',
      required: true,
    },
    email: {
      label: 'Email address',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
    },
    password: {
      label: 'Password',
      type: 'password',
      placeholder: 'Create a password',
      required: true,
    },
    confirmPassword: {
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
      required: true,
    },
  },
  buttons: {
    submit: 'Sign Up',
  },
  links: {
    login: {
      text: 'Already have an account?',
      linkText: 'Sign in',
      href: '/login',
    },
  },
};

// ==============================================
// MULTI-STEP REGISTRATION CONTENT
// ==============================================
export const REGISTRATION_STEPS = {
  1: {
    title: 'Phone Verification',
    subtitle: 'Please enter your phone number to get started',
    fields: {
      phoneNumber: {
        label: 'Phone Number',
        type: 'tel',
        placeholder: '9876543210',
        required: true,
        countryCode: '+91',
        pattern: '^[6-9]\\d{9}$',
        minLength: 10,
        maxLength: 10,
      },
    },
    buttons: {
      submit: 'Send Verification Code',
      back: null,
    },
  },
  2: {
    title: 'Verify Phone Number',
    subtitle: 'Enter the 6-digit code sent to your phone',
    fields: {
      verificationCode: {
        label: 'Verification Code',
        type: 'text',
        placeholder: '123456',
        required: true,
        maxLength: 6,
        minLength: 6,
        pattern: '^\\d{6}$',
      },
    },
    buttons: {
      submit: 'Verify Phone',
      back: 'Back',
      resend: 'Resend Code',
    },
  },
  3: {
    title: 'Email Verification',
    subtitle: 'Please enter your email address',
    fields: {
      email: {
        label: 'Email Address',
        type: 'email',
        placeholder: 'your.email@example.com',
        required: true,
      },
    },
    buttons: {
      submit: 'Send Email Verification',
      back: 'Back',
    },
  },
  4: {
    title: 'Verify Email',
    subtitle: 'Enter the 6-digit code sent to your email',
    fields: {
      emailVerificationCode: {
        label: 'Email Verification Code',
        type: 'text',
        placeholder: '123456',
        required: true,
        maxLength: 6,
        minLength: 6,
        pattern: '^\\d{6}$',
      },
    },
    buttons: {
      submit: 'Verify Email',
      back: 'Back',
      resend: 'Resend Code',
    },
  },
  5: {
    title: 'Create Password',
    subtitle: 'Create a secure password for your account',
    fields: {
      password: {
        label: 'Password',
        type: 'password',
        placeholder: 'Create a password',
        required: true,
      },
      confirmPassword: {
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Confirm your password',
        required: true,
      },
    },
    buttons: {
      submit: 'Complete Registration',
      back: 'Back',
    },
  },
};

export const REGISTRATION_PROGRESS = {
  totalSteps: 5,
  stepLabels: [
    'Phone',
    'Phone Verify',
    'Email',
    'Email Verify',
    'Password',
  ],
};

// ==============================================
// NAVIGATION CONSTANTS
// ==============================================
export const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export const BUTTONS = {
  login: {
    label: 'Login',
    href: '/login',
    variant: 'secondary',
  },
  signup: {
    label: 'Sign Up',
    href: '/signup',
    variant: 'primary',
  },
};

// ==============================================
// STYLING CONSTANTS
// ==============================================
export const NAVBAR_STYLES = {
  nav: 'bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-[#241331]/20 fixed top-0 left-0 right-0 z-50',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  flexContainer: 'flex justify-between items-center h-18',
  logoContainer: 'flex items-center space-x-3',
  logo: 'text-2xl font-black text-[#241331] font-itc-gothic',
  logoIcon: 'w-8 h-8 text-[#241331]',
  desktopMenu: 'hidden md:flex items-center space-x-8',
  mobileMenuButton: 'md:hidden flex items-center',
  navLink: 'text-[#241331] hover:text-[#C3AF6C] px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:bg-[#241331]/5 font-itc-gothic',
  primaryButton: 'bg-[#241331] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#1a0e24] transition-all duration-200 shadow-lg hover:shadow-xl font-itc-gothic',
  secondaryButton: 'border-2 border-[#241331] text-[#241331] px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#241331] hover:text-white transition-all duration-200 font-itc-gothic',
  buttonContainer: 'hidden md:flex items-center space-x-3',
  mobileMenu: 'px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md shadow-lg border-t-2 border-[#241331]/20',
  mobileNavLink: 'text-[#241331] hover:text-[#C3AF6C] block px-3 py-2 rounded-lg text-base font-bold transition-all duration-200 hover:bg-[#241331]/5 font-itc-gothic',
  mobilePrimaryButton: 'bg-[#241331] text-white block px-3 py-2.5 rounded-lg text-base font-bold hover:bg-[#1a0e24] transition-all duration-200 mt-4 shadow-lg font-itc-gothic',
  mobileSecondaryButton: 'border-2 border-[#241331] text-[#241331] block px-3 py-2.5 rounded-lg text-base font-bold hover:bg-[#241331] hover:text-white transition-all duration-200 mt-2 font-itc-gothic',
};

export const HERO_STYLES = {
  container: 'relative overflow-hidden bg-gradient-to-br from-[#241331]/5 via-white to-[#C3AF6C]/5',
  backgroundPattern: 'absolute inset-0 bg-grid-pattern opacity-5',
  content: 'relative px-4 py-24 mx-auto max-w-7xl lg:py-32',
  innerContent: 'text-center max-w-4xl mx-auto',
  title: 'text-5xl md:text-7xl font-black text-[#241331] mb-8 leading-tight font-itc-gothic',
  subtitle: 'text-xl md:text-2xl text-[#241331]/70 mb-12 max-w-3xl mx-auto leading-relaxed font-itc-gothic font-medium',
  statsContainer: 'flex flex-col sm:flex-row justify-center items-center gap-8 mb-12 py-8 border-y border-[#241331]/20',
  statItem: 'text-center',
  statValue: 'text-3xl md:text-4xl font-bold text-[#241331] font-itc-gothic',
  statLabel: 'text-sm text-[#241331]/60 mt-1 font-itc-gothic font-medium',
  buttonContainer: 'flex flex-col sm:flex-row gap-4 justify-center items-center',
  primaryButton: 'bg-[#241331] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1a0e24] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-itc-gothic',
  secondaryButton: 'border-2 border-[#241331] text-[#241331] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#241331] hover:text-white transition-all duration-300 font-itc-gothic',
  decorativeElements: 'absolute top-20 right-10 w-72 h-72 bg-[#241331]/10 rounded-full blur-3xl',
  decorativeElements2: 'absolute bottom-20 left-10 w-96 h-96 bg-[#241331]/15 rounded-full blur-3xl',
};

export const FEATURES_STYLES = {
  container: 'px-4 py-20 mx-auto max-w-7xl bg-gradient-to-b from-white to-[#241331]/5',
  header: 'text-center mb-16',
  headerTitle: 'text-4xl md:text-5xl font-black text-[#241331] mb-4 font-itc-gothic',
  headerSubtitle: 'text-xl text-[#241331]/70 max-w-3xl mx-auto font-itc-gothic font-medium',
  grid: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
  featureCard: 'group p-8 bg-white rounded-2xl shadow-sm border-2 border-[#241331]/10 hover:shadow-xl hover:border-[#241331]/30 transition-all duration-300 transform hover:-translate-y-2',
  iconContainer: 'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300',
  icon: 'w-8 h-8 transition-colors duration-300',
  title: 'text-xl font-bold text-[#241331] mb-4 text-center font-itc-gothic',
  description: 'text-[#241331]/60 text-center leading-relaxed font-itc-gothic',
};

export const AUTH_STYLES = {
  container: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-[#241331]/5 via-white to-[#C3AF6C]/5 py-12 px-4 sm:px-6 lg:px-8',
  formContainer: 'max-w-md w-full space-y-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-[#241331]/10',
  header: 'text-center',
  title: 'text-3xl font-extrabold text-[#241331] font-itc-gothic',
  subtitle: 'mt-2 text-sm text-[#241331]/70 font-itc-gothic',
  form: 'mt-8 space-y-6',
  fieldGroup: 'space-y-4',
  fieldContainer: 'relative',
  label: 'block text-sm font-medium text-[#241331] mb-1 font-itc-gothic',
  input: 'appearance-none relative block w-full px-3 py-3 border border-[#241331]/20 placeholder-[#241331]/50 text-[#241331] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3AF6C] focus:border-[#C3AF6C] focus:z-10 sm:text-sm font-itc-gothic transition-all duration-200',
  submitButton: 'group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#241331] hover:bg-[#1a0e24] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#241331] transition-all duration-200 shadow-lg hover:shadow-xl font-itc-gothic',
  linkContainer: 'text-center mt-4',
  linkText: 'text-sm text-[#241331]/70 font-itc-gothic',
  link: 'font-bold text-[#C3AF6C] hover:text-[#241331] transition-colors duration-200 font-itc-gothic',
  forgotPassword: 'text-sm text-[#C3AF6C] hover:text-[#241331] transition-colors duration-200 font-itc-gothic',
};

export const REGISTRATION_STYLES = {
  container: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-[#241331]/5 via-white to-[#C3AF6C]/5 py-12 px-4 sm:px-6 lg:px-8',
  formContainer: 'max-w-7xl w-full space-y-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-[#241331]/10',
  progressContainer: 'mb-8',
  progressBar: 'w-full bg-[#241331]/10 rounded-full h-3 mb-4',
  progressFill: 'bg-gradient-to-r from-[#241331] to-[#C3AF6C] h-3 rounded-full transition-all duration-500 shadow-lg',
  stepIndicator: 'flex justify-between text-xs text-[#241331]/60 mb-2 font-itc-gothic',
  currentStep: 'text-[#C3AF6C] font-bold font-itc-gothic',
  header: 'text-center',
  title: 'text-3xl font-extrabold text-[#241331] font-itc-gothic',
  subtitle: 'mt-2 text-sm text-[#241331]/70 font-itc-gothic',
  form: 'mt-8 space-y-6',
  fieldGroup: 'space-y-4',
  fieldContainer: 'relative',
  label: 'block text-sm font-medium text-[#241331] mb-1 font-itc-gothic',
  input: 'appearance-none relative block w-full px-3 py-3 border border-[#241331]/20 placeholder-[#241331]/50 text-[#241331] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3AF6C] focus:border-[#C3AF6C] focus:z-10 sm:text-sm font-itc-gothic transition-all duration-200',
  codeInput: 'appearance-none relative block w-full px-3 py-3 border border-[#241331]/20 placeholder-[#241331]/50 text-[#241331] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3AF6C] focus:border-[#C3AF6C] focus:z-10 sm:text-sm text-center text-2xl font-mono tracking-widest transition-all duration-200',
  buttonGroup: 'flex space-x-4',
  submitButton: 'flex-1 flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#241331] hover:bg-[#1a0e24] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#241331] transition-all duration-200 shadow-lg hover:shadow-xl font-itc-gothic',
  backButton: 'flex-1 flex justify-center py-3 px-4 border-2 border-[#241331]/20 text-sm font-bold rounded-lg text-[#241331] bg-white hover:bg-[#241331]/5 hover:border-[#241331] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#241331] transition-all duration-200 font-itc-gothic',
  resendButton: 'mt-4 text-center text-sm text-[#C3AF6C] hover:text-[#241331] cursor-pointer transition-colors duration-200 font-bold font-itc-gothic',
  linkContainer: 'text-center mt-4',
  linkText: 'text-sm text-[#241331]/70 font-itc-gothic',
  link: 'font-bold text-[#C3AF6C] hover:text-[#241331] transition-colors duration-200 font-itc-gothic',
};

// ==============================================
// COMMON COLORS
// ==============================================
export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  white: '#ffffff',
  black: '#000000',
};

// ==============================================
// COMMON SIZES
// ==============================================
export const SIZES = {
  container: {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
};

// ==============================================
// API ENDPOINTS (for future use)
// ==============================================
export const API_ENDPOINTS = {
  base: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
  },
  user: {
    profile: '/user/profile',
    update: '/user/update',
  },
};

// ==============================================
// BRAND ONBOARDING STEPS
// ==============================================
export const ONBOARDING_STEPS = {
  1: {
    title: 'GST Verification',
    subtitle: 'Verify your business GST number',
    fields: {
      gstNumber: {
        label: 'GST Number',
        type: 'text',
        placeholder: '07AAACG0569H1ZH',
        required: true,
        maxLength: 15,
      },
    },
    buttons: {
      back: 'Back',
      submit: 'Continue',
      verify: 'Verify GST',
    },
  },
  2: {
    title: 'Business Details',
    subtitle: 'Tell us about your business',
    buttons: {
      back: 'Back',
      submit: 'Continue',
    },
  },
  3: {
    title: 'Signature Upload',
    subtitle: 'Upload your digital signature',
    buttons: {
      back: 'Back',
      submit: 'Continue',
    },
  },
  4: {
    title: 'Business Preferences',
    subtitle: 'Select your business preference',
    buttons: {
      back: 'Back',
      submit: 'Continue',
    },
  },
  5: {
    title: 'Warehouse Details',
    subtitle: 'Provide your warehouse and order information',
    buttons: {
      back: 'Back',
      submit: 'Continue',
    },
  },
  6: {
    title: 'Brand and Product Details',
    subtitle: 'Upload your brand logo and define your product catalog',
    buttons: {
      back: 'Back',
      submit: 'Continue',
    },
  },
  7: {
    title: 'Banking Details',
    subtitle: 'Add your banking information and upload cancelled cheque',
    buttons: {
      back: 'Back',
      submit: 'Continue',
    },
  },
  8: {
    title: 'Review & Submit',
    subtitle: 'Review your information and accept terms & conditions',
    buttons: {
      back: 'Back',
      submit: 'Accept & Submit Application',
    },
  },
};

// ==============================================
// COMMON MESSAGES
// ==============================================
export const MESSAGES = {
  errors: {
    generic: 'Something went wrong. Please try again.',
    network: 'Network error. Please check your connection.',
    notFound: 'The requested resource was not found.',
    invalidIndianPhone: 'Please enter a valid Indian phone number (10 digits starting with 6, 7, 8, or 9)',
    passwordMismatch: 'Passwords do not match!',
    invalidVerificationCode: 'Please enter a valid 6-digit verification code',
    invalidGST: 'Please enter a valid GST number (15 characters)',
    gstNotFound: 'GST number not found. Please check and try again.',
    gstVerificationRequired: 'Please verify your GST number first',
  },
  success: {
    saved: 'Changes saved successfully!',
    deleted: 'Item deleted successfully!',
    created: 'Item created successfully!',
    smsSent: 'Verification code sent to your phone',
    emailSent: 'Verification code sent to your email',
    phoneVerified: 'Phone number verified successfully',
    emailVerified: 'Email verified successfully',
    registrationComplete: 'Registration completed successfully!',
    gstVerified: 'GST details verified successfully',
  },
  info: {
    phoneNumberHelp: 'Enter your 10-digit mobile number without country code',
    verificationCodeHelp: 'Enter the 6-digit code sent to your phone/email',
    passwordHelp: 'Password must be at least 8 characters long',
    gstHelp: 'Enter your 15-digit GST number (e.g., 07AAACG0569H1ZH)',
  },
};
