import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../utils/siteData';

export async function GET(context: { site: string }) {
  const posts = (await getCollection('blog'))
    .filter(post => !post.data.draft)
    .sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());

  return rss({
    title: `${SITE.name} Blog`,
    description: SITE.description,
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.pubDate),
      link: `/blog/${post.id}/`,
    })),
  });
}
