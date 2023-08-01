import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';
import Image from 'next/image';
// import Logo from './../public/koreelogo/koree icon white bg.jpg'

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };
  return (
    <>
      <Head>
        <title>
          {title ? 'KOREE KULTURE | ' + title : 'KOREE CULTURE | FASHION BRAND'}
        </title>
        <meta name="description" content="ECommerce Website" />
        <link rel="icon" href="/koreelogo/koree logo icon black@2x.png" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-20 justify-between fixed top-0 shadow-md items-center px-2 md:px-4 w-full z-50 bg-black text-white">
            <Link href="/">
              {/* <a className="text-lg font-bold">KOREE KULTURE</a> */}
              <Image
                src="/images/koree icon bg.jpg"
                width={80}
                height={80}
                alt="profile"
              />
            </Link>
            <div className="space-x-3 md:space-x-4 text-xs md:text-base">
              <Link href="/cart">
                <a className="mover">
                  {cartItemsCount > 0 ? (
                    
                    <span>
                      <span className='hidden md:inline'>Cart</span>
                      <span className="mx-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold">
                        {cartItemsCount}
                      </span>
                      <ShoppingBagIcon className="w-5 h-5 inline"></ShoppingBagIcon>
                    </span>
                  ) : (
                    <span>
                      <span className='hidden md:inline'>Cart</span>
                      <span className="mx-1 rounded-full bg-black px-2 py-1 text-xs font-bold">
                        {cartItemsCount}
                      </span>
                      <ShoppingBagIcon className="w-5 h-5 inline"></ShoppingBagIcon>
                    </span>
                  )}
                </a>
              </Link>
              <Link href="/">
                <a className="mover">Products</a>
              </Link>
              <Menu as="div" className="relative inline-block">
                <Menu.Button className="mover">
                  About
                  <ChevronDownIcon className="h-5 w-5 inline ml-1" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg bg-white text-black z-50">
                  <Menu.Item>
                    <DropdownLink className="dropdown-link" href="/">
                      About Us
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink className="dropdown-link" href="/">
                      Size Chart
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink className="dropdown-link" href="/faq">
                      FAQ
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink className="dropdown-link" href="/contact">
                      Contact Us
                    </DropdownLink>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-400 mover">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg bg-white text-black z-50">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="mover">Login</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-24">{children}</main>
        <footer className="flex justify-center items-center text-center h-10 shadow-inner text-xs md:text-base">
          <p>&copy; 2022 KOREE KULTURE, ALL RIGHTS RESERVED</p>
        </footer>
      </div>
    </>
  );
}
