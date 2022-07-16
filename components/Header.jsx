/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { getCategories } from '../services';

const Header = () => {
  const { data: session } = useSession();
  // eslint-disable-next-line no-unused-vars
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => {
    setIsNavOpen(!isNavOpen);
  };

  const signInUser = () => {
    signIn();
    setIsNavOpen(false);
  };

  const signOutUser = () => {
    signOut();
    setIsNavOpen(false);
  };

  return (
    <header className="relative h-10 z-20 text-white">
      <div className="container mx-auto flex justify-between gap-2 md:justify-between align-middle py-2 px-8">
        <img
          src="/images/logo.jpg"
          width={35}
          height={35}
          alt="Mamivarródoboza logo"
          className="absolute top-0.5 rounded-full"
        />
        <nav className="mobile-nav flex md:hidden ml-auto mr-0">
          <button
            type="button"
            className="relative bottom-3 left-6 p-4 space-y-1.5 rounded"
            onClick={toggleIsNavOpen}
          >
            <span className="block w-8 h-0.5 bg-gray-100 " />
            <span className="block w-8 h-0.5 bg-gray-100 " />
            <span className="block w-8 h-0.5 bg-gray-100 " />
          </button>
          <ul
            className={`${
              isNavOpen ? 'h-80' : 'h-0'
            } overflow-hidden w-full flex-col absolute shadow-md rounded-b-3xl top-full right-0 `}
          >
            <li className="mb-5 mt-10 text-xl text-center">
              <Link href="/">
                <a onClick={() => setIsNavOpen(false)}>Blog</a>
              </Link>
            </li>
            <li className="my-5 text-xl text-center">
              <Link href="/videok">
                <a onClick={() => setIsNavOpen(false)}>Videók</a>
              </Link>
            </li>
            <li className="my-5 text-xl text-center">
              <Link href="/esemenyek">
                <a onClick={() => setIsNavOpen(false)}>Események</a>
              </Link>
            </li>
            <li className="my-5 text-xl text-center">
              <Link href="/rolam">
                <a onClick={() => setIsNavOpen(false)}>Rólam</a>
              </Link>
            </li>
            <li className="my-5 text-xl text-center">
              {session ? (
                <button type="button" onClick={signInUser}>
                  Kijelentkezés
                </button>
              ) : (
                <button type="button" onClick={signOutUser}>
                  Bejelentkezés
                </button>
              )}
            </li>
          </ul>
        </nav>
        <nav className="laptop-nav hidden md:flex ml-auto mr-0 align-middle gap-2">
          <Link href="/">
            <a>Blog</a>
          </Link>
          <Link href="/videok">
            <a>Videók</a>
          </Link>
          <Link href="/esemenyek">
            <a>Események</a>
          </Link>
          <Link href="/rolam">
            <a>Rólam</a>
          </Link>
          {session ? (
            <button type="button" onClick={() => signOut()}>
              Kijelentkezés
            </button>
          ) : (
            <button type="button" onClick={() => signIn()}>
              Bejelentkezés
            </button>
          )}
          {/* session && (
            <Link href="/mentett-posztok">
              <a>Mentett Posztok</a>
            </Link>
          ) */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
