import React, { PropsWithChildren } from 'react';
import HTML from '@/components/HTML';
import I18nProvider from '@/components/I18nProvider';

type Props = PropsWithChildren;

const RootLayout = ({children}: Props) => (
  <HTML>
    <I18nProvider />
    <head>
      <link
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />
    </head>
    <body className="min-h-screen flex flex-col">{children}</body>
  </HTML>
);

export default RootLayout;
