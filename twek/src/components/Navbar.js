'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NAVIGATION_CONSTANTS, COLORS, ANIMATIONS } from '../utils/constants';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`${COLORS.BACKGROUNDS.NAV} ${ANIMATIONS.EFFECTS.BACKDROP_BLUR} border-b ${COLORS.BORDERS.PRIMARY} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className={`w-8 h-8 bg-gradient-to-r ${COLORS.GRADIENTS.PRIMARY} rounded-lg flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{NAVIGATION_CONSTANTS.BRAND_INITIAL}</span>
              </div>
              <span className={`ml-2 text-xl font-bold bg-gradient-to-r ${COLORS.GRADIENTS.TEXT} bg-clip-text text-transparent`}>
                {NAVIGATION_CONSTANTS.BRAND_NAME}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAVIGATION_CONSTANTS.NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${link.primary ? COLORS.TEXT.PRIMARY : COLORS.TEXT.SECONDARY} ${COLORS.TEXT.HOVER} px-3 py-2 rounded-md text-sm font-medium ${ANIMATIONS.TRANSITIONS.DEFAULT}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={NAVIGATION_CONSTANTS.AUTH_LINKS.LOGIN.href}
              className={`${COLORS.TEXT.SECONDARY} ${COLORS.TEXT.HOVER} px-4 py-2 rounded-md text-sm font-medium ${ANIMATIONS.TRANSITIONS.DEFAULT} border ${COLORS.BORDERS.BUTTON} hover:border-blue-500`}
            >
              {NAVIGATION_CONSTANTS.AUTH_LINKS.LOGIN.label}
            </Link>
            <Link
              href={NAVIGATION_CONSTANTS.AUTH_LINKS.REGISTER.href}
              className={`bg-gradient-to-r ${COLORS.GRADIENTS.PRIMARY} hover:${COLORS.GRADIENTS.PRIMARY_HOVER} text-white px-6 py-2 rounded-full text-sm font-medium ${ANIMATIONS.TRANSITIONS.BUTTON} ${ANIMATIONS.EFFECTS.SHADOW}`}
            >
              {NAVIGATION_CONSTANTS.AUTH_LINKS.REGISTER.label}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`${COLORS.TEXT.SECONDARY} hover:text-gray-900 dark:hover:text-gray-100 inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
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
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${COLORS.BACKGROUNDS.MOBILE_MENU} ${ANIMATIONS.EFFECTS.BACKDROP_BLUR} border-t ${COLORS.BORDERS.PRIMARY}`}>
          {NAVIGATION_CONSTANTS.NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${link.primary ? COLORS.TEXT.PRIMARY : COLORS.TEXT.SECONDARY} ${COLORS.TEXT.HOVER} block px-3 py-2 rounded-md text-base font-medium ${ANIMATIONS.TRANSITIONS.DEFAULT}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className={`pt-4 border-t ${COLORS.BORDERS.PRIMARY} mt-4 space-y-2`}>
            <Link
              href={NAVIGATION_CONSTANTS.AUTH_LINKS.LOGIN.href}
              className={`${COLORS.TEXT.SECONDARY} ${COLORS.TEXT.HOVER} block px-3 py-2 rounded-md text-base font-medium ${ANIMATIONS.TRANSITIONS.DEFAULT} border ${COLORS.BORDERS.BUTTON} hover:border-blue-500 text-center`}
              onClick={() => setIsMenuOpen(false)}
            >
              {NAVIGATION_CONSTANTS.AUTH_LINKS.LOGIN.label}
            </Link>
            <Link
              href={NAVIGATION_CONSTANTS.AUTH_LINKS.REGISTER.href}
              className={`bg-gradient-to-r ${COLORS.GRADIENTS.PRIMARY} hover:${COLORS.GRADIENTS.PRIMARY_HOVER} text-white block px-6 py-2 rounded-full text-base font-medium ${ANIMATIONS.TRANSITIONS.DEFAULT} text-center`}
              onClick={() => setIsMenuOpen(false)}
            >
              {NAVIGATION_CONSTANTS.AUTH_LINKS.REGISTER.label}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
