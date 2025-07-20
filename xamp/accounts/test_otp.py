"""
Test script for OTP verification functionality

This script demonstrates how to use the OTP verification API endpoints.
"""

import requests
import json
import time

# Base URL for API endpoints
BASE_URL = "http://localhost:8000/api"  # Adjust as needed

def register_user(email, password, first_name, last_name, phone_number=None):
    """Register a new user"""
    url = f"{BASE_URL}/accounts/register/"
    data = {
        "email": email,
        "password": password,
        "password_confirm": password,
        "first_name": first_name,
        "last_name": last_name
    }
    
    if phone_number:
        data["phone_number"] = phone_number
        
    response = requests.post(url, json=data)
    return response.json()

def login_user(email, password):
    """Login a user"""
    url = f"{BASE_URL}/accounts/login/"
    data = {
        "email": email,
        "password": password
    }
    
    response = requests.post(url, json=data)
    return response.json()

def request_otp(token, otp_type):
    """Request an OTP verification code"""
    url = f"{BASE_URL}/accounts/otp/request/"
    headers = {"Authorization": f"Token {token}"}
    data = {"otp_type": otp_type}
    
    response = requests.post(url, json=data, headers=headers)
    return response.json()

def verify_otp(token, otp_type, otp_code):
    """Verify an OTP code"""
    url = f"{BASE_URL}/accounts/otp/verify/"
    headers = {"Authorization": f"Token {token}"}
    data = {
        "otp_type": otp_type,
        "otp_code": otp_code
    }
    
    response = requests.post(url, json=data, headers=headers)
    return response.json()

def update_phone_number(token, phone_number):
    """Update user's phone number"""
    url = f"{BASE_URL}/accounts/update-phone/"
    headers = {"Authorization": f"Token {token}"}
    data = {"phone_number": phone_number}
    
    response = requests.post(url, json=data, headers=headers)
    return response.json()

def get_user_profile(token):
    """Get user profile information"""
    url = f"{BASE_URL}/accounts/profile/"
    headers = {"Authorization": f"Token {token}"}
    
    response = requests.get(url, headers=headers)
    return response.json()

def test_otp_flow():
    """Test the complete OTP verification flow"""
    # 1. Register a new user
    print("1. Registering a new user...")
    email = "testuser@example.com"
    password = "SecurePassword123!"
    registration_response = register_user(
        email=email,
        password=password,
        first_name="Test",
        last_name="User",
        phone_number="+1234567890"
    )
    print(f"Registration response: {json.dumps(registration_response, indent=2)}")
    
    # Get token from registration response
    token = registration_response.get("token")
    if not token:
        print("Failed to get token from registration response")
        return
    
    # 2. Check if verification info is in registration response
    verification_info = registration_response.get("verification", [])
    print(f"Verification info from registration: {json.dumps(verification_info, indent=2)}")
    
    # 3. Get user profile to check verification status
    print("\n2. Getting user profile...")
    profile = get_user_profile(token)
    print(f"User profile: {json.dumps(profile, indent=2)}")
    
    # 4. Request email OTP verification
    print("\n3. Requesting email OTP verification...")
    email_otp_request = request_otp(token, "email")
    print(f"Email OTP request response: {json.dumps(email_otp_request, indent=2)}")
    
    # In a real scenario, the user would receive the OTP via email
    # For testing, we'd need to extract the OTP from the logs or database
    print("\nIn a real scenario, check your email for the OTP code.")
    otp_code = input("Enter the OTP code from the logs or database: ")
    
    # 5. Verify email OTP
    print("\n4. Verifying email OTP...")
    email_otp_verify = verify_otp(token, "email", otp_code)
    print(f"Email OTP verification response: {json.dumps(email_otp_verify, indent=2)}")
    
    # 6. Get updated user profile
    print("\n5. Getting updated user profile...")
    updated_profile = get_user_profile(token)
    print(f"Updated user profile: {json.dumps(updated_profile, indent=2)}")
    
    # 7. Request phone OTP verification
    print("\n6. Requesting phone OTP verification...")
    phone_otp_request = request_otp(token, "phone")
    print(f"Phone OTP request response: {json.dumps(phone_otp_request, indent=2)}")
    
    # In a real scenario, the user would receive the OTP via SMS
    # For testing, we'd need to extract the OTP from the logs or database
    print("\nIn a real scenario, check your phone for the OTP code.")
    otp_code = input("Enter the OTP code from the logs or database: ")
    
    # 8. Verify phone OTP
    print("\n7. Verifying phone OTP...")
    phone_otp_verify = verify_otp(token, "phone", otp_code)
    print(f"Phone OTP verification response: {json.dumps(phone_otp_verify, indent=2)}")
    
    # 9. Get final user profile
    print("\n8. Getting final user profile...")
    final_profile = get_user_profile(token)
    print(f"Final user profile: {json.dumps(final_profile, indent=2)}")
    
    # 10. Update phone number
    print("\n9. Updating phone number...")
    update_phone = update_phone_number(token, "+9876543210")
    print(f"Update phone number response: {json.dumps(update_phone, indent=2)}")
    
    # 11. Get profile after phone update
    print("\n10. Getting profile after phone update...")
    after_update_profile = get_user_profile(token)
    print(f"Profile after phone update: {json.dumps(after_update_profile, indent=2)}")
    
    print("\nTest completed!")

if __name__ == "__main__":
    test_otp_flow()
