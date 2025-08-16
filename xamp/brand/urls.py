from django.urls import path
from .views import (
    RequestPhoneOTPAPIView,
    VerifyPhoneOTPAPIView,
    RequestEmailOTPAPIView,
    VerifyEmailOTPAPIView,
    BrandDashboardAPIView,
    BrandProfileUpdateAPIView,
)
from .auth_views import EmailPasswordSignupAPIView, EmailPasswordLoginAPIView
from .onboarding import (
    GSTVerificationAPIView,
    BrandBasicInfoAPIView,
    SignatureUploadAPIView,
    SaveSignatureAndTANAPIView,
    BusinessPreferenceAPIView,
    WarehouseDetailsAPIView,
    BrandProductDetailsAPIView,
    BankDetailsAPIView,
    MicroDepositVerificationAPIView,
    BrandOnboardingSummaryAPIView,
    FinalSubmissionAPIView,
    BrandProfileStatusAPIView,
)
from .dashboard import (
    BrandProfileAPIView,
    BrandAnnouncementsAPIView,
    BrandPendingTasksAPIView,
)

app_name = "brand"

urlpatterns = [
    # Phone OTP verification endpoints
    path(
        "otp/phone/request/", RequestPhoneOTPAPIView.as_view(), name="request_phone_otp"
    ),
    path("otp/phone/verify/", VerifyPhoneOTPAPIView.as_view(), name="verify_phone_otp"),
    # Email OTP verification endpoints
    path(
        "otp/email/request/", RequestEmailOTPAPIView.as_view(), name="request_email_otp"
    ),
    path("otp/email/verify/", VerifyEmailOTPAPIView.as_view(), name="verify_email_otp"),
    # Email/Password authentication
    path(
        "auth/signup/",
        EmailPasswordSignupAPIView.as_view(),
        name="email_password_signup",
    ),
    path(
        "auth/login/", EmailPasswordLoginAPIView.as_view(), name="email_password_login"
    ),
    # Profile Status API
    path(
        "profile/status/",
        BrandProfileStatusAPIView.as_view(),
        name="brand_profile_status",
    ),
    # GST verification
    path("gst/verify/", GSTVerificationAPIView.as_view(), name="gst_verification"),
    # Basic information
    path("basic-info/", BrandBasicInfoAPIView.as_view(), name="brand_basic_info"),
    # Signature and TAN
    path(
        "signature/upload/", SignatureUploadAPIView.as_view(), name="signature_upload"
    ),
    path(
        "signature/save/",
        SaveSignatureAndTANAPIView.as_view(),
        name="save_signature_tan",
    ),
    # Business Preference
    path(
        "business-preference/",
        BusinessPreferenceAPIView.as_view(),
        name="business_preference",
    ),
    # Warehouse Details
    path(
        "warehouse-details/",
        WarehouseDetailsAPIView.as_view(),
        name="warehouse_details",
    ),
    # Brand and Product Details
    path(
        "product-details/", BrandProductDetailsAPIView.as_view(), name="product_details"
    ),
    # Bank Details and Verification
    path("bank-details/", BankDetailsAPIView.as_view(), name="bank_details"),
    path(
        "bank-verification/",
        MicroDepositVerificationAPIView.as_view(),
        name="bank_verification",
    ),
    # Final Review and Submission
    path(
        "onboarding-summary/",
        BrandOnboardingSummaryAPIView.as_view(),
        name="onboarding_summary",
    ),
    path(
        "final-submission/", FinalSubmissionAPIView.as_view(), name="final_submission"
    ),
] + [
    # Dashboard APIs
    path("dashboard/profile/", BrandProfileAPIView.as_view(), name="dashboard_profile"),
    path(
        "dashboard/announcements/",
        BrandAnnouncementsAPIView.as_view(),
        name="brand_announcements",
    ),
    path(
        "dashboard/pending-tasks/",
        BrandPendingTasksAPIView.as_view(),
        name="brand_pending_tasks",
    ),
    # Brand dashboard and profile
    path("dashboard/", BrandDashboardAPIView.as_view(), name="brand_dashboard"),
    path(
        "profile/update/",
        BrandProfileUpdateAPIView.as_view(),
        name="brand_profile_update",
    ),
]

