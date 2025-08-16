module.exports = {

"[project]/.next-internal/server/app/page/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
}}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/layout.js [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.js [app-rsc] (ecmascript)"));
}),
"[project]/src/utils/constants.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/src/components/Hero.jsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>Hero
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-rsc] (ecmascript)");
;
;
;
function Hero() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_STYLES"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_STYLES"].backgroundPattern
            }, void 0, false, {
                fileName: "[project]/src/components/Hero.jsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_STYLES"].decorativeElements
            }, void 0, false, {
                fileName: "[project]/src/components/Hero.jsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_STYLES"].decorativeElements2
            }, void 0, false, {
                fileName: "[project]/src/components/Hero.jsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_STYLES"].content,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_STYLES"].innerContent,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_STYLES"].title,
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_CONTENT"].title
                        }, void 0, false, {
                            fileName: "[project]/src/components/Hero.jsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_STYLES"].subtitle,
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_CONTENT"].subtitle
                        }, void 0, false, {
                            fileName: "[project]/src/components/Hero.jsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_STYLES"].statsContainer,
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_CONTENT"].stats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_STYLES"].statItem,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_STYLES"].statValue,
                                            children: stat.value
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Hero.jsx",
                                            lineNumber: 27,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_STYLES"].statLabel,
                                            children: stat.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Hero.jsx",
                                            lineNumber: 28,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/components/Hero.jsx",
                                    lineNumber: 26,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Hero.jsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_STYLES"].buttonContainer,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_CONTENT"].buttons.primary.href,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_STYLES"].primaryButton,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_CONTENT"].buttons.primary.label,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-5 h-5",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M13 7l5 5m0 0l-5 5m5-5H6"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Hero.jsx",
                                                    lineNumber: 42,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Hero.jsx",
                                                lineNumber: 41,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Hero.jsx",
                                        lineNumber: 39,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Hero.jsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_CONTENT"].buttons.secondary.href,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_STYLES"].secondaryButton,
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HERO_CONTENT"].buttons.secondary.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Hero.jsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Hero.jsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Hero.jsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Hero.jsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Hero.jsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Features.jsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>Features
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-rsc] (ecmascript)");
;
;
// Icon components
const LightningIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEATURES_STYLES"].icon,
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            d: "M13 10V3L4 14h7v7l9-11h-7z"
        }, void 0, false, {
            fileName: "[project]/src/components/Features.jsx",
            lineNumber: 6,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Features.jsx",
        lineNumber: 5,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const CheckIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEATURES_STYLES"].icon,
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        }, void 0, false, {
            fileName: "[project]/src/components/Features.jsx",
            lineNumber: 12,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Features.jsx",
        lineNumber: 11,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const HeartIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEATURES_STYLES"].icon,
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        }, void 0, false, {
            fileName: "[project]/src/components/Features.jsx",
            lineNumber: 18,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Features.jsx",
        lineNumber: 17,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const ChartIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEATURES_STYLES"].icon,
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        }, void 0, false, {
            fileName: "[project]/src/components/Features.jsx",
            lineNumber: 24,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Features.jsx",
        lineNumber: 23,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const GlobeIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEATURES_STYLES"].icon,
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        }, void 0, false, {
            fileName: "[project]/src/components/Features.jsx",
            lineNumber: 30,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Features.jsx",
        lineNumber: 29,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const PackageIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEATURES_STYLES"].icon,
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        }, void 0, false, {
            fileName: "[project]/src/components/Features.jsx",
            lineNumber: 36,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Features.jsx",
        lineNumber: 35,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
// Icon mapping
const iconMap = {
    lightning: LightningIcon,
    check: CheckIcon,
    heart: HeartIcon,
    chart: ChartIcon,
    globe: GlobeIcon,
    package: PackageIcon
};
// Brand color mapping for icon containers using primary (#241331) and secondary (#C3AF6C)
const colorMap = {
    blue: 'bg-[#241331]/10 text-[#241331] group-hover:bg-[#241331] group-hover:text-white',
    green: 'bg-[#C3AF6C]/10 text-[#C3AF6C] group-hover:bg-[#C3AF6C] group-hover:text-white',
    purple: 'bg-[#241331]/15 text-[#241331] group-hover:bg-[#241331] group-hover:text-white',
    indigo: 'bg-[#C3AF6C]/15 text-[#C3AF6C] group-hover:bg-[#C3AF6C] group-hover:text-white',
    teal: 'bg-[#241331]/20 text-[#241331] group-hover:bg-[#241331] group-hover:text-white',
    orange: 'bg-[#C3AF6C]/20 text-[#C3AF6C] group-hover:bg-[#C3AF6C] group-hover:text-white'
};
function Features() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEATURES_STYLES"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEATURES_STYLES"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEATURES_STYLES"].headerTitle,
                        children: "Everything You Need to Succeed"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Features.jsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEATURES_STYLES"].headerSubtitle,
                        children: "Our comprehensive platform provides all the tools and support you need to launch, manage, and grow your brand successfully."
                    }, void 0, false, {
                        fileName: "[project]/src/components/Features.jsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Features.jsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEATURES_STYLES"].grid,
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEATURES_CONTENT"].map((feature)=>{
                    const IconComponent = iconMap[feature.icon];
                    const iconColorClass = colorMap[feature.iconColor];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEATURES_STYLES"].featureCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEATURES_STYLES"].iconContainer} ${iconColorClass}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {}, void 0, false, {
                                    fileName: "[project]/src/components/Features.jsx",
                                    lineNumber: 82,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Features.jsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEATURES_STYLES"].title,
                                children: feature.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/Features.jsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FEATURES_STYLES"].description,
                                children: feature.description
                            }, void 0, false, {
                                fileName: "[project]/src/components/Features.jsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this)
                        ]
                    }, feature.id, true, {
                        fileName: "[project]/src/components/Features.jsx",
                        lineNumber: 80,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/Features.jsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Features.jsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/page.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>Home
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Hero$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Hero.jsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Features$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Features.jsx [app-rsc] (ecmascript)");
;
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Hero$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Features$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-gradient-to-br from-gray-50 to-gray-100 py-20 relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 right-0 w-96 h-96 bg-[#241331]/5 rounded-full blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 left-0 w-80 h-80 bg-[#C3AF6C]/10 rounded-full blur-2xl"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto text-center px-4 relative z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-4xl md:text-5xl font-black text-[#241331] mb-6 font-itc-gothic",
                                children: "Ready to Launch Your Brand?"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl text-[#241331]/70 mb-8 max-w-2xl mx-auto font-itc-gothic font-medium",
                                children: "Join thousands of successful brands already selling on our platform. Start your journey today with our simple onboarding process."
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 24,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row gap-4 justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/signup",
                                        className: "bg-[#241331] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1a0e24] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-itc-gothic",
                                        children: "Get Started Now"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.js",
                                        lineNumber: 28,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/login",
                                        className: "border-2 border-[#241331] text-[#241331] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#241331] hover:text-white transition-all duration-300 font-itc-gothic",
                                        children: "Sign In"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.js",
                                        lineNumber: 34,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "bg-[#241331] text-white py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-black mb-4 text-[#C3AF6C] font-itc-gothic",
                                children: "FASFAS"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/60 mb-6 font-itc-gothic",
                                children: "Your Brand, Our Platform"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center space-x-6 text-white/60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/privacy",
                                        className: "hover:text-[#C3AF6C] transition-colors font-itc-gothic font-medium",
                                        children: "Privacy"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.js",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/terms",
                                        className: "hover:text-[#C3AF6C] transition-colors font-itc-gothic font-medium",
                                        children: "Terms"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.js",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/support",
                                        className: "hover:text-[#C3AF6C] transition-colors font-itc-gothic font-medium",
                                        children: "Support"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.js",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/contact",
                                        className: "hover:text-[#C3AF6C] transition-colors font-itc-gothic font-medium",
                                        children: "Contact"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.js",
                                        lineNumber: 54,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/40 text-sm mt-6 font-itc-gothic",
                                children: "© 2025 FASFAS. All rights reserved."
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.js",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.js",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/page.js [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/page.js [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__7c3bf0ed._.js.map