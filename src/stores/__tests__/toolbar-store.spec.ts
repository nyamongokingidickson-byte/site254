jest.mock('@/external/bot-skeleton', () => ({
    config: () => ({ default_file_name: 'default_strategy' }),
    load: jest.fn(),
    runGroupedEvents: (_: boolean, callback: () => void) => callback(),
}));

import ToolbarStore from '../toolbar-store';

describe('ToolbarStore bulk trading settings', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('persists the bulk trading toggle and trade count', () => {
        const store = new ToolbarStore({} as any);

        expect(store.bulk_trading_enabled).toBe(false);
        expect(store.bulk_trading_count).toBe(1);

        store.setBulkTradingEnabled(true);
        store.setBulkTradingCount(5);

        expect(store.bulk_trading_enabled).toBe(true);
        expect(store.bulk_trading_count).toBe(5);

        const settings = JSON.parse(localStorage.getItem('dbot_settings') || '{}');
        expect(settings.bulk_trading_enabled).toBe(true);
        expect(settings.bulk_trading_count).toBe(5);
    });
});
