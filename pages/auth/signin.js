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
  const [policyChecked, setPolicyChecked] = useState(false);
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

  const updatePolicyChecked = () => {
    setPolicyChecked(!policyChecked);
  };

  const signUpUser = async (event) => {
    event.preventDefault();
    if (!policyChecked) {
      setMessage('Nem fogadta el z adatkezelési nyilatkozatot!');
      return;
    }
    if (!email && !password) {
      setMessage('Adja meg email címét és jelszavát!');
      return;
    }
    if (!email) {
      setMessage('Adja meg az email címét!');
      return;
    }
    if (!password) {
      setMessage('Adja meg a jelszavát!');
      return;
    }
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
      <h1 className="hidden md:block opacity-80 text-white text-bold text-center text-4xl drop-shadow max-w-sm absolute z-10 top-20 left-1/4 transform -translate-x-1/2">
        <i>
          A legszebb pillanatok a váratlan, mindennapi pillanatok, amikor
          lazítunk és beengedjük a varázslatot
        </i>
      </h1>
      <Image
        src="/images/signin.jpg"
        layout="fill"
        alt="Boat on a river"
        className="absolute left-0 w-full h-full"
      />
      <div className="rounded-lg w-11/12 md:w-96 xl:w-2/6 max-w-md shadow-md px-4 md:px-8 py-2 h-96 absolute top-1/2 right-1/2  md:right-1/3 transform -translate-y-1/2 translate-x-1/2 z-10 bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg bg-clip-padding border border-gray-300 flex flex-col items-center justify-evenly">
        <h1 className="text-3xl">Bejelentkezés</h1>
        <form className="flex flex-col relative">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label className="mb-4 flex justify-between gap-1">
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
          <label className="mb-4 flex justify-between gap-1">
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
            <input
              type="checkbox"
              checked={policyChecked}
              onChange={updatePolicyChecked}
              className="mr-2"
            />
            <span>
              Elolvastam és elfogadom az{' '}
              <Link href="/adatkezelesi_tajekoztato">
                <a target="blank" className="aszf border-b-2">
                  adatkezelési tájékoztatót
                </a>
              </Link>
            </span>
          </label>
          <div className="flex justify-between gap-2 mt-2">
            <button
              className="login-button text-sm flex-1 px-5 py-1 rounded-md"
              type="submit"
              onClick={(event) => signInUser(event)}
            >
              Bejelentkezés
            </button>
            <button
              className="register-button text-sm flex-1 px-5 py-1 rounded-md"
              type="submit"
              onClick={(event) => signUpUser(event)}
              disabled={!policyChecked}
            >
              Regisztráció
            </button>
          </div>
          <p className="text-red-600">{message}</p>
        </form>
        {Object.values(providers)
          .filter((provider) => provider.name !== 'Credentials')
          .map((provider) => (
            <div key={provider.name} className="my-2 w-full">
              <button
                className="google-login text-sm w-full bg-red-600 px-6 py-2 rounded-md text-white"
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
