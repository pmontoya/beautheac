'use client';

import { fallbackLanguage, languages } from '@/lib/i18next.config';

import type { Language } from '@/types/localization';
import { useParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function useLocale(): Language {
    const params = useParams();
    const pathname = usePathname();

    const localeFromParams = useMemo(() => {
        return params?.locale as Language | undefined;
    }, [params.locale]);

    const localeFromPathname = useMemo(() => {
        return pathname?.split?.("/")?.[1] as Language | undefined;
    }, [pathname]);

    return useMemo(() => {
        const decision = localeFromParams ?? localeFromPathname;
        if (!!decision && languages.includes(decision)) return decision;
        return fallbackLanguage;
    }, [localeFromParams, localeFromPathname]);
}