// Updated to show brand logo instead of "Menu" text
import { ComponentProps } from 'react';
import { BrandLogo } from '@/components/layout/app-logo/BrandLogo';
import { LabelPairedGlobeSmRegularIcon } from '@deriv/quill-icons';
import { LegacyTheme1pxIcon } from '@deriv/quill-icons/Legacy';
import useThemeSwitcher from '@/hooks/useThemeSwitcher';
import { useTranslations } from '@deriv-com/translations';
import { Text, useDevice } from '@deriv-com/ui';

type TMenuHeader = {
    enableThemeToggle: boolean;
    hideLanguageSetting: boolean;
    // Using ComponentProps<'button'>['onClick'] for better type safety and consistency
    // with button onClick event handlers
    openLanguageSetting: ComponentProps<'button'>['onClick'];
};

const MenuHeader = ({ enableThemeToggle, hideLanguageSetting, openLanguageSetting }: TMenuHeader) => {
    const { currentLang, localize } = useTranslations();
    const { isDesktop } = useDevice();
    const { is_dark_mode_on, toggleTheme } = useThemeSwitcher();

    return (
        <div className='mobile-menu__header'>
            {/* [AI] Show brand logo instead of "Menu" text */}
            <BrandLogo width={100} height={28} fill='var(--text-general)' />
            {/* [/AI] */}

            <div className='mobile-menu__header__actions'>
                {enableThemeToggle && (
                    <button
                        className='mobile-menu__header__theme-button'
                        type='button'
                        onClick={toggleTheme}
                        aria-label={localize(is_dark_mode_on ? 'Switch to light theme' : 'Switch to dark theme')}
                    >
                        <LegacyTheme1pxIcon />
                        <Text size={isDesktop ? 'xs' : 'sm'} weight='bold'>
                            {localize(is_dark_mode_on ? 'Light theme' : 'Dark theme')}
                        </Text>
                    </button>
                )}
                {!hideLanguageSetting && (
                    <button
                        className='mobile-menu__header__language items-center'
                        onClick={openLanguageSetting}
                        aria-label={`${localize('Change language')} - ${localize('Current language')}: ${currentLang}`}
                        aria-expanded='false'
                        aria-haspopup='menu'
                    >
                        <LabelPairedGlobeSmRegularIcon />
                        <Text className='ml-[0.4rem]' size={isDesktop ? 'xs' : 'sm'} weight='bold'>
                            {currentLang}
                        </Text>
                    </button>
                )}
            </div>
        </div>
    );
};

export default MenuHeader;
