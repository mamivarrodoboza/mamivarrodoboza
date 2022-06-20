import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

function Footer() {
  const { data: session } = useSession();
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
      email: session.user.email,
      message,
    };
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res);
      setMessage('');
    });
  };

  return (
    <footer className="flex flex-col-reverse md:flex-row justify-evenly gap-8 py-16 md:py-8 px-4 mt-20 text-white">
      <nav className="flex justify-center md:pt-10 gap-4 md:gap-8 mt-16 md:mt-0">
        <div className="flex flex-col justify-start gap-3">
          <Link href="/">
            <a>Blog</a>
          </Link>
          <Link href="/rolam">
            <a>Rólam</a>
          </Link>
          <Link href="/auth/signin">
            <a>Bejelentkezés</a>
          </Link>
        </div>
        <div className="flex flex-col justify-start gap-3">
          <Link href="/">
            <a>Facebook</a>
          </Link>
          <Link href="/">
            <a>Twitter</a>
          </Link>
          <Link href="/">
            <a>Instagram</a>
          </Link>
        </div>
        <div className="flex flex-col justify-start gap-3">
          <Link href="/">
            <a>Privacy Policy</a>
          </Link>
          <Link href="/">
            <a>Oldaltérkép</a>
          </Link>
        </div>
      </nav>
      <form
        className=" flex flex-col gap-3"
        onSubmit={(event) => sendMessage(event)}
      >
        <h4 className="text-xl">Küldj egy üzenetet!</h4>
        <textarea
          className="shadow-md rounded-xl p-2 text-sm text-black"
          cols={60}
          rows={6}
          value={message}
          placeholder="Üzenet írása..."
          onChange={(event) => setMessage(event.target.value)}
          onFocus={() => setError(false)}
        />
        {error && (
          <p className="text-xs text-red-500">Ne hagyja üresen a mezőt!</p>
        )}
        <button
          className={`w-full transition duration-200 ease transform inline-block ${
            message
              ? 'bg-pink-600 hover:-translate-y-1 hover:shadow-lg cursor-pointer'
              : 'bg-pink-500 cursor-default'
          } text-sm font-medium rounded-full px-2 py-2`}
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
