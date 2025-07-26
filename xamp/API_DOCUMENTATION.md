# Xamp API Documentation

## Authentication Methods

This API supports three authentication methods:

1. **JWT Token Authentication** - Recommended for frontend applications
2. **Token Authentication** - Alternative for API clients
3. **Session Authentication** - Used for browser-based applications

## Authentication API Endpoints

### Register a new user
**Endpoint:** `POST /api/auth/register/`

**Request Body:**
```json
{
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "password": "securepassword123",
  "password_confirm": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "date_joined": "2025-06-21T10:30:45.123456Z",
    "last_modified": "2025-06-21T10:30:45.123456Z"
  },
  "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b",
  "jwt": {
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  },
  "csrf_token": "abcdef123456",
  "session_id": "session_key_123456"
}
```

### Login
**Endpoint:** `POST /api/auth/login/`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "date_joined": "2025-06-21T10:30:45.123456Z",
    "last_modified": "2025-06-21T10:30:45.123456Z"
  },
  "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b",
  "jwt": {
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  },
  "csrf_token": "abcdef123456",
  "session_id": "session_key_123456"
}
```

### Logout
**Endpoint:** `POST /api/auth/logout/`

**Headers:** (use one of the following)
```
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```
OR
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Response (200 OK):**
```json
{
  "detail": "Successfully logged out."
}
```

**Note:** This endpoint will:
- Invalidate the authentication token
- Clear any JWT tokens in the session
- End the user's session
- Clear session cookies

### Get User Profile
**Endpoint:** `GET /api/auth/profile/`

**Headers:**
```
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "date_joined": "2025-06-21T10:30:45.123456Z",
  "last_modified": "2025-06-21T10:30:45.123456Z"
}
```

### Update User Profile
**Endpoint:** `PUT /api/auth/profile/`

**Headers:**
```
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

**Request Body:**
```json
{
  "first_name": "Johnny",
  "last_name": "Doe"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "Johnny",
  "last_name": "Doe",
  "date_joined": "2025-06-21T10:30:45.123456Z",
  "last_modified": "2025-06-21T10:30:45.123456Z"
}
```

### Change Password
**Endpoint:** `PUT /api/auth/change-password/`

**Headers:**
```
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

**Request Body:**
```json
{
  "old_password": "securepassword123",
  "new_password": "evenmoresecurepassword456",
  "confirm_password": "evenmoresecurepassword456"
}
```

**Response (200 OK):**
```json
{
  "message": "Password updated successfully"
}
```

### JWT Token Refresh
**Endpoint:** `POST /api/auth/token/refresh/`

**Request Body:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Response (200 OK):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### JWT Token Verify
**Endpoint:** `POST /api/auth/token/verify/`

**Request Body:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Response (200 OK):**
```json
{}
```

### Session Management
**Endpoint:** `GET /api/auth/sessions/`

**Headers:** (use one of the authentication methods)

**Response (200 OK):**
```json
{
  "current_session": {
    "session_key": "session_key_123456",
    "is_authenticated": true,
    "user_id": 1,
    "user_email": "user@example.com"
  },
  "all_active_sessions": [
    {
      "session_key": "session_key_123456",
      "expire_date": "2025-06-21T12:30:45.123456Z",
      "last_activity": "2025-06-21T10:35:45.123456Z",
      "ip_address": "192.168.1.1",
      "user_agent": "Mozilla/5.0..."
    }
  ],
  "total_active_sessions": 1
}
```

**Endpoint:** `POST /api/auth/sessions/terminate-others/`

**Headers:** (use one of the authentication methods)

**Response (200 OK):**
```json
{
  "detail": "Successfully terminated 2 other sessions",
  "terminated_count": 2
}
```

**Endpoint:** `POST /api/auth/sessions/extend/`

**Headers:** (use one of the authentication methods)

**Response (200 OK):**
```json
{
  "detail": "Session extended successfully",
  "new_expiry": "2025-06-21T12:30:45.123456Z"
}
```

## Authentication with API

For all protected endpoints, you can use any of the following authentication methods:

### 1. JWT Authentication (Recommended)

```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

