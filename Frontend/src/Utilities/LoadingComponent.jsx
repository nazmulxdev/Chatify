import React from "react";

const LoadingComponent = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div>
      {/* Colored blur shapes */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-cyan-500 opacity-20 blur-[100px]" />

      {/* Loading content */}
      <div className="relative flex flex-col items-center space-y-4 z-10">
        {/* Gradient spinner */}
        <span className="loading loading-spinner loading-lg text-primary"></span>

        {/* Text with gradient shimmer */}
        <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse text-center">
          Loading, please wait...
        </h2>

        {/* Subtle note */}
        <p className="text-sm text-gray-400 text-center px-4 md:px-0">
          Optimized for all devices ✨
        </p>
      </div>
    </div>
  );
};

export default LoadingComponent;
