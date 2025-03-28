import React, { PropsWithChildren } from 'react';
import HTML from '@/components/HTML';
import I18nProvider from '@/components/I18nProvider';

type Props = PropsWithChildren;

const RootLayout = ({children}: Props) => (
  <HTML>
    <I18nProvider />
    <body className="min-h-screen flex flex-col">{children}</body>
  </HTML>
);

export default RootLayout;
