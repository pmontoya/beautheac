export type Language = 'fr';

export type ParamsWithLanguage<T extends object = object> = {
    locale: Language;
} & T;
