import Image from "next/image";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 relative overflow-hidden">
        {/* Brand accent elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#241331]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C3AF6C]/10 rounded-full blur-2xl"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-[#241331] mb-6 font-itc-gothic">
            Ready to Launch Your Brand?
          </h2>
          <p className="text-xl text-[#241331]/70 mb-8 max-w-2xl mx-auto font-itc-gothic font-medium">
            Join thousands of successful brands already selling on our platform. Start your journey today with our simple onboarding process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="bg-[#241331] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1a0e24] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-itc-gothic"
            >
              Get Started Now
            </a>
            <a
              href="/login"
              className="border-2 border-[#241331] text-[#241331] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#241331] hover:text-white transition-all duration-300 font-itc-gothic"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#241331] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-black mb-4 text-[#C3AF6C] font-itc-gothic">FASFAS</h3>
            <p className="text-white/60 mb-6 font-itc-gothic">Your Brand, Our Platform</p>
            <div className="flex justify-center space-x-6 text-white/60">
              <a href="/privacy" className="hover:text-[#C3AF6C] transition-colors font-itc-gothic font-medium">Privacy</a>
              <a href="/terms" className="hover:text-[#C3AF6C] transition-colors font-itc-gothic font-medium">Terms</a>
              <a href="/support" className="hover:text-[#C3AF6C] transition-colors font-itc-gothic font-medium">Support</a>
              <a href="/contact" className="hover:text-[#C3AF6C] transition-colors font-itc-gothic font-medium">Contact</a>
            </div>
            <p className="text-white/40 text-sm mt-6 font-itc-gothic">
              © 2025 FASFAS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
