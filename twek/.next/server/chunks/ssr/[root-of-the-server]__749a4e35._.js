module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/utils/constants.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// ==============================================
// BRAND CONFIGURATION
// ==============================================
__turbopack_context__.s({
    "API_ENDPOINTS": ()=>API_ENDPOINTS,
    "AUTH_STYLES": ()=>AUTH_STYLES,
    "BRAND_CONFIG": ()=>BRAND_CONFIG,
    "BUTTONS": ()=>BUTTONS,
    "COLORS": ()=>COLORS,
    "FEATURES_CONTENT": ()=>FEATURES_CONTENT,
    "FEATURES_STYLES": ()=>FEATURES_STYLES,
    "HERO_CONTENT": ()=>HERO_CONTENT,
    "HERO_STYLES": ()=>HERO_STYLES,
    "LOGIN_CONTENT": ()=>LOGIN_CONTENT,
    "MESSAGES": ()=>MESSAGES,
    "NAVBAR_STYLES": ()=>NAVBAR_STYLES,
    "NAV_ITEMS": ()=>NAV_ITEMS,
    "ONBOARDING_STEPS": ()=>ONBOARDING_STEPS,
    "REGISTRATION_PROGRESS": ()=>REGISTRATION_PROGRESS,
    "REGISTRATION_STEPS": ()=>REGISTRATION_STEPS,
    "REGISTRATION_STYLES": ()=>REGISTRATION_STYLES,
    "SIGNUP_CONTENT": ()=>SIGNUP_CONTENT,
    "SIZES": ()=>SIZES
});
const BRAND_CONFIG = {
    name: 'FASFAS',
    tagline: 'Your Brand, Our Platform',
    logo: {
        text: 'FASFAS',
        alt: 'FASFAS - Brand Marketplace Platform'
    }
};
const HERO_CONTENT = {
    title: "Launch Your Fashion Brand with FASFAS — 60-Min Delivery Marketplace",
    subtitle: "Sell fashion, not logistics. FASFAS handles storage, delivery, and customer service so you can focus on your brand. Reach customers faster, reduce returns, and grow with full onboarding support — all in our quick commerce ecosystem.",
    stats: [
        {
            value: "60 mins",
            label: "Fast Delivery to Customers"
        },
        {
            value: "↓ Returns",
            label: "Lower Return Rates with Speed"
        },
        {
            value: "100%",
            label: "Inventory Control with You"
        }
    ],
    buttons: {
        primary: {
            label: "Start Selling on FASFAS",
            href: "/signup"
        },
        secondary: {
            label: "Learn How It Works",
            href: "/how-it-works"
        }
    }
};
const FEATURES_CONTENT = [
    {
        id: 1,
        title: 'Quick Onboarding',
        description: 'Get verified and start selling in just 24-48 hours with our streamlined onboarding process.',
        icon: 'lightning',
        iconColor: 'blue'
    },
    {
        id: 2,
        title: 'Verified Brands',
        description: 'Join a trusted marketplace with verified brands and secure payment processing.',
        icon: 'check',
        iconColor: 'green'
    },
    {
        id: 3,
        title: 'Customer Support',
        description: '24/7 dedicated support to help you grow your brand and resolve any issues quickly.',
        icon: 'heart',
        iconColor: 'purple'
    },
    {
        id: 4,
        title: 'Analytics Dashboard',
        description: 'Track your sales, inventory, and customer insights with powerful analytics tools.',
        icon: 'chart',
        iconColor: 'indigo'
    },
    {
        id: 5,
        title: 'Multi-Channel Sales',
        description: 'Sell across multiple channels including website, mobile app, and partner platforms.',
        icon: 'globe',
        iconColor: 'teal'
    },
    {
        id: 6,
        title: 'Inventory Management',
        description: 'Smart inventory tracking with automated reorder alerts and warehouse integration.',
        icon: 'package',
        iconColor: 'orange'
    }
];
const LOGIN_CONTENT = {
    title: 'Sign in to your account',
    subtitle: 'Welcome back! Please enter your credentials.',
    fields: {
        email: {
            label: 'Email address',
            type: 'email',
            placeholder: 'Enter your email',
            required: true
        },
        password: {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password',
            required: true
        }
    },
    buttons: {
        submit: 'Sign In',
        forgotPassword: 'Forgot your password?'
    },
    links: {
        signup: {
            text: "Don't have an account?",
            linkText: 'Sign up',
            href: '/signup'
        }
    }
};
const SIGNUP_CONTENT = {
    title: 'Create your account',
    subtitle: 'Join us today! Please fill in your information.',
    fields: {
        firstName: {
            label: 'First Name',
            type: 'text',
            placeholder: 'Enter your first name',
            required: true
        },
        lastName: {
            label: 'Last Name',
            type: 'text',
            placeholder: 'Enter your last name',
            required: true
        },
        email: {
            label: 'Email address',
            type: 'email',
            placeholder: 'Enter your email',
            required: true
        },
        password: {
            label: 'Password',
            type: 'password',
            placeholder: 'Create a password',
            required: true
        },
        confirmPassword: {
            label: 'Confirm Password',
            type: 'password',
            placeholder: 'Confirm your password',
            required: true
        }
    },
    buttons: {
        submit: 'Sign Up'
    },
    links: {
        login: {
            text: 'Already have an account?',
            linkText: 'Sign in',
            href: '/login'
        }
    }
};
const REGISTRATION_STEPS = {
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
                maxLength: 10
            }
        },
        buttons: {
            submit: 'Send Verification Code',
            back: null
        }
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
                pattern: '^\\d{6}$'
            }
        },
        buttons: {
            submit: 'Verify Phone',
            back: 'Back',
            resend: 'Resend Code'
        }
    },
    3: {
        title: 'Email Verification',
        subtitle: 'Please enter your email address',
        fields: {
            email: {
                label: 'Email Address',
                type: 'email',
                placeholder: 'your.email@example.com',
                required: true
            }
        },
        buttons: {
            submit: 'Send Email Verification',
            back: 'Back'
        }
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
                pattern: '^\\d{6}$'
            }
        },
        buttons: {
            submit: 'Verify Email',
            back: 'Back',
            resend: 'Resend Code'
        }
    },
    5: {
        title: 'Create Password',
        subtitle: 'Create a secure password for your account',
        fields: {
            password: {
                label: 'Password',
                type: 'password',
                placeholder: 'Create a password',
                required: true
            },
            confirmPassword: {
                label: 'Confirm Password',
                type: 'password',
                placeholder: 'Confirm your password',
                required: true
            }
        },
        buttons: {
            submit: 'Complete Registration',
            back: 'Back'
        }
    }
};
const REGISTRATION_PROGRESS = {
    totalSteps: 5,
    stepLabels: [
        'Phone',
        'Phone Verify',
        'Email',
        'Email Verify',
        'Password'
    ]
};
const NAV_ITEMS = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'About',
        href: '/about'
    },
    {
        label: 'Services',
        href: '/services'
    },
    {
        label: 'Contact',
        href: '/contact'
    }
];
const BUTTONS = {
    login: {
        label: 'Login',
        href: '/login',
        variant: 'secondary'
    },
    signup: {
        label: 'Sign Up',
        href: '/signup',
        variant: 'primary'
    }
};
const NAVBAR_STYLES = {
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
    mobileSecondaryButton: 'border-2 border-[#241331] text-[#241331] block px-3 py-2.5 rounded-lg text-base font-bold hover:bg-[#241331] hover:text-white transition-all duration-200 mt-2 font-itc-gothic'
};
const HERO_STYLES = {
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
    decorativeElements2: 'absolute bottom-20 left-10 w-96 h-96 bg-[#241331]/15 rounded-full blur-3xl'
};
const FEATURES_STYLES = {
    container: 'px-4 py-20 mx-auto max-w-7xl bg-gradient-to-b from-white to-[#241331]/5',
    header: 'text-center mb-16',
    headerTitle: 'text-4xl md:text-5xl font-black text-[#241331] mb-4 font-itc-gothic',
    headerSubtitle: 'text-xl text-[#241331]/70 max-w-3xl mx-auto font-itc-gothic font-medium',
    grid: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
    featureCard: 'group p-8 bg-white rounded-2xl shadow-sm border-2 border-[#241331]/10 hover:shadow-xl hover:border-[#241331]/30 transition-all duration-300 transform hover:-translate-y-2',
    iconContainer: 'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300',
    icon: 'w-8 h-8 transition-colors duration-300',
    title: 'text-xl font-bold text-[#241331] mb-4 text-center font-itc-gothic',
    description: 'text-[#241331]/60 text-center leading-relaxed font-itc-gothic'
};
const AUTH_STYLES = {
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
    forgotPassword: 'text-sm text-[#C3AF6C] hover:text-[#241331] transition-colors duration-200 font-itc-gothic'
};
const REGISTRATION_STYLES = {
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
    link: 'font-bold text-[#C3AF6C] hover:text-[#241331] transition-colors duration-200 font-itc-gothic'
};
const COLORS = {
    primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8'
    },
    gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827'
    },
    white: '#ffffff',
    black: '#000000'
};
const SIZES = {
    container: {
        sm: 'max-w-2xl',
        md: 'max-w-4xl',
        lg: 'max-w-6xl',
        xl: 'max-w-7xl'
    },
    spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem'
    }
};
const API_ENDPOINTS = {
    base: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    auth: {
        login: '/auth/login',
        logout: '/auth/logout',
        register: '/auth/register'
    },
    user: {
        profile: '/user/profile',
        update: '/user/update'
    }
};
const ONBOARDING_STEPS = {
    1: {
        title: 'GST Verification',
        subtitle: 'Verify your business GST number',
        fields: {
            gstNumber: {
                label: 'GST Number',
                type: 'text',
                placeholder: '07AAACG0569H1ZH',
                required: true,
                maxLength: 15
            }
        },
        buttons: {
            back: 'Back',
            submit: 'Continue',
            verify: 'Verify GST'
        }
    },
    2: {
        title: 'Business Details',
        subtitle: 'Tell us about your business',
        buttons: {
            back: 'Back',
            submit: 'Continue'
        }
    },
    3: {
        title: 'Signature Upload',
        subtitle: 'Upload your digital signature',
        buttons: {
            back: 'Back',
            submit: 'Continue'
        }
    },
    4: {
        title: 'Business Preferences',
        subtitle: 'Select your business preference',
        buttons: {
            back: 'Back',
            submit: 'Continue'
        }
    },
    5: {
        title: 'Brand and Product Details',
        subtitle: 'Upload your brand logo and define your product catalog',
        buttons: {
            back: 'Back',
            submit: 'Continue'
        }
    },
    6: {
        title: 'Warehouse Details',
        subtitle: 'Provide your warehouse and order information',
        buttons: {
            back: 'Back',
            submit: 'Continue'
        }
    },
    7: {
        title: 'Banking Details',
        subtitle: 'Add your banking information and upload cancelled cheque',
        buttons: {
            back: 'Back',
            submit: 'Continue'
        }
    },
    8: {
        title: 'Review & Submit',
        subtitle: 'Review your information and accept terms & conditions',
        buttons: {
            back: 'Back',
            submit: 'Accept & Submit Application'
        }
    }
};
const MESSAGES = {
    errors: {
        generic: 'Something went wrong. Please try again.',
        network: 'Network error. Please check your connection.',
        notFound: 'The requested resource was not found.',
        invalidIndianPhone: 'Please enter a valid Indian phone number (10 digits starting with 6, 7, 8, or 9)',
        passwordMismatch: 'Passwords do not match!',
        invalidVerificationCode: 'Please enter a valid 6-digit verification code',
        invalidGST: 'Please enter a valid GST number (15 characters)',
        gstNotFound: 'GST number not found. Please check and try again.',
        gstVerificationRequired: 'Please verify your GST number first'
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
        gstVerified: 'GST details verified successfully'
    },
    info: {
        phoneNumberHelp: 'Enter your 10-digit mobile number without country code',
        verificationCodeHelp: 'Enter the 6-digit code sent to your phone/email',
        passwordHelp: 'Password must be at least 8 characters long',
        gstHelp: 'Enter your 15-digit GST number (e.g., 07AAACG0569H1ZH)'
    }
};
}),
"[project]/src/contexts/AuthContext.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "AuthProvider": ()=>AuthProvider,
    "useAuth": ()=>useAuth
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * SECURE AUTHENTICATION CONTEXT
 * 
 * Security Improvements Implemented:
 * 
 * 1. TOKEN STORAGE SECURITY:
 *    - Moved from localStorage to sessionStorage (cleared on tab/browser close)
 *    - sessionStorage is less vulnerable to XSS attacks
 *    - Automatic migration from localStorage to sessionStorage with cleanup
 *    - Support for httpOnly cookies (most secure option when backend implements it)
 * 
 * 2. AUTOMATIC TOKEN REFRESH:
 *    - Built-in refresh token functionality
 *    - Automatic retry of failed requests with refreshed tokens
 *    - Secure refresh token storage in sessionStorage
 * 
 * 3. AUTHENTICATED API CALLS:
 *    - authenticatedFetch() wrapper handles token refresh automatically
 *    - Includes credentials for httpOnly cookie support
 *    - Proper error handling and automatic logout on refresh failure
 * 
 * 4. SECURE LOGOUT:
 *    - Clears all token storage (session, local, and httpOnly cookies)
 *    - Calls backend logout endpoint to invalidate server-side sessions
 * 
 * 5. LEGACY CLEANUP:
 *    - Automatic cleanup of old localStorage tokens
 *    - Migration path for existing users
 * 
 * RECOMMENDED BACKEND IMPROVEMENTS:
 * - Implement httpOnly cookies for token storage
 * - Add logout endpoint to invalidate tokens
 * - Implement token refresh endpoint
 * - Add CSRF protection
 * - Use secure, sameSite cookie attributes
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
// Create Auth Context
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({});
function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [userData, setUserData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Function to get saved form data from secure storage
    const getSavedFormData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        try {
            // Check sessionStorage first (more secure)
            let saved = sessionStorage.getItem('userFormData');
            if (saved) {
                return JSON.parse(saved);
            }
            // Fallback to localStorage and migrate to sessionStorage
            saved = localStorage.getItem('userFormData');
            if (saved) {
                const parsedData = JSON.parse(saved);
                sessionStorage.setItem('userFormData', saved);
                localStorage.removeItem('userFormData'); // cleanup
                return parsedData;
            }
        } catch (error) {
            console.error('Error parsing saved form data:', error);
        }
        return {};
    }, []);
    // Function to load saved form data into state
    const loadSavedFormData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const savedData = getSavedFormData();
        if (Object.keys(savedData).length > 0) {
            setFormData(savedData);
        }
    }, [
        getSavedFormData
    ]);
    // Function to save additional form data during onboarding
    const saveFormData = (newFormData)=>{
        const currentFormData = formData || {};
        const updatedFormData = {
            ...currentFormData,
            ...newFormData
        };
        setFormData(updatedFormData);
        // Use sessionStorage for better security
        sessionStorage.setItem('userFormData', JSON.stringify(updatedFormData));
        console.log('Updated form data:', updatedFormData);
    };
    // Function to get auth token from secure cookie
    const getAuthToken = ()=>{
        // Check for httpOnly cookie first (most secure)
        // Note: httpOnly cookies cannot be accessed via JavaScript for security
        // so we'll need to rely on the browser sending them automatically
        // Fallback to sessionStorage (more secure than localStorage)
        const sessionToken = sessionStorage.getItem('authToken');
        if (sessionToken) {
            return sessionToken;
        }
        // Last resort - localStorage (for backward compatibility during transition)
        const localToken = localStorage.getItem('authToken');
        if (localToken) {
            // Migrate to sessionStorage and remove from localStorage
            sessionStorage.setItem('authToken', localToken);
            localStorage.removeItem('authToken');
            return localToken;
        }
        return null;
    };
    // Function to set auth token securely
    const setAuthToken = (token)=>{
        // Store in sessionStorage (cleared when browser/tab closes)
        sessionStorage.setItem('authToken', token);
        // Remove from localStorage if it exists (cleanup)
        localStorage.removeItem('authToken');
    // In a production environment, you should also set an httpOnly cookie
    // via your backend API for maximum security
    };
    // Function to remove auth token
    const removeAuthToken = ()=>{
        sessionStorage.removeItem('authToken');
        localStorage.removeItem('authToken'); // cleanup legacy storage
        // Clear httpOnly cookie via API call to backend
        fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include' // Important: includes httpOnly cookies
        }).catch(()=>{
        // Ignore logout API errors - token cleanup is more important
        });
    };
    // Function to refresh access token using refresh token
    const refreshAccessToken = async ()=>{
        try {
            const refreshToken = sessionStorage.getItem('refreshToken') || localStorage.getItem('refreshToken');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }
            const response = await fetch('http://15.207.254.95:8080/api/brand/auth/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    refresh: refreshToken
                })
            });
            const data = await response.json();
            if (response.ok && data.access) {
                const newToken = 'Bearer ' + data.access;
                setAuthToken(newToken);
                return newToken;
            } else {
                throw new Error('Token refresh failed');
            }
        } catch (error) {
            console.error('Failed to refresh token:', error);
            // If refresh fails, logout user
            logout();
            return null;
        }
    };
    // Function to make authenticated API calls with automatic token refresh
    const authenticatedFetch = async (url, options = {})=>{
        let token = getAuthToken();
        console.log('🔐 authenticatedFetch called:', {
            url,
            method: options.method || 'GET',
            hasToken: !!token,
            tokenPreview: token ? token.substring(0, 20) + '...' : 'No token'
        });
        if (!token) {
            console.error('❌ No authentication token available');
            throw new Error('No authentication token available');
        }
        // Detect if we're sending FormData and avoid setting Content-Type
        const isFormData = options.body instanceof FormData;
        // First attempt with current token
        const requestOptions = {
            ...options,
            headers: {
                // Only set Content-Type if it's not FormData and not already specified
                ...isFormData || options.headers?.['Content-Type'] !== undefined ? {} : {
                    'Content-Type': 'application/json'
                },
                'Authorization': token,
                ...options.headers
            },
            credentials: 'include'
        };
        console.log('📡 Making request with options:', {
            url,
            method: requestOptions.method || 'GET',
            hasAuth: !!requestOptions.headers.Authorization,
            isFormData,
            credentials: requestOptions.credentials
        });
        let response = await fetch(url, requestOptions);
        console.log('📥 Response received:', {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            url
        });
        // If token expired (401), try to refresh and retry
        if (response.status === 401) {
            console.log('🔄 Token expired (401), attempting refresh...');
            const newToken = await refreshAccessToken();
            if (newToken) {
                console.log('✅ Token refreshed successfully, retrying request...');
                // Retry with new token
                requestOptions.headers['Authorization'] = newToken;
                response = await fetch(url, requestOptions);
                console.log('📥 Retry response:', {
                    status: response.status,
                    statusText: response.statusText,
                    ok: response.ok
                });
            } else {
                console.error('❌ Token refresh failed');
                throw new Error('Authentication failed after token refresh');
            }
        }
        // Log specific error responses for debugging
        if (!response.ok) {
            let errorData = null;
            try {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    errorData = await response.clone().json();
                    console.error('🚨 API Error Response:', {
                        status: response.status,
                        url,
                        error: errorData
                    });
                    // Special handling for USER_NOT_FOUND errors
                    if (errorData.error_code === 'USER_NOT_FOUND' || errorData.message?.includes('User does not exist')) {
                        console.error('🔴 USER_NOT_FOUND Error - This suggests the token is valid but points to a deleted/non-existent user');
                        console.error('Consider logging out and logging back in');
                    }
                }
            } catch (parseError) {
                console.error('Failed to parse error response:', parseError);
            }
        }
        return response;
    };
    // Function to diagnose authentication issues
    const diagnoseAuthIssue = async ()=>{
        console.log('🔍 AUTHENTICATION DIAGNOSIS START');
        const token = getAuthToken();
        console.log('Current token status:', {
            hasToken: !!token,
            tokenSource: token ? 'Available' : 'Missing',
            tokenPreview: token ? token.substring(0, 30) + '...' : 'No token',
            sessionStorageToken: !!sessionStorage.getItem('authToken'),
            localStorageToken: !!localStorage.getItem('authToken')
        });
        if (!token) {
            console.log('❌ No authentication token found');
            return {
                issue: 'NO_TOKEN',
                recommendation: 'Please log in again'
            };
        }
        try {
            // Test token with a simple API call
            console.log('🧪 Testing token with profile status API...');
            const response = await fetch('http://15.207.254.95:8080/api/brand/profile/status/', {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            console.log('Token test response:', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok
            });
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Token is valid, user data:', data);
                return {
                    issue: 'NONE',
                    data
                };
            } else if (response.status === 401) {
                console.log('❌ Token is expired or invalid (401)');
                return {
                    issue: 'TOKEN_EXPIRED',
                    recommendation: 'Please log in again'
                };
            } else if (response.status === 404 || response.status === 400) {
                const errorData = await response.json().catch(()=>({}));
                console.log('❌ User not found or bad request:', errorData);
                return {
                    issue: 'USER_NOT_FOUND',
                    error: errorData,
                    recommendation: 'Please create a new account or contact support'
                };
            } else {
                const errorData = await response.json().catch(()=>({}));
                console.log('❌ Other API error:', errorData);
                return {
                    issue: 'API_ERROR',
                    error: errorData,
                    status: response.status
                };
            }
        } catch (error) {
            console.error('❌ Network error during token test:', error);
            return {
                issue: 'NETWORK_ERROR',
                error: error.message
            };
        }
    };
    // Function to handle authentication errors and provide user guidance
    const handleAuthError = (error)=>{
        console.log('🚨 Handling authentication error:', error);
        if (error.error_code === 'USER_NOT_FOUND' || error.message?.includes('User does not exist')) {
            console.log('USER_NOT_FOUND detected - forcing logout and redirect');
            // Force logout to clear invalid tokens
            logout();
            // Could also show a user-friendly message here
            return 'Your account was not found. Please sign up again or contact support.';
        } else if (error.status === 401) {
            console.log('Unauthorized access detected - forcing logout');
            logout();
            return 'Your session has expired. Please log in again.';
        }
        return error.message || 'An authentication error occurred.';
    };
    // Function to refresh user data from API
    const refreshUserData = async ()=>{
        const token = getAuthToken();
        if (!token) return null;
        try {
            console.log('Refreshing user data...');
            // Call both status API and onboarding-summary API in parallel for comprehensive data
            const [statusResponse, summaryResponse] = await Promise.all([
                authenticatedFetch('http://15.207.254.95:8080/api/brand/profile/status/', {
                    method: 'GET'
                }),
                authenticatedFetch('http://15.207.254.95:8080/api/brand/onboarding-summary/', {
                    method: 'GET'
                }).catch((error)=>{
                    // If onboarding summary fails, continue with just status data
                    console.log('Onboarding summary API failed (user may not have started onboarding):', error.message);
                    return {
                        ok: false,
                        status: 404
                    };
                })
            ]);
            const statusData = await statusResponse.json();
            console.log('Profile status response:', {
                status: statusResponse.status,
                data: statusData
            });
            let summaryData = null;
            if (summaryResponse.ok) {
                summaryData = await summaryResponse.json();
                console.log('Onboarding summary response:', {
                    status: summaryResponse.status,
                    data: summaryData
                });
            } else {
                console.log('Onboarding summary not available or user has not started onboarding yet');
            }
            if (statusResponse.ok && statusData.success) {
                const profileData = statusData.data?.profile || {};
                const responseData = statusData.data || {};
                setUserData(profileData);
                // Combine status data with onboarding summary data for comprehensive form data
                const onboardingDetails = summaryData?.success ? summaryData.data : {};
                console.log('Raw onboarding details from API:', onboardingDetails);
                // Save comprehensive form data for prepopulation with robust field mapping
                const savedFormData = {
                    // Profile/Registration data from user_details
                    firstName: profileData.user_details?.first_name || '',
                    lastName: profileData.user_details?.last_name || '',
                    email: profileData.user_details?.email || '',
                    phoneNumber: profileData.user_details?.phone_number || '',
                    // GST data (from onboarding summary if available, otherwise from profile)
                    // Handle multiple possible field names from API
                    gstNumber: onboardingDetails.gst_info?.gst_number || onboardingDetails.gst_number || profileData.gst_number || '',
                    gstBusinessName: onboardingDetails.gst_info?.gst_business_name || onboardingDetails.gst_business_name || profileData.gst_business_name || '',
                    gstTradeName: onboardingDetails.gst_info?.gst_trade_name || onboardingDetails.gst_trade_name || profileData.gst_trade_name || '',
                    gstConstitution: onboardingDetails.gst_info?.gst_constitution || onboardingDetails.gst_constitution || profileData.gst_constitution || '',
                    gstAddress: onboardingDetails.gst_info?.gst_address || onboardingDetails.gst_address || profileData.gst_address || '',
                    gstVerificationStatus: onboardingDetails.gst_info?.verification_status || onboardingDetails.verification_status?.gst || 'pending',
                    // Basic information (from onboarding summary)
                    ownerName: onboardingDetails.basic_info?.owner_name || onboardingDetails.owner_name || profileData.owner_name || '',
                    contactNumber: onboardingDetails.basic_info?.contact_number || onboardingDetails.contact_number || profileData.contact_number || '',
                    businessEmail: onboardingDetails.basic_info?.business_email || onboardingDetails.business_email || profileData.business_email || profileData.user_details?.email || '',
                    companyName: onboardingDetails.basic_info?.company_name || onboardingDetails.company_name || profileData.company_name || '',
                    companyType: onboardingDetails.basic_info?.company_type || onboardingDetails.company_type || profileData.company_type || '',
                    businessAddress: onboardingDetails.basic_info?.business_address || onboardingDetails.business_address || profileData.business_address || '',
                    // Signature information
                    signatureId: onboardingDetails.signature_info?.signature_id || onboardingDetails.signature_id || '',
                    signatureFileName: onboardingDetails.signature_info?.signature_file_name || onboardingDetails.signature_info?.file_name || onboardingDetails.signature_file_name || '',
                    signatureUploaded: !!(onboardingDetails.signature_info?.signature_id || onboardingDetails.signature_id),
                    // Business preferences
                    business_preference: onboardingDetails.business_preference || onboardingDetails.business_preferences || '',
                    // Warehouse details - Map to RegistrationForm field names
                    cityWarehouses: onboardingDetails.warehouse_details?.city_warehouses || onboardingDetails.city_warehouses || [],
                    city_warehouses: onboardingDetails.warehouse_details?.city_warehouses || onboardingDetails.city_warehouses || [
                        {
                            city_name: '',
                            warehouse_count: 1
                        }
                    ],
                    daily_order_volume: onboardingDetails.warehouse_details?.daily_order_volume || onboardingDetails.daily_order_volume || '',
                    // Product details - handle both URL and file objects
                    brand_logo: onboardingDetails.product_details?.brand_logo_url || onboardingDetails.product_details?.brand_logo || onboardingDetails.brand_logo_url || onboardingDetails.brand_logo || '',
                    product_categories: onboardingDetails.product_details?.product_categories || onboardingDetails.product_categories || [],
                    gender: onboardingDetails.product_details?.gender || onboardingDetails.gender || [],
                    target_age_groups: onboardingDetails.product_details?.target_age_groups || onboardingDetails.target_age_groups || [],
                    price_range: onboardingDetails.product_details?.price_range || onboardingDetails.price_range || [],
                    product_catalog: onboardingDetails.product_details?.product_catalog_url || onboardingDetails.product_details?.product_catalog || onboardingDetails.product_catalog_url || onboardingDetails.product_catalog || '',
                    // Bank details
                    account_holder_name: onboardingDetails.bank_details?.account_holder_name || onboardingDetails.account_holder_name || '',
                    account_number: onboardingDetails.bank_details?.account_number || onboardingDetails.account_number || '',
                    ifsc_code: onboardingDetails.bank_details?.ifsc_code || onboardingDetails.ifsc_code || '',
                    cancelled_cheque: onboardingDetails.bank_details?.cancelled_cheque_url || onboardingDetails.bank_details?.cancelled_cheque || onboardingDetails.cancelled_cheque_url || onboardingDetails.cancelled_cheque || '',
                    bank_verification_status: onboardingDetails.bank_details?.verification_status || onboardingDetails.verification_status?.bank || 'pending',
                    // Verification status for each step
                    verification_status: onboardingDetails.verification_status || {},
                    // Onboarding status from API response
                    isOnboardingComplete: responseData.is_onboarding_complete || false,
                    currentStep: responseData.current_step || 'phone_verification',
                    onboardingStatusCode: responseData.status_code || '',
                    onboardingStatusMessage: responseData.status_message || '',
                    onboardingProgress: responseData.onboarding_progress || {},
                    // Store the complete onboarding summary for reference and debugging
                    onboardingSummary: onboardingDetails
                };
                console.log('Mapped form data for components:', savedFormData);
                setFormData(savedFormData);
                // Store form data in sessionStorage instead of localStorage for better security
                sessionStorage.setItem('userFormData', JSON.stringify(savedFormData));
                console.log('Saved comprehensive form data with onboarding summary:', savedFormData);
                return profileData;
            }
            return null;
        } catch (error) {
            console.error('Failed to refresh user data:', error);
            return null;
        }
    };
    // Function to get onboarding summary independently
    const getOnboardingSummary = async ()=>{
        const token = getAuthToken();
        if (!token) return null;
        try {
            console.log('Fetching onboarding summary...');
            const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/onboarding-summary/', {
                method: 'GET'
            });
            const data = await response.json();
            console.log('Onboarding summary response:', {
                status: response.status,
                data
            });
            if (response.ok && data.success) {
                return data.data;
            }
            return null;
        } catch (error) {
            console.error('Failed to get onboarding summary:', error);
            return null;
        }
    };
    // Debug helper function to inspect API structure
    const debugFormDataMapping = ()=>{
        if (!formData) {
            console.log('No form data available');
            return;
        }
        console.group('Form Data Debug Information');
        console.log('Current formData structure:', formData);
        if (formData.onboardingSummary) {
            console.log('Raw onboarding summary from API:', formData.onboardingSummary);
            // Check each major section
            const sections = [
                'gst_info',
                'basic_info',
                'signature_info',
                'business_preference',
                'warehouse_details',
                'product_details',
                'bank_details',
                'verification_status'
            ];
            sections.forEach((section)=>{
                if (formData.onboardingSummary[section]) {
                    console.log(`${section}:`, formData.onboardingSummary[section]);
                } else {
                    console.log(`${section}: Not found or empty`);
                }
            });
        } else {
            console.log('No onboarding summary data found in formData');
        }
        console.groupEnd();
    };
    // Function to validate token with API (call this explicitly when needed)
    const validateTokenWithAPI = async ()=>{
        const profileData = await refreshUserData();
        if (profileData) {
            setIsAuthenticated(true);
            return {
                success: true,
                data: profileData
            };
        } else {
            // If validation failed, token is invalid - clean up securely
            removeAuthToken();
            sessionStorage.removeItem('userFormData');
            localStorage.removeItem('userFormData'); // cleanup legacy storage
            setIsAuthenticated(false);
            setUserData(null);
            setFormData(null);
            return {
                success: false
            };
        }
    };
    // Initialize authentication state (check secure storage, no API call)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initializeAuth = ()=>{
            const token = getAuthToken(); // Use secure token getter
            if (token) {
                setIsAuthenticated(true);
                loadSavedFormData();
            } else {
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        };
        initializeAuth();
    }, [
        loadSavedFormData
    ]);
    // Login function
    const login = async (email, password)=>{
        setIsLoading(true);
        try {
            console.log('Login attempt with:', {
                email
            });
            const response = await fetch('http://15.207.254.95:8080/api/brand/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            console.log('Login response:', {
                status: response.status,
                data
            });
            if (response.ok && data.success && data.token) {
                // Handle token object with access and refresh properties
                let authToken;
                if (data.token.access) {
                    // Token is an object with access property
                    authToken = 'Bearer ' + data.token.access;
                    // Save refresh token securely in sessionStorage
                    if (data.token.refresh) {
                        sessionStorage.setItem('refreshToken', data.token.refresh);
                        console.log('Refresh token saved securely');
                    }
                } else {
                    // Fallback for direct token string
                    authToken = typeof data.token === 'string' ? data.token.trim() : String(data.token);
                    if (!authToken.startsWith('Bearer ')) {
                        authToken = 'Bearer ' + authToken;
                    }
                }
                console.log('Saving auth token securely:', authToken.substring(0, 20) + '...');
                setAuthToken(authToken); // Use secure token setter
                setIsAuthenticated(true);
                // Get user data after login and validate token
                await validateTokenWithAPI();
                return {
                    success: true,
                    data
                };
            }
            // Check for specific error types to handle non-existent users
            if (response.status === 404 || data.detail && data.detail.toLowerCase().includes('not found') || data.message && data.message.toLowerCase().includes('not found')) {
                return {
                    success: false,
                    error: 'User not found. This email is not registered.',
                    code: 'USER_NOT_FOUND'
                };
            }
            // Handle invalid credentials differently
            if (response.status === 401 || data.detail && data.detail.toLowerCase().includes('incorrect') || data.message && data.message.toLowerCase().includes('incorrect')) {
                return {
                    success: false,
                    error: 'Incorrect email or password. Please try again.',
                    code: 'INVALID_CREDENTIALS'
                };
            }
            // Default error handling
            return {
                success: false,
                error: data.message || data.detail || 'Login failed',
                code: 'UNKNOWN_ERROR'
            };
        } catch (error) {
            console.error('Login failed:', error);
            return {
                success: false,
                error: 'Network error',
                code: 'NETWORK_ERROR'
            };
        } finally{
            setIsLoading(false);
        }
    };
    // Logout function
    const logout = ()=>{
        // Secure cleanup of all authentication data
        removeAuthToken();
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('userFormData');
        // Cleanup legacy localStorage data
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userFormData');
        setIsAuthenticated(false);
        setUserData(null);
        setFormData(null);
        router.push('/login');
    };
    // Redirect to dashboard or registration based on onboarding status
    const redirectToDashboardOrRegistration = ()=>{
        if (!formData && !userData) return;
        // Use formData first (contains latest API response data), fallback to userData
        const onboardingData = formData || userData;
        const { isOnboardingComplete, currentStep, onboardingStatusCode } = onboardingData;
        if (isOnboardingComplete) {
            // If onboarding is complete, show the review/status step instead of dashboard
            // This allows users to see their submitted details and go to dashboard manually
            router.push('/signup?step=8&onboarding=true');
            return;
        }
        // Map API step names to our frontend step numbers
        // Backend status → Frontend routing
        const stepMapping = {
            'phone_verification': '1',
            'email_verification': '3',
            'gst_verification': '1&onboarding=true',
            'brand_info': '2&onboarding=true',
            'signature_upload': '3&onboarding=true',
            'business_preference': '4&onboarding=true',
            'warehouse_details': '5&onboarding=true',
            'product_details': '6&onboarding=true',
            'bank_details': '7&onboarding=true',
            'final_submission': '8&onboarding=true',
            'completed': '8&onboarding=true' // Show review step instead of dashboard
        };
        // Status code to step mapping (for when we get status codes like "04")
        const statusCodeMapping = {
            '01': 'phone_verification',
            '02': 'email_verification',
            '03': 'gst_verification',
            '04': 'brand_info',
            '05': 'signature_upload',
            '06': 'business_preference',
            '07': 'warehouse_details',
            '08': 'product_details',
            '09': 'bank_details',
            '10': 'final_submission',
            '00': 'completed'
        };
        let redirectUrl = '/signup?step=1'; // Default to first step
        let actualStep = currentStep;
        // If we have a status code, convert it to step name first
        if (onboardingStatusCode && statusCodeMapping[onboardingStatusCode]) {
            actualStep = statusCodeMapping[onboardingStatusCode];
        }
        // Get the redirect path from mapping
        if (actualStep && stepMapping[actualStep]) {
            const mappedRoute = stepMapping[actualStep];
            // All onboarding flows should go to their respective steps
            // Dashboard redirect is now handled only by the explicit condition above
            redirectUrl = `/signup?step=${mappedRoute}`;
        }
        console.log('Redirecting to onboarding step:', {
            currentStep,
            actualStep,
            redirectUrl,
            isOnboardingComplete,
            statusCode: onboardingStatusCode
        });
        router.push(redirectUrl);
    };
    // Helper function to get current onboarding information
    const getOnboardingInfo = ()=>{
        if (!formData) return null;
        const stepMapping = {
            'phone_verification': {
                step: 1,
                onboarding: false
            },
            'email_verification': {
                step: 3,
                onboarding: false
            },
            'gst_verification': {
                step: 1,
                onboarding: true
            },
            'brand_info': {
                step: 2,
                onboarding: true
            },
            'signature_upload': {
                step: 3,
                onboarding: true
            },
            'business_preference': {
                step: 4,
                onboarding: true
            },
            'warehouse_details': {
                step: 5,
                onboarding: true
            },
            'product_details': {
                step: 6,
                onboarding: true
            },
            'bank_details': {
                step: 7,
                onboarding: true
            },
            'final_submission': {
                step: 8,
                onboarding: true
            },
            'completed': {
                step: null,
                onboarding: true,
                completed: true
            }
        };
        // Status code to step mapping (for when we get status codes like "04")
        const statusCodeMapping = {
            '01': 'phone_verification',
            '02': 'email_verification',
            '03': 'gst_verification',
            '04': 'brand_info',
            '05': 'signature_upload',
            '06': 'business_preference',
            '07': 'warehouse_details',
            '08': 'product_details',
            '09': 'bank_details',
            '10': 'final_submission',
            '00': 'completed'
        };
        const { currentStep, isOnboardingComplete, onboardingProgress, onboardingStatusCode } = formData;
        let stepInfo = {
            step: 1,
            onboarding: false
        };
        let actualStep = currentStep;
        // If we have a status code, convert it to step name first
        if (onboardingStatusCode && statusCodeMapping[onboardingStatusCode]) {
            actualStep = statusCodeMapping[onboardingStatusCode];
        }
        // Get step information from mapping
        if (actualStep && stepMapping[actualStep]) {
            stepInfo = stepMapping[actualStep];
        }
        return {
            currentStep: actualStep,
            stepNumber: stepInfo.step,
            isOnboarding: stepInfo.onboarding,
            isOnboardingComplete,
            progress: onboardingProgress,
            statusCode: onboardingStatusCode,
            statusMessage: formData.onboardingStatusMessage
        };
    };
    const value = {
        isAuthenticated,
        isLoading,
        userData,
        formData,
        login,
        logout,
        refreshUserData,
        getOnboardingSummary,
        debugFormDataMapping,
        validateTokenWithAPI,
        saveFormData,
        getSavedFormData,
        loadSavedFormData,
        redirectToDashboardOrRegistration,
        getOnboardingInfo,
        // New security functions
        getAuthToken,
        setAuthToken,
        removeAuthToken,
        refreshAccessToken,
        authenticatedFetch,
        // New diagnostic functions
        diagnoseAuthIssue,
        handleAuthError
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.js",
        lineNumber: 895,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
}),
"[project]/src/hooks/useAuth.js [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

