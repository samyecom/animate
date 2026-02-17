import React, { Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';

// Lazy load components
const Desktop = React.lazy(() => import('./Desktop'));
const Mobile = React.lazy(() => import('./Mobile'));

const HeroSection = () => {
    // HeroSection treats "Tablet" as Mobile (using image instead of video)
    // So we use 1024px as the breakpoint here
    const isMobileOrTablet = useMediaQuery({ query: '(max-width: 1024px)' });

    return (
        <Suspense fallback={<div className="h-screen bg-black" />}>
            {isMobileOrTablet ? <Mobile /> : <Desktop />}
        </Suspense>
    );
};

export default HeroSection;
