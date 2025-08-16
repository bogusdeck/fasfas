(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/utils/constants.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
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
    base: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/contexts/AuthContext.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": ()=>AuthProvider,
    "useAuth": ()=>useAuth
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
// Create Auth Context
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({});
function AuthProvider(param) {
    let { children } = param;
    _s();
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [userData, setUserData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Function to get saved form data from secure storage
    const getSavedFormData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[getSavedFormData]": ()=>{
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
        }
    }["AuthProvider.useCallback[getSavedFormData]"], []);
    // Function to load saved form data into state
    const loadSavedFormData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[loadSavedFormData]": ()=>{
            const savedData = getSavedFormData();
            if (Object.keys(savedData).length > 0) {
                setFormData(savedData);
            }
        }
    }["AuthProvider.useCallback[loadSavedFormData]"], [
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
    const authenticatedFetch = async function(url) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var _options_headers;
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
                ...isFormData || ((_options_headers = options.headers) === null || _options_headers === void 0 ? void 0 : _options_headers['Content-Type']) !== undefined ? {} : {
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
                    var _errorData_message;
                    errorData = await response.clone().json();
                    console.error('🚨 API Error Response:', {
                        status: response.status,
                        url,
                        error: errorData
                    });
                    // Special handling for USER_NOT_FOUND errors
                    if (errorData.error_code === 'USER_NOT_FOUND' || ((_errorData_message = errorData.message) === null || _errorData_message === void 0 ? void 0 : _errorData_message.includes('User does not exist'))) {
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
        var _error_message;
        console.log('🚨 Handling authentication error:', error);
        if (error.error_code === 'USER_NOT_FOUND' || ((_error_message = error.message) === null || _error_message === void 0 ? void 0 : _error_message.includes('User does not exist'))) {
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
                var _statusData_data, _profileData_user_details, _profileData_user_details1, _profileData_user_details2, _profileData_user_details3, _onboardingDetails_gst_info, _onboardingDetails_gst_info1, _onboardingDetails_gst_info2, _onboardingDetails_gst_info3, _onboardingDetails_gst_info4, _onboardingDetails_gst_info5, _onboardingDetails_verification_status, _onboardingDetails_basic_info, _onboardingDetails_basic_info1, _onboardingDetails_basic_info2, _profileData_user_details4, _onboardingDetails_basic_info3, _onboardingDetails_basic_info4, _onboardingDetails_basic_info5, _onboardingDetails_signature_info, _onboardingDetails_signature_info1, _onboardingDetails_signature_info2, _onboardingDetails_signature_info3, _onboardingDetails_warehouse_details, _onboardingDetails_warehouse_details1, _onboardingDetails_warehouse_details2, _onboardingDetails_product_details, _onboardingDetails_product_details1, _onboardingDetails_product_details2, _onboardingDetails_product_details3, _onboardingDetails_product_details4, _onboardingDetails_product_details5, _onboardingDetails_product_details6, _onboardingDetails_product_details7, _onboardingDetails_bank_details, _onboardingDetails_bank_details1, _onboardingDetails_bank_details2, _onboardingDetails_bank_details3, _onboardingDetails_bank_details4, _onboardingDetails_bank_details5, _onboardingDetails_verification_status1;
                const profileData = ((_statusData_data = statusData.data) === null || _statusData_data === void 0 ? void 0 : _statusData_data.profile) || {};
                const responseData = statusData.data || {};
                setUserData(profileData);
                // Combine status data with onboarding summary data for comprehensive form data
                const onboardingDetails = (summaryData === null || summaryData === void 0 ? void 0 : summaryData.success) ? summaryData.data : {};
                console.log('Raw onboarding details from API:', onboardingDetails);
                // Save comprehensive form data for prepopulation with robust field mapping
                const savedFormData = {
                    // Profile/Registration data from user_details
                    firstName: ((_profileData_user_details = profileData.user_details) === null || _profileData_user_details === void 0 ? void 0 : _profileData_user_details.first_name) || '',
                    lastName: ((_profileData_user_details1 = profileData.user_details) === null || _profileData_user_details1 === void 0 ? void 0 : _profileData_user_details1.last_name) || '',
                    email: ((_profileData_user_details2 = profileData.user_details) === null || _profileData_user_details2 === void 0 ? void 0 : _profileData_user_details2.email) || '',
                    phoneNumber: ((_profileData_user_details3 = profileData.user_details) === null || _profileData_user_details3 === void 0 ? void 0 : _profileData_user_details3.phone_number) || '',
                    // GST data (from onboarding summary if available, otherwise from profile)
                    // Handle multiple possible field names from API
                    gstNumber: ((_onboardingDetails_gst_info = onboardingDetails.gst_info) === null || _onboardingDetails_gst_info === void 0 ? void 0 : _onboardingDetails_gst_info.gst_number) || onboardingDetails.gst_number || profileData.gst_number || '',
                    gstBusinessName: ((_onboardingDetails_gst_info1 = onboardingDetails.gst_info) === null || _onboardingDetails_gst_info1 === void 0 ? void 0 : _onboardingDetails_gst_info1.gst_business_name) || onboardingDetails.gst_business_name || profileData.gst_business_name || '',
                    gstTradeName: ((_onboardingDetails_gst_info2 = onboardingDetails.gst_info) === null || _onboardingDetails_gst_info2 === void 0 ? void 0 : _onboardingDetails_gst_info2.gst_trade_name) || onboardingDetails.gst_trade_name || profileData.gst_trade_name || '',
                    gstConstitution: ((_onboardingDetails_gst_info3 = onboardingDetails.gst_info) === null || _onboardingDetails_gst_info3 === void 0 ? void 0 : _onboardingDetails_gst_info3.gst_constitution) || onboardingDetails.gst_constitution || profileData.gst_constitution || '',
                    gstAddress: ((_onboardingDetails_gst_info4 = onboardingDetails.gst_info) === null || _onboardingDetails_gst_info4 === void 0 ? void 0 : _onboardingDetails_gst_info4.gst_address) || onboardingDetails.gst_address || profileData.gst_address || '',
                    gstVerificationStatus: ((_onboardingDetails_gst_info5 = onboardingDetails.gst_info) === null || _onboardingDetails_gst_info5 === void 0 ? void 0 : _onboardingDetails_gst_info5.verification_status) || ((_onboardingDetails_verification_status = onboardingDetails.verification_status) === null || _onboardingDetails_verification_status === void 0 ? void 0 : _onboardingDetails_verification_status.gst) || 'pending',
                    // Basic information (from onboarding summary)
                    ownerName: ((_onboardingDetails_basic_info = onboardingDetails.basic_info) === null || _onboardingDetails_basic_info === void 0 ? void 0 : _onboardingDetails_basic_info.owner_name) || onboardingDetails.owner_name || profileData.owner_name || '',
                    contactNumber: ((_onboardingDetails_basic_info1 = onboardingDetails.basic_info) === null || _onboardingDetails_basic_info1 === void 0 ? void 0 : _onboardingDetails_basic_info1.contact_number) || onboardingDetails.contact_number || profileData.contact_number || '',
                    businessEmail: ((_onboardingDetails_basic_info2 = onboardingDetails.basic_info) === null || _onboardingDetails_basic_info2 === void 0 ? void 0 : _onboardingDetails_basic_info2.business_email) || onboardingDetails.business_email || profileData.business_email || ((_profileData_user_details4 = profileData.user_details) === null || _profileData_user_details4 === void 0 ? void 0 : _profileData_user_details4.email) || '',
                    companyName: ((_onboardingDetails_basic_info3 = onboardingDetails.basic_info) === null || _onboardingDetails_basic_info3 === void 0 ? void 0 : _onboardingDetails_basic_info3.company_name) || onboardingDetails.company_name || profileData.company_name || '',
                    companyType: ((_onboardingDetails_basic_info4 = onboardingDetails.basic_info) === null || _onboardingDetails_basic_info4 === void 0 ? void 0 : _onboardingDetails_basic_info4.company_type) || onboardingDetails.company_type || profileData.company_type || '',
                    businessAddress: ((_onboardingDetails_basic_info5 = onboardingDetails.basic_info) === null || _onboardingDetails_basic_info5 === void 0 ? void 0 : _onboardingDetails_basic_info5.business_address) || onboardingDetails.business_address || profileData.business_address || '',
                    // Signature information
                    signatureId: ((_onboardingDetails_signature_info = onboardingDetails.signature_info) === null || _onboardingDetails_signature_info === void 0 ? void 0 : _onboardingDetails_signature_info.signature_id) || onboardingDetails.signature_id || '',
                    signatureFileName: ((_onboardingDetails_signature_info1 = onboardingDetails.signature_info) === null || _onboardingDetails_signature_info1 === void 0 ? void 0 : _onboardingDetails_signature_info1.signature_file_name) || ((_onboardingDetails_signature_info2 = onboardingDetails.signature_info) === null || _onboardingDetails_signature_info2 === void 0 ? void 0 : _onboardingDetails_signature_info2.file_name) || onboardingDetails.signature_file_name || '',
                    signatureUploaded: !!(((_onboardingDetails_signature_info3 = onboardingDetails.signature_info) === null || _onboardingDetails_signature_info3 === void 0 ? void 0 : _onboardingDetails_signature_info3.signature_id) || onboardingDetails.signature_id),
                    // Business preferences
                    business_preference: onboardingDetails.business_preference || onboardingDetails.business_preferences || '',
                    // Warehouse details - Map to RegistrationForm field names
                    cityWarehouses: ((_onboardingDetails_warehouse_details = onboardingDetails.warehouse_details) === null || _onboardingDetails_warehouse_details === void 0 ? void 0 : _onboardingDetails_warehouse_details.city_warehouses) || onboardingDetails.city_warehouses || [],
                    city_warehouses: ((_onboardingDetails_warehouse_details1 = onboardingDetails.warehouse_details) === null || _onboardingDetails_warehouse_details1 === void 0 ? void 0 : _onboardingDetails_warehouse_details1.city_warehouses) || onboardingDetails.city_warehouses || [
                        {
                            city_name: '',
                            warehouse_count: 1
                        }
                    ],
                    daily_order_volume: ((_onboardingDetails_warehouse_details2 = onboardingDetails.warehouse_details) === null || _onboardingDetails_warehouse_details2 === void 0 ? void 0 : _onboardingDetails_warehouse_details2.daily_order_volume) || onboardingDetails.daily_order_volume || '',
                    // Product details - handle both URL and file objects
                    brand_logo: ((_onboardingDetails_product_details = onboardingDetails.product_details) === null || _onboardingDetails_product_details === void 0 ? void 0 : _onboardingDetails_product_details.brand_logo_url) || ((_onboardingDetails_product_details1 = onboardingDetails.product_details) === null || _onboardingDetails_product_details1 === void 0 ? void 0 : _onboardingDetails_product_details1.brand_logo) || onboardingDetails.brand_logo_url || onboardingDetails.brand_logo || '',
                    product_categories: ((_onboardingDetails_product_details2 = onboardingDetails.product_details) === null || _onboardingDetails_product_details2 === void 0 ? void 0 : _onboardingDetails_product_details2.product_categories) || onboardingDetails.product_categories || [],
                    gender: ((_onboardingDetails_product_details3 = onboardingDetails.product_details) === null || _onboardingDetails_product_details3 === void 0 ? void 0 : _onboardingDetails_product_details3.gender) || onboardingDetails.gender || [],
                    target_age_groups: ((_onboardingDetails_product_details4 = onboardingDetails.product_details) === null || _onboardingDetails_product_details4 === void 0 ? void 0 : _onboardingDetails_product_details4.target_age_groups) || onboardingDetails.target_age_groups || [],
                    price_range: ((_onboardingDetails_product_details5 = onboardingDetails.product_details) === null || _onboardingDetails_product_details5 === void 0 ? void 0 : _onboardingDetails_product_details5.price_range) || onboardingDetails.price_range || [],
                    product_catalog: ((_onboardingDetails_product_details6 = onboardingDetails.product_details) === null || _onboardingDetails_product_details6 === void 0 ? void 0 : _onboardingDetails_product_details6.product_catalog_url) || ((_onboardingDetails_product_details7 = onboardingDetails.product_details) === null || _onboardingDetails_product_details7 === void 0 ? void 0 : _onboardingDetails_product_details7.product_catalog) || onboardingDetails.product_catalog_url || onboardingDetails.product_catalog || '',
                    // Bank details
                    account_holder_name: ((_onboardingDetails_bank_details = onboardingDetails.bank_details) === null || _onboardingDetails_bank_details === void 0 ? void 0 : _onboardingDetails_bank_details.account_holder_name) || onboardingDetails.account_holder_name || '',
                    account_number: ((_onboardingDetails_bank_details1 = onboardingDetails.bank_details) === null || _onboardingDetails_bank_details1 === void 0 ? void 0 : _onboardingDetails_bank_details1.account_number) || onboardingDetails.account_number || '',
                    ifsc_code: ((_onboardingDetails_bank_details2 = onboardingDetails.bank_details) === null || _onboardingDetails_bank_details2 === void 0 ? void 0 : _onboardingDetails_bank_details2.ifsc_code) || onboardingDetails.ifsc_code || '',
                    cancelled_cheque: ((_onboardingDetails_bank_details3 = onboardingDetails.bank_details) === null || _onboardingDetails_bank_details3 === void 0 ? void 0 : _onboardingDetails_bank_details3.cancelled_cheque_url) || ((_onboardingDetails_bank_details4 = onboardingDetails.bank_details) === null || _onboardingDetails_bank_details4 === void 0 ? void 0 : _onboardingDetails_bank_details4.cancelled_cheque) || onboardingDetails.cancelled_cheque_url || onboardingDetails.cancelled_cheque || '',
                    bank_verification_status: ((_onboardingDetails_bank_details5 = onboardingDetails.bank_details) === null || _onboardingDetails_bank_details5 === void 0 ? void 0 : _onboardingDetails_bank_details5.verification_status) || ((_onboardingDetails_verification_status1 = onboardingDetails.verification_status) === null || _onboardingDetails_verification_status1 === void 0 ? void 0 : _onboardingDetails_verification_status1.bank) || 'pending',
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
                    console.log("".concat(section, ":"), formData.onboardingSummary[section]);
                } else {
                    console.log("".concat(section, ": Not found or empty"));
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const initializeAuth = {
                "AuthProvider.useEffect.initializeAuth": ()=>{
                    const token = getAuthToken(); // Use secure token getter
                    if (token) {
                        setIsAuthenticated(true);
                        loadSavedFormData();
                    } else {
                        setIsAuthenticated(false);
                    }
                    setIsLoading(false);
                }
            }["AuthProvider.useEffect.initializeAuth"];
            initializeAuth();
        }
    }["AuthProvider.useEffect"], [
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
            redirectUrl = "/signup?step=".concat(mappedRoute);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.js",
        lineNumber: 895,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "V9VVYsnfitEg54zQWzk3DTrcvgE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/useAuth.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// This file now simply re-exports the useAuth hook from AuthContext
// for backward compatibility with existing imports
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/useAuth.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/hooks/useAuth.js [app-client] (ecmascript) <locals>");
}),
"[project]/src/components/Navbar.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>Navbar
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/hooks/useAuth.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Navbar() {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { isAuthenticated, logout, userData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const toggleMenu = ()=>{
        setIsOpen(!isOpen);
    };
    const handleLogout = async ()=>{
        await logout();
        setIsOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].nav,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].container,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].flexContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].logoContainer,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/FAS_logo.png",
                                    alt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRAND_CONFIG"].logo.alt,
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].desktopMenu,
                            children: [
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAV_ITEMS"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].navLink,
                                        children: item.label
                                    }, item.href, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 40,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].buttonContainer,
                                    children: isAuthenticated ? /* Authenticated user - show dashboard, user info, and logout */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/dashboard",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].navLink,
                                                children: "Dashboard"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.jsx",
                                                lineNumber: 54,
                                                columnNumber: 19
                                            }, this),
                                            userData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleLogout,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].primaryButton,
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
                                    }, this) : /* Not authenticated - show login and signup */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BUTTONS"].login.href,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].secondaryButton,
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BUTTONS"].login.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.jsx",
                                                lineNumber: 75,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BUTTONS"].signup.href,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].primaryButton,
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BUTTONS"].signup.label
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].mobileMenuButton,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleMenu,
                                className: "inline-flex items-center justify-center p-2 rounded-md text-[#241331] hover:text-[#C3AF6C] hover:bg-[#241331]/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#C3AF6C] transition-all duration-200",
                                "aria-expanded": "false",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sr-only",
                                        children: "Open main menu"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.jsx",
                                        lineNumber: 99,
                                        columnNumber: 15
                                    }, this),
                                    !isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "block h-6 w-6",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "block h-6 w-6",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].mobileMenu,
                    children: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAV_ITEMS"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].mobileNavLink,
                                onClick: ()=>setIsOpen(false),
                                children: item.label
                            }, item.href, false, {
                                fileName: "[project]/src/components/Navbar.jsx",
                                lineNumber: 143,
                                columnNumber: 15
                            }, this)),
                        isAuthenticated ? /* Authenticated user - show dashboard, user info and logout */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-2 pt-2 pb-3 space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].mobileNavLink,
                                    onClick: ()=>setIsOpen(false),
                                    children: "Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 157,
                                    columnNumber: 17
                                }, this),
                                userData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleLogout,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].mobilePrimaryButton,
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
                        }, this) : /* Not authenticated - show login and signup */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BUTTONS"].login.href,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].mobileSecondaryButton,
                                    onClick: ()=>setIsOpen(false),
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BUTTONS"].login.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.jsx",
                                    lineNumber: 179,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BUTTONS"].signup.href,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLES"].mobilePrimaryButton,
                                    onClick: ()=>setIsOpen(false),
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BUTTONS"].signup.label
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
_s(Navbar, "AZfynngi9vmWTNoCxPqMiU4ZO8s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
        self = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, self, source, getOwner(), maybeKey, debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren, source, self) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}}),
