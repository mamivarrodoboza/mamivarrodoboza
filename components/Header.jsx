import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { getCategories } from "../services";

const Header = () => {
  const { data: session } = useSession();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <header className="relative h-10 z-20 text-white">
      <div className="container mx-auto flex justify-between align-middle py-2 px-8">
        <div className="">Logo</div>
        <nav className="flex align-middle gap-4">
          <Link href="/">
            <a>Blog</a>
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
