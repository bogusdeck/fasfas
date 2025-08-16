(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/utils/api.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// API Configuration and Utility Functions
// ==============================================
// Base API Configuration
__turbopack_context__.s({
    "API_ENDPOINTS": ()=>API_ENDPOINTS,
    "ApiError": ()=>ApiError,
    "authApi": ()=>authApi,
    "default": ()=>__TURBOPACK__default__export__,
    "formatPhoneForAPI": ()=>formatPhoneForAPI,
    "handleApiError": ()=>handleApiError,
    "isApiSuccess": ()=>isApiSuccess,
    "profileApi": ()=>profileApi
});
const API_CONFIG = {
    baseURL: 'http://15.207.254.95:8080',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};
const API_ENDPOINTS = {
    // Authentication Endpoints
    auth: {
        phoneRequest: '/api/brand/otp/phone/request/',
        phoneVerify: '/api/brand/otp/phone/verify/',
        emailRequest: '/api/brand/otp/email/request/',
        emailVerify: '/api/brand/otp/email/verify/',
        signup: '/api/brand/auth/signup/',
        login: '/api/brand/auth/login/'
    },
    profile: {
        status: '/api/brand/profile/status/'
    }
};
// HTTP Methods
const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
};
class ApiError extends Error {
    constructor(message, status, data = null){
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}
// Generic API Request Function
async function apiRequest(endpoint) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { method = HTTP_METHODS.GET, data = null, headers = {}, timeout = API_CONFIG.timeout, isFormData = false } = options;
    const url = "".concat(API_CONFIG.baseURL).concat(endpoint);
    // Prepare request configuration
    const config = {
        method,
        headers: {
            ...API_CONFIG.headers,
            ...headers
        }
    };
    // Handle FormData (for file uploads)
    if (isFormData && data) {
        config.body = data;
        // Remove Content-Type header for FormData (browser will set it with boundary)
        delete config.headers['Content-Type'];
    } else if (data) {
        config.body = JSON.stringify(data);
    }
    // Add timeout functionality
    const controller = new AbortController();
    const timeoutId = setTimeout(()=>controller.abort(), timeout);
    config.signal = controller.signal;
    try {
        console.log("🚀 API Request: ".concat(method, " ").concat(url), data ? {
            data
        } : '');
        const response = await fetch(url, config);
        clearTimeout(timeoutId);
        // Parse response
        let responseData;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            responseData = await response.json();
        } else {
            responseData = await response.text();
        }
        // Handle HTTP errors
        if (!response.ok) {
            console.error("❌ API Error: ".concat(response.status), responseData);
            throw new ApiError((responseData === null || responseData === void 0 ? void 0 : responseData.message) || (responseData === null || responseData === void 0 ? void 0 : responseData.error) || "HTTP ".concat(response.status), response.status, responseData);
        }
        console.log("✅ API Success: ".concat(method, " ").concat(url), responseData);
        return responseData;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            console.error('⏰ API Timeout:', url);
            throw new ApiError('Request timeout', 408);
        }
        if (error instanceof ApiError) {
            throw error;
        }
        console.error('🔥 API Network Error:', error);
        throw new ApiError('Network error', 0, error);
    }
}
const authApi = {
    // Request OTP for phone number
    requestPhoneOTP: async (phoneNumber)=>{
        return apiRequest(API_ENDPOINTS.auth.phoneRequest, {
            method: HTTP_METHODS.POST,
            data: {
                phone_number: phoneNumber
            }
        });
    },
    // Verify phone OTP
    verifyPhoneOTP: async (phoneNumber, otp)=>{
        return apiRequest(API_ENDPOINTS.auth.phoneVerify, {
            method: HTTP_METHODS.POST,
            data: {
                phone_number: phoneNumber,
                otp_code: otp
            }
        });
    },
    // Request OTP for email
    // Request OTP for email
    requestEmailOTP: async (email, phoneNumber)=>{
        return apiRequest(API_ENDPOINTS.auth.emailRequest, {
            method: HTTP_METHODS.POST,
            data: {
                email: email,
                phone_number: formatPhoneForAPI(phoneNumber),
                is_phone_verified: true
            }
        });
    },
    // Verify email OTP
    verifyEmailOTP: async (email, otp)=>{
        return apiRequest(API_ENDPOINTS.auth.emailVerify, {
            method: HTTP_METHODS.POST,
            data: {
                email: email,
                otp_code: otp
            }
        });
    },
    // Brand user signup/registration after email verification
    register: async (userData)=>{
        return apiRequest(API_ENDPOINTS.auth.signup, {
            method: HTTP_METHODS.POST,
            data: userData
        });
    },
    // User login with email and password
    login: async (email, password)=>{
        return apiRequest(API_ENDPOINTS.auth.login, {
            method: HTTP_METHODS.POST,
            data: {
                email: email,
                password: password
            }
        });
    }
};
const profileApi = {
    // Get brand profile and onboarding status
    getStatus: async ()=>{
        return apiRequest(API_ENDPOINTS.profile.status, {
            method: HTTP_METHODS.GET
        });
    },
    // Update registration/onboarding progress
    updateProgress: async (step, isOnboarding)=>{
        return apiRequest(API_ENDPOINTS.profile.status, {
            method: HTTP_METHODS.PUT,
            data: {
                current_step: step,
                is_onboarding: isOnboarding
            }
        });
    }
};
function formatPhoneForAPI(phoneNumber) {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    // If it's a 10-digit Indian number, add country code
    if (cleanNumber.length === 10 && /^[6-9]/.test(cleanNumber)) {
        return "+91".concat(cleanNumber);
    }
    return cleanNumber;
}
function handleApiError(error) {
    let defaultMessage = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'An error occurred';
    if (error instanceof ApiError) {
        // Return specific error message from API
        return error.message || defaultMessage;
    }
    if (error.name === 'AbortError') {
        return 'Request timed out. Please try again.';
    }
    if (!navigator.onLine) {
        return 'No internet connection. Please check your network.';
    }
    return defaultMessage;
}
function isApiSuccess(response) {
    var _response_message;
    return response && (response.success === true || response.status === 'success' || ((_response_message = response.message) === null || _response_message === void 0 ? void 0 : _response_message.toLowerCase().includes('success')));
}
// Default export for convenience
const apiUtils = {
    authApi,
    profileApi,
    formatPhoneForAPI,
    handleApiError,
    isApiSuccess,
    ApiError
};
const __TURBOPACK__default__export__ = apiUtils;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/registration/StepHeader.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>StepHeader
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
;
;
function StepHeader(param) {
    let { title, subtitle } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].header,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].title,
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/registration/StepHeader.jsx",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].subtitle,
                children: subtitle
            }, void 0, false, {
                fileName: "[project]/src/components/registration/StepHeader.jsx",
                lineNumber: 9,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/registration/StepHeader.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = StepHeader;
var _c;
__turbopack_context__.k.register(_c, "StepHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/registration/PhoneNumberStep.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>PhoneNumberStep
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function PhoneNumberStep(param) {
    let { formData, handleChange, onSubmit, onBack } = param;
    _s();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const validateIndianPhoneNumber = (phoneNumber)=>{
        // Remove any spaces or special characters
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        // Check if it's exactly 10 digits and starts with 6, 7, 8, or 9
        const indianPhoneRegex = /^[6-9]\d{9}$/;
        return indianPhoneRegex.test(cleanNumber);
    };
    const handlePhoneChange = (e)=>{
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        // Clear error when user starts typing
        if (error) {
            setError('');
        }
        // Update the event target value
        e.target.value = value;
        handleChange(e);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');
        if (!validateIndianPhoneNumber(formData.phoneNumber)) {
            setError(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MESSAGES"].errors.invalidIndianPhone);
            return;
        }
        setIsLoading(true);
        try {
            // Format phone number for API
            const formattedPhone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPhoneForAPI"])(formData.phoneNumber);
            // Call the phone OTP request API
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].requestPhoneOTP(formattedPhone);
            console.log('Phone OTP request successful:', response);
            // Store the formatted phone number
            handleChange({
                target: {
                    name: 'phoneNumber',
                    value: formData.phoneNumber
                }
            });
            // Proceed to verification step
            onSubmit();
        } catch (apiError) {
            console.error('Phone OTP request failed:', apiError);
            const errorMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleApiError"])(apiError, 'Failed to send OTP. Please try again.');
            setError(errorMessage);
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].form,
        onSubmit: handleSubmit,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldGroup,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "phoneNumber",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                            children: "Phone Number"
                        }, void 0, false, {
                            fileName: "[project]/src/components/registration/PhoneNumberStep.jsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center px-3 py-3 border border-r-0 border-[#241331]/20 bg-[#241331]/5 text-[#241331] text-sm font-bold rounded-l-lg font-itc-gothic",
                                    children: "+91"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/registration/PhoneNumberStep.jsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "phoneNumber",
                                    name: "phoneNumber",
                                    type: "tel",
                                    required: true,
                                    minLength: 10,
                                    maxLength: 10,
                                    className: "flex-1 appearance-none relative block px-3 py-3 border ".concat(error ? 'border-red-500' : 'border-[#241331]/20', " placeholder-[#241331]/50 text-[#241331] rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#C3AF6C] focus:border-[#C3AF6C] focus:z-10 sm:text-sm font-itc-gothic transition-all duration-200"),
                                    placeholder: "9876543210",
                                    value: formData.phoneNumber,
                                    onChange: handlePhoneChange
                                }, void 0, false, {
                                    fileName: "[project]/src/components/registration/PhoneNumberStep.jsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/registration/PhoneNumberStep.jsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-xs text-red-600",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/components/registration/PhoneNumberStep.jsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-xs text-gray-500",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MESSAGES"].info.phoneNumberHelp
                        }, void 0, false, {
                            fileName: "[project]/src/components/registration/PhoneNumberStep.jsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/registration/PhoneNumberStep.jsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/registration/PhoneNumberStep.jsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].buttonGroup,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    disabled: isLoading,
                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].submitButton, " ").concat(isLoading ? 'opacity-50 cursor-not-allowed' : ''),
                    children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/registration/PhoneNumberStep.jsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, this),
                            "Sending OTP..."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/registration/PhoneNumberStep.jsx",
                        lineNumber: 117,
                        columnNumber: 13
                    }, this) : 'Send Verification Code'
                }, void 0, false, {
                    fileName: "[project]/src/components/registration/PhoneNumberStep.jsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/registration/PhoneNumberStep.jsx",
                lineNumber: 108,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/registration/PhoneNumberStep.jsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_s(PhoneNumberStep, "yuk4HmA6px6aynbC3ZJFnwneY7I=");
_c = PhoneNumberStep;
var _c;
__turbopack_context__.k.register(_c, "PhoneNumberStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/registration/PhoneVerificationStep.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>PhoneVerificationStep
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function PhoneVerificationStep(param) {
    let { formData, handleChange, onSubmit, onBack, onResend } = param;
    _s();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isResending, setIsResending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const validateVerificationCode = (code)=>{
        // Check if it's exactly 6 digits
        const codeRegex = /^\d{6}$/;
        return codeRegex.test(code) && code.length === 6;
    };
    const handleCodeChange = (e)=>{
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        // Limit to exactly 6 digits
        if (value.length > 6) {
            value = value.slice(0, 6);
        }
        // Clear error when user starts typing
        if (error) {
            setError('');
        }
        // Update the event target value
        e.target.value = value;
        handleChange(e);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');
        if (formData.verificationCode.length !== 6) {
            setError('Please enter exactly 6 digits');
            return;
        }
        if (!validateVerificationCode(formData.verificationCode)) {
            setError(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MESSAGES"].errors.invalidVerificationCode);
            return;
        }
        setIsLoading(true);
        try {
            // Format phone number for API
            const formattedPhone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPhoneForAPI"])(formData.phoneNumber);
            // Call the phone OTP verification API
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].verifyPhoneOTP(formattedPhone, formData.verificationCode);
            console.log('Phone OTP verification successful:', response);
            // Proceed to next step
            onSubmit();
        } catch (apiError) {
            console.error('Phone OTP verification failed:', apiError);
            const errorMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleApiError"])(apiError, 'Invalid OTP. Please try again.');
            setError(errorMessage);
        } finally{
            setIsLoading(false);
        }
    };
    const handleResend = async ()=>{
        setIsResending(true);
        setError('');
        try {
            // Format phone number for API
            const formattedPhone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPhoneForAPI"])(formData.phoneNumber);
            // Request new OTP
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].requestPhoneOTP(formattedPhone);
            console.log('OTP resent successfully:', response);
            // Clear the current verification code
            handleChange({
                target: {
                    name: 'verificationCode',
                    value: ''
                }
            });
            // Call the original onResend if provided
            if (onResend) {
                onResend();
            }
        } catch (apiError) {
            console.error('Resend OTP failed:', apiError);
            const errorMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleApiError"])(apiError, 'Failed to resend OTP. Please try again.');
            setError(errorMessage);
        } finally{
            setIsResending(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].form,
        onSubmit: handleSubmit,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldGroup,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "verificationCode",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                            children: "Verification Code"
                        }, void 0, false, {
                            fileName: "[project]/src/components/registration/PhoneVerificationStep.jsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: "verificationCode",
                            name: "verificationCode",
                            type: "text",
                            required: true,
                            minLength: 6,
                            maxLength: 6,
                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].codeInput, " ").concat(error ? 'border-red-500' : ''),
                            placeholder: "123456",
                            value: formData.verificationCode,
                            onChange: handleCodeChange
                        }, void 0, false, {
                            fileName: "[project]/src/components/registration/PhoneVerificationStep.jsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-xs text-red-600",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/components/registration/PhoneVerificationStep.jsx",
                            lineNumber: 123,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-xs text-gray-500",
                            children: [
                                "Enter the 6-digit code sent to +91",
                                formData.phoneNumber
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/registration/PhoneVerificationStep.jsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/registration/PhoneVerificationStep.jsx",
                    lineNumber: 106,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/registration/PhoneVerificationStep.jsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].buttonGroup,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onBack,
                        disabled: isLoading,
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].backButton, " ").concat(isLoading ? 'opacity-50 cursor-not-allowed' : ''),
                        children: "Back"
                    }, void 0, false, {
                        fileName: "[project]/src/components/registration/PhoneVerificationStep.jsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: isLoading,
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].submitButton, " ").concat(isLoading ? 'opacity-50 cursor-not-allowed' : ''),
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/registration/PhoneVerificationStep.jsx",
                                    lineNumber: 153,
                                    columnNumber: 15
                                }, this),
                                "Verifying..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/registration/PhoneVerificationStep.jsx",
                            lineNumber: 152,
                            columnNumber: 13
                        }, this) : 'Verify Phone'
                    }, void 0, false, {
                        fileName: "[project]/src/components/registration/PhoneVerificationStep.jsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/registration/PhoneVerificationStep.jsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleResend,
                disabled: isResending || isLoading,
                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].resendButton, " ").concat(isResending || isLoading ? 'opacity-50 cursor-not-allowed' : ''),
                children: isResending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-spin rounded-full h-3 w-3 border-b-2 border-[#C3AF6C] mr-2"
                        }, void 0, false, {
                            fileName: "[project]/src/components/registration/PhoneVerificationStep.jsx",
                            lineNumber: 172,
                            columnNumber: 13
                        }, this),
                        "Resending..."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/registration/PhoneVerificationStep.jsx",
                    lineNumber: 171,
                    columnNumber: 11
                }, this) : 'Resend Code'
            }, void 0, false, {
                fileName: "[project]/src/components/registration/PhoneVerificationStep.jsx",
                lineNumber: 162,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/registration/PhoneVerificationStep.jsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s(PhoneVerificationStep, "XPvfif/MVntKXd5ntd1L3WBm9aw=");
_c = PhoneVerificationStep;
var _c;
__turbopack_context__.k.register(_c, "PhoneVerificationStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/registration/EmailStep.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>EmailStep
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function EmailStep(param) {
    let { formData, handleChange, onSubmit, onBack, isPhoneVerified } = param;
    _s();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');
        // Validate email before proceeding
        if (!formData.email || !formData.email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }
        // Validate that we have the phone number from previous step
        if (!formData.phoneNumber) {
            setError('Phone number is missing. Please go back and verify your phone.');
            return;
        }
        // Check if phone is verified before proceeding
        if (!isPhoneVerified) {
            setError('Phone number not verified. Please go back and complete phone verification first.');
            return;
        }
        setIsLoading(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].requestEmailOTP(formData.email, formData.phoneNumber);
            console.log('Email OTP request successful:', response);
            // Proceed to verification step
            setIsLoading(false);
            onSubmit();
        } catch (error) {
            console.error('Failed to request email OTP:', error);
            setIsLoading(false);
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleApiError"])(error, 'Failed to send verification code. Please try again.'));
        }
    };
    const handleInputChange = (e)=>{
        // Clear error when user starts typing
        if (error) setError('');
        handleChange(e);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].form,
        onSubmit: handleSubmit,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldGroup,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "email",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                            children: "Email Address"
                        }, void 0, false, {
                            fileName: "[project]/src/components/registration/EmailStep.jsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: "email",
                            name: "email",
                            type: "email",
                            required: true,
                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : ''),
                            placeholder: "your.email@example.com",
                            value: formData.email,
                            onChange: handleInputChange
                        }, void 0, false, {
                            fileName: "[project]/src/components/registration/EmailStep.jsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-xs text-red-500 font-itc-gothic",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/components/registration/EmailStep.jsx",
                            lineNumber: 71,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/registration/EmailStep.jsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/registration/EmailStep.jsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].buttonGroup,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onBack,
                        disabled: isLoading,
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].backButton, " ").concat(isLoading ? 'opacity-50 cursor-not-allowed' : ''),
                        children: "Back"
                    }, void 0, false, {
                        fileName: "[project]/src/components/registration/EmailStep.jsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: isLoading,
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].submitButton, " ").concat(isLoading ? 'opacity-50 cursor-not-allowed' : ''),
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/registration/EmailStep.jsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this),
                                "Sending..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/registration/EmailStep.jsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this) : 'Send Email Verification'
                    }, void 0, false, {
                        fileName: "[project]/src/components/registration/EmailStep.jsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/registration/EmailStep.jsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/registration/EmailStep.jsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(EmailStep, "yuk4HmA6px6aynbC3ZJFnwneY7I=");
_c = EmailStep;
var _c;
__turbopack_context__.k.register(_c, "EmailStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/registration/EmailVerificationStep.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>EmailVerificationStep
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function EmailVerificationStep(param) {
    let { formData, handleChange, onSubmit, onBack, onResend } = param;
    _s();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isResending, setIsResending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const validateVerificationCode = (code)=>{
        // Check if it's exactly 6 digits
        const codeRegex = /^\d{6}$/;
        return codeRegex.test(code) && code.length === 6;
    };
    const handleCodeChange = (e)=>{
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        // Limit to exactly 6 digits
        if (value.length > 6) {
            value = value.slice(0, 6);
        }
        // Clear error when user starts typing
        if (error) {
            setError('');
        }
        // Update the event target value
        e.target.value = value;
        handleChange(e);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (formData.emailVerificationCode.length !== 6) {
            setError('Please enter exactly 6 digits');
            return;
        }
        if (!validateVerificationCode(formData.emailVerificationCode)) {
            setError('Please enter a valid 6-digit verification code');
            return;
        }
        setIsLoading(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].verifyEmailOTP(formData.email, formData.emailVerificationCode);
            console.log('Email verification successful:', response);
            setIsLoading(false);
            onSubmit(); // Proceed to next step
        } catch (error) {
            console.error('Email verification failed:', error);
            setIsLoading(false);
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleApiError"])(error, 'Invalid verification code. Please try again.'));
        }
    };
    const handleResend = async ()=>{
        setIsResending(true);
        setError('');
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].requestEmailOTP(formData.email, formData.phoneNumber);
            console.log('Email OTP resent successfully:', response);
            // Clear the verification code
            handleChange({
                target: {
                    name: 'emailVerificationCode',
                    value: ''
                }
            });
            // Call onResend if provided
            if (onResend) {
                onResend();
            }
        } catch (error) {
            console.error('Failed to resend email OTP:', error);
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleApiError"])(error, 'Failed to resend verification code. Please try again.'));
        } finally{
            setIsResending(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].form,
        onSubmit: handleSubmit,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldGroup,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "emailVerificationCode",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                            children: "Email Verification Code"
                        }, void 0, false, {
                            fileName: "[project]/src/components/registration/EmailVerificationStep.jsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: "emailVerificationCode",
                            name: "emailVerificationCode",
                            type: "text",
                            required: true,
                            minLength: 6,
                            maxLength: 6,
                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].codeInput, " ").concat(error ? 'border-red-500' : ''),
                            placeholder: "123456",
                            value: formData.emailVerificationCode,
                            onChange: handleCodeChange
                        }, void 0, false, {
                            fileName: "[project]/src/components/registration/EmailVerificationStep.jsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-xs text-red-500 font-itc-gothic",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/components/registration/EmailVerificationStep.jsx",
                            lineNumber: 110,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/registration/EmailVerificationStep.jsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/registration/EmailVerificationStep.jsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].buttonGroup,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onBack,
                        disabled: isLoading,
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].backButton, " ").concat(isLoading ? 'opacity-50 cursor-not-allowed' : ''),
                        children: "Back"
                    }, void 0, false, {
                        fileName: "[project]/src/components/registration/EmailVerificationStep.jsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: isLoading,
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].submitButton, " ").concat(isLoading ? 'opacity-50 cursor-not-allowed' : ''),
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/registration/EmailVerificationStep.jsx",
                                    lineNumber: 137,
                                    columnNumber: 15
                                }, this),
                                "Verifying..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/registration/EmailVerificationStep.jsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, this) : 'Verify Email'
                    }, void 0, false, {
                        fileName: "[project]/src/components/registration/EmailVerificationStep.jsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/registration/EmailVerificationStep.jsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleResend,
                disabled: isResending || isLoading,
                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].resendButton, " ").concat(isResending || isLoading ? 'opacity-50 cursor-not-allowed' : ''),
                children: isResending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-spin rounded-full h-3 w-3 border-b-2 border-[#C3AF6C] mr-2"
                        }, void 0, false, {
                            fileName: "[project]/src/components/registration/EmailVerificationStep.jsx",
                            lineNumber: 156,
                            columnNumber: 13
                        }, this),
                        "Resending..."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/registration/EmailVerificationStep.jsx",
                    lineNumber: 155,
                    columnNumber: 11
                }, this) : 'Resend Code'
            }, void 0, false, {
                fileName: "[project]/src/components/registration/EmailVerificationStep.jsx",
                lineNumber: 146,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/registration/EmailVerificationStep.jsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
_s(EmailVerificationStep, "XPvfif/MVntKXd5ntd1L3WBm9aw=");
_c = EmailVerificationStep;
var _c;
__turbopack_context__.k.register(_c, "EmailVerificationStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/registration/PasswordStep.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>PasswordStep
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function PasswordStep(param) {
    let { formData, handleChange, onSubmit, onBack, isEmailVerified } = param;
    _s();
    const { getAuthToken, setAuthToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const stepData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STEPS"][5];
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = async (e)=>{
        var _formData_firstName, _formData_lastName;
        e.preventDefault();
        setError('');
        // Check if email has been verified
        if (!isEmailVerified) {
            setError('Email verification required. Please go back and complete email verification first.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }
        // Validate required fields
        if (!((_formData_firstName = formData.firstName) === null || _formData_firstName === void 0 ? void 0 : _formData_firstName.trim())) {
            setError('First name is required');
            return;
        }
        if (!((_formData_lastName = formData.lastName) === null || _formData_lastName === void 0 ? void 0 : _formData_lastName.trim())) {
            setError('Last name is required');
            return;
        }
        setIsLoading(true);
        try {
            // Prepare user data for registration
            const userData = {
                phone_number: formData.phoneNumber,
                email: formData.email,
                first_name: formData.firstName,
                last_name: formData.lastName,
                password: formData.password,
                email_verified: true // Include email verification status
            };
            // Call the registration API
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].register(userData);
            console.log('Registration successful:', response);
            // Store the token directly from the registration response
            console.log('Registration response structure:', JSON.stringify(response, null, 2));
            if (response && response.token) {
                // Check if token is an object with access property
                if (response.token.access) {
                    // Format the access token with Bearer prefix
                    const accessToken = 'Bearer ' + response.token.access;
                    console.log('Saving access token securely:', accessToken.substring(0, 20) + '...');
                    setAuthToken(accessToken);
                    // Save refresh token separately if needed (handled by AuthContext)
                    if (response.token.refresh) {
                        sessionStorage.setItem('refreshToken', response.token.refresh);
                        console.log('Refresh token saved securely');
                    }
                } else {
                    console.error('Unexpected token structure in registration response:', response.token);
                }
                // Double-check token was saved
                const savedToken = getAuthToken();
                if (savedToken) {
                    console.log('Token successfully saved securely:', savedToken.substring(0, 20) + '...');
                } else {
                    console.error('Failed to save token securely');
                }
            } else {
                console.warn('No token in registration response:', response);
            }
            console.log('Authentication completed successfully, moving to brand onboarding');
            // Move to brand onboarding steps
            onSubmit();
        } catch (apiError) {
            console.error('Registration failed:', apiError);
            const errorMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleApiError"])(apiError, 'Registration failed. Please try again.');
            setError(errorMessage);
        } finally{
            setIsLoading(false);
        }
    };
    const handleInputChange = (e)=>{
        // Clear error when user starts typing
        if (error) setError('');
        handleChange(e);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].form,
        onSubmit: handleSubmit,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldGroup,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "firstName",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                children: "First Name"
                            }, void 0, false, {
                                fileName: "[project]/src/components/registration/PasswordStep.jsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "firstName",
                                name: "firstName",
                                type: "text",
                                required: true,
                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : ''),
                                placeholder: "Enter your first name",
                                value: formData.firstName || '',
                                onChange: handleInputChange
                            }, void 0, false, {
                                fileName: "[project]/src/components/registration/PasswordStep.jsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/registration/PasswordStep.jsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "lastName",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                children: "Last Name"
                            }, void 0, false, {
                                fileName: "[project]/src/components/registration/PasswordStep.jsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "lastName",
                                name: "lastName",
                                type: "text",
                                required: true,
                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : ''),
                                placeholder: "Enter your last name",
                                value: formData.lastName || '',
                                onChange: handleInputChange
                            }, void 0, false, {
                                fileName: "[project]/src/components/registration/PasswordStep.jsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/registration/PasswordStep.jsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "password",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                children: stepData.fields.password.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/registration/PasswordStep.jsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "password",
                                name: "password",
                                type: stepData.fields.password.type,
                                required: stepData.fields.password.required,
                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : ''),
                                placeholder: stepData.fields.password.placeholder,
                                value: formData.password,
                                onChange: handleInputChange
                            }, void 0, false, {
                                fileName: "[project]/src/components/registration/PasswordStep.jsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/registration/PasswordStep.jsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "confirmPassword",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                children: stepData.fields.confirmPassword.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/registration/PasswordStep.jsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "confirmPassword",
                                name: "confirmPassword",
                                type: stepData.fields.confirmPassword.type,
                                required: stepData.fields.confirmPassword.required,
                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : ''),
                                placeholder: stepData.fields.confirmPassword.placeholder,
                                value: formData.confirmPassword,
                                onChange: handleInputChange
                            }, void 0, false, {
                                fileName: "[project]/src/components/registration/PasswordStep.jsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/registration/PasswordStep.jsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-red-600",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/components/registration/PasswordStep.jsx",
                            lineNumber: 181,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/registration/PasswordStep.jsx",
                        lineNumber: 180,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/registration/PasswordStep.jsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].buttonGroup,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onBack,
                        disabled: isLoading,
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].backButton, " ").concat(isLoading ? 'opacity-50 cursor-not-allowed' : ''),
                        children: stepData.buttons.back
                    }, void 0, false, {
                        fileName: "[project]/src/components/registration/PasswordStep.jsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: isLoading,
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].submitButton, " ").concat(isLoading ? 'opacity-50 cursor-not-allowed' : ''),
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/registration/PasswordStep.jsx",
                                    lineNumber: 208,
                                    columnNumber: 15
                                }, this),
                                "Creating Account..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/registration/PasswordStep.jsx",
                            lineNumber: 207,
                            columnNumber: 13
                        }, this) : stepData.buttons.submit
                    }, void 0, false, {
                        fileName: "[project]/src/components/registration/PasswordStep.jsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/registration/PasswordStep.jsx",
                lineNumber: 188,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/registration/PasswordStep.jsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_s(PasswordStep, "EDhuG+nx6WdfgMvURcIx05aU2kA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = PasswordStep;
var _c;
__turbopack_context__.k.register(_c, "PasswordStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/onboarding/GSTVerificationStep.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>GSTVerificationStep
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function GSTVerificationStep(param) {
    let { formData, handleChange, onSubmit, onBack, isFirstOnboardingStep = false } = param;
    _s();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [gstDetails, setGstDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isVerifying, setIsVerifying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [verificationToken, setVerificationToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { getAuthToken, authenticatedFetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // Get auth token on component mount and handle authentication checking
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GSTVerificationStep.useEffect": ()=>{
            // Function to check if user is authenticated
            const checkAuthentication = {
                "GSTVerificationStep.useEffect.checkAuthentication": async ()=>{
                    setIsLoading(true);
                    const token = getAuthToken();
                    if (!token) {
                        console.warn('No authentication token found in localStorage');
                        setError('Authentication required. Please log in before proceeding.');
                        setIsAuthenticated(false);
                        // Redirect to login page after a brief delay
                        setTimeout({
                            "GSTVerificationStep.useEffect.checkAuthentication": ()=>{
                                router.push('/login');
                            }
                        }["GSTVerificationStep.useEffect.checkAuthentication"], 2000);
                        setIsLoading(false);
                        return;
                    }
                    setVerificationToken(token.trim());
                    setIsAuthenticated(true);
                    setIsLoading(false);
                    console.log('Auth token loaded, authentication successful');
                }
            }["GSTVerificationStep.useEffect.checkAuthentication"];
            checkAuthentication();
        }
    }["GSTVerificationStep.useEffect"], [
        router
    ]);
    const validateGSTNumber = (gstNumber)=>{
        // Basic GST validation: 15 characters, starts with 2 digits (state code)
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        return gstRegex.test(gstNumber);
    };
    const handleGSTChange = (e)=>{
        let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        // Limit to 15 characters
        if (value.length > 15) {
            value = value.slice(0, 15);
        }
        // Clear error and GST details when user types
        if (error) setError('');
        if (gstDetails) setGstDetails(null);
        e.target.value = value;
        handleChange(e);
    };
    const handleVerifyGST = async ()=>{
        if (!formData.gstNumber) {
            setError('Please enter GST number');
            return;
        }
        if (!validateGSTNumber(formData.gstNumber)) {
            setError('Please enter a valid GST number (15 characters)');
            return;
        }
        setIsVerifying(true);
        setError('');
        try {
            // Use the token we already validated in useEffect
            if (!verificationToken) {
                // Try to get the token again - it might have been set after component mounted
                const token = getAuthToken();
                if (token) {
                    // We found a token now, let's use it
                    setVerificationToken(token.trim());
                    console.log('Found token on verification attempt');
                } else {
                    setError('Authentication token not found. Please log in again.');
                    setIsVerifying(false);
                    return;
                }
            }
            console.log('Using verified auth token');
            // Format token properly - ensure it starts with Bearer if not already included
            let formattedToken = verificationToken;
            if (!formattedToken.startsWith('Bearer ')) {
                formattedToken = "Bearer ".concat(formattedToken);
            }
            console.log('Request headers:', {
                'Content-Type': 'application/json',
                'Authorization': formattedToken.substring(0, 15) + '...'
            });
            console.log('Request payload:', {
                gst_number: formData.gstNumber
            });
            // Add more verbose debugging
            console.log('Making API request with headers:', {
                'Content-Type': 'application/json',
                'Authorization': formattedToken.substring(0, 15) + '...' + formattedToken.substring(formattedToken.length - 5)
            });
            // Use authenticated fetch with automatic token refresh
            const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/gst/verify/', {
                method: 'POST',
                body: JSON.stringify({
                    gst_number: formData.gstNumber
                })
            });
            // Log detailed response information
            console.log('Response headers:', [
                ...response.headers.entries()
            ]);
            console.log('Response status:', response.status);
            console.log('Response statusText:', response.statusText);
            console.log('Response status:', response.status);
            // Handle 401 Unauthorized specifically
            if (response.status === 401) {
                console.error('Authentication error: 401 Unauthorized');
                setError('Authentication failed. Please log out and log in again.');
                setGstDetails(null);
                setIsVerifying(false);
                return;
            }
            const data = await response.json();
            console.log('GST verification response:', data);
            if (response.ok && data.success && data.verified) {
                // Extract GST details from response
                const gstData = {
                    businessName: data.company_name || data.business_name || '',
                    tradeName: data.trade_name || data.business_name || '',
                    registrationDate: data.registration_date || '',
                    constitution: data.constitution || '',
                    address: data.address || '',
                    status: data.status || 'Active',
                    taxpayerType: data.taxpayer_type || 'Regular'
                };
                setGstDetails(gstData);
                setError('');
                // Store GST details in formData for prepopulation in next steps
                handleChange({
                    target: {
                        name: 'gstBusinessName',
                        value: gstData.businessName
                    }
                });
                handleChange({
                    target: {
                        name: 'gstTradeName',
                        value: gstData.tradeName
                    }
                });
                handleChange({
                    target: {
                        name: 'gstConstitution',
                        value: gstData.constitution
                    }
                });
                handleChange({
                    target: {
                        name: 'gstAddress',
                        value: gstData.address
                    }
                });
                handleChange({
                    target: {
                        name: 'gstStatus',
                        value: gstData.status
                    }
                });
                handleChange({
                    target: {
                        name: 'gstRegistrationDate',
                        value: gstData.registrationDate
                    }
                });
            } else {
                // Handle specific error types
                if (response.status === 401) {
                    console.error('Authentication error during GST verification:', data);
                    setError('Authentication failed. Please log out and log in again.');
                } else {
                    setError(data.message || data.detail || 'GST verification failed. Please check your GST number and try again.');
                }
                setGstDetails(null);
            }
        } catch (error) {
            console.error('GST verification error:', error);
            setError('Network error while verifying GST. Please try again.');
            setGstDetails(null);
        } finally{
            setIsVerifying(false);
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!gstDetails) {
            setError('Please verify your GST number first');
            return;
        }
        console.log('GST verification completed, proceeding to next step');
        onSubmit();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto p-6",
        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center min-h-[300px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                    lineNumber: 219,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "ml-3 text-gray-600",
                    children: "Checking authentication..."
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                    lineNumber: 220,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
            lineNumber: 218,
            columnNumber: 9
        }, this) : !isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-red-50 border-l-4 border-red-500 p-4 mb-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "h-5 w-5 text-red-500",
                            viewBox: "0 0 20 20",
                            fill: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                fillRule: "evenodd",
                                d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
                                clipRule: "evenodd"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                lineNumber: 227,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                            lineNumber: 226,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                        lineNumber: 225,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-medium text-red-800",
                                children: "Authentication Required"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                lineNumber: 231,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 text-sm text-red-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "You must be logged in to access the brand onboarding process."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                        lineNumber: 233,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2",
                                        children: "Redirecting you to the login page..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                        lineNumber: 234,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                lineNumber: 232,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/login",
                                    className: "inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150",
                                    children: "Go to Login"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                    lineNumber: 237,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                lineNumber: 236,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                        lineNumber: 230,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                lineNumber: 224,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
            lineNumber: 223,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                isFirstOnboardingStep && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5 text-blue-600 mt-0.5",
                                    fill: "currentColor",
                                    viewBox: "0 0 20 20",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fillRule: "evenodd",
                                        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
                                        clipRule: "evenodd"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                        lineNumber: 254,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                    lineNumber: 253,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                lineNumber: 252,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-medium text-blue-800",
                                        children: "Welcome to Brand Onboarding!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                        lineNumber: 258,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm text-blue-700",
                                        children: "You've successfully completed the authentication process. Now let's set up your brand profile. You can complete this process at your own pace."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                        lineNumber: 259,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                lineNumber: 257,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                        lineNumber: 251,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                    lineNumber: 250,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-gray-900 mb-2",
                            children: "GST Verification"
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                            lineNumber: 269,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: "Enter your GST number to verify your business details"
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                            lineNumber: 270,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                    lineNumber: 268,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].form,
                    onSubmit: handleSubmit,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldGroup,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "gstNumber",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                            children: "GST Number"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                            lineNumber: 276,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "gstNumber",
                                                    name: "gstNumber",
                                                    type: "text",
                                                    required: true,
                                                    maxLength: 15,
                                                    className: "flex-1 ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error && !gstDetails ? 'border-red-500' : ''),
                                                    placeholder: "07AAACG0569H1ZH",
                                                    value: formData.gstNumber || '',
                                                    onChange: handleGSTChange
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                    lineNumber: 280,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handleVerifyGST,
                                                    disabled: isVerifying || !formData.gstNumber,
                                                    className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ".concat(isVerifying ? 'animate-pulse' : ''),
                                                    children: isVerifying ? 'Verifying...' : 'Verify'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                    lineNumber: 291,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                            lineNumber: 279,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-gray-500",
                                            children: "Enter your 15-digit GST number (e.g., 07AAACG0569H1ZH or 29AABCU9603R1ZX)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                            lineNumber: 300,
                                            columnNumber: 17
                                        }, this),
                                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-red-600",
                                                    children: error
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                    lineNumber: 306,
                                                    columnNumber: 21
                                                }, this),
                                                error.includes('log in') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "/login",
                                                    className: "mt-2 inline-block text-xs text-blue-600 hover:text-blue-800",
                                                    children: "Click here to log in"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                    lineNumber: 310,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                            lineNumber: 305,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                    lineNumber: 275,
                                    columnNumber: 15
                                }, this),
                                gstDetails && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 p-4 bg-green-50 border border-green-200 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 h-2 bg-green-500 rounded-full mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                    lineNumber: 324,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-semibold text-green-800",
                                                    children: "GST Details Verified"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                    lineNumber: 325,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                            lineNumber: 323,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium text-gray-700",
                                                            children: "Business Name:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                            lineNumber: 330,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-900",
                                                            children: gstDetails.businessName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                            lineNumber: 331,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                    lineNumber: 329,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium text-gray-700",
                                                            children: "Trade Name:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                            lineNumber: 334,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-900",
                                                            children: gstDetails.tradeName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                            lineNumber: 335,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                    lineNumber: 333,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium text-gray-700",
                                                            children: "Constitution:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                            lineNumber: 338,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-900",
                                                            children: gstDetails.constitution
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                            lineNumber: 339,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                    lineNumber: 337,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium text-gray-700",
                                                            children: "Status:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                            lineNumber: 342,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs",
                                                            children: gstDetails.status
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                            lineNumber: 343,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                    lineNumber: 341,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "md:col-span-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium text-gray-700",
                                                            children: "Registered Address:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                            lineNumber: 348,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-900",
                                                            children: gstDetails.address
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                            lineNumber: 349,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                    lineNumber: 347,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium text-gray-700",
                                                            children: "Registration Date:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                            lineNumber: 352,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-900",
                                                            children: gstDetails.registrationDate
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                            lineNumber: 353,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                    lineNumber: 351,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium text-gray-700",
                                                            children: "Taxpayer Type:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                            lineNumber: 356,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-900",
                                                            children: gstDetails.taxpayerType
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                            lineNumber: 357,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                                    lineNumber: 355,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                            lineNumber: 328,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                    lineNumber: 322,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                            lineNumber: 274,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].buttonGroup,
                            children: [
                                !isFirstOnboardingStep && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onBack,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].backButton,
                                    children: "Back"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                    lineNumber: 366,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: !gstDetails,
                                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].submitButton, " ").concat(!gstDetails ? 'opacity-50 cursor-not-allowed' : '', " ").concat(isFirstOnboardingStep ? 'w-full' : ''),
                                    children: "Continue"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                                    lineNumber: 374,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                            lineNumber: 364,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
                    lineNumber: 273,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/src/components/onboarding/GSTVerificationStep.jsx",
        lineNumber: 216,
        columnNumber: 5
    }, this);
}
_s(GSTVerificationStep, "+X9Fzlpop1LENTi9QumLNIFmJw8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = GSTVerificationStep;
var _c;
__turbopack_context__.k.register(_c, "GSTVerificationStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/onboarding/BasicInformationStep.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>BasicInformationStep
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function BasicInformationStep(param) {
    let { formData, handleChange, onSubmit, onBack } = param;
    var // Only depend on key data sources, not the form data itself to prevent loops
    _userData_user_details, _userData_user_details1, _userData_user_details_phone_number, _userData_user_details2, _userData_user_details3;
    _s();
    const stepData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBOARDING_STEPS"][2];
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { formData: savedFormData, userData, saveFormData, getAuthToken, authenticatedFetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // Prepopulate fields with data from previous steps and saved data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BasicInformationStep.useEffect": ()=>{
            var _userData_user_details, _userData_user_details1;
            // Only prepopulate if no form data exists yet (initial load)
            const hasAnyFormData = formData.ownerName || formData.contactNumber || formData.businessEmail || formData.companyName || formData.companyType || formData.addressLine1 || formData.addressLine2 || formData.state || formData.zipCode;
            if (hasAnyFormData) {
                return; // Don't prepopulate if user has already started filling the form
            }
            let hasUpdates = false;
            const updates = {};
            // Use saved form data as fallback for prepopulation
            const sourceData = {
                ...savedFormData,
                ...formData
            };
            // Prepopulate owner name from registration data or saved data
            if (!formData.ownerName && (sourceData.firstName || sourceData.lastName || sourceData.ownerName)) {
                const ownerName = sourceData.ownerName || "".concat(sourceData.firstName || '', " ").concat(sourceData.lastName || '').trim();
                if (ownerName) {
                    updates.ownerName = ownerName;
                    hasUpdates = true;
                }
            }
            // Prepopulate contact number from verified user details in AuthContext
            if (!formData.contactNumber && (userData === null || userData === void 0 ? void 0 : (_userData_user_details = userData.user_details) === null || _userData_user_details === void 0 ? void 0 : _userData_user_details.phone_number)) {
                const contactNumber = userData.user_details.phone_number;
                if (contactNumber) {
                    // Remove +91 prefix if present to show only the 10-digit number
                    const cleanNumber = contactNumber.replace(/^\+91/, '');
                    updates.contactNumber = cleanNumber;
                    hasUpdates = true;
                }
            }
            // Prepopulate business email from verified user details in AuthContext
            if (!formData.businessEmail && (userData === null || userData === void 0 ? void 0 : (_userData_user_details1 = userData.user_details) === null || _userData_user_details1 === void 0 ? void 0 : _userData_user_details1.email)) {
                const businessEmail = userData.user_details.email;
                if (businessEmail) {
                    updates.businessEmail = businessEmail;
                    hasUpdates = true;
                }
            }
            // Prepopulate company name from GST data or saved data
            if (!formData.companyName && (sourceData.gstBusinessName || sourceData.gstTradeName || sourceData.companyName)) {
                const companyName = sourceData.companyName || sourceData.gstBusinessName || sourceData.gstTradeName;
                if (companyName) {
                    updates.companyName = companyName;
                    hasUpdates = true;
                }
            }
            // Prepopulate company type from GST constitution or saved data
            if (!formData.companyType && (sourceData.gstConstitution || sourceData.companyType)) {
                const companyType = sourceData.companyType || sourceData.gstConstitution;
                if (companyType) {
                    updates.companyType = companyType;
                    hasUpdates = true;
                }
            }
            // Prepopulate business address from GST data or saved data
            if (!formData.addressLine1 && !formData.addressLine2 && !formData.state && !formData.zipCode) {
                // Use individual address components if available from saved data
                if (sourceData.addressLine1) {
                    updates.addressLine1 = sourceData.addressLine1;
                    hasUpdates = true;
                }
                if (sourceData.addressLine2) {
                    updates.addressLine2 = sourceData.addressLine2;
                    hasUpdates = true;
                }
                if (sourceData.state) {
                    updates.state = sourceData.state;
                    hasUpdates = true;
                }
                if (sourceData.zipCode) {
                    updates.zipCode = sourceData.zipCode;
                    hasUpdates = true;
                }
                // Only if no individual components exist, try to use the full address in addressLine1
                if (!sourceData.addressLine1 && !sourceData.addressLine2 && !sourceData.state && !sourceData.zipCode) {
                    const fullAddress = sourceData.businessAddress || sourceData.gstAddress;
                    if (fullAddress && typeof fullAddress === 'string') {
                        // Put the full address in addressLine1 as a starting point
                        updates.addressLine1 = fullAddress;
                        hasUpdates = true;
                    }
                }
            }
            // Apply all updates at once to avoid multiple re-renders
            if (hasUpdates) {
                Object.entries(updates).forEach({
                    "BasicInformationStep.useEffect": (param)=>{
                        let [key, value] = param;
                        handleChange({
                            target: {
                                name: key,
                                value: value
                            }
                        });
                    }
                }["BasicInformationStep.useEffect"]);
            }
        }
    }["BasicInformationStep.useEffect"], [
        userData === null || userData === void 0 ? void 0 : (_userData_user_details = userData.user_details) === null || _userData_user_details === void 0 ? void 0 : _userData_user_details.phone_number,
        userData === null || userData === void 0 ? void 0 : (_userData_user_details1 = userData.user_details) === null || _userData_user_details1 === void 0 ? void 0 : _userData_user_details1.email,
        savedFormData === null || savedFormData === void 0 ? void 0 : savedFormData.firstName,
        savedFormData === null || savedFormData === void 0 ? void 0 : savedFormData.lastName,
        savedFormData === null || savedFormData === void 0 ? void 0 : savedFormData.gstBusinessName,
        savedFormData === null || savedFormData === void 0 ? void 0 : savedFormData.gstTradeName,
        savedFormData === null || savedFormData === void 0 ? void 0 : savedFormData.gstConstitution,
        savedFormData === null || savedFormData === void 0 ? void 0 : savedFormData.gstAddress,
        savedFormData === null || savedFormData === void 0 ? void 0 : savedFormData.addressLine1,
        savedFormData === null || savedFormData === void 0 ? void 0 : savedFormData.addressLine2,
        savedFormData === null || savedFormData === void 0 ? void 0 : savedFormData.state,
        savedFormData === null || savedFormData === void 0 ? void 0 : savedFormData.zipCode,
        handleChange
    ]);
    // Company type options
    const companyTypes = [
        'Private Limited Company',
        'Public Limited Company',
        'Limited Liability Partnership (LLP)',
        'Partnership Firm',
        'Sole Proprietorship',
        'One Person Company (OPC)',
        'Section 8 Company',
        'Producer Company',
        'Other'
    ];
    const handleSubmit = async (e)=>{
        var _userData_user_details_phone_number, _userData_user_details, _userData_user_details1, _formData_addressLine1, _formData_addressLine2, _formData_state, _formData_zipCode, _formData_addressLine11, _formData_state1, _formData_zipCode1, _formData_zipCode2;
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        // Get effective values (including verified data from AuthContext)
        const effectiveOwnerName = formData.ownerName || "".concat(formData.firstName || '', " ").concat(formData.lastName || '').trim();
        const effectiveContactNumber = formData.contactNumber || (userData === null || userData === void 0 ? void 0 : (_userData_user_details = userData.user_details) === null || _userData_user_details === void 0 ? void 0 : (_userData_user_details_phone_number = _userData_user_details.phone_number) === null || _userData_user_details_phone_number === void 0 ? void 0 : _userData_user_details_phone_number.replace(/^\+91/, '')); // Always use verified number from AuthContext
        const effectiveBusinessEmail = formData.businessEmail || (userData === null || userData === void 0 ? void 0 : (_userData_user_details1 = userData.user_details) === null || _userData_user_details1 === void 0 ? void 0 : _userData_user_details1.email); // Always use verified email from AuthContext
        const effectiveCompanyName = formData.companyName || formData.gstBusinessName || formData.gstTradeName;
        const effectiveCompanyType = formData.companyType || formData.gstConstitution;
        // Concatenate address fields for API submission
        const addressParts = [
            (_formData_addressLine1 = formData.addressLine1) === null || _formData_addressLine1 === void 0 ? void 0 : _formData_addressLine1.trim(),
            (_formData_addressLine2 = formData.addressLine2) === null || _formData_addressLine2 === void 0 ? void 0 : _formData_addressLine2.trim(),
            (_formData_state = formData.state) === null || _formData_state === void 0 ? void 0 : _formData_state.trim(),
            (_formData_zipCode = formData.zipCode) === null || _formData_zipCode === void 0 ? void 0 : _formData_zipCode.trim()
        ].filter(Boolean); // Remove empty parts
        const effectiveBusinessAddress = addressParts.length > 0 ? addressParts.join(', ') : formData.gstAddress || '';
        // Validation
        if (!(effectiveOwnerName === null || effectiveOwnerName === void 0 ? void 0 : effectiveOwnerName.trim())) {
            setError('Owner name is required');
            setIsSubmitting(false);
            return;
        }
        // Skip validation for contact number and email since they are verified and read-only
        if (!(effectiveContactNumber === null || effectiveContactNumber === void 0 ? void 0 : effectiveContactNumber.trim())) {
            setError('Contact number is missing. Please contact support.');
            setIsSubmitting(false);
            return;
        }
        if (!(effectiveBusinessEmail === null || effectiveBusinessEmail === void 0 ? void 0 : effectiveBusinessEmail.trim())) {
            setError('Business email is missing. Please contact support.');
            setIsSubmitting(false);
            return;
        }
        if (!(effectiveCompanyName === null || effectiveCompanyName === void 0 ? void 0 : effectiveCompanyName.trim())) {
            setError('Company name is required');
            setIsSubmitting(false);
            return;
        }
        if (!(effectiveCompanyType === null || effectiveCompanyType === void 0 ? void 0 : effectiveCompanyType.trim())) {
            setError('Please select a company type');
            setIsSubmitting(false);
            return;
        }
        // Validate required address fields
        if (!((_formData_addressLine11 = formData.addressLine1) === null || _formData_addressLine11 === void 0 ? void 0 : _formData_addressLine11.trim())) {
            setError('Address Line 1 is required');
            setIsSubmitting(false);
            return;
        }
        if (!((_formData_state1 = formData.state) === null || _formData_state1 === void 0 ? void 0 : _formData_state1.trim())) {
            setError('State is required');
            setIsSubmitting(false);
            return;
        }
        if (!((_formData_zipCode1 = formData.zipCode) === null || _formData_zipCode1 === void 0 ? void 0 : _formData_zipCode1.trim())) {
            setError('ZIP Code is required');
            setIsSubmitting(false);
            return;
        }
        // Validate ZIP code format (6 digits for Indian PIN codes)
        const zipCodeRegex = /^\d{6}$/;
        if (!zipCodeRegex.test((_formData_zipCode2 = formData.zipCode) === null || _formData_zipCode2 === void 0 ? void 0 : _formData_zipCode2.trim())) {
            setError('ZIP Code must be exactly 6 digits');
            setIsSubmitting(false);
            return;
        }
        if (!(effectiveBusinessAddress === null || effectiveBusinessAddress === void 0 ? void 0 : effectiveBusinessAddress.trim())) {
            setError('Business address is required. Please fill in at least Address Line 1.');
            setIsSubmitting(false);
            return;
        }
        try {
            // Get authentication token using secure method
            const token = getAuthToken();
            if (!token) {
                setError('Authentication required. Please log in again.');
                setIsSubmitting(false);
                return;
            }
            // Prepare data for API
            const basicInfoData = {
                owner_name: effectiveOwnerName,
                contact_number: effectiveContactNumber.startsWith('+91') ? effectiveContactNumber : "+91".concat(effectiveContactNumber),
                email: effectiveBusinessEmail,
                company_name: effectiveCompanyName,
                company_type: effectiveCompanyType,
                address: effectiveBusinessAddress
            };
            console.log('Submitting basic information:', basicInfoData);
            // Use authenticated fetch with automatic token refresh
            const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/basic-info/', {
                method: 'POST',
                body: JSON.stringify(basicInfoData)
            });
            const data = await response.json();
            console.log('Basic info API response:', {
                status: response.status,
                data
            });
            if (response.ok && data.success) {
                console.log('Basic information submitted successfully, proceeding to next step');
                // Save the submitted data for future prepopulation
                const savedData = {
                    ownerName: effectiveOwnerName,
                    contactNumber: effectiveContactNumber,
                    businessEmail: effectiveBusinessEmail,
                    companyName: effectiveCompanyName,
                    companyType: effectiveCompanyType,
                    addressLine1: formData.addressLine1 || '',
                    addressLine2: formData.addressLine2 || '',
                    state: formData.state || '',
                    zipCode: formData.zipCode || '',
                    businessAddress: effectiveBusinessAddress
                };
                saveFormData(savedData);
                onSubmit();
            } else {
                // Handle API errors
                if (response.status === 401) {
                    setError('Authentication failed. Please log in again.');
                } else {
                    setError(data.message || data.detail || 'Failed to submit basic information. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error submitting basic information:', error);
            setError('Network error while submitting information. Please try again.');
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleInputChange = (e)=>{
        if (error) setError('');
        handleChange(e);
    };
    const handleZipCodeChange = (e)=>{
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        // Limit to 6 digits
        if (value.length > 6) {
            value = value.slice(0, 6);
        }
        // Clear error when user starts typing
        if (error) setError('');
        e.target.value = value;
        handleChange(e);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-900 mb-2",
                        children: "Basic Information"
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Provide your business and contact details"
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                        lineNumber: 323,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                lineNumber: 321,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].form,
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "ownerName",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Owner Name *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                        lineNumber: 330,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "ownerName",
                                        name: "ownerName",
                                        type: "text",
                                        required: true,
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : ''),
                                        placeholder: "Enter owner's full name",
                                        value: formData.ownerName || '',
                                        onChange: handleInputChange
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                        lineNumber: 333,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                lineNumber: 329,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "contactNumber",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Contact Number * (Verified)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                        lineNumber: 347,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md",
                                                children: "+91"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                                lineNumber: 351,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "contactNumber",
                                                name: "contactNumber",
                                                type: "text",
                                                required: true,
                                                maxLength: 10,
                                                readOnly: true,
                                                className: "flex-1 ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " bg-gray-50 text-gray-600 cursor-not-allowed rounded-l-none"),
                                                placeholder: "Verified contact number",
                                                value: formData.contactNumber || (userData === null || userData === void 0 ? void 0 : (_userData_user_details2 = userData.user_details) === null || _userData_user_details2 === void 0 ? void 0 : (_userData_user_details_phone_number = _userData_user_details2.phone_number) === null || _userData_user_details_phone_number === void 0 ? void 0 : _userData_user_details_phone_number.replace(/^\+91/, '')) || ''
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                                lineNumber: 354,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                        lineNumber: 350,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-gray-500",
                                        children: "This is your verified phone number and cannot be changed"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                        lineNumber: 367,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                lineNumber: 346,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "businessEmail",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Business Email * (Verified)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                        lineNumber: 374,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "businessEmail",
                                        name: "businessEmail",
                                        type: "email",
                                        required: true,
                                        readOnly: true,
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " bg-gray-50 text-gray-600 cursor-not-allowed"),
                                        placeholder: "Verified email address",
                                        value: formData.businessEmail || (userData === null || userData === void 0 ? void 0 : (_userData_user_details3 = userData.user_details) === null || _userData_user_details3 === void 0 ? void 0 : _userData_user_details3.email) || ''
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                        lineNumber: 377,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-gray-500",
                                        children: "This is your verified email address and cannot be changed"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                        lineNumber: 388,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                lineNumber: 373,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "companyName",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Company Name *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                        lineNumber: 395,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "companyName",
                                        name: "companyName",
                                        type: "text",
                                        required: true,
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : ''),
                                        placeholder: "Enter your company name",
                                        value: formData.companyName || '',
                                        onChange: handleInputChange
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                        lineNumber: 398,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                lineNumber: 394,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "companyType",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Company Type *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                        lineNumber: 412,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        id: "companyType",
                                        name: "companyType",
                                        required: true,
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : ''),
                                        value: formData.companyType || '',
                                        onChange: handleInputChange,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select company type"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                                lineNumber: 423,
                                                columnNumber: 15
                                            }, this),
                                            companyTypes.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: type,
                                                    children: type
                                                }, type, false, {
                                                    fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                                    lineNumber: 425,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                        lineNumber: 415,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Business Address *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                        lineNumber: 434,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "addressLine1",
                                        name: "addressLine1",
                                        type: "text",
                                        required: true,
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : '', " mb-3"),
                                        placeholder: "Address Line 1 *",
                                        value: formData.addressLine1 || '',
                                        onChange: handleInputChange
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                        lineNumber: 439,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "addressLine2",
                                        name: "addressLine2",
                                        type: "text",
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : '', " mb-3"),
                                        placeholder: "Address Line 2 (Optional)",
                                        value: formData.addressLine2 || '',
                                        onChange: handleInputChange
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                        lineNumber: 451,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "state",
                                                    name: "state",
                                                    type: "text",
                                                    required: true,
                                                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : ''),
                                                    placeholder: "State *",
                                                    value: formData.state || '',
                                                    onChange: handleInputChange
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                                    lineNumber: 464,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                                lineNumber: 463,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "zipCode",
                                                    name: "zipCode",
                                                    type: "text",
                                                    required: true,
                                                    maxLength: 6,
                                                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : ''),
                                                    placeholder: "ZIP Code *",
                                                    value: formData.zipCode || '',
                                                    onChange: handleZipCodeChange
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                                    lineNumber: 476,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                                lineNumber: 475,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                        lineNumber: 462,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                lineNumber: 433,
                                columnNumber: 11
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-red-600",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                    lineNumber: 494,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                lineNumber: 493,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].buttonGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onBack,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].backButton,
                                children: "Back"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                lineNumber: 502,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isSubmitting,
                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].submitButton, " ").concat(isSubmitting ? 'opacity-50 cursor-not-allowed' : ''),
                                children: isSubmitting ? 'Submitting...' : 'Continue'
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                                lineNumber: 509,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                        lineNumber: 501,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
                lineNumber: 326,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/BasicInformationStep.jsx",
        lineNumber: 320,
        columnNumber: 5
    }, this);
}
_s(BasicInformationStep, "Dpn+SsHY1O+7HpH+b/dHaecR69s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = BasicInformationStep;
var _c;
__turbopack_context__.k.register(_c, "BasicInformationStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/onboarding/SignatureUploadStep.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>SignatureUploadStep
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function SignatureUploadStep(param) {
    let { formData, handleChange, onSubmit, onBack } = param;
    _s();
    const stepData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBOARDING_STEPS"][3];
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [dragActive, setDragActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [localSignatureFile, setLocalSignatureFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // Local fallback
    const [localSignatureFileName, setLocalSignatureFileName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(''); // Local fallback
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { saveFormData, getAuthToken, authenticatedFetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // Accepted file types for signature
    const acceptedTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg'
    ];
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    const validateFile = (file)=>{
        if (!acceptedTypes.includes(file.type)) {
            setError('Please upload a PNG or JPEG image file');
            return false;
        }
        if (file.size > maxFileSize) {
            setError('File size should be less than 5MB');
            return false;
        }
        return true;
    };
    const handleFileUpload = (file)=>{
        console.log('📁 File selected for upload:', file);
        console.log('File validation starting...');
        if (validateFile(file)) {
            console.log('✅ File validation passed');
            setError('');
            // Create preview
            const reader = new FileReader();
            reader.onload = (e)=>{
                console.log('✅ File preview created');
                setPreview(e.target.result);
            };
            reader.readAsDataURL(file);
            // Store file in local state as fallback
            setLocalSignatureFile(file);
            setLocalSignatureFileName(file.name);
            console.log('✅ File stored in local state as fallback');
            // Try to store file in parent formData
            console.log('Attempting to call parent handleChange...');
            if (handleChange && typeof handleChange === 'function') {
                handleChange({
                    target: {
                        name: 'signatureFile',
                        value: file
                    }
                });
                handleChange({
                    target: {
                        name: 'signatureFileName',
                        value: file.name
                    }
                });
                console.log('✅ Called parent handleChange for signatureFile');
            } else {
                console.log('❌ handleChange is not available or not a function:', handleChange);
            }
        } else {
            console.log('❌ File validation failed');
        }
    };
    const handleDrag = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };
    const handleDrop = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    };
    const handleInputChange = (e)=>{
        if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
        }
    };
    const handleRemoveFile = ()=>{
        setPreview(null);
        setError('');
        setLocalSignatureFile(null);
        setLocalSignatureFileName('');
        // Also try to clear parent formData
        if (handleChange && typeof handleChange === 'function') {
            handleChange({
                target: {
                    name: 'signatureFile',
                    value: null
                }
            });
            handleChange({
                target: {
                    name: 'signatureFileName',
                    value: ''
                }
            });
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    const handleSubmit = async (e)=>{
        console.log('🔄 SIGNATURE UPLOAD: handleSubmit called');
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        // Use parent formData if available, otherwise fallback to local state
        const currentSignatureFile = formData.signatureFile || localSignatureFile;
        const currentSignatureFileName = formData.signatureFileName || localSignatureFileName;
        console.log('File source check:');
        console.log('- Parent formData.signatureFile:', formData.signatureFile);
        console.log('- Local signatureFile:', localSignatureFile);
        console.log('- Using file:', currentSignatureFile);
        console.log('File exists?', !!currentSignatureFile);
        if (!currentSignatureFile) {
            console.log('❌ No signature file found in either parent formData or local state, stopping upload');
            setError('Please upload your signature');
            setIsSubmitting(false);
            return;
        }
        console.log('✅ Signature file found, proceeding with upload...');
        try {
            console.log('=== SIGNATURE UPLOAD DEBUG START ===');
            // Verify authentication token
            const token = getAuthToken();
            if (!token) {
                setError('Authentication required. Please log in again.');
                setIsSubmitting(false);
                return;
            }
            console.log('Auth token available:', token.substring(0, 20) + '...');
            // Create FormData for file upload
            const formDataToSend = new FormData();
            formDataToSend.append('signature_file', currentSignatureFile);
            console.log('File upload details:', {
                name: currentSignatureFile.name,
                size: currentSignatureFile.size,
                type: currentSignatureFile.type,
                lastModified: currentSignatureFile.lastModified,
                constructor: currentSignatureFile.constructor.name
            });
            // Verify FormData contents
            console.log('FormData contents:');
            for (let [key, value] of formDataToSend.entries()){
                if (value instanceof File) {
                    console.log("- ".concat(key, ": File(").concat(value.name, ", ").concat(value.size, " bytes, ").concat(value.type, ")"));
                } else {
                    console.log("- ".concat(key, ": ").concat(value));
                }
            }
            // Validate file before upload
            if (!acceptedTypes.includes(currentSignatureFile.type)) {
                setError('Invalid file type. Please upload PNG or JPEG files only.');
                setIsSubmitting(false);
                return;
            }
            if (currentSignatureFile.size > maxFileSize) {
                setError('File too large. Please upload a file smaller than 5MB.');
                setIsSubmitting(false);
                return;
            }
            console.log('Making API request to:', 'http://15.207.254.95:8080/api/brand/signature/upload/');
            // Call the signature upload API using secure authenticated fetch
            const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/signature/upload/', {
                method: 'POST',
                body: formDataToSend
            });
            console.log('API Response details:', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok,
                headers: Object.fromEntries(response.headers.entries())
            });
            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            let data;
            try {
                if (contentType && contentType.includes('application/json')) {
                    data = await response.json();
                } else {
                    const textResponse = await response.text();
                    console.error('Non-JSON response received:', {
                        contentType,
                        status: response.status,
                        text: textResponse.substring(0, 500)
                    });
                    throw new Error("Server returned non-JSON response (".concat(response.status, "): ").concat(textResponse.substring(0, 200)));
                }
            } catch (parseError) {
                console.error('Failed to parse response:', parseError);
                throw new Error("Invalid response format from server (".concat(response.status, ")"));
            }
            console.log('Parsed response data:', data);
            console.log('=== SIGNATURE UPLOAD DEBUG END ===');
            if (response.ok && data.success) {
                console.log('✅ Signature uploaded successfully:', data);
                // Save the signature data for future reference
                const savedData = {
                    signatureId: data.signature_id || data.id,
                    signatureFileName: currentSignatureFileName,
                    signatureUploaded: true,
                    signatureUrl: data.signature_url || data.url
                };
                saveFormData(savedData);
                console.log('Signature upload completed, proceeding to next step');
                onSubmit();
            } else {
                // Enhanced error handling with detailed logging
                console.error('❌ API Error Details:', {
                    status: response.status,
                    statusText: response.statusText,
                    data: data,
                    responseOk: response.ok,
                    expectedSuccess: data === null || data === void 0 ? void 0 : data.success
                });
                if (response.status === 401) {
                    setError('Authentication failed. Please log in again.');
                } else if (response.status === 400) {
                    const errorMsg = (data === null || data === void 0 ? void 0 : data.message) || (data === null || data === void 0 ? void 0 : data.detail) || (data === null || data === void 0 ? void 0 : data.error) || 'Invalid file format or size. Please check the file requirements.';
                    setError("Upload failed: ".concat(errorMsg));
                } else if (response.status === 403) {
                    setError('Email or phone not verified. Please complete verification first.');
                } else if (response.status === 413) {
                    setError('File too large. Please upload a smaller file (max 5MB).');
                } else if (response.status === 415) {
                    setError('Unsupported file type. Please upload PNG or JPEG files only.');
                } else if (response.status >= 500) {
                    setError('Server error occurred. Please try again later.');
                } else {
                    const errorMsg = (data === null || data === void 0 ? void 0 : data.message) || (data === null || data === void 0 ? void 0 : data.detail) || (data === null || data === void 0 ? void 0 : data.error) || "Upload failed (".concat(response.status, ")");
                    setError("Upload error: ".concat(errorMsg));
                }
            }
        } catch (error) {
            console.error('❌ SIGNATURE UPLOAD ERROR - Full details:', {
                message: error.message,
                stack: error.stack,
                name: error.name,
                cause: error.cause
            });
            // More specific error handling
            if (error.message.includes('No authentication token')) {
                setError('Authentication required. Please log in again.');
            } else if (error.message.includes('Authentication failed after token refresh')) {
                setError('Session expired. Please log in again.');
            } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
                setError('Network connection failed. Please check your internet connection and try again.');
            } else if (error.message.includes('Invalid response format')) {
                setError('Server error: Invalid response format. Please try again or contact support.');
            } else if (error.message.includes('non-JSON response')) {
                setError('Server error: Unexpected response format. Please try again later.');
            } else if (error.message.includes('Network request failed')) {
                setError('Network error. Please check your connection and try again.');
            } else {
                setError("Upload failed: ".concat(error.message));
            }
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleInputFocus = ()=>{
        if (error) setError('');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-900 mb-2",
                        children: stepData.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: stepData.subtitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                        lineNumber: 310,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                lineNumber: 308,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].form,
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldGroup,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                    children: "Digital Signature *"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                    lineNumber: 317,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ".concat(dragActive ? 'border-blue-400 bg-blue-50' : error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400'),
                                    onDragEnter: handleDrag,
                                    onDragLeave: handleDrag,
                                    onDragOver: handleDrag,
                                    onDrop: handleDrop,
                                    onClick: ()=>{
                                        var _fileInputRef_current;
                                        return (_fileInputRef_current = fileInputRef.current) === null || _fileInputRef_current === void 0 ? void 0 : _fileInputRef_current.click();
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ref: fileInputRef,
                                            type: "file",
                                            accept: ".png,.jpg,.jpeg",
                                            onChange: handleInputChange,
                                            onFocus: handleInputFocus,
                                            className: "hidden"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                            lineNumber: 335,
                                            columnNumber: 15
                                        }, this),
                                        preview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative inline-block",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: preview,
                                                            alt: "Signature preview",
                                                            className: "max-w-full max-h-48 mx-auto border border-gray-200 rounded-md shadow-sm"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                            lineNumber: 347,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                handleRemoveFile();
                                                            },
                                                            className: "absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 flex items-center justify-center",
                                                            children: "×"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                            lineNumber: 352,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                    lineNumber: 346,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-600",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium",
                                                            children: formData.signatureFileName || localSignatureFileName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                            lineNumber: 364,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-green-600",
                                                            children: "✓ File uploaded successfully"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                            lineNumber: 365,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                    lineNumber: 363,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                            lineNumber: 345,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 mx-auto bg-gray-300 rounded-full flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-6 h-6 text-gray-600",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                            lineNumber: 372,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                        lineNumber: 371,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                    lineNumber: 370,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-700 font-medium",
                                                            children: "Upload your signature"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                            lineNumber: 376,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-500 mt-1",
                                                            children: "Drag and drop your signature image here, or click to browse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                            lineNumber: 377,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                    lineNumber: 375,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-gray-400",
                                                    children: "Supported formats: PNG, JPEG, JPG (Max 5MB)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                    lineNumber: 381,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                            lineNumber: 369,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                    lineNumber: 321,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-sm font-medium text-blue-800 mb-2",
                                            children: "Signature Guidelines:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                            lineNumber: 390,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "text-sm text-blue-700 space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• Use a clear, high-resolution image of your signature"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                    lineNumber: 392,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• Signature should be on a white or transparent background"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                    lineNumber: 393,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• Ensure the signature is clearly visible and not blurry"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                    lineNumber: 394,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "• This signature will be used for official documents"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                                    lineNumber: 395,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                            lineNumber: 391,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                    lineNumber: 389,
                                    columnNumber: 13
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-600",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                        lineNumber: 402,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                    lineNumber: 401,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                            lineNumber: 316,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                        lineNumber: 314,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].buttonGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onBack,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].backButton,
                                children: stepData.buttons.back
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isSubmitting,
                                onClick: ()=>console.log('🖱️ Submit button clicked, formData.signatureFile:', !!formData.signatureFile),
                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].submitButton, " ").concat(isSubmitting ? 'opacity-50 cursor-not-allowed' : ''),
                                children: isSubmitting ? 'Uploading...' : stepData.buttons.submit
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                                lineNumber: 418,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                        lineNumber: 410,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
                lineNumber: 313,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/SignatureUploadStep.jsx",
        lineNumber: 307,
        columnNumber: 5
    }, this);
}
_s(SignatureUploadStep, "WStKdWb0loQ+Vw2Qfj2KmepWBAc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = SignatureUploadStep;
var _c;
__turbopack_context__.k.register(_c, "SignatureUploadStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/onboarding/BusinessPreferencesStep.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>BusinessPreferencesStep
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function BusinessPreferencesStep(param) {
    let { formData, handleChange, onSubmit, onBack } = param;
    _s();
    const stepData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBOARDING_STEPS"][4];
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { saveFormData, getAuthToken, authenticatedFetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // Business preference options
    const businessPreferences = [
        {
            value: 'marketplace_only',
            title: 'Marketplace Only',
            description: 'Sell products exclusively through our marketplace platform',
            features: [
                'Access to marketplace dashboard',
                'Built-in customer base',
                'Marketplace marketing tools',
                'Simplified order management'
            ]
        },
        {
            value: 'marketplace_and_api',
            title: 'Marketplace & API',
            description: 'Sell through marketplace and integrate with your own systems via API',
            features: [
                'All marketplace features',
                'API access for integration',
                'Custom workflow automation',
                'Advanced reporting and analytics',
                'Bulk operations support'
            ]
        }
    ];
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        if (!formData.business_preference) {
            setError('Please select a business preference');
            setIsSubmitting(false);
            return;
        }
        try {
            // Prepare data for API - trying string format instead of array
            const businessPreferenceData = {
                business_preference: formData.business_preference // Sending as string
            };
            console.log('Raw formData.business_preference:', formData.business_preference);
            console.log('Type of formData.business_preference:', typeof formData.business_preference);
            console.log('Submitting business preference as string:', businessPreferenceData);
            console.log('JSON stringified:', JSON.stringify(businessPreferenceData));
            // Call the business preference API using secure authenticated fetch
            const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/business-preference/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(businessPreferenceData)
            });
            const data = await response.json();
            console.log('Business preference API response:', {
                status: response.status,
                data
            });
            if (response.ok && data.success) {
                console.log('Business preference saved successfully:', data);
                // Save the submitted data for future reference
                const savedData = {
                    business_preference: formData.business_preference,
                    businessPreferenceSaved: true
                };
                saveFormData(savedData);
                console.log('Business preferences completed, proceeding to next step');
                onSubmit();
            } else {
                // Handle API errors
                if (response.status === 401) {
                    setError('Authentication failed. Please log in again.');
                } else if (response.status === 400) {
                    setError(data.message || data.detail || 'Invalid business preference data. Please try again.');
                } else {
                    setError(data.message || data.detail || 'Failed to save business preference. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error saving business preference:', error);
            setError('Network error while saving business preference. Please try again.');
        } finally{
            setIsSubmitting(false);
        }
    };
    const handlePreferenceChange = (value)=>{
        setError('');
        handleChange({
            target: {
                name: 'business_preference',
                value
            }
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-900 mb-2",
                        children: stepData.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: stepData.subtitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].form,
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldGroup,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                    children: "Business Preference *"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4 mt-3",
                                    children: businessPreferences.map((preference)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative border rounded-lg p-4 cursor-pointer transition-all ".concat(formData.business_preference === preference.value ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'),
                                            onClick: ()=>handlePreferenceChange(preference.value),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center h-5",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: preference.value,
                                                            name: "business_preference",
                                                            type: "radio",
                                                            value: preference.value,
                                                            checked: formData.business_preference === preference.value,
                                                            onChange: ()=>handlePreferenceChange(preference.value),
                                                            className: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                            lineNumber: 136,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                        lineNumber: 135,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "ml-3 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: preference.value,
                                                                className: "block text-lg font-medium text-gray-900 cursor-pointer",
                                                                children: preference.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                                lineNumber: 147,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-600 mt-1",
                                                                children: preference.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                                lineNumber: 153,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-medium text-gray-700 mb-2",
                                                                        children: "Features included:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                                        lineNumber: 159,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                        className: "text-sm text-gray-600 space-y-1",
                                                                        children: preference.features.map((feature, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                                className: "flex items-center",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                        className: "w-4 h-4 text-green-500 mr-2 flex-shrink-0",
                                                                                        fill: "currentColor",
                                                                                        viewBox: "0 0 20 20",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                            fillRule: "evenodd",
                                                                                            d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                                                                            clipRule: "evenodd"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                                                            lineNumber: 164,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                                                        lineNumber: 163,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    feature
                                                                                ]
                                                                            }, index, true, {
                                                                                fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                                                lineNumber: 162,
                                                                                columnNumber: 29
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                                        lineNumber: 160,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                                lineNumber: 158,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                        lineNumber: 146,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                lineNumber: 134,
                                                columnNumber: 19
                                            }, this)
                                        }, preference.value, false, {
                                            fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                            lineNumber: 125,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0",
                                                fill: "currentColor",
                                                viewBox: "0 0 20 20",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    fillRule: "evenodd",
                                                    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
                                                    clipRule: "evenodd"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                    lineNumber: 181,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                lineNumber: 180,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-medium text-gray-900",
                                                        children: "Good to know"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                        lineNumber: 184,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600 mt-1",
                                                        children: "You can upgrade your business preference later from your account settings. API access includes additional technical setup and may require developer resources."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                        lineNumber: 185,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                                lineNumber: 183,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                        lineNumber: 179,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                    lineNumber: 178,
                                    columnNumber: 13
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-red-600",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                        lineNumber: 196,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                    lineNumber: 195,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].buttonGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onBack,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].backButton,
                                children: stepData.buttons.back
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isSubmitting,
                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].submitButton, " ").concat(isSubmitting ? 'opacity-50 cursor-not-allowed' : ''),
                                children: isSubmitting ? 'Saving...' : stepData.buttons.submit
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/BusinessPreferencesStep.jsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s(BusinessPreferencesStep, "+whzCufRX9xBdzjQcm1fJbMWNXk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = BusinessPreferencesStep;
var _c;
__turbopack_context__.k.register(_c, "BusinessPreferencesStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/onboarding/WarehouseDetailsStep.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>WarehouseDetailsStep
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function WarehouseDetailsStep(param) {
    let { formData, handleChange, onSubmit, onBack } = param;
    _s();
    const stepData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBOARDING_STEPS"][5];
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { saveFormData, getAuthToken, authenticatedFetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // Initialize city_warehouses if not present
    const cityWarehouses = formData.city_warehouses || [
        {
            city_name: '',
            warehouse_count: 1
        }
    ];
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        // Validate city warehouses
        if (!cityWarehouses || cityWarehouses.length === 0) {
            setError('Please add at least one warehouse location');
            setIsSubmitting(false);
            return;
        }
        for(let i = 0; i < cityWarehouses.length; i++){
            var _warehouse_city_name;
            const warehouse = cityWarehouses[i];
            if (!((_warehouse_city_name = warehouse.city_name) === null || _warehouse_city_name === void 0 ? void 0 : _warehouse_city_name.trim())) {
                setError("City name is required for warehouse ".concat(i + 1));
                setIsSubmitting(false);
                return;
            }
            if (!warehouse.warehouse_count || warehouse.warehouse_count < 1) {
                setError("Warehouse count must be at least 1 for ".concat(warehouse.city_name || "warehouse ".concat(i + 1)));
                setIsSubmitting(false);
                return;
            }
        }
        // Validate daily order volume
        if (formData.daily_order_volume === undefined || formData.daily_order_volume === null || formData.daily_order_volume === '') {
            setError('Daily order volume is required');
            setIsSubmitting(false);
            return;
        }
        if (formData.daily_order_volume < 0) {
            setError('Daily order volume cannot be negative');
            setIsSubmitting(false);
            return;
        }
        try {
            // Prepare warehouse data for API
            const warehouseData = {
                city_warehouses: cityWarehouses.map((warehouse)=>({
                        city_name: warehouse.city_name.trim(),
                        warehouse_count: parseInt(warehouse.warehouse_count)
                    })),
                daily_order_volume: parseInt(formData.daily_order_volume)
            };
            console.log('Submitting warehouse details:', warehouseData);
            // Call the warehouse details API using secure authenticated fetch
            const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/warehouse-details/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(warehouseData)
            });
            const data = await response.json();
            console.log('Warehouse details API response:', {
                status: response.status,
                data
            });
            if (response.ok && data.success) {
                console.log('Warehouse details saved successfully:', data);
                // Save the warehouse data for future reference
                const savedData = {
                    city_warehouses: cityWarehouses,
                    daily_order_volume: formData.daily_order_volume,
                    warehouseDetailsCompleted: true
                };
                saveFormData(savedData);
                console.log('Warehouse details completed, proceeding to next step');
                onSubmit();
            } else {
                // Handle API errors
                if (response.status === 401) {
                    setError('Authentication failed. Please log in again.');
                } else if (response.status === 400) {
                    setError(data.message || data.detail || 'Invalid warehouse details. Please check your input.');
                } else if (response.status === 403) {
                    setError('Access denied. Please ensure your account is properly verified.');
                } else {
                    setError(data.message || data.detail || 'Failed to save warehouse details. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error saving warehouse details:', error);
            setError('Network error while saving warehouse details. Please try again.');
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleCityWarehouseChange = (index, field, value)=>{
        setError('');
        const updatedWarehouses = [
            ...cityWarehouses
        ];
        if (field === 'warehouse_count') {
            // Ensure warehouse count is a positive integer
            const numValue = parseInt(value) || 1;
            updatedWarehouses[index] = {
                ...updatedWarehouses[index],
                [field]: Math.max(1, numValue)
            };
        } else {
            updatedWarehouses[index] = {
                ...updatedWarehouses[index],
                [field]: value
            };
        }
        handleChange({
            target: {
                name: 'city_warehouses',
                value: updatedWarehouses
            }
        });
    };
    const addWarehouse = ()=>{
        setError('');
        const updatedWarehouses = [
            ...cityWarehouses,
            {
                city_name: '',
                warehouse_count: 1
            }
        ];
        handleChange({
            target: {
                name: 'city_warehouses',
                value: updatedWarehouses
            }
        });
    };
    const removeWarehouse = (index)=>{
        setError('');
        if (cityWarehouses.length > 1) {
            const updatedWarehouses = cityWarehouses.filter((_, i)=>i !== index);
            handleChange({
                target: {
                    name: 'city_warehouses',
                    value: updatedWarehouses
                }
            });
        }
    };
    const handleDailyOrderVolumeChange = (e)=>{
        setError('');
        const value = parseInt(e.target.value) || 0;
        handleChange({
            target: {
                name: 'daily_order_volume',
                value: Math.max(0, value)
            }
        });
    };
    const handleInputChange = (e)=>{
        if (error) setError('');
        handleChange(e);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-900 mb-2",
                        children: stepData.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: stepData.subtitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].form,
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Warehouse Locations *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4 mt-3",
                                        children: cityWarehouses.map((warehouse, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border border-gray-300 rounded-lg p-4 bg-gray-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center mb-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-medium text-gray-900",
                                                                children: [
                                                                    "Warehouse ",
                                                                    index + 1
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                                lineNumber: 185,
                                                                columnNumber: 21
                                                            }, this),
                                                            cityWarehouses.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>removeWarehouse(index),
                                                                className: "text-red-600 hover:text-red-800 text-sm font-medium",
                                                                children: "Remove"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                                lineNumber: 189,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                        lineNumber: 184,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        htmlFor: "city_name_".concat(index),
                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                        children: "City Name *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                                        lineNumber: 202,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        id: "city_name_".concat(index),
                                                                        type: "text",
                                                                        required: true,
                                                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : ''),
                                                                        placeholder: "Enter city name",
                                                                        value: warehouse.city_name || '',
                                                                        onChange: (e)=>handleCityWarehouseChange(index, 'city_name', e.target.value)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                                        lineNumber: 205,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                                lineNumber: 201,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        htmlFor: "warehouse_count_".concat(index),
                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                        children: "Warehouse Count *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                                        lineNumber: 218,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        id: "warehouse_count_".concat(index),
                                                                        type: "number",
                                                                        min: "1",
                                                                        required: true,
                                                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : ''),
                                                                        placeholder: "Number of warehouses",
                                                                        value: warehouse.warehouse_count || 1,
                                                                        onChange: (e)=>handleCityWarehouseChange(index, 'warehouse_count', e.target.value)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                                        lineNumber: 221,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                                lineNumber: 217,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                        lineNumber: 199,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                lineNumber: 183,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: addWarehouse,
                                        className: "mt-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4 mr-2",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                    lineNumber: 244,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                lineNumber: 243,
                                                columnNumber: 15
                                            }, this),
                                            "Add Another Warehouse"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                        lineNumber: 238,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "daily_order_volume",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Daily Order Volume *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "daily_order_volume",
                                        name: "daily_order_volume",
                                        type: "number",
                                        min: "0",
                                        required: true,
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : ''),
                                        placeholder: "Enter expected daily order volume",
                                        value: formData.daily_order_volume || '',
                                        onChange: handleDailyOrderVolumeChange
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                        lineNumber: 255,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-gray-500",
                                        children: "Enter the number of orders you expect to process per day"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                        lineNumber: 266,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0",
                                            fill: "currentColor",
                                            viewBox: "0 0 20 20",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
                                                clipRule: "evenodd"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                lineNumber: 275,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                            lineNumber: 274,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-medium text-blue-900",
                                                    children: "Warehouse Information"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                    lineNumber: 278,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-blue-800 mt-1 space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: "• Add all cities where you have warehouse facilities"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                            lineNumber: 280,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: "• Include the total number of warehouses in each city"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                            lineNumber: 281,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: "• Daily order volume helps us optimize your fulfillment process"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                            lineNumber: 282,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: "• You can add more warehouse locations later from your dashboard"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                            lineNumber: 283,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                                    lineNumber: 279,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                            lineNumber: 277,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                    lineNumber: 273,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-red-600",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                    lineNumber: 292,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                lineNumber: 291,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].buttonGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onBack,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].backButton,
                                children: stepData.buttons.back
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                lineNumber: 300,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isSubmitting,
                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].submitButton, " ").concat(isSubmitting ? 'opacity-50 cursor-not-allowed' : ''),
                                children: isSubmitting ? 'Saving...' : stepData.buttons.submit
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                                lineNumber: 307,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
                lineNumber: 173,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/WarehouseDetailsStep.jsx",
        lineNumber: 167,
        columnNumber: 5
    }, this);
}
_s(WarehouseDetailsStep, "+whzCufRX9xBdzjQcm1fJbMWNXk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = WarehouseDetailsStep;
var _c;
__turbopack_context__.k.register(_c, "WarehouseDetailsStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/onboarding/BrandProductDetailsStep.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>BrandProductDetailsStep
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function BrandProductDetailsStep(param) {
    let { formData, handleChange, onSubmit, onBack } = param;
    _s();
    const stepData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBOARDING_STEPS"][6];
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [logoPreview, setLogoPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [catalogPreview, setCatalogPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const logoInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const catalogInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { saveFormData, getAuthToken, authenticatedFetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // Options for form fields
    const productCategories = [
        'Clothing',
        'Footwear',
        'Accessories',
        'Electronics',
        'Home & Garden',
        'Sports & Outdoors',
        'Beauty & Personal Care',
        'Health & Wellness',
        'Books & Media',
        'Toys & Games',
        'Automotive',
        'Food & Beverages',
        'Other'
    ];
    const genderOptions = [
        {
            value: 'men',
            label: 'Men'
        },
        {
            value: 'women',
            label: 'Women'
        },
        {
            value: 'kids',
            label: 'Kids'
        },
        {
            value: 'unisex',
            label: 'Unisex'
        }
    ];
    // Initialize arrays if not present
    const selectedCategories = formData.product_categories || [];
    const selectedGenders = formData.gender || [];
    const targetAgeGroups = formData.target_age_groups || [
        18,
        65
    ];
    const priceRange = formData.price_range || [
        '',
        ''
    ];
    const validateFile = (file, type)=>{
        const maxSize = type === 'logo' ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB for logo, 10MB for catalog
        const allowedTypes = type === 'logo' ? [
            'image/png',
            'image/jpeg',
            'image/jpg'
        ] : [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/csv'
        ];
        if (!allowedTypes.includes(file.type)) {
            const typesText = type === 'logo' ? 'PNG, JPEG, JPG' : 'PDF, Excel, CSV';
            setError("Please upload a valid ".concat(typesText, " file for ").concat(type));
            return false;
        }
        if (file.size > maxSize) {
            const sizeText = type === 'logo' ? '5MB' : '10MB';
            setError("".concat(type, " file size should be less than ").concat(sizeText));
            return false;
        }
        return true;
    };
    const handleFileUpload = (file, type)=>{
        if (validateFile(file, type)) {
            setError('');
            const reader = new FileReader();
            reader.onload = (e)=>{
                if (type === 'logo') {
                    setLogoPreview(e.target.result);
                } else {
                    setCatalogPreview({
                        name: file.name,
                        size: file.size
                    });
                }
            };
            if (type === 'logo') {
                reader.readAsDataURL(file);
            } else {
                setCatalogPreview({
                    name: file.name,
                    size: file.size
                });
            }
            // Store file in formData
            handleChange({
                target: {
                    name: type === 'logo' ? 'brand_logo' : 'product_catalog',
                    value: file
                }
            });
        }
    };
    const handleCategoryChange = (category)=>{
        setError('');
        const updatedCategories = selectedCategories.includes(category) ? selectedCategories.filter((cat)=>cat !== category) : [
            ...selectedCategories,
            category
        ];
        handleChange({
            target: {
                name: 'product_categories',
                value: updatedCategories
            }
        });
    };
    const handleGenderChange = (gender)=>{
        setError('');
        const updatedGenders = selectedGenders.includes(gender) ? selectedGenders.filter((g)=>g !== gender) : [
            ...selectedGenders,
            gender
        ];
        handleChange({
            target: {
                name: 'gender',
                value: updatedGenders
            }
        });
    };
    const handleAgeRangeChange = (index, value)=>{
        setError('');
        const updatedRange = [
            ...targetAgeGroups
        ];
        updatedRange[index] = parseInt(value) || 0;
        handleChange({
            target: {
                name: 'target_age_groups',
                value: updatedRange
            }
        });
    };
    const handlePriceRangeChange = (index, value)=>{
        setError('');
        const updatedRange = [
            ...priceRange
        ];
        updatedRange[index] = value;
        handleChange({
            target: {
                name: 'price_range',
                value: updatedRange
            }
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        // Validation
        if (!formData.brand_logo) {
            setError('Brand logo is required');
            setIsSubmitting(false);
            return;
        }
        if (!selectedCategories.length) {
            setError('Please select at least one product category');
            setIsSubmitting(false);
            return;
        }
        if (!selectedGenders.length) {
            setError('Please select at least one target gender');
            setIsSubmitting(false);
            return;
        }
        if (targetAgeGroups[0] >= targetAgeGroups[1]) {
            setError('Maximum age must be greater than minimum age');
            setIsSubmitting(false);
            return;
        }
        if (!priceRange[0] || !priceRange[1]) {
            setError('Please specify both minimum and maximum price');
            setIsSubmitting(false);
            return;
        }
        const minPrice = parseFloat(priceRange[0]);
        const maxPrice = parseFloat(priceRange[1]);
        if (minPrice >= maxPrice) {
            setError('Maximum price must be greater than minimum price');
            setIsSubmitting(false);
            return;
        }
        try {
            // Create FormData for file upload
            const formDataToSend = new FormData();
            // Add brand logo (required)
            formDataToSend.append('brand_logo', formData.brand_logo);
            // Add product categories as array
            selectedCategories.forEach((category)=>{
                formDataToSend.append('product_categories', category);
            });
            // Add gender as array
            selectedGenders.forEach((gender)=>{
                formDataToSend.append('gender', gender);
            });
            // Add target age groups as array
            targetAgeGroups.forEach((age)=>{
                formDataToSend.append('target_age_groups', age.toString());
            });
            // Add price range as array
            priceRange.forEach((price)=>{
                formDataToSend.append('price_range', price);
            });
            // Add product catalog if provided (optional)
            if (formData.product_catalog) {
                formDataToSend.append('product_catalog', formData.product_catalog);
            }
            console.log('Submitting brand and product details...');
            // Debug: Log FormData contents
            for (let [key, value] of formDataToSend.entries()){
                console.log("".concat(key, ":"), value);
            }
            // Call the brand product details API using secure authenticated fetch
            const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/product-details/', {
                method: 'POST',
                headers: {
                },
                body: formDataToSend
            });
            const data = await response.json();
            console.log('Brand product details API response:', {
                status: response.status,
                data
            });
            if (response.ok && data.success) {
                console.log('Brand and product details saved successfully:', data);
                // Save the form data for future reference
                const savedData = {
                    brand_logo_uploaded: true,
                    product_categories: selectedCategories,
                    gender: selectedGenders,
                    target_age_groups: targetAgeGroups,
                    price_range: priceRange,
                    product_catalog_uploaded: !!formData.product_catalog,
                    brandProductDetailsCompleted: true
                };
                saveFormData(savedData);
                console.log('Brand and product details completed, proceeding to next step');
                onSubmit();
            } else {
                // Handle API errors
                if (response.status === 401) {
                    setError('Authentication failed. Please log in again.');
                } else if (response.status === 400) {
                    setError(data.message || data.detail || 'Invalid data provided. Please check your inputs.');
                } else if (response.status === 403) {
                    setError('Access denied. Please ensure your account is properly verified.');
                } else if (response.status === 413) {
                    setError('File size too large. Please reduce file sizes and try again.');
                } else {
                    setError(data.message || data.detail || 'Failed to save brand and product details. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error saving brand and product details:', error);
            setError('Network error while saving details. Please try again.');
        } finally{
            setIsSubmitting(false);
        }
    };
    const formatFileSize = (bytes)=>{
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = [
            'Bytes',
            'KB',
            'MB',
            'GB'
        ];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-900 mb-2",
                        children: stepData.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: stepData.subtitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                lineNumber: 269,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].form,
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Brand Logo *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                        lineNumber: 279,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative border-2 border-dashed rounded-lg p-6 text-center transition-colors border-gray-300 bg-gray-50 hover:border-gray-400 cursor-pointer",
                                        onClick: ()=>{
                                            var _logoInputRef_current;
                                            return (_logoInputRef_current = logoInputRef.current) === null || _logoInputRef_current === void 0 ? void 0 : _logoInputRef_current.click();
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: logoInputRef,
                                                type: "file",
                                                accept: ".png,.jpg,.jpeg",
                                                onChange: (e)=>{
                                                    var _e_target_files;
                                                    return ((_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0]) && handleFileUpload(e.target.files[0], 'logo');
                                                },
                                                className: "hidden"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                lineNumber: 286,
                                                columnNumber: 15
                                            }, this),
                                            logoPreview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: logoPreview,
                                                        alt: "Logo preview",
                                                        className: "max-w-32 max-h-32 mx-auto rounded-md"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 296,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-green-600",
                                                        children: "✓ Logo uploaded successfully"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 297,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                lineNumber: 295,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-12 h-12 mx-auto bg-gray-300 rounded-full flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-6 h-6 text-gray-600",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                                lineNumber: 303,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                            lineNumber: 302,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 301,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-700 font-medium",
                                                                children: "Upload your brand logo"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                                lineNumber: 307,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-500",
                                                                children: "PNG, JPEG, JPG (Max 5MB)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                                lineNumber: 308,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 306,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                lineNumber: 300,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                        lineNumber: 282,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Product Categories *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                        lineNumber: 317,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 md:grid-cols-3 gap-3 mt-2",
                                        children: productCategories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center space-x-2 cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: selectedCategories.includes(category),
                                                        onChange: ()=>handleCategoryChange(category),
                                                        className: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 323,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-gray-700",
                                                        children: category
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 329,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, category, true, {
                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                lineNumber: 322,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                        lineNumber: 320,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                lineNumber: 316,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Target Gender *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                        lineNumber: 337,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-3 mt-2",
                                        children: genderOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center space-x-2 cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: selectedGenders.includes(option.value),
                                                        onChange: ()=>handleGenderChange(option.value),
                                                        className: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 343,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-gray-700",
                                                        children: option.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 349,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, option.value, true, {
                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                lineNumber: 342,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                        lineNumber: 340,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                lineNumber: 336,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Target Age Range *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                        lineNumber: 357,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: "0",
                                                max: "100",
                                                placeholder: "Min age",
                                                value: targetAgeGroups[0] || '',
                                                onChange: (e)=>handleAgeRangeChange(0, e.target.value),
                                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " flex-1")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                lineNumber: 361,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-500",
                                                children: "to"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                lineNumber: 370,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: "0",
                                                max: "100",
                                                placeholder: "Max age",
                                                value: targetAgeGroups[1] || '',
                                                onChange: (e)=>handleAgeRangeChange(1, e.target.value),
                                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " flex-1")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                lineNumber: 371,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                        lineNumber: 360,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-gray-500",
                                        children: "Age range in years"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                        lineNumber: 381,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                lineNumber: 356,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Price Range *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                        lineNumber: 386,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md",
                                                        children: "₹"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 391,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "0",
                                                        step: "0.01",
                                                        placeholder: "Min price",
                                                        value: priceRange[0] || '',
                                                        onChange: (e)=>handlePriceRangeChange(0, e.target.value),
                                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " rounded-l-none flex-1")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 392,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                lineNumber: 390,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-500",
                                                children: "to"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                lineNumber: 402,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md",
                                                        children: "₹"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 404,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "0",
                                                        step: "0.01",
                                                        placeholder: "Max price",
                                                        value: priceRange[1] || '',
                                                        onChange: (e)=>handlePriceRangeChange(1, e.target.value),
                                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " rounded-l-none flex-1")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 405,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                lineNumber: 403,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                        lineNumber: 389,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-gray-500",
                                        children: "Price range in Indian Rupees"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                        lineNumber: 416,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                lineNumber: 385,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Product Catalog (Optional)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                        lineNumber: 421,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative border-2 border-dashed rounded-lg p-4 text-center transition-colors border-gray-300 bg-gray-50 hover:border-gray-400 cursor-pointer",
                                        onClick: ()=>{
                                            var _catalogInputRef_current;
                                            return (_catalogInputRef_current = catalogInputRef.current) === null || _catalogInputRef_current === void 0 ? void 0 : _catalogInputRef_current.click();
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: catalogInputRef,
                                                type: "file",
                                                accept: ".pdf,.xlsx,.csv",
                                                onChange: (e)=>{
                                                    var _e_target_files;
                                                    return ((_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0]) && handleFileUpload(e.target.files[0], 'catalog');
                                                },
                                                className: "hidden"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                lineNumber: 428,
                                                columnNumber: 15
                                            }, this),
                                            catalogPreview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-8 h-8 text-green-500",
                                                            fill: "currentColor",
                                                            viewBox: "0 0 20 20",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                fillRule: "evenodd",
                                                                d: "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",
                                                                clipRule: "evenodd"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                                lineNumber: 440,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                            lineNumber: 439,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 438,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-medium text-gray-900",
                                                        children: catalogPreview.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 443,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-500",
                                                        children: formatFileSize(catalogPreview.size)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 444,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-green-600",
                                                        children: "✓ Catalog uploaded successfully"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 445,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                lineNumber: 437,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 mx-auto bg-gray-300 rounded-full flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4 text-gray-600",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                                lineNumber: 451,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                            lineNumber: 450,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 449,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-700",
                                                                children: "Upload product catalog"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                                lineNumber: 455,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500",
                                                                children: "PDF, Excel, CSV (Max 10MB)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                                lineNumber: 456,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                        lineNumber: 454,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                                lineNumber: 448,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                        lineNumber: 424,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                lineNumber: 420,
                                columnNumber: 11
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-red-600",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                    lineNumber: 466,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                lineNumber: 465,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].buttonGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onBack,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].backButton,
                                children: stepData.buttons.back
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                lineNumber: 474,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isSubmitting,
                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].submitButton, " ").concat(isSubmitting ? 'opacity-50 cursor-not-allowed' : ''),
                                children: isSubmitting ? 'Saving...' : stepData.buttons.submit
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                                lineNumber: 481,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                        lineNumber: 473,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
                lineNumber: 274,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/BrandProductDetailsStep.jsx",
        lineNumber: 268,
        columnNumber: 5
    }, this);
}
_s(BrandProductDetailsStep, "uXIGPSugL1kpc3BMXW8c0joLYdw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = BrandProductDetailsStep;
var _c;
__turbopack_context__.k.register(_c, "BrandProductDetailsStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/onboarding/BankingDetailsStep.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>BankingDetailsStep
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function BankingDetailsStep(param) {
    let { formData, handleChange, onSubmit, onBack } = param;
    _s();
    const stepData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBOARDING_STEPS"][7];
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chequePreview, setChequePreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const chequeInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { saveFormData, getAuthToken, authenticatedFetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // New states for micro deposit verification
    const [bankDetailsSubmitted, setBankDetailsSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [bankReferenceId, setBankReferenceId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [microDepositAmount, setMicroDepositAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isVerifying, setIsVerifying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const validateIFSC = (ifscCode)=>{
        // IFSC code format: First 4 characters are alphabets, 5th character is 0, last 6 characters are alphanumeric
        const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        return ifscRegex.test(ifscCode.toUpperCase());
    };
    const validateAccountNumber = (accountNumber)=>{
        // Account number should be between 1-18 digits
        const cleanNumber = accountNumber.replace(/\D/g, '');
        return cleanNumber.length >= 1 && cleanNumber.length <= 18;
    };
    const validateFile = (file)=>{
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'application/pdf'
        ];
        if (!allowedTypes.includes(file.type)) {
            setError('Please upload a PNG, JPEG, JPG, or PDF file for cancelled cheque');
            return false;
        }
        if (file.size > maxSize) {
            setError('Cancelled cheque file size should be less than 5MB');
            return false;
        }
        return true;
    };
    const handleFileUpload = (file)=>{
        if (validateFile(file)) {
            setError('');
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e)=>{
                    setChequePreview({
                        type: 'image',
                        src: e.target.result,
                        name: file.name
                    });
                };
                reader.readAsDataURL(file);
            } else {
                setChequePreview({
                    type: 'pdf',
                    name: file.name,
                    size: file.size
                });
            }
            handleChange({
                target: {
                    name: 'cancelled_cheque',
                    value: file
                }
            });
        }
    };
    const handleRemoveFile = ()=>{
        setChequePreview(null);
        setError('');
        handleChange({
            target: {
                name: 'cancelled_cheque',
                value: null
            }
        });
        if (chequeInputRef.current) {
            chequeInputRef.current.value = '';
        }
    };
    const handleSubmit = async (e)=>{
        var _formData_account_holder_name, _formData_account_number, _formData_ifsc_code;
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        // Validation
        if (!((_formData_account_holder_name = formData.account_holder_name) === null || _formData_account_holder_name === void 0 ? void 0 : _formData_account_holder_name.trim())) {
            setError('Account holder name is required');
            setIsSubmitting(false);
            return;
        }
        if (formData.account_holder_name.length > 100) {
            setError('Account holder name must be less than 100 characters');
            setIsSubmitting(false);
            return;
        }
        if (!((_formData_account_number = formData.account_number) === null || _formData_account_number === void 0 ? void 0 : _formData_account_number.trim())) {
            setError('Account number is required');
            setIsSubmitting(false);
            return;
        }
        if (!validateAccountNumber(formData.account_number)) {
            setError('Please enter a valid account number (1-18 digits)');
            setIsSubmitting(false);
            return;
        }
        if (!((_formData_ifsc_code = formData.ifsc_code) === null || _formData_ifsc_code === void 0 ? void 0 : _formData_ifsc_code.trim())) {
            setError('IFSC code is required');
            setIsSubmitting(false);
            return;
        }
        if (!validateIFSC(formData.ifsc_code)) {
            setError('Please enter a valid IFSC code (e.g., SBIN0001234)');
            setIsSubmitting(false);
            return;
        }
        if (!formData.cancelled_cheque) {
            setError('Please upload a cancelled cheque');
            setIsSubmitting(false);
            return;
        }
        try {
            // Create FormData for file upload
            const formDataToSend = new FormData();
            formDataToSend.append('account_holder_name', formData.account_holder_name.trim());
            formDataToSend.append('account_number', formData.account_number.trim());
            formDataToSend.append('ifsc_code', formData.ifsc_code.trim().toUpperCase());
            formDataToSend.append('cancelled_cheque', formData.cancelled_cheque);
            console.log('Submitting bank details...');
            // Debug: Log FormData contents
            for (let [key, value] of formDataToSend.entries()){
                console.log("".concat(key, ":"), value);
            }
            // Call the bank details API using secure authenticated fetch
            const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/bank-details/', {
                method: 'POST',
                headers: {
                },
                body: formDataToSend
            });
            const data = await response.json();
            console.log('Bank details API response:', {
                status: response.status,
                data
            });
            if (response.ok && data.success) {
                console.log('Bank details saved successfully:', data);
                // Extract bank reference ID from API response
                const referenceId = data.bank_reference_id || data.reference_id || '';
                setBankReferenceId(referenceId);
                // Save the bank data for future reference
                const savedData = {
                    account_holder_name: formData.account_holder_name.trim(),
                    account_number: formData.account_number.trim(),
                    ifsc_code: formData.ifsc_code.trim().toUpperCase(),
                    cancelled_cheque_uploaded: true,
                    bankDetailsCompleted: true,
                    bank_reference_id: referenceId
                };
                saveFormData(savedData);
                // Show micro deposit verification section
                setBankDetailsSubmitted(true);
                setError('');
                console.log('Bank details submitted. Awaiting micro deposit verification.');
            } else {
                // Handle API errors
                if (response.status === 401) {
                    setError('Authentication failed. Please log in again.');
                } else if (response.status === 400) {
                    setError(data.message || data.detail || 'Invalid bank details. Please check your input.');
                } else if (response.status === 403) {
                    setError('Email or phone not verified. Please complete verification first.');
                } else if (response.status === 404) {
                    setError('Brand profile not found. Please complete previous steps.');
                } else if (response.status === 413) {
                    setError('File size too large. Please reduce file size and try again.');
                } else {
                    setError(data.message || data.detail || 'Failed to save bank details. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error saving bank details:', error);
            setError('Network error while saving bank details. Please try again.');
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleMicroDepositVerification = async (e)=>{
        e.preventDefault();
        setError('');
        setIsVerifying(true);
        // Validation for micro deposit fields
        if (!microDepositAmount.trim()) {
            setError('Please enter the micro deposit amount');
            setIsVerifying(false);
            return;
        }
        if (!bankReferenceId) {
            setError('Bank reference ID not found. Please contact support.');
            setIsVerifying(false);
            return;
        }
        // Validate amount format (should be a valid decimal number)
        const amount = parseFloat(microDepositAmount);
        if (isNaN(amount) || amount <= 0) {
            setError('Please enter a valid deposit amount');
            setIsVerifying(false);
            return;
        }
        try {
            // Prepare verification data
            const verificationData = {
                amount_received: parseFloat(microDepositAmount),
                bank_reference_id: bankReferenceId
            };
            console.log('Submitting micro deposit verification:', verificationData);
            // Call the micro deposit verification API using secure authenticated fetch
            const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/bank-verification/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(verificationData)
            });
            const data = await response.json();
            console.log('Micro deposit verification API response:', {
                status: response.status,
                data
            });
            if (response.ok && data.success) {
                console.log('Bank verification successful:', data);
                // Save verification success data
                const savedData = {
                    bankVerificationCompleted: true,
                    micro_deposit_verified: true,
                    verification_date: new Date().toISOString()
                };
                saveFormData(savedData);
                console.log('Bank verification completed, proceeding to next step');
                onSubmit();
            } else {
                // Handle API errors
                if (response.status === 401) {
                    setError('Authentication failed. Please log in again.');
                } else if (response.status === 400) {
                    setError(data.message || data.detail || 'Invalid verification details. Please check your input.');
                } else if (response.status === 404) {
                    setError('Bank reference not found. Please contact support.');
                } else if (response.status === 422) {
                    setError('Verification failed. Please check the amount and reference ID.');
                } else {
                    setError(data.message || data.detail || 'Verification failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error verifying micro deposit:', error);
            setError('Network error while verifying deposit. Please try again.');
        } finally{
            setIsVerifying(false);
        }
    };
    const handleInputChange = (e)=>{
        if (error) setError('');
        handleChange(e);
    };
    const handleAccountNumberChange = (e)=>{
        // Allow only digits and limit to 18 characters
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 18) {
            value = value.slice(0, 18);
        }
        if (error) setError('');
        e.target.value = value;
        handleChange(e);
    };
    const handleIFSCChange = (e)=>{
        // Convert to uppercase and limit to 11 characters
        let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        if (error) setError('');
        e.target.value = value;
        handleChange(e);
    };
    const formatFileSize = (bytes)=>{
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = [
            'Bytes',
            'KB',
            'MB',
            'GB'
        ];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-900 mb-2",
                        children: stepData.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: stepData.subtitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                        lineNumber: 323,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                lineNumber: 321,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].form,
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "account_holder_name",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Account Holder Name *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                        lineNumber: 331,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "account_holder_name",
                                        name: "account_holder_name",
                                        type: "text",
                                        required: true,
                                        maxLength: 100,
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : ''),
                                        placeholder: "Enter account holder's full name",
                                        value: formData.account_holder_name || '',
                                        onChange: handleInputChange
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                        lineNumber: 334,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-gray-500",
                                        children: "Name as per bank records (max 100 characters)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                        lineNumber: 345,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                lineNumber: 330,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "account_number",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Account Number *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                        lineNumber: 352,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "account_number",
                                        name: "account_number",
                                        type: "text",
                                        required: true,
                                        maxLength: 18,
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : ''),
                                        placeholder: "Enter bank account number",
                                        value: formData.account_number || '',
                                        onChange: handleAccountNumberChange
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                        lineNumber: 355,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-gray-500",
                                        children: "Enter your bank account number (1-18 digits)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                        lineNumber: 366,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                lineNumber: 351,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "ifsc_code",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "IFSC Code *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                        lineNumber: 373,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "ifsc_code",
                                        name: "ifsc_code",
                                        type: "text",
                                        required: true,
                                        maxLength: 11,
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " ").concat(error ? 'border-red-500' : ''),
                                        placeholder: "Enter IFSC code (e.g., SBIN0001234)",
                                        value: formData.ifsc_code || '',
                                        onChange: handleIFSCChange
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                        lineNumber: 376,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-gray-500",
                                        children: "11-character IFSC code of your bank branch"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                        lineNumber: 387,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                lineNumber: 372,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                        children: "Cancelled Cheque *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                        lineNumber: 394,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ".concat(error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400', " cursor-pointer"),
                                        onClick: ()=>{
                                            var _chequeInputRef_current;
                                            return (_chequeInputRef_current = chequeInputRef.current) === null || _chequeInputRef_current === void 0 ? void 0 : _chequeInputRef_current.click();
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: chequeInputRef,
                                                type: "file",
                                                accept: ".png,.jpg,.jpeg,.pdf",
                                                onChange: (e)=>{
                                                    var _e_target_files;
                                                    return ((_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0]) && handleFileUpload(e.target.files[0]);
                                                },
                                                className: "hidden"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                lineNumber: 406,
                                                columnNumber: 15
                                            }, this),
                                            chequePreview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    chequePreview.type === 'image' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative inline-block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: chequePreview.src,
                                                                alt: "Cancelled cheque preview",
                                                                className: "max-w-full max-h-48 mx-auto border border-gray-200 rounded-md shadow-sm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                lineNumber: 418,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    handleRemoveFile();
                                                                },
                                                                className: "absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 flex items-center justify-center",
                                                                children: "×"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                lineNumber: 423,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                        lineNumber: 417,
                                                        columnNumber: 21
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center space-x-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-8 h-8 text-red-500",
                                                                fill: "currentColor",
                                                                viewBox: "0 0 20 20",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    fillRule: "evenodd",
                                                                    d: "M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z",
                                                                    clipRule: "evenodd"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                    lineNumber: 437,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                lineNumber: 436,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-medium text-gray-900",
                                                                        children: chequePreview.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                        lineNumber: 440,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-gray-500",
                                                                        children: formatFileSize(chequePreview.size)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                        lineNumber: 441,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                lineNumber: 439,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    handleRemoveFile();
                                                                },
                                                                className: "text-red-600 hover:text-red-800 text-sm font-medium",
                                                                children: "Remove"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                lineNumber: 443,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                        lineNumber: 435,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-green-600",
                                                        children: "✓ Cancelled cheque uploaded successfully"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                        lineNumber: 455,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                lineNumber: 415,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-12 h-12 mx-auto bg-gray-300 rounded-full flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-6 h-6 text-gray-600",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                lineNumber: 461,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                            lineNumber: 460,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                        lineNumber: 459,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-700 font-medium",
                                                                children: "Upload cancelled cheque"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                lineNumber: 465,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-500 mt-1",
                                                                children: "Drag and drop or click to browse"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                lineNumber: 466,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                        lineNumber: 464,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-400",
                                                        children: "Supported formats: PNG, JPEG, JPG, PDF (Max 5MB)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                        lineNumber: 470,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                lineNumber: 458,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                        lineNumber: 398,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-sm font-medium text-blue-800 mb-2",
                                                children: "Cancelled Cheque Requirements:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                lineNumber: 479,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "text-sm text-blue-700 space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "• Must be a clear, readable image or PDF"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                        lineNumber: 481,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "• Should contain account holder name, account number, and IFSC code"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                        lineNumber: 482,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: '• Write "CANCELLED" across the cheque'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                        lineNumber: 483,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "• Do not sign the cancelled cheque"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                        lineNumber: 484,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                lineNumber: 480,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                        lineNumber: 478,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                lineNumber: 393,
                                columnNumber: 11
                            }, this),
                            bankDetailsSubmitted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-8 p-6 bg-green-50 border border-green-200 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0",
                                                    fill: "currentColor",
                                                    viewBox: "0 0 20 20",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fillRule: "evenodd",
                                                        d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                        clipRule: "evenodd"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                        lineNumber: 495,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                    lineNumber: 494,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-medium text-green-900 mb-2",
                                                            children: "Bank Details Submitted Successfully!"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                            lineNumber: 498,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-green-800",
                                                            children: "A micro deposit has been initiated to your bank account. Please check your bank statement and enter the deposit details below to verify your account."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                            lineNumber: 499,
                                                            columnNumber: 21
                                                        }, this),
                                                        bankReferenceId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-green-700 mt-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: "Reference ID:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                    lineNumber: 504,
                                                                    columnNumber: 25
                                                                }, this),
                                                                " ",
                                                                bankReferenceId
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                            lineNumber: 503,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                    lineNumber: 497,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                            lineNumber: 493,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                        lineNumber: 492,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-medium text-gray-900",
                                                children: "Verify Micro Deposit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                lineNumber: 512,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].fieldContainer,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "micro_deposit_amount",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].label,
                                                        children: "Micro Deposit Amount *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                        lineNumber: 516,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md",
                                                                children: "₹"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                lineNumber: 520,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                id: "micro_deposit_amount",
                                                                name: "micro_deposit_amount",
                                                                type: "number",
                                                                step: "0.01",
                                                                min: "0",
                                                                required: true,
                                                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].input, " rounded-l-none ").concat(error ? 'border-red-500' : ''),
                                                                placeholder: "Enter the exact amount deposited",
                                                                value: microDepositAmount,
                                                                onChange: (e)=>{
                                                                    setMicroDepositAmount(e.target.value);
                                                                    if (error) setError('');
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                lineNumber: 521,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                        lineNumber: 519,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-xs text-gray-500",
                                                        children: "Enter the exact amount that was deposited to your account (e.g., 1.23)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                        lineNumber: 537,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                lineNumber: 515,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 bg-blue-50 border border-blue-200 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "text-sm font-medium text-blue-800 mb-2",
                                                        children: "Verification Instructions:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                        lineNumber: 544,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "text-sm text-blue-700 space-y-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: "• Check your bank account statement for a small deposit (usually ₹1-10)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                lineNumber: 546,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: "• Note the exact amount from the transaction"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                lineNumber: 547,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: "• The deposit may take 1-2 business days to appear"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                lineNumber: 548,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: "• Contact support if you don't receive the deposit within 2 business days"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                                lineNumber: 549,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                        lineNumber: 545,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                lineNumber: 543,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-end",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handleMicroDepositVerification,
                                                    disabled: isVerifying || !microDepositAmount,
                                                    className: "px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ".concat(isVerifying || !microDepositAmount ? 'opacity-50 cursor-not-allowed' : ''),
                                                    children: isVerifying ? 'Verifying...' : 'Verify Deposit'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                    lineNumber: 555,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                                lineNumber: 554,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                        lineNumber: 511,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-red-600",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                    lineNumber: 573,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                lineNumber: 572,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].buttonGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onBack,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].backButton,
                                children: stepData.buttons.back
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                lineNumber: 581,
                                columnNumber: 11
                            }, this),
                            !bankDetailsSubmitted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isSubmitting,
                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].submitButton, " ").concat(isSubmitting ? 'opacity-50 cursor-not-allowed' : ''),
                                children: isSubmitting ? 'Saving...' : stepData.buttons.submit
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                                lineNumber: 589,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                        lineNumber: 580,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
                lineNumber: 326,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/BankingDetailsStep.jsx",
        lineNumber: 320,
        columnNumber: 5
    }, this);
}
_s(BankingDetailsStep, "CFWK6NDrKaR8Ti6lszl0F6LE5W8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = BankingDetailsStep;
var _c;
__turbopack_context__.k.register(_c, "BankingDetailsStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/onboarding/OnboardingStatusStep.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>OnboardingStatusStep
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function OnboardingStatusStep(param) {
    let { submissionData = null, onGoToDashboard = null, onStartNewApplication = null } = param;
    var _data_verification_status, _data_verification_status1;
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OnboardingStatusStep.useEffect": ()=>{
            // Simulate loading state for smooth transition
            const timer = setTimeout({
                "OnboardingStatusStep.useEffect.timer": ()=>{
                    setIsLoading(false);
                }
            }["OnboardingStatusStep.useEffect.timer"], 1000);
            return ({
                "OnboardingStatusStep.useEffect": ()=>clearTimeout(timer)
            })["OnboardingStatusStep.useEffect"];
        }
    }["OnboardingStatusStep.useEffect"], []);
    // Default data structure if no submission data provided
    const defaultData = {
        success: true,
        message: "Onboarding completed successfully. Your account is now under review.",
        onboarding_id: "ONBOARD-XXXX-XXXX",
        verification_status: {
            code: 1,
            status: "Pending",
            message: "Your brand profile is pending verification by our team."
        }
    };
    const data = submissionData || defaultData;
    // Status configurations based on verification status code
    const getStatusConfig = (verificationStatus)=>{
        const code = (verificationStatus === null || verificationStatus === void 0 ? void 0 : verificationStatus.code) || 1;
        const status = (verificationStatus === null || verificationStatus === void 0 ? void 0 : verificationStatus.status) || 'Pending';
        switch(code){
            case 0:
                return {
                    icon: '❌',
                    bgColor: 'bg-red-50',
                    borderColor: 'border-red-200',
                    textColor: 'text-red-800',
                    iconBg: 'bg-red-100',
                    statusText: 'Rejected',
                    description: 'Application needs revision'
                };
            case 1:
                return {
                    icon: '⏳',
                    bgColor: 'bg-yellow-50',
                    borderColor: 'border-yellow-200',
                    textColor: 'text-yellow-800',
                    iconBg: 'bg-yellow-100',
                    statusText: 'Under Review',
                    description: 'Your application is being processed'
                };
            case 2:
                return {
                    icon: '✅',
                    bgColor: 'bg-green-50',
                    borderColor: 'border-green-200',
                    textColor: 'text-green-800',
                    iconBg: 'bg-green-100',
                    statusText: 'Approved',
                    description: 'Welcome to the marketplace!'
                };
            default:
                return {
                    icon: '📋',
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-blue-200',
                    textColor: 'text-blue-800',
                    iconBg: 'bg-blue-100',
                    statusText: status || 'Pending',
                    description: 'Processing your application'
                };
        }
    };
    const statusConfig = getStatusConfig(data.verification_status);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto p-4 sm:p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center py-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-6"
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg text-gray-600",
                            children: "Processing your submission..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                    lineNumber: 89,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                lineNumber: 88,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
            lineNumber: 87,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto p-4 sm:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate-pulse",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-4xl",
                            children: "🎉"
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl sm:text-3xl font-bold text-gray-900 mb-4",
                        children: "Submission Successful!"
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg text-gray-600 mb-8",
                        children: data.message
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border-2 border-green-200 rounded-xl shadow-lg p-6 sm:p-8 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center bg-gray-100 rounded-lg px-4 py-2 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-gray-600 mr-2",
                                        children: "Application ID:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg font-bold text-gray-900 font-mono",
                                        children: data.onboarding_id
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: "Keep this ID for your records and future reference"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "".concat(statusConfig.bgColor, " ").concat(statusConfig.borderColor, " border-2 rounded-lg p-6 mb-6"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start space-x-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "".concat(statusConfig.iconBg, " rounded-full p-3 flex-shrink-0"),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl",
                                        children: statusConfig.icon
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold ".concat(statusConfig.textColor, " mb-2"),
                                            children: statusConfig.statusText
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                            lineNumber: 137,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "".concat(statusConfig.textColor, " text-sm mb-2"),
                                            children: ((_data_verification_status = data.verification_status) === null || _data_verification_status === void 0 ? void 0 : _data_verification_status.message) || statusConfig.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-gray-600",
                                            children: [
                                                "Status Code: ",
                                                ((_data_verification_status1 = data.verification_status) === null || _data_verification_status1 === void 0 ? void 0 : _data_verification_status1.code) || 1
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                            lineNumber: 143,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-gray-200 pt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-lg font-semibold text-gray-900 mb-4",
                                children: "What happens next?"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 h-2 bg-white rounded-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                                    lineNumber: 156,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                                lineNumber: 155,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium text-gray-900",
                                                        children: "Application Submitted"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                                        lineNumber: 159,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600",
                                                        children: "Your onboarding application has been successfully submitted"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                                        lineNumber: 160,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                                lineNumber: 158,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                        lineNumber: 154,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-shrink-0 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 h-2 bg-white rounded-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                                    lineNumber: 166,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                                lineNumber: 165,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium text-gray-900",
                                                        children: "Under Review"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                                        lineNumber: 169,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600",
                                                        children: "Our team is reviewing your documents and information (2-3 business days)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                                        lineNumber: 170,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                                lineNumber: 168,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                        lineNumber: 164,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-shrink-0 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 h-2 bg-white rounded-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                                    lineNumber: 176,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                                lineNumber: 175,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium text-gray-500",
                                                        children: "Approval & Activation"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                                        lineNumber: 179,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-500",
                                                        children: "Once approved, you'll receive access to the brand dashboard"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                                        lineNumber: 180,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                                lineNumber: 178,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                        lineNumber: 174,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-lg font-semibold text-blue-900 mb-4",
                        children: "📢 Important Information"
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-2 text-sm text-blue-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-blue-600 mt-1",
                                        children: "•"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                        lineNumber: 192,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "You will receive email notifications about your application status updates"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                        lineNumber: 193,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-blue-600 mt-1",
                                        children: "•"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                        lineNumber: 196,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "If additional documentation is required, our team will contact you"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                        lineNumber: 197,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-blue-600 mt-1",
                                        children: "•"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Review process typically takes 2-3 business days"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-blue-600 mt-1",
                                        children: "•"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Keep your application ID handy for any support inquiries"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row gap-4 justify-center",
                children: [
                    onGoToDashboard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onGoToDashboard,
                        className: "bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "📊"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                lineNumber: 217,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Go to Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                lineNumber: 218,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.href = 'mailto:support@yourmarketplace.com',
                        className: "bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "💬"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Contact Support"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    onStartNewApplication && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onStartNewApplication,
                        className: "bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "🆕"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                lineNumber: 235,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "New Application"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                                lineNumber: 236,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                        lineNumber: 231,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                lineNumber: 211,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mt-8 p-4 bg-gray-50 rounded-lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-600",
                    children: "Thank you for choosing our marketplace! We're excited to have you as a potential brand partner."
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                    lineNumber: 243,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
                lineNumber: 242,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/OnboardingStatusStep.jsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_s(OnboardingStatusStep, "Yt82d/dvZsn5nYh5sqDQjv+rJ38=");
_c = OnboardingStatusStep;
var _c;
__turbopack_context__.k.register(_c, "OnboardingStatusStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/onboarding/ReviewSubmitStep.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>ReviewSubmitStep
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/hooks/useAuth.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$OnboardingStatusStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/onboarding/OnboardingStatusStep.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function ReviewSubmitStep(param) {
    let { formData, handleChange, onSubmit, onBack } = param;
    _s();
    const stepData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBOARDING_STEPS"][8];
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [termsAccepted, setTermsAccepted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [privacyAccepted, setPrivacyAccepted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [onboardingData, setOnboardingData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showStatus, setShowStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submissionData, setSubmissionData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isOnboardingComplete, setIsOnboardingComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { saveFormData, formData: authFormData, authenticatedFetch, getAuthToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // Fetch onboarding summary data from API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReviewSubmitStep.useEffect": ()=>{
            const fetchOnboardingSummary = {
                "ReviewSubmitStep.useEffect.fetchOnboardingSummary": async ()=>{
                    try {
                        setIsLoading(true);
                        // Get authentication token using secure method
                        const token = getAuthToken();
                        if (!token) {
                            setError('Authentication required. Please log in again.');
                            setIsLoading(false);
                            return;
                        }
                        console.log('Fetching onboarding summary...');
                        // Use authenticated fetch with automatic token refresh
                        const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/onboarding-summary/', {
                            method: 'GET'
                        });
                        const data = await response.json();
                        console.log('Onboarding summary API response:', {
                            status: response.status,
                            data
                        });
                        if (response.ok && data.success) {
                            var _data_data;
                            console.log('Onboarding summary fetched successfully:', data);
                            setOnboardingData(data.data);
                            setError('');
                            // Check if onboarding is complete from auth context or API response
                            const isComplete = (authFormData === null || authFormData === void 0 ? void 0 : authFormData.isOnboardingComplete) || ((_data_data = data.data) === null || _data_data === void 0 ? void 0 : _data_data.is_onboarding_complete) || false;
                            setIsOnboardingComplete(isComplete);
                            // If onboarding is complete, show status immediately
                            if (isComplete) {
                                setShowStatus(true);
                                setSubmissionData(data); // Use the API response as submission data
                            }
                        } else {
                            // Handle API errors
                            if (response.status === 401) {
                                setError('Authentication failed. Please log in again.');
                            } else if (response.status === 403) {
                                setError('Email or phone not verified. Please complete verification first.');
                            } else if (response.status === 404) {
                                setError('Brand profile not found. Please complete previous steps.');
                            } else {
                                setError(data.message || data.detail || 'Failed to fetch onboarding summary. Please try again.');
                            }
                        }
                    } catch (error) {
                        console.error('Error fetching onboarding summary:', error);
                        setError('Network error while fetching data. Please try again.');
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["ReviewSubmitStep.useEffect.fetchOnboardingSummary"];
            fetchOnboardingSummary();
        }
    }["ReviewSubmitStep.useEffect"], []);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');
        if (!termsAccepted) {
            setError('Please accept the Terms & Conditions to continue');
            return;
        }
        if (!privacyAccepted) {
            setError('Please accept the Privacy Policy to continue');
            return;
        }
        try {
            setIsSubmitting(true);
            // Get authentication token using secure method
            const token = getAuthToken();
            if (!token) {
                setError('Authentication required. Please log in again.');
                return;
            }
            console.log('Submitting final onboarding application...');
            // Prepare submission data
            const submissionData = {
                terms_accepted: termsAccepted,
                privacy_policy_accepted: privacyAccepted
            };
            console.log('Final submission data:', submissionData);
            // Use authenticated fetch with automatic token refresh
            const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/final-submission/', {
                method: 'POST',
                body: JSON.stringify(submissionData)
            });
            const data = await response.json();
            console.log('Final submission API response:', {
                status: response.status,
                data
            });
            if (response.ok && data.success) {
                console.log('Final submission successful:', data);
                setError('');
                // Store submission data and show status component
                setSubmissionData(data);
                setShowStatus(true);
            } else {
                // Handle API errors
                if (response.status === 400) {
                    setError(data.message || data.detail || 'Bad request. Please check your submission data.');
                } else if (response.status === 401) {
                    setError('Authentication failed. Please log in again.');
                } else if (response.status === 403) {
                    setError('Email or phone not verified. Please complete verification first.');
                } else if (response.status === 404) {
                    setError('Brand profile not found. Please complete previous steps.');
                } else if (response.status === 422) {
                    setError('Incomplete onboarding steps. Please complete all previous steps first.');
                } else {
                    setError(data.message || data.detail || 'Failed to submit application. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error submitting final application:', error);
            setError('Network error while submitting application. Please try again.');
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleTermsChange = (e)=>{
        setTermsAccepted(e.target.checked);
        if (error) setError('');
    };
    const handlePrivacyChange = (e)=>{
        setPrivacyAccepted(e.target.checked);
        if (error) setError('');
    };
    // Helper function to format arrays for display
    const formatArray = function(arr) {
        let fallback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'Not specified';
        if (!arr || arr.length === 0) return fallback;
        const joined = arr.join(', ');
        // Truncate if too long
        if (joined.length > 100) {
            return joined.substring(0, 97) + '...';
        }
        return joined;
    };
    // Helper function to format file names  
    const formatFileName = (file)=>{
        if (!file) return 'Not uploaded';
        const name = file.name || 'File uploaded';
        // Truncate long file names
        if (name.length > 50) {
            const ext = name.split('.').pop();
            const baseName = name.substring(0, 40);
            return "".concat(baseName, "...").concat(ext ? '.' + ext : '');
        }
        return name;
    };
    // Get effective values with fallbacks and truncation
    const getEffectiveValue = function(primary) {
        for(var _len = arguments.length, fallbacks = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            fallbacks[_key - 1] = arguments[_key];
        }
        let value = primary;
        if (!value || typeof value === 'string' && !value.trim()) {
            for (const fallback of fallbacks){
                if (fallback && (typeof fallback !== 'string' || fallback.trim())) {
                    value = fallback;
                    break;
                }
            }
        }
        if (!value || typeof value === 'string' && !value.trim()) {
            return 'Not specified';
        }
        // Truncate long text values
        if (typeof value === 'string' && value.length > 150) {
            return value.substring(0, 147) + '...';
        }
        return value;
    };
    // Get data from API response or fallback to form data
    const getDataValue = function(apiPath) {
        let fallback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'Not specified';
        if (!onboardingData) return fallback;
        // Navigate through nested object path
        const pathParts = apiPath.split('.');
        let value = onboardingData;
        for (const part of pathParts){
            if (value && typeof value === 'object' && part in value) {
                value = value[part];
            } else {
                return fallback;
            }
        }
        if (!value || typeof value === 'string' && !value.trim()) {
            return fallback;
        }
        // Truncate long text values
        if (typeof value === 'string' && value.length > 150) {
            return value.substring(0, 147) + '...';
        }
        return value;
    };
    const reviewSections = [
        {
            title: 'Personal Information',
            items: [
                {
                    label: 'Full Name',
                    value: (onboardingData === null || onboardingData === void 0 ? void 0 : onboardingData.basic_info) ? "".concat(onboardingData.basic_info.owner_name || '').trim() || 'Not specified' : "".concat(formData.firstName || '', " ").concat(formData.lastName || '').trim() || 'Not specified'
                },
                {
                    label: 'Phone Number',
                    value: getDataValue('basic_info.contact_number', formData.phoneNumber || 'Not specified')
                },
                {
                    label: 'Email Address',
                    value: getDataValue('basic_info.email', formData.email || 'Not specified')
                }
            ]
        },
        {
            title: 'GST Information',
            items: [
                {
                    label: 'GST Number',
                    value: getDataValue('gst_info.gst_number', formData.gstNumber || 'Not specified')
                },
                {
                    label: 'Business Name',
                    value: getDataValue('gst_info.company_name', formData.gstBusinessName || 'Not specified')
                },
                {
                    label: 'Trade Name',
                    value: getDataValue('gst_info.trade_name', formData.gstTradeName || 'Not specified')
                },
                {
                    label: 'Constitution',
                    value: getDataValue('gst_info.constitution', formData.gstConstitution || 'Not specified')
                },
                {
                    label: 'Verification Status',
                    value: getDataValue('gst_info.verification_status') ? '✓ Verified' : '⏳ Pending Verification'
                }
            ]
        },
        {
            title: 'Business Information',
            items: [
                {
                    label: 'Owner Name',
                    value: getDataValue('basic_info.owner_name', formData.ownerName || 'Not specified')
                },
                {
                    label: 'Contact Number',
                    value: getDataValue('basic_info.contact_number', formData.contactNumber || 'Not specified')
                },
                {
                    label: 'Business Email',
                    value: getDataValue('basic_info.email', formData.businessEmail || 'Not specified')
                },
                {
                    label: 'Company Name',
                    value: getDataValue('basic_info.company_name', formData.companyName || 'Not specified')
                },
                {
                    label: 'Company Type',
                    value: getDataValue('basic_info.company_type', formData.companyType || 'Not specified')
                },
                {
                    label: 'Business Address',
                    value: getDataValue('basic_info.address', formData.businessAddress || 'Not specified')
                }
            ]
        },
        {
            title: 'Business Preferences',
            items: [
                {
                    label: 'Business Preference',
                    value: (()=>{
                        const pref = getDataValue('business_preference.preference', formData.business_preference);
                        if (pref === 'marketplace_only') return 'Marketplace Only';
                        if (pref === 'marketplace_and_api') return 'Marketplace & API';
                        return 'Not specified';
                    })()
                }
            ]
        },
        {
            title: 'Warehouse Details',
            items: [
                {
                    label: 'Warehouse Locations',
                    value: (()=>{
                        var _onboardingData_warehouse_details;
                        const warehouses = onboardingData === null || onboardingData === void 0 ? void 0 : (_onboardingData_warehouse_details = onboardingData.warehouse_details) === null || _onboardingData_warehouse_details === void 0 ? void 0 : _onboardingData_warehouse_details.city_warehouses;
                        if (warehouses && warehouses.length > 0) {
                            const formatted = warehouses.map((w)=>"".concat(w.city_name, " (").concat(w.warehouse_count, ")"));
                            const joined = formatted.join(', ');
                            return joined.length > 120 ? joined.substring(0, 117) + '...' : joined;
                        }
                        return formData.city_warehouses && formData.city_warehouses.length > 0 ? formData.city_warehouses.map((w)=>"".concat(w.city_name, " (").concat(w.warehouse_count, ")")).join(', ') : 'Not specified';
                    })()
                },
                {
                    label: 'Daily Order Volume',
                    value: (()=>{
                        const volume = getDataValue('warehouse_details.daily_order_volume', formData.daily_order_volume);
                        return volume !== 'Not specified' ? "".concat(volume, " orders/day") : 'Not specified';
                    })()
                }
            ]
        },
        {
            title: 'Brand & Product Details',
            items: [
                {
                    label: 'Brand Logo',
                    value: getDataValue('product_details.brand_logo') ? 'Uploaded' : 'Not uploaded'
                },
                {
                    label: 'Product Categories',
                    value: (()=>{
                        var _onboardingData_product_details;
                        const categories = onboardingData === null || onboardingData === void 0 ? void 0 : (_onboardingData_product_details = onboardingData.product_details) === null || _onboardingData_product_details === void 0 ? void 0 : _onboardingData_product_details.product_categories;
                        return formatArray(categories, formatArray(formData.product_categories));
                    })()
                },
                {
                    label: 'Target Gender',
                    value: (()=>{
                        var _onboardingData_product_details;
                        const genders = onboardingData === null || onboardingData === void 0 ? void 0 : (_onboardingData_product_details = onboardingData.product_details) === null || _onboardingData_product_details === void 0 ? void 0 : _onboardingData_product_details.gender;
                        return formatArray(genders, formatArray(formData.gender));
                    })()
                },
                {
                    label: 'Target Age Range',
                    value: (()=>{
                        var _onboardingData_product_details;
                        const ageGroups = onboardingData === null || onboardingData === void 0 ? void 0 : (_onboardingData_product_details = onboardingData.product_details) === null || _onboardingData_product_details === void 0 ? void 0 : _onboardingData_product_details.age_group_range;
                        if (ageGroups && ageGroups.length === 2) {
                            return "".concat(ageGroups[0], " - ").concat(ageGroups[1], " years");
                        }
                        if (formData.target_age_groups && formData.target_age_groups.length === 2) {
                            return "".concat(formData.target_age_groups[0], " - ").concat(formData.target_age_groups[1], " years");
                        }
                        return 'Not specified';
                    })()
                },
                {
                    label: 'Price Range',
                    value: (()=>{
                        var _onboardingData_product_details;
                        const priceRange = onboardingData === null || onboardingData === void 0 ? void 0 : (_onboardingData_product_details = onboardingData.product_details) === null || _onboardingData_product_details === void 0 ? void 0 : _onboardingData_product_details.price_range;
                        if (priceRange && priceRange.length === 2 && priceRange[0] && priceRange[1]) {
                            return "₹".concat(priceRange[0], " - ₹").concat(priceRange[1]);
                        }
                        if (formData.price_range && formData.price_range.length === 2 && formData.price_range[0] && formData.price_range[1]) {
                            return "₹".concat(formData.price_range[0], " - ₹").concat(formData.price_range[1]);
                        }
                        return 'Not specified';
                    })()
                },
                {
                    label: 'Total SKUs',
                    value: getDataValue('product_details.total_skus', 'Not specified')
                },
                {
                    label: 'Average Order Value',
                    value: (()=>{
                        const aov = getDataValue('product_details.average_order_value', 0);
                        return aov > 0 ? "₹".concat(aov) : 'Not specified';
                    })()
                }
            ]
        },
        {
            title: 'Banking Details',
            items: [
                {
                    label: 'Account Holder Name',
                    value: getDataValue('bank_details.account_holder_name', formData.account_holder_name || 'Not specified')
                },
                {
                    label: 'Account Number',
                    value: getDataValue('bank_details.account_number', formData.account_number || 'Not specified')
                },
                {
                    label: 'IFSC Code',
                    value: getDataValue('bank_details.ifsc_code', formData.ifsc_code || 'Not specified')
                },
                {
                    label: 'Bank Reference ID',
                    value: getDataValue('bank_details.bank_reference_id', 'Not assigned')
                },
                {
                    label: 'Cancelled Cheque',
                    value: getDataValue('bank_details.cancelled_cheque_uploaded') ? 'Uploaded' : 'Not uploaded'
                },
                {
                    label: 'Verification Status',
                    value: (()=>{
                        const status = getDataValue('bank_details.bank_verification_status', false);
                        return status ? '✓ Verified' : '⏳ Pending Verification';
                    })()
                }
            ]
        },
        {
            title: 'Documents',
            items: [
                {
                    label: 'Digital Signature',
                    value: getDataValue('signature_info.signature_id') ? 'Uploaded' : 'Not uploaded'
                },
                {
                    label: 'TAN Number',
                    value: getDataValue('signature_info.tan_number', 'Not specified')
                }
            ]
        },
        {
            title: 'Verification Status',
            items: [
                {
                    label: 'Email Verified',
                    value: getDataValue('verification_status.email_verified') ? '✓ Verified' : '⏳ Pending'
                },
                {
                    label: 'Phone Verified',
                    value: getDataValue('verification_status.phone_verified') ? '✓ Verified' : '⏳ Pending'
                },
                {
                    label: 'GST Verified',
                    value: getDataValue('verification_status.gst_verified') ? '✓ Verified' : '⏳ Pending'
                },
                {
                    label: 'Bank Verified',
                    value: getDataValue('verification_status.bank_verified') ? '✓ Verified' : '⏳ Pending'
                }
            ]
        }
    ];
    // Show status component after successful submission
    if (showStatus && submissionData) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$OnboardingStatusStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            submissionData: submissionData,
            onGoToDashboard: ()=>{
                // Navigate to dashboard
                window.location.href = '/dashboard';
            },
            onStartNewApplication: ()=>{
                // Reset form and start new application
                setShowStatus(false);
                setSubmissionData(null);
                window.location.href = '/register';
            }
        }, void 0, false, {
            fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
            lineNumber: 412,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto p-4 sm:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl sm:text-2xl font-bold text-gray-900 mb-2",
                        children: isOnboardingComplete ? 'Your Onboarding Details' : stepData.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                        lineNumber: 431,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 text-sm sm:text-base",
                        children: isOnboardingComplete ? 'Review your submitted onboarding information. Your application has been successfully submitted and is under review.' : stepData.subtitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                        lineNumber: 434,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                lineNumber: 430,
                columnNumber: 7
            }, this),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                            lineNumber: 446,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: "Loading your onboarding summary..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                            lineNumber: 447,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                    lineNumber: 445,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                lineNumber: 444,
                columnNumber: 9
            }, this),
            error && !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-red-50 border border-red-200 rounded-lg mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-red-600 break-words",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                        lineNumber: 455,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.reload(),
                        className: "mt-2 text-sm text-red-700 hover:text-red-900 underline",
                        children: "Try again"
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                        lineNumber: 458,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                lineNumber: 454,
                columnNumber: 9
            }, this),
            !isLoading && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6 sm:space-y-8",
                children: [
                    reviewSections.map((section, sectionIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 pb-2 border-b border-gray-300",
                                    children: section.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                    lineNumber: 474,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-4",
                                    children: section.items.map((item, itemIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                    className: "text-sm font-medium text-gray-600 mb-1",
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                                    lineNumber: 480,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                    className: "text-sm text-gray-900 bg-white px-3 py-2 rounded border border-gray-200 min-h-[2.5rem] flex items-start break-words overflow-hidden",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-full overflow-hidden text-ellipsis",
                                                        children: item.value
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                                        lineNumber: 484,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                                    lineNumber: 483,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, itemIndex, true, {
                                            fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                            lineNumber: 479,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                    lineNumber: 477,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, sectionIndex, true, {
                            fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                            lineNumber: 473,
                            columnNumber: 13
                        }, this)),
                    !isOnboardingComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-base sm:text-lg font-semibold text-blue-900 mb-4",
                                children: "Terms & Conditions"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                lineNumber: 497,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "terms",
                                                type: "checkbox",
                                                checked: termsAccepted,
                                                onChange: handleTermsChange,
                                                className: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1 flex-shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                                lineNumber: 504,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "terms",
                                                className: "text-xs sm:text-sm text-gray-700 cursor-pointer leading-relaxed",
                                                children: [
                                                    "I have read and agree to the",
                                                    ' ',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        className: "text-blue-600 hover:text-blue-800 underline",
                                                        children: "Terms & Conditions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                                        lineNumber: 513,
                                                        columnNumber: 21
                                                    }, this),
                                                    ' ',
                                                    "of the marketplace. I understand the terms of service, fees, and policies governing my participation as a brand partner."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                                lineNumber: 511,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                        lineNumber: 503,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "privacy",
                                                type: "checkbox",
                                                checked: privacyAccepted,
                                                onChange: handlePrivacyChange,
                                                className: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1 flex-shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                                lineNumber: 522,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "privacy",
                                                className: "text-xs sm:text-sm text-gray-700 cursor-pointer leading-relaxed",
                                                children: [
                                                    "I acknowledge that I have read and understood the",
                                                    ' ',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        className: "text-blue-600 hover:text-blue-800 underline",
                                                        children: "Privacy Policy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                                        lineNumber: 531,
                                                        columnNumber: 21
                                                    }, this),
                                                    ' ',
                                                    "and consent to the collection, processing, and storage of my personal and business data as described."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                                lineNumber: 529,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                        lineNumber: 521,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                lineNumber: 501,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 p-3 sm:p-4 bg-white border border-blue-200 rounded-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-medium text-blue-900 mb-2 text-sm sm:text-base",
                                        children: "Important Information:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                        lineNumber: 541,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "text-xs sm:text-sm text-blue-800 space-y-1 leading-relaxed",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "• Your application will be reviewed within 2-3 business days"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                                lineNumber: 543,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "• You will receive email notifications about your application status"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                                lineNumber: 544,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "• Additional documentation may be requested during the review process"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                                lineNumber: 545,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "• Once approved, you can start listing your products on the marketplace"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                                lineNumber: 546,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                        lineNumber: 542,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                lineNumber: 540,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                        lineNumber: 496,
                        columnNumber: 13
                    }, this),
                    isOnboardingComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-base sm:text-lg font-semibold text-green-900 mb-4",
                                children: "✅ Application Status"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                lineNumber: 555,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-green-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Status:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                                lineNumber: 560,
                                                columnNumber: 19
                                            }, this),
                                            " Your onboarding application has been successfully submitted and is currently under review."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                        lineNumber: 559,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-green-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Submitted:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                                lineNumber: 563,
                                                columnNumber: 19
                                            }, this),
                                            " All required information and documents have been provided."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                        lineNumber: 562,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-green-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Next Steps:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                                lineNumber: 566,
                                                columnNumber: 19
                                            }, this),
                                            " Our team will review your application within 2-3 business days. You will receive email notifications about any status updates."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                        lineNumber: 565,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                lineNumber: 558,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                        lineNumber: 554,
                        columnNumber: 13
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-red-50 border border-red-200 rounded-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-red-600 break-words",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                            lineNumber: 575,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                        lineNumber: 574,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                lineNumber: 469,
                columnNumber: 9
            }, this),
            !isOnboardingComplete ? // Show submission form when onboarding is not complete
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].form,
                onSubmit: handleSubmit,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].buttonGroup, " mt-6 sm:mt-8"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onBack,
                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].backButton, " text-sm sm:text-base px-4 py-2"),
                            children: stepData.buttons.back
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                            lineNumber: 588,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: !termsAccepted || !privacyAccepted || isLoading || isSubmitting,
                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].submitButton, " ").concat(!termsAccepted || !privacyAccepted || isLoading || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700', " text-sm sm:text-base px-4 py-2 flex items-center justify-center"),
                            children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                                        lineNumber: 606,
                                        columnNumber: 19
                                    }, this),
                                    "Submitting..."
                                ]
                            }, void 0, true) : stepData.buttons.submit
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                            lineNumber: 595,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                    lineNumber: 587,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                lineNumber: 586,
                columnNumber: 9
            }, this) : // Show dashboard navigation when onboarding is complete
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].buttonGroup, " mt-6 sm:mt-8"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>window.location.href = '/signup?step=1',
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].backButton, " text-sm sm:text-base px-4 py-2"),
                        children: "Start New Application"
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                        lineNumber: 618,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>window.location.href = '/dashboard',
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].submitButton, " bg-blue-600 hover:bg-blue-700 text-sm sm:text-base px-4 py-2 flex items-center justify-center"),
                        children: "Go to Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                        lineNumber: 625,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
                lineNumber: 617,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/ReviewSubmitStep.jsx",
        lineNumber: 429,
        columnNumber: 5
    }, this);
}
_s(ReviewSubmitStep, "mBnbf80tVM6FF0Lh8wbxV+k27Y8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = ReviewSubmitStep;
var _c;
__turbopack_context__.k.register(_c, "ReviewSubmitStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/onboarding/OnboardingSidebar.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>OnboardingSidebar
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
;
;
function OnboardingSidebar(param) {
    let { currentStep = 1 } = param;
    const steps = [
        {
            number: 1,
            title: 'GSTIN Check',
            icon: '🏢'
        },
        {
            number: 2,
            title: 'Basic Information',
            icon: '📋'
        },
        {
            number: 3,
            title: 'Signature Upload',
            icon: '✍️'
        },
        {
            number: 4,
            title: 'Business Preferences',
            icon: '⚙️'
        },
        {
            number: 5,
            title: 'Brand Details',
            icon: '🛍️'
        },
        {
            number: 6,
            title: 'Warehouse Details',
            icon: '🏪'
        },
        {
            number: 7,
            title: 'Bank Details',
            icon: '🏦'
        },
        {
            number: 8,
            title: 'Declaration',
            icon: '✅'
        }
    ];
    const completedSteps = steps.filter((step)=>step.number < currentStep).length;
    const progressPercentage = Math.round(completedSteps / steps.length * 100);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white/95 backdrop-blur-md border-r-2 border-[#241331]/20 shadow-xl z-40 overflow-y-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 border-b border-[#241331]/20 bg-gradient-to-r from-[#241331]/5 to-[#C3AF6C]/5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 bg-[#241331] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 font-itc-gothic",
                                children: "F"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-[#241331] font-itc-gothic",
                                children: "Brand Registration"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-[#241331]/70 font-itc-gothic",
                        children: "Brand Onboarding Process"
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 bg-[#C3AF6C]/5 border-b border-[#241331]/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium text-[#241331] font-itc-gothic",
                                children: "Completion Progress"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-bold text-[#C3AF6C] font-itc-gothic",
                                children: [
                                    progressPercentage,
                                    "% Complete"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full bg-[#241331]/10 rounded-full h-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gradient-to-r from-[#241331] to-[#C3AF6C] h-3 rounded-full transition-all duration-500 shadow-lg",
                            style: {
                                width: "".concat(currentStep / 8 * 100, "%")
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: steps.map((step)=>{
                        const isActive = step.number === currentStep;
                        const isCompleted = step.number < currentStep;
                        const isAccessible = step.number <= currentStep;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center p-3 rounded-lg border transition-all duration-200 ".concat(isActive ? 'bg-[#C3AF6C]/10 border-[#C3AF6C] shadow-lg' : isCompleted ? 'bg-[#241331]/5 border-[#241331]/30' : isAccessible ? 'bg-white border-[#241331]/20 hover:bg-[#241331]/5' : 'bg-gray-50 border-gray-200'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 font-itc-gothic ".concat(isCompleted ? 'bg-[#241331] text-white' : isActive ? 'bg-[#C3AF6C] text-white' : isAccessible ? 'bg-[#241331]/20 text-[#241331]' : 'bg-gray-100 text-gray-400'),
                                    children: isCompleted ? '✓' : step.number
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                                    lineNumber: 67,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-bold truncate font-itc-gothic ".concat(isActive ? 'text-[#C3AF6C]' : isCompleted ? 'text-[#241331]' : isAccessible ? 'text-[#241331]' : 'text-gray-400'),
                                            children: step.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                                            lineNumber: 81,
                                            columnNumber: 19
                                        }, this),
                                        isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-[#C3AF6C] mt-1 font-itc-gothic font-medium",
                                            children: "Current Step"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                                            lineNumber: 93,
                                            columnNumber: 21
                                        }, this),
                                        isCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-[#241331] mt-1 font-itc-gothic font-medium",
                                            children: "Completed"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                                            lineNumber: 96,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                                    lineNumber: 80,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-lg ml-2",
                                    children: step.icon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                                    lineNumber: 101,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, step.number, true, {
                            fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                            lineNumber: 54,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-t border-[#241331]/20 bg-gradient-to-r from-[#C3AF6C]/5 to-[#241331]/5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 bg-[#C3AF6C]/20 rounded-full flex items-center justify-center mx-auto mb-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[#C3AF6C] text-xl",
                                children: "💡"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-sm font-bold text-[#241331] mb-2 font-itc-gothic",
                            children: "Need Help?"
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-[#241331]/70 mb-3 font-itc-gothic",
                            children: "Our support team is here to assist you with the onboarding process."
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "w-full px-3 py-2 bg-[#241331] text-white text-xs font-bold rounded-lg hover:bg-[#1a0e24] transition-all duration-200 shadow-lg hover:shadow-xl font-itc-gothic",
                            children: "Contact Support"
                        }, void 0, false, {
                            fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/OnboardingSidebar.jsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = OnboardingSidebar;
var _c;
__turbopack_context__.k.register(_c, "OnboardingSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/debug/AuthDiagnostic.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>AuthDiagnostic
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function AuthDiagnostic() {
    _s();
    const [diagnosis, setDiagnosis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isRunning, setIsRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { diagnoseAuthIssue, handleAuthError, getAuthToken, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const runDiagnosis = async ()=>{
        setIsRunning(true);
        try {
            const result = await diagnoseAuthIssue();
            setDiagnosis(result);
        } catch (error) {
            setDiagnosis({
                issue: 'ERROR',
                error: error.message
            });
        } finally{
            setIsRunning(false);
        }
    };
    const forceLogout = ()=>{
        logout();
        window.location.href = '/login';
    };
    const token = getAuthToken();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-md z-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold text-gray-800 mb-2",
                        children: "🔍 Auth Diagnostic"
                    }, void 0, false, {
                        fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Token Status:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                                        lineNumber: 37,
                                        columnNumber: 13
                                    }, this),
                                    " ",
                                    token ? '✅ Present' : '❌ Missing'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            token && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs font-mono bg-gray-100 p-2 rounded",
                                children: [
                                    token.substring(0, 30),
                                    "..."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: runDiagnosis,
                        disabled: isRunning,
                        className: "w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50",
                        children: isRunning ? 'Running...' : 'Run Diagnosis'
                    }, void 0, false, {
                        fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: forceLogout,
                        className: "w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700",
                        children: "Force Logout & Redirect to Login"
                    }, void 0, false, {
                        fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            diagnosis && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 p-3 border rounded bg-gray-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-semibold mb-2",
                        children: [
                            "Issue: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "".concat(diagnosis.issue === 'NONE' ? 'text-green-600' : 'text-red-600'),
                                children: diagnosis.issue
                            }, void 0, false, {
                                fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                                lineNumber: 67,
                                columnNumber: 20
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this),
                    diagnosis.recommendation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-700 mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Recommendation:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                                lineNumber: 74,
                                columnNumber: 15
                            }, this),
                            " ",
                            diagnosis.recommendation
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                        lineNumber: 73,
                        columnNumber: 13
                    }, this),
                    diagnosis.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Error:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                                lineNumber: 80,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "text-xs bg-red-100 p-2 rounded mt-1 overflow-auto",
                                children: JSON.stringify(diagnosis.error, null, 2)
                            }, void 0, false, {
                                fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                        lineNumber: 79,
                        columnNumber: 13
                    }, this),
                    diagnosis.data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "User Data:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "text-xs bg-green-100 p-2 rounded mt-1 overflow-auto max-h-32",
                                children: JSON.stringify(diagnosis.data, null, 2)
                            }, void 0, false, {
                                fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                        lineNumber: 88,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
                lineNumber: 65,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/debug/AuthDiagnostic.jsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(AuthDiagnostic, "3VWoDAjvku3hv+xxU6g2DajD1VQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AuthDiagnostic;
var _c;
__turbopack_context__.k.register(_c, "AuthDiagnostic");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/RegistrationForm.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>RegistrationForm
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$registration$2f$StepHeader$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/registration/StepHeader.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$registration$2f$PhoneNumberStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/registration/PhoneNumberStep.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$registration$2f$PhoneVerificationStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/registration/PhoneVerificationStep.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$registration$2f$EmailStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/registration/EmailStep.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$registration$2f$EmailVerificationStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/registration/EmailVerificationStep.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$registration$2f$PasswordStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/registration/PasswordStep.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$GSTVerificationStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/onboarding/GSTVerificationStep.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$BasicInformationStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/onboarding/BasicInformationStep.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$SignatureUploadStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/onboarding/SignatureUploadStep.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$BusinessPreferencesStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/onboarding/BusinessPreferencesStep.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$WarehouseDetailsStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/onboarding/WarehouseDetailsStep.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$BrandProductDetailsStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/onboarding/BrandProductDetailsStep.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$BankingDetailsStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/onboarding/BankingDetailsStep.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$ReviewSubmitStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/onboarding/ReviewSubmitStep.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$OnboardingSidebar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/onboarding/OnboardingSidebar.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$debug$2f$AuthDiagnostic$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/debug/AuthDiagnostic.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function RegistrationForm() {
    _s();
    const { getAuthToken, authenticatedFetch, formData: authFormData, saveFormData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const stepFromUrl = searchParams.get('step');
    const onboardingFromUrl = searchParams.get('onboarding');
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(stepFromUrl ? parseInt(stepFromUrl) : 1);
    const [isOnboarding, setIsOnboarding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(onboardingFromUrl === 'true'); // Start with authentication unless specified
    const [isPhoneVerified, setIsPhoneVerified] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // Track phone verification status
    const [isEmailVerified, setIsEmailVerified] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // Track email verification status
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [profileData, setProfileData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Initialize formData from AuthContext if available, otherwise use default values
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        phoneNumber: '',
        verificationCode: '',
        email: '',
        emailVerificationCode: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        gstNumber: '',
        gstBusinessName: '',
        gstTradeName: '',
        gstConstitution: '',
        gstAddress: '',
        gstStatus: '',
        gstRegistrationDate: '',
        ownerName: '',
        contactNumber: '',
        businessEmail: '',
        companyName: '',
        companyType: '',
        businessAddress: '',
        signatureFile: null,
        signatureFileName: '',
        business_preference: '',
        city_warehouses: [
            {
                city_name: '',
                warehouse_count: 1
            }
        ],
        daily_order_volume: '',
        brand_logo: null,
        product_categories: [],
        gender: [],
        target_age_groups: [
            18,
            65
        ],
        price_range: [
            '',
            ''
        ],
        product_catalog: null,
        account_holder_name: '',
        account_number: '',
        ifsc_code: '',
        cancelled_cheque: null
    });
    // Update local formData when AuthContext formData changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RegistrationForm.useEffect": ()=>{
            if (authFormData) {
                console.log('=== FORM DATA POPULATION DEBUG ===');
                console.log('AuthContext formData received:', authFormData);
                const updatedFormData = {
                    ...formData,
                    ...authFormData,
                    // Ensure array fields are properly handled
                    city_warehouses: authFormData.cityWarehouses && authFormData.cityWarehouses.length > 0 ? authFormData.cityWarehouses : formData.city_warehouses,
                    product_categories: authFormData.product_categories || formData.product_categories,
                    gender: authFormData.gender || formData.gender,
                    target_age_groups: authFormData.target_age_groups || formData.target_age_groups,
                    price_range: authFormData.price_range || formData.price_range
                };
                console.log('Updated RegistrationForm formData:', updatedFormData);
                console.log('Key field values:');
                console.log('- gstNumber:', updatedFormData.gstNumber);
                console.log('- ownerName:', updatedFormData.ownerName);
                console.log('- companyName:', updatedFormData.companyName);
                console.log('- companyType:', updatedFormData.companyType);
                console.log('- businessAddress:', updatedFormData.businessAddress);
                console.log('- addressLine1:', updatedFormData.addressLine1);
                console.log('- city_warehouses:', updatedFormData.city_warehouses);
                console.log('=====================================');
                setFormData(updatedFormData);
            }
        }
    }["RegistrationForm.useEffect"], [
        authFormData
    ]);
    // Check for authentication token and fetch profile status
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RegistrationForm.useEffect": ()=>{
            const checkAuthAndStatus = {
                "RegistrationForm.useEffect.checkAuthAndStatus": async ()=>{
                    const token = getAuthToken();
                    if (token) {
                        try {
                            setIsLoading(true);
                        // const statusResponse = await profileApi.getStatus();
                        // if (statusResponse.success && statusResponse.data?.profile) {
                        //   const { profile } = statusResponse.data;
                        //   setProfileData(profile);
                        //   // Set verification status based on profile data
                        //   if (profile.status_code && profile.status_code >= 'PHONE_VERIFIED') {
                        //     setIsPhoneVerified(true);
                        //   }
                        //   if (profile.status_code && profile.status_code >= 'EMAIL_VERIFIED') {
                        //     setIsEmailVerified(true);
                        //   }
                        //   // Update form data with any existing profile data
                        //   setFormData(prevData => ({
                        //     ...prevData,
                        //     ...extractFormDataFromProfile(profile)
                        //   }));
                        //   // Determine where to resume from
                        //   if (profile.is_onboarding_complete) {
                        //     // If fully completed, redirect to dashboard (this would be handled by the login flow)
                        //   } else if (profile.current_step) {
                        //     // Resume from where they left off
                        //     setCurrentStep(profile.current_step);
                        //     setIsOnboarding(profile.status_code && profile.status_code >= 'PASSWORD_SET');
                        //   }
                        // }
                        } catch (error) {
                            console.error('Failed to fetch profile status:', error);
                        } finally{
                            setIsLoading(false);
                        }
                    } else {
                        setIsLoading(false);
                    }
                }
            }["RegistrationForm.useEffect.checkAuthAndStatus"];
            checkAuthAndStatus();
        }
    }["RegistrationForm.useEffect"], []);
    // Helper function to extract form data from profile
    // const extractFormDataFromProfile = (profile) => {
    //   const data = {};
    //   // Map profile fields to form fields
    //   if (profile.phone_number) data.phoneNumber = profile.phone_number;
    //   if (profile.email) data.email = profile.email;
    //   if (profile.first_name) data.firstName = profile.first_name;
    //   if (profile.last_name) data.lastName = profile.last_name;
    //   // Handle onboarding data if available
    //   if (profile.onboarding_data) {
    //     const onboardingData = profile.onboarding_data;
    //     // Map GST info
    //     if (onboardingData.gst_number) data.gstNumber = onboardingData.gst_number;
    //     if (onboardingData.gst_business_name) data.gstBusinessName = onboardingData.gst_business_name;
    //     // Map other onboarding fields
    //     // Add more mappings as needed for each step
    //   }
    //   return data;
    // };
    const handleChange = (e)=>{
        const { name, value } = e.target;
        console.log('📝 RegistrationForm handleChange called:', {
            name,
            value,
            type: typeof value
        });
        const updatedData = {
            ...formData,
            [name]: value
        };
        setFormData(updatedData);
        console.log('📋 RegistrationForm formData updated:', {
            fieldName: name,
            fieldValue: value instanceof File ? "File: ".concat(value.name) : value,
            signatureFileExists: !!updatedData.signatureFile
        });
        // Also save to AuthContext for persistence (but not File objects)
        if (!(value instanceof File)) {
            saveFormData({
                [name]: value
            });
        } else {
            console.log('🗂️ File object detected, not saving to AuthContext:', {
                name,
                fileName: value.name
            });
        }
    };
    const handleNext = ()=>{
        if (currentStep === 5 && !isOnboarding) {
            // After password step (last auth step), switch to onboarding
            console.log('Authentication completed! Starting brand onboarding...');
            setIsOnboarding(true);
            setCurrentStep(1); // Start with first onboarding step (GST verification)
        } else if (isOnboarding) {
            setCurrentStep((prev)=>Math.min(prev + 1, 8)); // 8 onboarding steps
        } else {
            setCurrentStep((prev)=>Math.min(prev + 1, 5)); // 5 authentication steps
        }
    };
    const handleBack = ()=>{
        if (isOnboarding && currentStep === 1) {
            // Cannot go back from first onboarding step - onboarding has started
            console.log('Cannot go back from first onboarding step');
            return;
        } else if (isOnboarding) {
            // Allow going back within onboarding steps (after step 1)
            setCurrentStep((prev)=>Math.max(prev - 1, 1));
        } else {
            // Allow going back within authentication steps
            setCurrentStep((prev)=>Math.max(prev - 1, 1));
        }
    };
    const handleSubmit = async ()=>{
        // If we're submitting from the phone verification step, mark phone as verified
        if (currentStep === 2) {
            setIsPhoneVerified(true);
        }
        // If we're submitting from the email verification step, mark email as verified
        if (currentStep === 4) {
            setIsEmailVerified(true);
        }
        // If user is authenticated (has token), update the progress on the server
        // const token = localStorage.getItem('authToken');
        // if (token) {
        //   try {
        //     // Update the current step on the server
        //     await profileApi.updateProgress(currentStep, isOnboarding);
        //     // Fetch the updated status
        //     const statusResponse = await profileApi.getStatus();
        //     if (statusResponse.success && statusResponse.data?.profile) {
        //       setProfileData(statusResponse.data.profile);
        //     }
        //   } catch (error) {
        //     console.error('Failed to update progress:', error);
        //     // Continue anyway, as this is not critical for the user flow
        //   }
        // }
        // Don't call handleNext() for the final step (step 8) in onboarding
        // The OnboardingFlow component will handle the final submission internally
        if (!(isOnboarding && currentStep === 8)) {
            handleNext();
        }
    };
    const handleResend = ()=>{
    // Resend logic handled in individual step components
    };
    const currentStepData = isOnboarding ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONBOARDING_STEPS"][currentStep] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STEPS"][currentStep];
    const renderCurrentStep = ()=>{
        if (isOnboarding) {
            switch(currentStep){
                case 1:
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$GSTVerificationStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        formData: formData,
                        handleChange: handleChange,
                        onSubmit: handleSubmit,
                        onBack: handleBack,
                        isFirstOnboardingStep: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.jsx",
                        lineNumber: 287,
                        columnNumber: 13
                    }, this);
                case 2:
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$BasicInformationStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        formData: formData,
                        handleChange: handleChange,
                        onSubmit: handleSubmit,
                        onBack: handleBack
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.jsx",
                        lineNumber: 297,
                        columnNumber: 13
                    }, this);
                case 3:
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$SignatureUploadStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        formData: formData,
                        handleChange: handleChange,
                        onSubmit: handleSubmit,
                        onBack: handleBack
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.jsx",
                        lineNumber: 306,
                        columnNumber: 13
                    }, this);
                case 4:
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$BusinessPreferencesStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        formData: formData,
                        handleChange: handleChange,
                        onSubmit: handleSubmit,
                        onBack: handleBack
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.jsx",
                        lineNumber: 315,
                        columnNumber: 13
                    }, this);
                case 5:
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$BrandProductDetailsStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        formData: formData,
                        handleChange: handleChange,
                        onSubmit: handleSubmit,
                        onBack: handleBack
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.jsx",
                        lineNumber: 324,
                        columnNumber: 13
                    }, this);
                case 6:
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$WarehouseDetailsStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        formData: formData,
                        handleChange: handleChange,
                        onSubmit: handleSubmit,
                        onBack: handleBack
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.jsx",
                        lineNumber: 333,
                        columnNumber: 13
                    }, this);
                case 7:
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$BankingDetailsStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        formData: formData,
                        handleChange: handleChange,
                        onSubmit: handleSubmit,
                        onBack: handleBack
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.jsx",
                        lineNumber: 342,
                        columnNumber: 13
                    }, this);
                case 8:
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$ReviewSubmitStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        formData: formData,
                        handleChange: handleChange,
                        onSubmit: handleSubmit,
                        onBack: handleBack
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.jsx",
                        lineNumber: 351,
                        columnNumber: 13
                    }, this);
                // TODO: Add other onboarding steps here
                default:
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold mb-2",
                                children: [
                                    "Onboarding Step ",
                                    currentStep
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.jsx",
                                lineNumber: 362,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mb-4",
                                children: "This step is coming soon!"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.jsx",
                                lineNumber: 363,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleBack,
                                        className: "px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400",
                                        children: "Back"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.jsx",
                                        lineNumber: 365,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSubmit,
                                        className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
                                        children: "Continue"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.jsx",
                                        lineNumber: 371,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.jsx",
                                lineNumber: 364,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.jsx",
                        lineNumber: 361,
                        columnNumber: 13
                    }, this);
            }
        }
        // Registration steps
        switch(currentStep){
            case 1:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$registration$2f$PhoneNumberStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    formData: formData,
                    handleChange: handleChange,
                    onSubmit: handleSubmit,
                    onBack: handleBack
                }, void 0, false, {
                    fileName: "[project]/src/components/RegistrationForm.jsx",
                    lineNumber: 387,
                    columnNumber: 11
                }, this);
            case 2:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$registration$2f$PhoneVerificationStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    formData: formData,
                    handleChange: handleChange,
                    onSubmit: handleSubmit,
                    onBack: handleBack,
                    onResend: handleResend
                }, void 0, false, {
                    fileName: "[project]/src/components/RegistrationForm.jsx",
                    lineNumber: 396,
                    columnNumber: 11
                }, this);
            case 3:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$registration$2f$EmailStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    formData: formData,
                    handleChange: handleChange,
                    onSubmit: handleSubmit,
                    onBack: handleBack,
                    isPhoneVerified: isPhoneVerified
                }, void 0, false, {
                    fileName: "[project]/src/components/RegistrationForm.jsx",
                    lineNumber: 406,
                    columnNumber: 11
                }, this);
            case 4:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$registration$2f$EmailVerificationStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    formData: formData,
                    handleChange: handleChange,
                    onSubmit: handleSubmit,
                    onBack: handleBack,
                    onResend: handleResend
                }, void 0, false, {
                    fileName: "[project]/src/components/RegistrationForm.jsx",
                    lineNumber: 416,
                    columnNumber: 11
                }, this);
            case 5:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$registration$2f$PasswordStep$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    formData: formData,
                    handleChange: handleChange,
                    onSubmit: handleSubmit,
                    onBack: handleBack,
                    isEmailVerified: isEmailVerified
                }, void 0, false, {
                    fileName: "[project]/src/components/RegistrationForm.jsx",
                    lineNumber: 426,
                    columnNumber: 11
                }, this);
            default:
                return null;
        }
    };
    // Display a loading state while checking authentication status
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-[#241331]/5 via-white to-[#C3AF6C]/5 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-12 border border-[#241331]/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-16 w-16 border-b-4 border-[#241331] mx-auto mb-6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.jsx",
                        lineNumber: 444,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg text-[#241331] font-itc-gothic font-bold",
                        children: "Loading your profile..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.jsx",
                        lineNumber: 445,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RegistrationForm.jsx",
                lineNumber: 443,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/RegistrationForm.jsx",
            lineNumber: 442,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-[#241331]/5 via-white to-[#C3AF6C]/5 flex",
        children: [
            isOnboarding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$onboarding$2f$OnboardingSidebar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                currentStep: currentStep
            }, void 0, false, {
                fileName: "[project]/src/components/RegistrationForm.jsx",
                lineNumber: 457,
                columnNumber: 24
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 ".concat(isOnboarding ? 'ml-80' : ''),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].container,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].formContainer,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$registration$2f$StepHeader$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                title: (currentStepData === null || currentStepData === void 0 ? void 0 : currentStepData.title) || 'Registration',
                                subtitle: (currentStepData === null || currentStepData === void 0 ? void 0 : currentStepData.subtitle) || 'Complete your registration'
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.jsx",
                                lineNumber: 464,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-bold text-[#241331] font-itc-gothic",
                                                children: isOnboarding ? 'Brand Onboarding' : 'Authentication'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RegistrationForm.jsx",
                                                lineNumber: 472,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-[#241331]/60 font-itc-gothic",
                                                children: [
                                                    "Step ",
                                                    currentStep,
                                                    " of ",
                                                    isOnboarding ? 8 : 5
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/RegistrationForm.jsx",
                                                lineNumber: 475,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RegistrationForm.jsx",
                                        lineNumber: 471,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-[#241331]/10 rounded-full h-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gradient-to-r from-[#241331] to-[#C3AF6C] h-3 rounded-full transition-all duration-500 shadow-lg",
                                            style: {
                                                width: "".concat(currentStep / (isOnboarding ? 8 : 5) * 100, "%")
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RegistrationForm.jsx",
                                            lineNumber: 480,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.jsx",
                                        lineNumber: 479,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 text-xs text-[#241331]/60 font-itc-gothic",
                                        children: isOnboarding ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#C3AF6C] font-bold",
                                                    children: "✓"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RegistrationForm.jsx",
                                                    lineNumber: 488,
                                                    columnNumber: 25
                                                }, this),
                                                " Authentication Complete • ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#C3AF6C] font-bold",
                                                    children: "Brand Setup in Progress"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RegistrationForm.jsx",
                                                    lineNumber: 488,
                                                    columnNumber: 103
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/RegistrationForm.jsx",
                                            lineNumber: 488,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[#241331] font-bold",
                                            children: "Authentication in Progress"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RegistrationForm.jsx",
                                            lineNumber: 489,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.jsx",
                                        lineNumber: 486,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.jsx",
                                lineNumber: 470,
                                columnNumber: 13
                            }, this),
                            renderCurrentStep(),
                            currentStep === 1 && !isOnboarding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].linkContainer,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].linkText,
                                    children: [
                                        "Already have an account?",
                                        ' ',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRATION_STYLES"].link,
                                            children: "Sign in"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RegistrationForm.jsx",
                                            lineNumber: 502,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RegistrationForm.jsx",
                                    lineNumber: 500,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.jsx",
                                lineNumber: 499,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.jsx",
                        lineNumber: 462,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/RegistrationForm.jsx",
                    lineNumber: 461,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/RegistrationForm.jsx",
                lineNumber: 460,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RegistrationForm.jsx",
        lineNumber: 452,
        columnNumber: 5
    }, this);
}
_s(RegistrationForm, "UdrsMyt9xAsG6PTPOLO0d8iMj6U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = RegistrationForm;
var _c;
__turbopack_context__.k.register(_c, "RegistrationForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_6197e1bb._.js.map