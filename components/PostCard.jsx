import React from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

import { grpahCMSImageLoader } from "../util";

const PostCard = ({ post }) => (
  <div className="PostCard relative bg-white shadow-lg rounded-lg p-0 lg:p-2 lg:pb-16 pb-12 mb-8 ">
    {/* <div className="relative shadow-md inline-block w-full h-60 lg:h-80 mb-6">
      <Image
        unoptimized
        loader={grpahCMSImageLoader}
        alt={post.title}
        className="shadow-lg rounded-t-lg lg:rounded-lg"
        layout="fill"
        src={post.featuredImage.url}
      />
    </div> */}
    <div className="relative pb-64 mb-6 z-10">
      <img
        src={post.featuredImage.url}
        alt=""
        className="object-top absolute h-64 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
      />
    </div>

    <h1 className="transition duration-200 text-center mb-8 cursor-pointer text-3xl font-semibold">
      <Link href={`/post/${post.slug}`}>{post.title}</Link>
    </h1>
    <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
      <div className="font-medium text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline mr-2 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="align-middle">
          {moment(post.createdAt).format("MMM DD, YYYY")}
        </span>
      </div>
    </div>
    <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-6 mb-8">
      {post.excerpt}
    </p>
    <div className="text-center">
      <Link href={`/post/${post.slug}`}>
        <a className="absolute bottom-6 w-full left-1/2 transform -translate-x-1/2">
          <span className="detailsButton transition duration-200 ease transform hover:-translate-y-1 inline-block text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer hover:shadow-lg">
            Tovább a cikkhez
          </span>
        </a>
      </Link>
    </div>
  </div>
);

export default PostCard;
