'use client'
import React, { memo } from 'react';
import Link from 'next/link';
import { User, ShoppingCart, MapPin, Smartphone, Laptop, Watch, Clock, Tablet } from 'lucide-react';
import Image from 'next/image';


const navigationItems = [
  { icon: Smartphone, label: 'Điện thoại', href: '/dien-thoai' },
  { icon: Laptop, label: 'Laptop', href: '/laptop' },
  { icon: Watch, label: 'Smartwatch', href: '/smartwatch' },
  { icon: Clock, label: 'Đồng hồ', href: '/dong-ho' },
  { icon: Tablet, label: 'Tablet', href: '/tablet' },
] as const;


const UserActions = memo(() => (
  <div className="flex items-center space-x-4 sm:space-x-6">
    <Link 
      href="/login" 
      aria-label="Đi đến trang đăng nhập" 
      className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors duration-200"
    >
      <User size={20} />
      <span className="hidden sm:block font-medium">Đăng nhập</span>
    </Link>

    <Link 
      href="/cart" 
      aria-label="Đi đến trang giỏ hàng" 
      className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors duration-200"
    >
      <ShoppingCart size={20} />
      <span className="hidden sm:block font-medium">Giỏ hàng</span>
    </Link>

    <div className="flex items-center space-x-2 text-gray-700">
      <MapPin size={20} />
      <span className="hidden lg:block font-medium">Hồ Chí Minh</span>
    </div>
  </div>
));

UserActions.displayName = 'UserActions';


const NavigationMenu = memo(() => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav className="flex justify-center gap-5" role="navigation" aria-label="Menu chính">
      {navigationItems.map((item, index) => (
        <Link
          key={item.href} 
          href={item.href}
          className="flex items-center space-x-2 text-gray-700 hover:text-black hover:bg-white/30 px-3 py-2 rounded-lg whitespace-nowrap group transition-all duration-200"
        >
          <item.icon size={18} className="flex-shrink-0" />
          <span className="font-medium text-sm">{item.label}</span>
        </Link>
      ))}
    </nav>
  </div>
));

NavigationMenu.displayName = 'NavigationMenu';


const Header = memo(() => {
  return (
    <header className="bg-[#FFD500] sticky top-0 z-50 shadow-sm">

      <div className="w-full">
        <Image 
          src="/header1.png" 
          alt="Banner khuyến mãi"
          width={1920} 
          height={0} 
          style={{height: 'auto'}}
          className="w-full h-auto object-cover"
          priority 
          sizes="100vw"
        />
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link 
            href="/" 
            aria-label="Đi đến trang chủ" 
            className="flex items-center space-x-2 min-w-0"
          >
            <Image 
              src="/logo.png"
              alt="Logo Shop Online" 
              className="w-auto h-10 object-contain" 
              width={120} 
              height={40} 
              priority 
              sizes="120px"
            />
          </Link> 

          {/* User Actions */}
          <UserActions />
        </div>
      </div>

      {/* Navigation Menu */}
      <NavigationMenu />
    </header>
  );
});

Header.displayName = 'Header';

export default Header;