// This file now simply re-exports the useAuth hook from AuthContext
// for backward compatibility with existing imports
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-ssr] (ecmascript)");
;
}),
"[project]/src/hooks/useAuth.js [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/hooks/useAuth.js [app-ssr] (ecmascript) <locals>");
}),
"[project]/src/components/Navbar.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>Navbar
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/hooks/useAuth.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function Navbar() {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { isAuthenticated, logout, userData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const toggleMenu = ()=>{
        setIsOpen(!isOpen);
    };
    const handleLogout = async ()=>{
        await logout();
        setIsOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].nav,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].container,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].flexContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].logoContainer,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/FAS_logo.png",
                                    alt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BRAND_CONFIG"].logo.alt,
                                    className: "h-20 w-auto"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 29,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.jsx",
                                lineNumber: 27,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].desktopMenu,
                            children: [
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAV_ITEMS"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].navLink,
                                        children: item.label
                                    }, item.href, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 40,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].buttonContainer,
                                    children: isAuthenticated ? /* Authenticated user - show dashboard, user info, and logout */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/dashboard",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].navLink,
                                                children: "Dashboard"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.jsx",
                                                lineNumber: 54,
                                                columnNumber: 19
                                            }, this),
                                            userData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#241331] font-bold font-itc-gothic",
                                                children: [
                                                    "Welcome, ",
                                                    userData.first_name || userData.email
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Navbar.jsx",
                                                lineNumber: 61,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleLogout,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].primaryButton,
                                                children: "Logout"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.jsx",
                                                lineNumber: 65,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 53,
                                        columnNumber: 17
                                    }, this) : /* Not authenticated - show login and signup */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BUTTONS"].login.href,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].secondaryButton,
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BUTTONS"].login.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.jsx",
                                                lineNumber: 75,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BUTTONS"].signup.href,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].primaryButton,
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BUTTONS"].signup.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.jsx",
                                                lineNumber: 81,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].mobileMenuButton,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleMenu,
                                className: "inline-flex items-center justify-center p-2 rounded-md text-[#241331] hover:text-[#C3AF6C] hover:bg-[#241331]/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#C3AF6C] transition-all duration-200",
                                "aria-expanded": "false",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sr-only",
                                        children: "Open main menu"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 99,
                                        columnNumber: 15
                                    }, this),
                                    !isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "block h-6 w-6",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "M4 6h16M4 12h16M4 18h16"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.jsx",
                                            lineNumber: 109,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 101,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "block h-6 w-6",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "M6 18L18 6M6 6l12 12"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.jsx",
                                            lineNumber: 125,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 117,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Navbar.jsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Navbar.jsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Navbar.jsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].mobileMenu,
                    children: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAV_ITEMS"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].mobileNavLink,
                                onClick: ()=>setIsOpen(false),
                                children: item.label
                            }, item.href, false, {
                                fileName: "[project]/src/components/Navbar.jsx",
                                lineNumber: 143,
                                columnNumber: 15
                            }, this)),
                        isAuthenticated ? /* Authenticated user - show dashboard, user info and logout */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-2 pt-2 pb-3 space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].mobileNavLink,
                                    onClick: ()=>setIsOpen(false),
                                    children: "Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 157,
                                    columnNumber: 17
                                }, this),
                                userData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-3 py-2 text-[#241331] font-bold font-itc-gothic",
                                    children: [
                                        "Welcome, ",
                                        userData.first_name || userData.email
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 165,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleLogout,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].mobilePrimaryButton,
                                    children: "Logout"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 169,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Navbar.jsx",
                            lineNumber: 156,
                            columnNumber: 15
                        }, this) : /* Not authenticated - show login and signup */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BUTTONS"].login.href,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].mobileSecondaryButton,
                                    onClick: ()=>setIsOpen(false),
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BUTTONS"].login.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 179,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BUTTONS"].signup.href,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].mobilePrimaryButton,
                                    onClick: ()=>setIsOpen(false),
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BUTTONS"].signup.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 186,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Navbar.jsx",
                    lineNumber: 141,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Navbar.jsx",
                lineNumber: 140,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Navbar.jsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__749a4e35._.js.map