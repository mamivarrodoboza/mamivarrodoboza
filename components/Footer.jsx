/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

function Footer() {
  // const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const sendMessage = async (event) => {
    event.preventDefault();
    setError(false);
    if (!message) {
      setError(true);
      return;
    }
    const data = {
      name,
      email,
      message,
    };
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      setName('');
      setEmail('');
      setMessage('');
    });
  };

  return (
    <footer className="flex flex-col-reverse md:flex-row justify-evenly gap-8 py-16 md:py-8 px-4 text-white">
      <nav className="max-h-72 overflow-hidden relative transform md:translate-y-12 flex justify-center gap-8 md:gap-12 mt-16 md:mt-0">
        <div className="flex flex-col sm:flex-row justify-start gap-12">
          <div className="flex flex-col gap-3">
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
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/auth/signin">
              <a>Bejelentkezés</a>
            </Link>
            <Link href="/adatkezelesi_tajekoztato">
              <a target="blank">Adatkezelési tájékoztató</a>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-3">
          <Link href="https://www.facebook.com/Mami-Varr%C3%B3-Doboza-224117758310267/">
            <a target="blank">Facebook</a>
          </Link>
          <Link href="https://www.youtube.com/channel/UCM8vNO05d4C78o3OGHDkcCA">
            <a target="blank">Youtube</a>
          </Link>
          <Link href="https://www.instagram.com/mamivarrodoboza/">
            <a>Instagram</a>
          </Link>
        </div>
      </nav>
      <form
        className="flex flex-col gap-3"
        onSubmit={(event) => sendMessage(event)}
      >
        <h4 className="text-xl">Küldj egy üzenetet!</h4>
        <label>
          <p>Név</p>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full shadow-md rounded-xl p-2 text-sm text-black"
          />
        </label>
        <label>
          <p>Email</p>
          <input
            type="email"
            value={email}
            placeholder="john.doe@gmail.com"
            onChange={(event) => setEmail(event.target.value)}
            className="w-full shadow-md rounded-xl p-2 text-sm text-black"
          />
        </label>
        <label>
          <p>Üzenet</p>
          <textarea
            className="w-full shadow-md rounded-xl p-2 text-sm text-black"
            cols={60}
            rows={5}
            value={message}
            placeholder="Üzenet írása..."
            onChange={(event) => setMessage(event.target.value)}
            onFocus={() => setError(false)}
          />
          {error && (
            <p className="text-xs text-red-500">Ne hagyja üresen a mezőt!</p>
          )}
        </label>
        <button
          className={`w-full transition duration-200 ease transform inline-block ${
            message
              ? 'bg-pink-600 hover:-translate-y-1 hover:shadow-lg cursor-pointer'
              : 'bg-pink-500 cursor-default'
          } text-sm font-medium rounded-full px-2 py-2 `}
          type="submit"
          disabled={!message}
        >
          Üzenet Küldése
        </button>
      </form>
    </footer>
  );
}

export default Footer;
