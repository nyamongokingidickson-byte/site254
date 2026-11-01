import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import IframeWrapper from '@/components/iframe-wrapper';
import { getDomainConfig } from '@/components/shared/utils/config/config';
import { getToken, getLoginId } from '@/external/bot-skeleton/services/api/appId';
import './dtrader.scss';

const DTRADER_BASE_URL = 'https://deriv-dtrader.vercel.app/dtrader';

/** Guest (signed-out) DTrader URL — still needs the domain app_id to load. */
const buildGuestIframeUrl = () => {
    const appId = getDomainConfig().appId || '114292';
    const params = new URLSearchParams({
        app_id: appId.toString(),
        chart_type: 'area',
        interval: '1t',
        symbol: '1HZ100V',
        trade_type: 'over_under',
    });
    return `${DTRADER_BASE_URL}?${params.toString()}`;
};

const Dtrader = observer(() => {
    const [iframeSrc, setIframeSrc] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);

    const buildIframeUrl = useCallback((token: string, loginId: string) => {
        const clientAccountsStr = localStorage.getItem('clientAccounts') || '{}';
        let currency = 'USD';

        try {
            const clientAccounts = JSON.parse(clientAccountsStr);
            const account = clientAccounts[loginId];
            if (account?.currency) {
                currency = account.currency;
            }
        } catch (error) {
            console.error('Error parsing clientAccounts:', error);
        }

        const appId = getDomainConfig().appId || '114292';
        const params = new URLSearchParams({
            acct1: loginId,
            token1: token,
            cur1: currency,
            lang: 'EN',
            app_id: appId.toString(),
            chart_type: 'area',
            interval: '1t',
            symbol: '1HZ100V',
            trade_type: 'over_under',
            hide_bot: '1',
            bot_disabled: 'true',
            disable_bot: '1',
            no_bot: '1',
            manual_only: '1',
            hide_bot_controls: 'true',
        });

        try {
            const nextSrc = `${DTRADER_BASE_URL}?${params.toString()}`;
            // Only swap the src when the URL really changed, so the 2s auth poll
            // below cannot reload a running DTrader iframe.
            setIframeSrc(prevSrc => (prevSrc === nextSrc ? prevSrc : nextSrc));
        } catch (error) {
            console.error('Error building iframe URL:', error);
            setHasError(true);
        }
    }, []);

    useEffect(() => {
        let { token } = getToken();
        let activeLoginId = getLoginId();

        const authToken = localStorage.getItem('authToken');
        const storedLoginId = localStorage.getItem('active_loginid');

        if ((!token || !activeLoginId) && authToken) {
            token = authToken;
        }
        if (!activeLoginId && storedLoginId) {
            activeLoginId = storedLoginId;
        }

        try {
            if (token && activeLoginId) {
                setIsAuthenticated(true);
                buildIframeUrl(token, activeLoginId);
            } else {
                setIsAuthenticated(false);
                setIframeSrc(buildGuestIframeUrl());
                setHasError(false);
            }
        } catch (error) {
            console.error('Error during dtrader initialization:', error);
            setHasError(true);
        }
    }, [buildIframeUrl]);

    useEffect(() => {
        const checkAuthAndUpdate = () => {
            try {
                let { token } = getToken();
                let activeLoginId = getLoginId();
                const authToken = localStorage.getItem('authToken');
                const storedLoginId = localStorage.getItem('active_loginid');

                if ((!token || !activeLoginId) && authToken) {
                    token = authToken;
                }
                if (!activeLoginId && storedLoginId) {
                    activeLoginId = storedLoginId;
                }

                if (token && activeLoginId) {
                    if (!isAuthenticated) {
                        setIsAuthenticated(true);
                    }
                    buildIframeUrl(token, activeLoginId);
                } else if (isAuthenticated) {
                    setIsAuthenticated(false);
                    setIframeSrc(buildGuestIframeUrl());
                    setHasError(false);
                }
            } catch (error) {
                console.error('Error checking auth and updating dtrader:', error);
                setHasError(true);
            }
        };

        const handleStorageChange = (e: StorageEvent) => {
            if (
                e.key === 'authToken' ||
                e.key === 'active_loginid' ||
                e.key === 'clientAccounts' ||
                e.key === 'accountsList' ||
                e.key === 'show_as_cr'
            ) {
                checkAuthAndUpdate();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        const interval = setInterval(checkAuthAndUpdate, 2000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [isAuthenticated, buildIframeUrl]);

    const handleIframeLoad = useCallback(() => {
        setHasError(false);
    }, []);

    const handleIframeError = useCallback(() => {
        setHasError(true);
        console.error('DTrader iframe failed to load. The external site may be blocking iframe embedding.');
    }, []);

    if (hasError) {
        return (
            <div className='dtrader-error'>
                <div className='dtrader-error__content'>
                    <h2>DTrader Loading Error</h2>
                    <p>Unable to load DTrader at this time. The external service may be temporarily unavailable.</p>
                    <p className='dtrader-error__details'>
                        If this issue persists, please check your internet connection or try again later.
                    </p>
                    <button
                        className='dtrader-error__retry'
                        onClick={() => {
                            setHasError(false);
                        }}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!iframeSrc) {
        return (
            <div className='dtrader-placeholder'>
                <p>Loading DTrader...</p>
            </div>
        );
    }

    return (
        <IframeWrapper
            src={iframeSrc}
            title='DTrader'
            className='dtrader-container'
            onLoad={handleIframeLoad}
            onError={handleIframeError}
        />
    );
});

export default Dtrader;
