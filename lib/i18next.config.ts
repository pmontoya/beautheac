import { Language } from '@/types/localization';

export const fallbackLanguage = 'fr';
export const defaultNamespace = 'default';
export const languages: Language[] = [fallbackLanguage];

export const getI18nOptions = (
    lng = fallbackLanguage,
    ns: string | string[] = defaultNamespace,
) => ({
    supportedLngs: languages,
    fallbackLng: fallbackLanguage,
    lng,
    fallbackNS: defaultNamespace,
    defaultNS: defaultNamespace,
    ns,
});