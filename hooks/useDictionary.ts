'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { defaultNamespace } from '@/lib/i18next.config';
import { Language } from '@/types/localization';

const useDictionary = (locale: Language, namespace: string|string[] = defaultNamespace) => {
  const translation = useTranslation(namespace);

  useEffect(() => {
    if (translation.i18n.language !== locale) {
      void translation.i18n.changeLanguage(locale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return translation;
};

export default useDictionary;
