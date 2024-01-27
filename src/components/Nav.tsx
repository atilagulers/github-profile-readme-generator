'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';
import {FaUser, FaBars} from 'react-icons/fa';

const Nav = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState<any>(null);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const getProvidersData = async () => {
      const providers = await getProviders();
      console.log(providers);
      setProviders(providers);
    };
    getProvidersData();
  }, []);

  return (
    <nav className="flex-between bg-dark-light p-5 mb-5">
      <Link href={'/'} className="flex-center gap-2">
        <Image
          className="object-contain"
          src="/assets/images/logo.png"
          alt="Logo"
          width={50}
          height={50}
        />
        <p className="font-semibold text-lg tracking-wide max-sm:hidden ">
          GitHub Readme Generator
        </p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-template">Create Template</Link>
            <Link href="/profile">Sign out</Link>
            <FaUser />
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <FaBars onClick={() => setToggleMenu((prev) => !prev)} />

            {toggleMenu && (
              <div className="absolute right-0 mt-3 p-5 rounded-lg border border-dark-light bg-dark min-w-[150px] max-w-[300px] flex flex-col gap-3 items-start">
                <Link
                  href={'/profile'}
                  className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                  onClick={() => setToggleMenu(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={'/profile'}
                  className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                  onClick={() => setToggleMenu(false)}
                >
                  My Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleMenu(false);
                    signOut();
                  }}
                ></button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