### 2. Token Authentication

```
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

### 3. Session Authentication

For browser-based applications, the session cookie will be automatically included in requests after login.

## Brand Profile Status API

### Get Brand Profile Status
**Endpoint:** `GET /api/brand/profile/status/`

**Description:** **⚠️ IMPORTANT: This API should be called FIRST after user login to determine the user's onboarding status and guide them to the appropriate next step.**

This endpoint returns the current onboarding status of the brand user with specific status codes to help the frontend determine what step the user should complete next.

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile status retrieved successfully",
  "data": {
    "profile": {
      "id": 1,
      "company_name": "Example Corp",
      "website": "https://example.com",
      "industry": "Technology",
      "is_verified": false,
      "onboarding_status": 3,
      "onboarding_status_details": {
        "code": "04",
        "message": "Brand info is not added",
        "step": "brand_info"
      },
      "user_details": {
        "id": 1,
        "email": "user@example.com",
        "phone_number": "+919876543210",
        "is_email_verified": true,
        "is_phone_verified": true
      },
      "created_at": "2025-01-27T00:00:00Z",
      "updated_at": "2025-01-27T00:00:00Z"
    },
    "status_code": "04",
    "status_message": "Brand info is not added",
    "current_step": "brand_info",
    "is_onboarding_complete": false,
    "onboarding_progress": {
      "current_step": 3,
      "total_steps": 10,
      "percentage": 30
    }
  }
}
```

**Status Codes and Frontend Actions:**

| Status Code | Message | Next Step | Frontend Action |
|-------------|---------|-----------|----------------|
| `01` | Phone is not verified | phone_verification | Redirect to phone OTP page |
| `02` | Email is not verified | email_verification | Redirect to email OTP page |
| `03` | GST is not verified | gst_verification | Redirect to GST verification page |
| `04` | Brand info is not added | brand_info | Redirect to basic info form |
| `05` | Signature is not uploaded | signature_upload | Redirect to signature upload page |
| `06` | Business preference is not uploaded | business_preference | Redirect to business preference page |
| `07` | Warehouse details is not uploaded | warehouse_details | Redirect to warehouse details page |
| `08` | Product details is not added | product_details | Redirect to product details page |
| `09` | Bank details/verification is not uploaded | bank_details | Redirect to bank details page |
| `10` | Terms and condition is not accepted | final_submission | Redirect to final submission page |
| `00` | Onboarding complete | completed | Redirect to dashboard |

**Usage in Frontend:**
```javascript
// Call this API immediately after login
const response = await fetch('/api/brand/profile/status/', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

const data = await response.json();
const statusCode = data.data.status_code;

// Route user based on status code
switch(statusCode) {
  case '01':
    router.push('/onboarding/phone-verification');
    break;
  case '02':
    router.push('/onboarding/email-verification');
    break;
  case '03':
    router.push('/onboarding/gst-verification');
    break;
  case '04':
    router.push('/onboarding/brand-info');
    break;
  case '05':
    router.push('/onboarding/signature-upload');
    break;
  case '06':
    router.push('/onboarding/business-preference');
    break;
  case '07':
    router.push('/onboarding/warehouse-details');
    break;
  case '08':
    router.push('/onboarding/product-details');
    break;
  case '09':
    router.push('/onboarding/bank-details');
    break;
  case '10':
    router.push('/onboarding/final-submission');
    break;
  case '00':
    router.push('/dashboard');
    break;
}
```

**Response (500 Internal Server Error):**
```json
{
  "success": false,
  "message": "Error retrieving profile status: [error details]"
}
```

---

## Brand Onboarding API Endpoints

### GST Verification
**Endpoint:** `POST /api/brand/gst/verify/`

**Description:** Verifies the GST number for the brand. This endpoint requires authentication and both email and phone must be verified before accessing this API.

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Request Body:**
```json
{
  "gst_number": "29AADCB2230M1ZP",
  "company_name": "Example Company Ltd"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "GST verification successful",
  "verified": true
}
```

**Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Both email and phone must be verified before GST verification"
}
```

### Brand Basic Information
**Endpoint:** `POST /api/brand/basic-info/`

**Description:** Submits basic information for the brand. This endpoint requires authentication, verified email and phone, and completed GST verification.

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Request Body:**
```json
{
  "owner_name": "John Doe",
  "contact_number": "+919876543210",
  "email": "john@example.com",
  "company_name": "Example Company Ltd",
  "company_type": "Private Limited",
  "address": "123 Business Park, City, State, PIN Code"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Basic information submitted successfully"
}
```

**Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Both email and phone must be verified before submitting basic information"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Brand profile not found"
}
```

### Signature Upload and Verification
**Endpoint:** `POST /api/brand/signature/upload/`

**Description:** Uploads and verifies the signature for the brand. This endpoint requires authentication, verified email and phone, and completed basic information.

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Request Body (multipart/form-data):**
```
signature_file: [FILE]
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Signature uploaded and verified successfully",
  "signature_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Both email and phone must be verified before uploading signature"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Brand profile not found"
}
```

### Save Signature and TAN
**Endpoint:** `POST /api/brand/signature/save/`

**Description:** Saves the verified signature and optional TAN number for the brand. This endpoint requires authentication, verified email and phone, and completed signature verification.

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Request Body:**
```json
{
  "signature_id": "550e8400-e29b-41d4-a716-446655440000",
  "tan_number": "AAAA99999A" 
}
```
*Note: `tan_number` is optional*

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Signature and TAN saved successfully"
}
```

**Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Both email and phone must be verified before saving signature and TAN"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Brand profile not found"
}
```
### Business Preference
**Endpoint:** `POST /api/brand/business-preference/`

**Description:** Saves the business preferences for the brand. This endpoint requires authentication, verified email and phone, and completed signature verification.

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Request Body:**
```json
{
  "business_preference": "marketplace_only"
}
```
*Note: `business_preference` must be one of: `marketplace_only` (Sell via our Market Place) or `marketplace_and_api` (Sell via market place and API also)*

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Business preferences saved successfully"
}
```

**Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Both email and phone must be verified before saving business preferences"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Brand profile not found"
}
```
### Warehouse Details
**Endpoint:** `POST /api/brand/warehouse-details/`

**Description:** Saves the warehouse details for the brand including city locations, warehouse count per city, and daily order volume. This endpoint requires authentication, verified email and phone, and completed business preference selection.

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Request Body:**
```json
{
  "city_warehouses": [
    {
      "city_name": "Mumbai",
      "warehouse_count": 2
    },
    {
      "city_name": "Delhi",
      "warehouse_count": 1
    },
    {
      "city_name": "Bangalore",
      "warehouse_count": 3
    }
  ],
  "daily_order_volume": "100_to_500"
}
```
*Note: `daily_order_volume` must be one of: `less_than_100`, `100_to_500`, `500_to_1000`, `1000_to_5000`, or `more_than_5000`*

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Warehouse details saved successfully"
}
```

**Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Both email and phone must be verified before saving warehouse details"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Brand profile not found"
}
```
### Brand and Product Details
**Endpoint:** `POST /api/brand/product-details/`

**Description:** Saves the brand logo, product categories, target demographics, and product catalog. This endpoint requires authentication, verified email and phone, and completed warehouse details.

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Request Body (multipart/form-data):**
```
brand_logo: [IMAGE FILE]
product_categories: ["Apparel", "Footwear", "Accessories"]
gender: ["men", "women"]
target_age_groups: ["19_25", "26_35"]
price_range: ["mid_range", "premium"]
product_catalog: [CSV FILE] (optional)
```

**Gender Options:**
- `men`: Men
- `women`: Women
- `kids`: Kids
- `unisex`: Unisex

**Age Group Options:**
- `0_5`: 0-5 years
- `6_12`: 6-12 years
- `13_18`: 13-18 years
- `19_25`: 19-25 years
- `26_35`: 26-35 years
- `36_50`: 36-50 years
- `50_plus`: 50+ years
- `all`: All age groups