"[project]/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()){
        const existing = query[key];
        if (typeof existing === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            query[key] = [
                existing,
                value
            ];
        }
    }
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (Array.isArray(value)) {
            for (const item of value){
                searchParams.append(key, stringifyUrlQueryParam(item));
            }
        } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
        }
    }
    return searchParams;
}
function assign(target) {
    for(var _len = arguments.length, searchParamsList = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        searchParamsList[_key - 1] = arguments[_key];
    }
    for (const searchParams of searchParamsList){
        for (const key of searchParams.keys()){
            target.delete(key);
        }
        for (const [key, value] of searchParams.entries()){
            target.append(key, value);
        }
    }
    return target;
} //# sourceMappingURL=querystring.js.map
}}),
"[project]/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? "[" + hostname + "]" : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && "?" + query || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return "" + protocol + host + pathname + search + hash;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn("Unknown key passed via urlObject into url.format: " + key);
                }
            });
        }
    }
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map
}}),
"[project]/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (e.g. via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}}),
"[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return protocol + "//" + hostname + (port ? ':' + port : '');
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? "?" + urlParts.slice(1).join('?') : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        var _App_prototype;
        if ((_App_prototype = App.prototype) == null ? void 0 : _App_prototype.getInitialProps) {
            const message = '"' + getDisplayName(App) + '.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.';
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = '"' + getDisplayName(App) + '.getInitialProps()" should resolve to an object. But found "' + props + '" instead.';
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn("" + getDisplayName(App) + " returned an empty object from `getInitialProps`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps");
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = "Cannot find module for page: " + page;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = "Failed to load static file for page: " + page + " " + message;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = "Cannot find the middleware module";
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}}),
"[project]/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
} //# sourceMappingURL=is-local-url.js.map
}}),
"[project]/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
} //# sourceMappingURL=error-once.js.map
}}),
"[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _formaturl = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _routerreducertypes = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/router-reducer/router-reducer-types.js [app-client] (ecmascript)");
const _usemergedref = __turbopack_context__.r("[project]/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _links = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _approuterinstance = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)");
const _erroronce = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)");
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate) {
    const { nodeName } = e.currentTarget;
    // anchors inside an svg have a lowercase nodeName
    const isAnchorNodeName = nodeName.toUpperCase() === 'A';
    if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
        // ignore click for browser’s default behavior
        return;
    }
    if (!(0, _islocalurl.isLocalURL)(href)) {
        if (replace) {
            // browser default behavior does not replace the history state
            // so we need to do it manually
            e.preventDefault();
            location.replace(href);
        }
        // ignore click for browser’s default behavior
        return;
    }
    e.preventDefault();
    if (onNavigate) {
        let isDefaultPrevented = false;
        onNavigate({
            preventDefault: ()=>{
                isDefaultPrevented = true;
            }
        });
        if (isDefaultPrevented) {
            return;
        }
    }
    _react.default.startTransition(()=>{
        (0, _approuterinstance.dispatchNavigateAction)(as || href, replace ? 'replace' : 'push', scroll != null ? scroll : true, linkInstanceRef.current);
    });
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    /**
   * The possible states for prefetch are:
   * - null: this is the default "auto" mode, where we will prefetch partially if the link is in the viewport
   * - true: we will prefetch if the link is visible and prefetch the full page, not just partially
   * - false: we will not prefetch if in the viewport at all
   * - 'unstable_dynamicOnHover': this starts in "auto" mode, but switches to "full" when the link is hovered
   */ const appPrefetchKind = prefetchProp === null || prefetchProp === 'auto' ? _routerreducertypes.PrefetchKind.AUTO : _routerreducertypes.PrefetchKind.FULL;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return Object.defineProperty(new Error("Failed prop type: The prop `" + args.key + "` expects a " + args.expected + " in `<Link>`, but got `" + args.actual + "` instead." + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                value: "E319",
                enumerable: false,
                configurable: true
            });
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto"`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const _ = key;
            }
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (props.locale) {
            (0, _warnonce.warnOnce)('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof hrefProp === 'string') {
                href = hrefProp;
            } else if (typeof hrefProp === 'object' && typeof hrefProp.pathname === 'string') {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw Object.defineProperty(new Error("Dynamic href `" + href + "` found in <Link> while using the `/app` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href"), "__NEXT_ERROR_CODE", {
                        value: "E267",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo({
        "LinkComponent.useMemo": ()=>{
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
    }["LinkComponent.useMemo"], [
        hrefProp,
        asProp
    ]);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn('"onClick" was passed to <Link> with `href` of `' + hrefProp + '` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link');
            }
            if (onMouseEnterProp) {
                console.warn('"onMouseEnter" was passed to <Link> with `href` of `' + hrefProp + '` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link');
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw Object.defineProperty(new Error("No children were passed to <Link> with `href` of `" + hrefProp + "` but one child is required https://nextjs.org/docs/messages/link-no-children"), "__NEXT_ERROR_CODE", {
                        value: "E320",
                        enumerable: false,
                        configurable: true
                    });
                }
                throw Object.defineProperty(new Error("Multiple children were passed to <Link> with `href` of `" + hrefProp + "` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children" + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                    value: "E266",
                    enumerable: false,
                    configurable: true
                });
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ((children == null ? void 0 : children.type) === 'a') {
                throw Object.defineProperty(new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor'), "__NEXT_ERROR_CODE", {
                    value: "E209",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback({
        "LinkComponent.useCallback[observeLinkVisibilityOnMount]": (element)=>{
            if (router !== null) {
                linkInstanceRef.current = (0, _links.mountLinkInstance)(element, href, router, appPrefetchKind, prefetchEnabled, setOptimisticLinkStatus);
            }
            return ({
                "LinkComponent.useCallback[observeLinkVisibilityOnMount]": ()=>{
                    if (linkInstanceRef.current) {
                        (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                        linkInstanceRef.current = null;
                    }
                    (0, _links.unmountPrefetchableInstance)(element);
                }
            })["LinkComponent.useCallback[observeLinkVisibilityOnMount]"];
        }
    }["LinkComponent.useCallback[observeLinkVisibilityOnMount]"], [
        prefetchEnabled,
        href,
        router,
        appPrefetchKind,
        setOptimisticLinkStatus
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw Object.defineProperty(new Error('Component rendered inside next/link has to pass click event to "onClick" prop.'), "__NEXT_ERROR_CODE", {
                        value: "E312",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user.
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(as);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, _erroronce.errorOnce)('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_d3c572e1._.js.map