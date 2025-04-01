'use client';

import { useState } from 'react';
import Link from 'next/link';
import SignInForm from './components/forms/signinform';
import { dm_sans } from './fonts';

export default function Home() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="p-4 md:p-8 my-10 md:my-20 md:border-r-2 md:border-navy">
        <h1 className={`text-3xl md:text-4xl mb-12 text-navy text-center ${dm_sans.className} font-medium relative`}>
          {showSignIn ? (
            <><strong>welcome back</strong>
              <img 
                src="/underline.svg" 
                alt="" 
                className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-48"
              />
            </>
          ) : (
            <>
              <strong>sign up</strong>
              <br />to get the most out of<br />
              <strong>The Xplorist</strong>
              <img 
                src="/underline.svg" 
                alt="" 
                className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-48"
              />
            </>
          )}
        </h1>
        <div className="flex flex-col gap-3">
          {!showSignIn ? (
            <>
              <Link
                href="/signup"
                className="bg-skyBlue text-navy border-2 border-navy px-6 py-3 font-semibold text-center rounded"
              >
                SIGN UP WITH EMAIL
              </Link>
              <Link
                href="/signup"
                className="bg-skyBlue text-navy border-2 border-navy px-6 py-3 font-semibold text-center rounded"
              >
                SIGN UP WITH GOOGLE
              </Link>
              <div className="relative flex items-center py-5">
                <div className="flex-grow border-t border-blue-500"></div>
                <span className="flex-shrink mx-4 text-gray-400">OR</span>
                <div className="flex-grow border-t border-blue-500"></div>
              </div>
              <p className="text-center">
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowSignIn(true);
                  }}
                  className="font-bold"
                >
                  Sign in here
                </a>
              </p>
            </>
          ) : (
            <>
              <SignInForm />
              <p className="text-navy text-center">
                Still need an account?{" "}
                <Link href="/signup" className="font-bold">
                  Sign up here
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
      <div className="p-4 md:p-8 my-10 md:my-20">
        <div className="relative h-full w-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/static/images/stockTravelPhoto.jpg')",
              filter: "brightness(0.7)"
            }}
          />
          <div className="relative z-10 flex items-center justify-center h-full">
            <h2 className={`text-4xl md:text-5xl font-bold text-mint text-center max-w-2xl leading-tight ${dm_sans.className}`}>
              discover<br />
              thousands of<br />
              global travel<br />
              recommendations<br />
              that will enrich your experience
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
