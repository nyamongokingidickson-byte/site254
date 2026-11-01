type TBrandLogoProps = {
    width?: number;
    height?: number;
    fill?: string;
    className?: string;
};

export const BrandLogo = ({ className = '' }: TBrandLogoProps) => {
    return (
        <div
            className={`flex items-center gap-2 ${className}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
        >
            <svg
                width='32'
                height='32'
                viewBox='0 0 100 100'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                aria-label='Dylantrades'
                role='img'
            >
                <rect width='100' height='100' rx='20' fill='#0f172a' />
                <text
                    x='50'
                    y='58'
                    textAnchor='middle'
                    fill='#ffffff'
                    fontFamily="'IBM Plex Sans', system-ui, sans-serif"
                    fontSize='34'
                    fontWeight='700'
                >
                    DT
                </text>
            </svg>
            <span
                style={{
                    fontWeight: '800',
                    fontSize: '1.4rem',
                    letterSpacing: '0.04em',
                    color: 'var(--text-prominent)',
                    fontFamily: "'Outfit', 'Sora', system-ui, -apple-system, sans-serif",
                }}
            >
                Dylantrades
            </span>
        </div>
    );
};