**Price Range Options:**
- `budget`: Budget (₹0-₹500)
- `mid_range`: Mid-range (₹500-₹2000)
- `premium`: Premium (₹2000-₹5000)
- `luxury`: Luxury (₹5000+)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Brand and product details saved successfully"
}
```

**Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Both email and phone must be verified before saving brand and product details"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Brand profile not found"
}
```
### Bank Details
**Endpoint:** `POST /api/brand/bank-details/`

**Description:** Saves the bank account details and cancelled cheque image. This endpoint requires authentication, verified email and phone, and completed product details.

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Request Body (multipart/form-data):**
```
account_holder_name: "John Doe"
account_number: "1234567890123456"
ifsc_code: "ABCD0123456"
cancelled_cheque: [IMAGE FILE]
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Bank details saved successfully. A micro-deposit has been initiated for verification.",
  "bank_reference_id": "BANK-REF-A1B2C3D4"
}
```

**Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Both email and phone must be verified before saving bank details"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Brand profile not found"
}
```

### Micro-Deposit Verification
**Endpoint:** `POST /api/brand/bank-verification/`

**Description:** Verifies the micro-deposit amount received in the bank account. This endpoint requires authentication, verified email and phone, and completed bank details submission.

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Request Body:**
```json
{
  "amount_received": 1.23,
  "bank_reference_id": "BANK-REF-A1B2C3D4"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Micro-deposit verified successfully. Your bank account has been verified."
}
```

**Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Both email and phone must be verified before verifying micro-deposit"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Brand profile not found"
}
```

**Response (422 Unprocessable Entity):**
```json
{
  "success": false,
  "message": "Incorrect micro-deposit amount"
}
```
### Brand Onboarding Summary
**Endpoint:** `GET /api/brand/onboarding-summary/`

**Description:** Retrieves the complete summary of all information provided during the onboarding process. This endpoint requires authentication and verified email and phone.

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "basic_info": {
      "owner_name": "John Doe",
      "contact_number": "+919876543210",
      "email": "john.doe@example.com",
      "company_name": "Example Enterprises",
      "company_type": "Private Limited",
      "address": "123 Main Street, Mumbai, Maharashtra, India"
    },
    "gst_info": {
      "gst_number": "27AAPFU0939F1ZV",
      "company_name": "Example Enterprises",
      "verification_status": "Verified"
    },
    "signature_info": {
      "signature_id": "550e8400-e29b-41d4-a716-446655440000",
      "tan_number": "AAAA99999A"
    },
    "business_preference": {
      "preference": "marketplace_and_api",
      "description": "Sell via market place and API also"
    },
    "warehouse_details": {
      "city_warehouses": [
        {"city_name": "Mumbai", "warehouse_count": 2},
        {"city_name": "Delhi", "warehouse_count": 1},
        {"city_name": "Bangalore", "warehouse_count": 3}
      ],
      "daily_order_volume": "100_to_500"
    },
    "product_details": {
      "brand_logo": "https://example.com/media/brand_logos/logo.png",
      "product_categories": ["Apparel", "Footwear", "Accessories"],
      "gender": ["men", "women"],
      "target_age_groups": ["19_25", "26_35"],
      "price_range": ["mid_range", "premium"],
      "product_catalog_uploaded": true
    },
    "bank_details": {
      "account_holder_name": "John Doe",
      "account_number": "1234567890123456",
      "ifsc_code": "ABCD0123456",
      "cancelled_cheque_uploaded": true,
      "bank_verification_status": "Verified"
    },
    "verification_status": {
      "email_verified": true,
      "phone_verified": true,
      "gst_verified": true,
      "bank_verified": true,
      "onboarding_complete": false
    }
  }
}
```

**Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Both email and phone must be verified to view onboarding summary"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Brand profile not found"
}
```

### Final Submission
**Endpoint:** `POST /api/brand/final-submission/`

