# Frontend Bug Fixes

## Authentication Flow Issues

### 1. Mobile OTP Verification
**Bug:** OTP input field is pre-populated after mobile verification
**Fix:** Clear the OTP field after verification

### 2. Authentication Flow Sequence
**Bug:** System directly asks for password after mobile and email verification without Google OAuth option
**Fix:** Show proper login screen with two options:
  - Sign up with email (create password)
  - Login with Google OAuth

## API Integration Issues

### 3. GST Verification
**Bug:** No API call after GST value entry
**Fix:** Implement GST verification API call

### 4. Form Submission
**Bug:** No API call after basic information submission
**Fix:** Implement API call to save basic information

## Form Field Issues

### 5. Duplicate Email Entry
**Bug:** User is asked to enter email again in basic information section
**Fix:** Make email field non-editable but visible, displaying the already verified email

### 6. Company Address Structure
**Bug:** Company address is a single text box and doesn't match requirements, api should called
**Fix:** Replace with separate fields for:
  - Owner name (string, min length: 1)
  - Contact number (string, min length: 1)
  - Email (string, email format, min length: 1)
  - Company name (string, min length: 1)
  - Company type (string, min length: 1)
  - Address (string, min length: 1)
  - Additional fields: pincode, state, city, etc.

### 7. Business-preference
**Bug:** business-preference is not containing the required fields, api should called
**Fix:** Add required fields to business-preference section
        - business_preference* string
        - title: Business preference
        - enum: [marketplace_only, marketplace_and_api]

### 8. Warehouse Details
**Bug:** city_warehouses is not containing the required fields, api should called
**Fix:** Add required fields to city_warehouses section
  - city_warehouses* [CityWarehouse{
    - city_name* string
    - title: City name
    - minLength: 1
    - warehouse_count* integer
    - title: Warehouse count
    - minimum: 1
  }]
  - daily_order_volume* string
  - title: Daily order volume
  - enum: [ less_than_100, 100_to_500, 500_to_1000, 1000_to_5000, more_than_5000 ]

### 9.  Brand & Product Details
**Bug:** Not containing the required details along with csv upload option, api should called
**Fix:** brand logo (image), product categories, gender, target_age_group,
        price_range, product_catalog(file)

### 10. Product Details
**Bug:**  no product details page
**Fix:** Add product details page

### 11. Bank Details and Authentication
**Bug:** Bank details and authentication api should be called
        (verification response from micro transaction) && bank details input api
**Fix:** Add both apis with error or success animations (pop or toaster) (confetti)

### 12. Final summary api call
**Bug:** Final summary api should be called
**Fix:** after checking by the user and submission is done using the final submission
        Add final submission api with error or success animations (pop or toaster) (confetti)
