import React from 'react';
import { getLoginId,getToken } from '@/external/bot-skeleton/services/api/appId';
import { getActiveTabUrl } from '@/utils/getActiveTabUrl';
import { render, screen, waitFor } from '@testing-library/react';
import Dtrader from '../dtrader';

jest.mock('@/external/bot-skeleton/services/api/appId', () => ({
    getToken: jest.fn(),
    getLoginId: jest.fn(),
}));

const mockedGetToken = getToken as jest.Mock;
const mockedGetLoginId = getLoginId as jest.Mock;

const getIframeSrc = () => screen.getByTitle('DTrader').getAttribute('src') as string;

describe('DTrader page', () => {
    beforeEach(() => {
        localStorage.clear();
        mockedGetToken.mockReturnValue({ token: undefined, account_id: undefined });
        mockedGetLoginId.mockReturnValue(null);
    });

    it('loads the guest DTrader with the domain app_id', async () => {
        render(<Dtrader />);

        await waitFor(() => expect(screen.getByTitle('DTrader')).toBeInTheDocument());

        const url = new URL(getIframeSrc());
        expect(url.origin + url.pathname).toBe('https://deriv-dtrader.vercel.app/dtrader');
        expect(url.searchParams.get('app_id')).toBe('71937');
        expect(url.searchParams.get('symbol')).toBe('1HZ100V');
        expect(url.searchParams.has('token1')).toBe(false);
    });

    it('passes the logged-in account token, login id and currency to DTrader', async () => {
        localStorage.setItem('active_loginid', 'CR12345');
        localStorage.setItem('clientAccounts', JSON.stringify({ CR12345: { currency: 'EUR' } }));
        mockedGetToken.mockReturnValue({ token: 'a1-abc', account_id: 'CR12345' });
        mockedGetLoginId.mockReturnValue('CR12345');

        render(<Dtrader />);

        await waitFor(() => expect(new URL(getIframeSrc()).searchParams.get('token1')).toBe('a1-abc'));

        const url = new URL(getIframeSrc());
        expect(url.searchParams.get('acct1')).toBe('CR12345');
        expect(url.searchParams.get('cur1')).toBe('EUR');
        expect(url.searchParams.get('app_id')).toBe('71937');
    });
});

describe('getActiveTabUrl', () => {
    it('maps the DTrader tab index to the #dtrader hash', () => {
        localStorage.setItem('active_tab', '6');
        expect(getActiveTabUrl().endsWith('#dtrader')).toBe(true);
    });

    it('maps the dashboard tab index to the #dashboard hash', () => {
        localStorage.setItem('active_tab', '0');
        expect(getActiveTabUrl().endsWith('#dashboard')).toBe(true);
    });
});
