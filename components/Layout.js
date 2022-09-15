import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../utils/Store';
// import Logo from './../public/koreelogo/koree icon white bg.jpg'

export default function Layout({ title, children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
  },[cart.cartItems])
  return (
    <>
      <Head>
        <title>
          {title ? 'KOREE KULTURE | ' + title : 'KOREE CULTURE | FASHION BRAND'}
        </title>
        <meta name="description" content="ECommerce Website" />
        <link rel="icon" href="/koreelogo/koree logo icon black@2x.png" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between uppercase">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center px-4">
            <Link href="/">
              <a className="text-lg font-bold">KOREE KULTURE</a>
              {/* <Image src={Logo} alt="logo" width='100%' height='100%' /> */}
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          <p>&copy; 2022 KOREE KULTURE, ALL RIGHTS RESERVED</p>
        </footer>
      </div>
    </>
  );
}
