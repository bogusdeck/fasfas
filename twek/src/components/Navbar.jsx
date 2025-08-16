'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NAV_ITEMS, BRAND_CONFIG, BUTTONS, NAVBAR_STYLES } from '../utils/constants.js';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, userData } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <nav className={NAVBAR_STYLES.nav}>
      <div className={NAVBAR_STYLES.container}>
        <div className={NAVBAR_STYLES.flexContainer}>
          {/* Logo */}
          <div className={NAVBAR_STYLES.logoContainer}>
            <Link href="/" className="flex items-center">
              {/* Logo Image */}
              <img 
                src="/FAS_logo.png" 
                alt={BRAND_CONFIG.logo.alt}
                className="h-20 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className={NAVBAR_STYLES.desktopMenu}>
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={NAVBAR_STYLES.navLink}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Auth Buttons */}
            <div className={NAVBAR_STYLES.buttonContainer}>
              {isAuthenticated ? (
                /* Authenticated user - show dashboard, user info, and logout */
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/dashboard" 
                    className={NAVBAR_STYLES.navLink}
                  >
                    Dashboard
                  </Link>
                  {userData && (
                    <span className="text-[#241331] font-bold font-itc-gothic">
                      Welcome, {userData.first_name || userData.email}
                    </span>
                  )}
                  <button
                    onClick={handleLogout}
                    className={NAVBAR_STYLES.primaryButton}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                /* Not authenticated - show login and signup */
                <>
                  <Link 
                    href={BUTTONS.login.href} 
                    className={NAVBAR_STYLES.secondaryButton}
                  >
                    {BUTTONS.login.label}
                  </Link>
                  <Link 
                    href={BUTTONS.signup.href} 
                    className={NAVBAR_STYLES.primaryButton}
                  >
                    {BUTTONS.signup.label}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className={NAVBAR_STYLES.mobileMenuButton}>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#241331] hover:text-[#C3AF6C] hover:bg-[#241331]/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#C3AF6C] transition-all duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className={NAVBAR_STYLES.mobileMenu}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={NAVBAR_STYLES.mobileNavLink}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Auth Buttons */}
            {isAuthenticated ? (
              /* Authenticated user - show dashboard, user info and logout */
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/dashboard"
                  className={NAVBAR_STYLES.mobileNavLink}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                {userData && (
                  <div className="px-3 py-2 text-[#241331] font-bold font-itc-gothic">
                    Welcome, {userData.first_name || userData.email}
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className={NAVBAR_STYLES.mobilePrimaryButton}
                >
                  Logout
                </button>
              </div>
            ) : (
              /* Not authenticated - show login and signup */
              <>
                <Link
                  href={BUTTONS.login.href}
                  className={NAVBAR_STYLES.mobileSecondaryButton}
                  onClick={() => setIsOpen(false)}
                >
                  {BUTTONS.login.label}
                </Link>
                <Link
                  href={BUTTONS.signup.href}
                  className={NAVBAR_STYLES.mobilePrimaryButton}
                  onClick={() => setIsOpen(false)}
                >
                  {BUTTONS.signup.label}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