**Description:** Completes the onboarding process by accepting terms and conditions. This endpoint requires authentication, verified email and phone, and completion of all previous onboarding steps.

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Request Body:**
```json
{
  "terms_accepted": true,
  "privacy_policy_accepted": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Onboarding completed successfully. Your account is now under review.",
  "onboarding_id": "ONBOARD-123-456"
}
```

**Response (400 Bad Request):**
```json
{
  "terms_accepted": ["This field is required."],
  "privacy_policy_accepted": ["This field is required."]
}
```

**Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Both email and phone must be verified to complete onboarding"
}
```

**Response (422 Unprocessable Entity):**
```json
{
  "success": false,
  "message": "Please complete all required onboarding steps",
  "incomplete_steps": ["GST Verification", "Bank Verification"]
}
```
### Brand Onboarding Summary
**Endpoint:** `GET /api/brand/onboarding-summary/`

**Description:** Retrieves the complete summary of all information provided during the onboarding process. This endpoint requires authentication and verified email and phone.

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "basic_info": {
      "owner_name": "John Doe",
      "contact_number": "+919876543210",
      "email": "john.doe@example.com",
      "company_name": "Example Enterprises",
      "company_type": "Private Limited",
      "address": "123 Main Street, Mumbai, Maharashtra, India"
    },
    "gst_info": {
      "gst_number": "27AAPFU0939F1ZV",
      "company_name": "Example Enterprises",
      "verification_status": "Verified"
    },
    "signature_info": {
      "signature_id": "550e8400-e29b-41d4-a716-446655440000",
      "tan_number": "AAAA99999A"
    },
    "business_preference": {
      "preference": "marketplace_and_api",
      "description": "Sell via market place and API also"
    },
    "warehouse_details": {
      "city_warehouses": [
        {"city_name": "Mumbai", "warehouse_count": 2},
        {"city_name": "Delhi", "warehouse_count": 1},
        {"city_name": "Bangalore", "warehouse_count": 3}
      ],
      "daily_order_volume": "100_to_500"
    },
    "product_details": {
      "brand_logo": "https://example.com/media/brand_logos/logo.png",
      "product_categories": ["Apparel", "Footwear", "Accessories"],
      "gender": ["men", "women"],
      "target_age_groups": ["19_25", "26_35"],
      "price_range": ["mid_range", "premium"],
      "product_catalog_uploaded": true
    },
    "bank_details": {
      "account_holder_name": "John Doe",
      "account_number": "1234567890123456",
      "ifsc_code": "ABCD0123456",
      "cancelled_cheque_uploaded": true,
      "bank_verification_status": "Verified"
    },
    "verification_status": {
      "email_verified": true,
      "phone_verified": true,
      "gst_verified": true,
      "bank_verified": true,
      "onboarding_complete": false
    }
  }
}
```

**Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Both email and phone must be verified to view onboarding summary"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Brand profile not found"
}
```

### Final Submission
**Endpoint:** `POST /api/brand/final-submission/`

**Description:** Completes the onboarding process by accepting terms and conditions. This endpoint requires authentication, verified email and phone, and completion of all previous onboarding steps.

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Request Body:**
```json
{
  "terms_accepted": true,
  "privacy_policy_accepted": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Onboarding completed successfully. Your account is now under review.",
  "onboarding_id": "ONBOARD-123-456",
  "verification_status": {
    "code": 1,
    "status": "Pending",
    "message": "Your brand profile is pending verification by our team."
  }
}
```

**Brand Verification Status Codes:**
- `0`: Disabled
- `1`: Pending (initial status after submission)
- `2`: Accepted (approved by admin team)
- `3`: Rejected (declined by admin team)

**Response (400 Bad Request):**
```json
{
  "terms_accepted": ["This field is required."],
  "privacy_policy_accepted": ["This field is required."]
}
```

**Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Both email and phone must be verified to complete onboarding"
}
```

**Response (422 Unprocessable Entity):**
```json
{
  "success": false,
  "message": "Please complete all required onboarding steps",
  "incomplete_steps": ["GST Verification", "Bank Verification"]
}
```
