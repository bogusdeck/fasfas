import { Suspense } from "react";
import RegistrationForm from "../../components/RegistrationForm";

function RegistrationFormWithSuspense() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>}>
      <RegistrationForm />
    </Suspense>
  );
}

export default function SignupPage() {
  return <RegistrationFormWithSuspense />;
}
