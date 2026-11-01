import React, { useEffect, useState } from 'react';
import './app-loader-wrapper.scss';

interface AppLoaderWrapperProps {
    children: React.ReactNode;
    duration?: number; // Duration in milliseconds, default 5000ms (5 seconds)
    enabled?: boolean; // Whether to show the boot splash, default true
}

const BOOT_SPLASH_ID = 'df-boot-splash';

/**
 * The branded cover lives in index.html (#df-boot-splash) so it is painted
 * before the bundle evaluates. This wrapper keeps the app hidden while it
 * initialises and then dismisses that splash.
 */
export const dismissBootSplash = (): void => {
    const splash = document.getElementById(BOOT_SPLASH_ID);
    if (splash) splash.setAttribute('data-done', '1');
};

const AppLoaderWrapper: React.FC<AppLoaderWrapperProps> = ({ children, duration = 5000, enabled = true }) => {
    const [isLoading, setIsLoading] = useState(enabled);

    useEffect(() => {
        if (!enabled) {
            dismissBootSplash();
            setIsLoading(false);
            return;
        }

        const timer = setTimeout(() => {
            dismissBootSplash();
            setIsLoading(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, enabled]);

    return <div className={isLoading ? 'app-content-background' : 'app-content-visible'}>{children}</div>;
};

export default AppLoaderWrapper;
