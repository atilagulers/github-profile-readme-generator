'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Nav = () => {
  const {data: session} = useSession();

  const [providers, setProviders] = useState<any>(null);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const getProvidersData = async () => {
      const providers = await getProviders();

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
      <div className="hidden h-full sm:flex">
        {session?.user ? (
          <div className="flex-center gap-3 md:gap-5">
            <Link href="/create-template">Create Template</Link>
            <button
              type="button"
              onClick={() => {
                setToggleMenu(false);
                signOut();
              }}
            >
              Sign Out
            </button>
            <Image
              className="rounded-full"
              src={session?.user?.image || ''}
              alt="Profile Avatar"
              width={40}
              height={40}
            />
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
        {session?.user ? (
          <div className="flex">
            <Image
              onClick={() => setToggleMenu((prev) => !prev)}
              className="rounded-full"
              src={session?.user?.image || ''}
              alt="Profile Avatar"
              width={40}
              height={40}
            />

            {toggleMenu && (
              <div className="absolute right-0 mt-3 p-5 rounded-lg text-light border border-dark-light bg-dark min-w-[150px] max-w-[300px] flex flex-col gap-3 items-start">
                <Link
                  href={'/profile'}
                  className="text-sm font-inter hover:text-gray-500 font-medium"
                  onClick={() => setToggleMenu(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={'/profile'}
                  className="text-sm font-inter hover:text-gray-500 font-medium"
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
                >
                  Sign Out
                </button>
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
