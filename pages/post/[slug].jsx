/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import { getPosts, getPostDetails } from '../../services';
import {
  PostDetail,
  Categories,
  PostWidget,
  Comments,
  CommentsForm,
} from '../../components';

function PostDetails({ post, comments }) {
  const [relatedComments, setRelatedComments] = useState(comments);

  return (
    <div className="PostDetailPage container mx-auto px-10 mb-8 mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <CommentsForm
            slug={post.slug}
            relatedComments={relatedComments}
            setRelatedComments={setRelatedComments}
          />
          <Comments slug={post.slug} relatedComments={relatedComments} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = await getPostDetails(params.slug);
  const commentsResponse = await fetch(
    `https://mamivarrodoboza.vercel.app/api/comments/${params.slug}`
  );
  const comments = await commentsResponse.json();

  return {
    props: { post, comments: comments.data },
  };
}

export async function getStaticPaths() {
  const post = await getPosts();

  return {
    paths: post.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
}

export default PostDetails;
