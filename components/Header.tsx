'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';
import { locales } from '@/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const t = useTranslations('Header');
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: '/estrategias-expansion', label: 'expansionStrategies' },
    { href: '/growth-intelligence', label: 'growthIntelligence' },
    { href: '/blog', label: 'blog' },
  ];

  const changeLanguage = (lang: string) => {
    router.push(pathname, { locale: lang });
  };

  return (
    <>
      <div className="bg-blue-950 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm md:text-base">AliEst Conoce un Grupo de éxito probado que Crea Alianzas Estrategias</p>
          <Button size="sm" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-gray-900 transition-colors">
            Construye Alianzas
          </Button>
        </div>
      </div>
      <header className={`bg-white shadow-md transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 z-50' : ''}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GrowthBDM_blue-wXHawxugy3GdFhlMNBRN9ZTQdwkDBa.png"
              alt="Growth BDM Logo"
              width={150}
              height={50}
              priority
            />
          </Link>
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <select 
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-white border-2 border-blue-600 text-blue-600 rounded-md px-2 py-1"
              value={pathname.split('/')[1]}
            >
              {locales.map((locale) => (
                <option key={locale} value={locale}>
                  {locale.toUpperCase()}
                </option>
              ))}
            </select>
            <Button onClick={toggleMenu} className="md:hidden">
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                {t(item.label)}
              </Link>
            ))}
          </div>
        )}
      </header>
      {isSticky && <div className="h-[72px]" />}
    </>
  );
};

export default Header;