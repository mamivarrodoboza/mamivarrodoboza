/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SignIn({ providers, csrfToken }) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const signInUser = async (event) => {
    event.preventDefault();
    const options = { redirect: false, email, password };
    const res = await signIn('credentials', options);
    setMessage(null);
    if (res?.error) {
      setMessage(res.error);
    } else {
      return router.back();
    }
  };

  const signUpUser = async (event) => {
    event.preventDefault();
    setMessage(null);
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.message) {
      setMessage(data.message);
    }
    if (data.message === 'Sikeres regisztráció!') {
      const options = { redirect: false, email, password };
      const res = await signIn('credentials', options);
      return router.back();
    }
  };

  return (
    <section className="relative w-full h-screen flex flex-col gap-8 items-center">
      <h1 className="text-red-500 absolute top-20 left-20">
        A legszebb pillanatok a váratlan, mindennapi pillanatok, amikor lazítunk
        és beengedjük a varázslatot
      </h1>
      <Image
        src="/images/signin.jpg"
        layout="fill"
        alt="Boat on a river"
        className="absolute left-0 w-full h-full"
      />
      <div className="rounded-lg w-96 shadow-md px-8 py-2 h-96 absolute top-1/2 right-64 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm bg-clip-padding border border-gray-300 flex flex-col items-center justify-evenly">
        <h1 className="text-3xl">Bejelentkezés</h1>
        <form className="flex flex-col ">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label className="mb-4 flex justify-between gap-2">
            <span>Email cím </span>
            <input
              type="email"
              id="emai"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-56 p-1 text-sm shadow-md rounded-sm"
            />
          </label>
          <label className="mb-4 flex justify-between gap-2">
            Jelszó
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-56 shadow-md rounded-sm"
            />
          </label>
          <label className="mb-2">
            <input type="checkbox" checked className="mr-2" />
            <span>
              Elolvastam és elfogadom az{' '}
              <Link href="/adatkezelesi_tajekoztato">
                <a className="aszf border-b-2">adatkezelési tájékoztatót</a>
              </Link>
            </span>
          </label>
          <div className="flex justify-between gap-2 mt-2">
            <button
              className="login-button px-5 py-1 rounded-md"
              type="submit"
              onClick={(event) => signInUser(event)}
            >
              Bejelentkezés
            </button>
            <button
              className="register-button px-5 py-1 rounded-md"
              type="submit"
              onClick={(event) => signUpUser(event)}
            >
              Regisztráció
            </button>
          </div>
          <p className="text-red-600">{message}</p>
        </form>
        {Object.values(providers)
          .filter((provider) => provider.name !== 'Credentials')
          .map((provider) => (
            <div key={provider.name} className="my-2">
              <button
                className="google-login bg-red-600 w-full px-6 py-2 rounded-md text-white"
                type="button"
                onClick={() => signIn(provider.id)}
              >
                Bejelentkezés {provider.name} fiókkal
              </button>
            </div>
          ))}
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: '/' },
    };
  }
  const providers = await getProviders();
  return {
    props: { providers, csrfToken: await getCsrfToken(context) },
  };
}
