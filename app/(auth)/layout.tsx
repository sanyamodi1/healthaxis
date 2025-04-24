import React from 'react';
import Image from 'next/image';
import LandingPageimg from "../../assests/Signup.jpg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      {/* Left side: 80% height box */}
      <div className="w-1/2 h-[80%] flex items-center justify-center">
        {children}
      </div>

      {/* Right side: full image with overlay */}
      <div className="w-1/2 h-full relative">
        <Image
          src={LandingPageimg}
          width={1000}
          height={1000}
          alt="landingImage"
          className="object-cover w-full h-full"
        />
        <div className="absolute top-0 w-full h-full z-10 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-black/40 z-[-1]"></div>

          <h1 className="text-6xl font-bold text-white 2xl:text-5xl">
            HealthAxis
          </h1>
          <p className="text-white text-base">You're Welcome</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
