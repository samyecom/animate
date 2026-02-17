import React, { Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';

// Lazy load components
const Desktop = React.lazy(() => import('./Desktop'));
const Mobile = React.lazy(() => import('./Mobile'));

const FlavorSection = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <Suspense fallback={<div className="min-h-screen bg-purple-bg" />}>
            {isMobile ? <Mobile /> : <Desktop />}
        </Suspense>
    );
};

export default FlavorSection;
