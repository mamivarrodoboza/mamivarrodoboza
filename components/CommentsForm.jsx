/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const CommentsForm = ({ slug, relatedComments, setRelatedComments }) => {
  const [error] = useState(false);
  // const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [commentMessage, setCommentMessage] = useState('');
  const updateCommentMessage = (event) => {
    setCommentMessage(event.target.value);
  };

  const { data: session } = useSession();

  const [newComment, setNewComment] = useState({
    comment: commentMessage,
    name: session?.user?.name ?? null,
    email: session?.user?.email ?? null,
    slug,
    date: null,
  });

  useEffect(() => {
    setNewComment({
      comment: commentMessage,
      name: session?.user?.name ?? null,
      email: session?.user?.email ?? null,
      slug,
      date: Date.now(),
    });
  }, [commentMessage]);

  const addNewComment = async (event) => {
    event.preventDefault();
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(newComment),
    }).then(() => {
      setRelatedComments([newComment, ...relatedComments]);
      setCommentMessage('');
    });
  };

  return (
    <form
      onSubmit={(event) => addNewComment(event)}
      className="relative bg-white shadow-lg rounded-lg p-8 pb-12 mb-8"
    >
      {!session && (
        <div className="login-modal bg-black bg-opacity-30 absolute w-full h-full top-0 left-0 rounded-lg z-10 flex items-center justify-center">
          <Link href="/auth/signin">
            <a className="transition duration-200 ease transform scale-125 hover:-translate-y-1 hover:shadow-lg inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
              Bejelentkezés
            </a>
          </Link>
        </div>
      )}
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Szólj hozzá!</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          value={commentMessage}
          onChange={updateCommentMessage}
          className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          name="comment"
          placeholder="Komment"
        />
      </div>

      {error && (
        <p className="text-xs text-red-500">Ne hagyja üresen a mezőt!</p>
      )}
      <div className="mt-8">
        <button
          type="submit"
          className="w-40 transition duration-200 ease transform hover:-translate-y-1 hover:shadow-lg inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Küldés
        </button>
        {/* showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for review
          </span>
        ) */}
      </div>
    </form>
  );
};

export default CommentsForm;
