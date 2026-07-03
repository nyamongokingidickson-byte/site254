type TTabsTitle = {
    [key: string]: string | number;
};

type TDashboardTabIndex = {
    [key: string]: number;
};

export const tabs_title: TTabsTitle = Object.freeze({
    WORKSPACE: 'Workspace',
    CHART: 'Chart',
});

export const DBOT_TABS: TDashboardTabIndex = Object.freeze({
    BOT_IDEAS: 0,
    BEST_BOTS: 1,
    DASHBOARD: 2,
    BOT_BUILDER: 3,
    AUTO_TRADES: 4,
    MANUAL_TRADING: 5,
    SCANNER: 6,
    ANALYSIS_TOOL: 7,
    DTRADER: 8,
    MATCHES: 9,
    CHART: 10,
    TRADING_BOTS: 11,
    STRATEGIES: 12,
    COPY_TRADING: 13,
    TRADINGVIEW: 14,
    SPEEDBOT: 15,
    CHATS: 16,
});

export const MAX_STRATEGIES = 10;

export const TAB_IDS = [
    'id-bot-ideas',
    'id-best-bots',
    'id-dbot-dashboard',
    'id-bot-builder',
    'id-auto-trades',
    'id-manual-trading',
    'id-scanner',
    'id-analysistool',
    'id-dtrader',
    'id-matches',
    'id-chart',
    'id-trading-bots',
    'id-strategies',
    'id-copy-trading',
    'id-tradingview',
    'id-speedbot',
    'id-chats',
];

export const DEBOUNCE_INTERVAL_TIME = 500;
