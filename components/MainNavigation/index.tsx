'use client';

import { usePathname } from 'next/navigation';
import { Leaf, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Link from '@/components/Link';
import { cn } from '@/lib/utils';
import { Language } from '@/types/localization';
import useDictionary from '@/hooks/useDictionary';

const navigation = [
  { name: 'about', href: '/#about' },
  { name: 'services', href: '/#amenities' },
  { name: 'localization', href: '/#location' },
  { name: 'bab', href: '/gites' },
  { name: 'contact', href: '/#contact' },
];

type Props = {
  title: string;
  language: Language;
};

const MainNavigation = ({ title, language }: Props) => {
  const pathname = usePathname();
  const { t } = useDictionary(language);

  return (
    <header
      className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <Link href="/" locale={language} className="text-xl font-semibold tracking-tight">
            {title}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              locale={language}
              key={item.name}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                  ? 'text-primary'
                  : 'text-foreground',
              )}
            >
              {t(`header.navigation.${item.name}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden">
            FR
          </Button>
          <Button className="hidden md:flex">{t('header.buttons.book_now_label')}</Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
                <SheetTitle className="sr-only">{t('header.buttons.menu')}</SheetTitle>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4 py-4">
                {navigation.map((item) => (
                  <Link
                    locale={language}
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary',
                      pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                        ? 'text-primary'
                        : 'text-foreground',
                    )}
                  >
                    {t(`header.navigation.${item.name}`)}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 pt-4">
                  <Button variant="outline" size="sm" className="hidden">
                    FR
                  </Button>
                  <Button>{t('header.buttons.book_now_label')}</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
