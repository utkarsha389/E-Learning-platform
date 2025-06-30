import React from 'react';

interface ProgressBarProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function ProgressBar({ 
  progress, 
  size = 'md', 
  showLabel = true, 
  className = '' 
}: ProgressBarProps) {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className={`font-medium text-gray-700 ${textSizeClasses[size]}`}>
            Progress
          </span>
          <span className={`font-bold text-blue-600 ${textSizeClasses[size]}`}>
            {progress}%
          </span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]} overflow-hidden`}>
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}