/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { getVideos } from '../services';

function Videok({ videos }) {
  return (
    <section>
      <h1 className="text-center my-8 text-3xl font-medium">Videók</h1>
      <div className="videos-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center container mb-20 mx-auto">
        {videos.map((video) => (
          <article
            key={video.id}
            className="bg-white h-72 shadow-lg rounded-lg p-4 lg:p-8 pb-12 mb-8"
          >
            <video src={video.video.url} controls type={video.video.mimeType} />
            <h2 className="w-72 text-center mt-4 text-lg font-semibold">
              {video.name}
            </h2>
          </article>
        ))}
      </div>
    </section>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const videos = (await getVideos()) || [];

  return {
    props: { videos },
  };
}

export default Videok;
