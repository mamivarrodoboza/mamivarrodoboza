/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */
import fs from 'fs';
import { getPosts } from '../services';

const Sitemap = () => null;

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = 'http://localhost:3000';

  const staticPaths = fs
    .readdirSync('pages')
    .filter(
      (staticPage) =>
        !['api', 'product', '_app.js', '_document.js', '404.js'].includes(
          staticPage,
        ),
    )
    .map((staticPagePath) => `${BASE_URL}/${staticPagePath}`);

  const posts = (await getPosts()) || [];
  const dynamicPaths = await posts.map(
    (post) => `${BASE_URL}/posts/${post.node.slug}`,
  );

  const allPaths = [...staticPaths, ...dynamicPaths];

  const sitemap = `
    <xml version="1.0" encoding="UTF-8">
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map(
          (url) => `<url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>`,
        )
        .join('')}
    </urlset>
    </xml>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
