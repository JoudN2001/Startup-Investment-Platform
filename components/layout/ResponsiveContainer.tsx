// React
import React from 'react';

interface ResponsiveContainerProps{
  children: React.ReactNode;
}

export default function ResponsiveContainer({children}: ResponsiveContainerProps) {
  return (
    <div className="flex flex-col pt-28 lg:pt-32 xl:pt-36 px-6 w-full max-w-7xl mx-auto">{children}</div>
  );
}
