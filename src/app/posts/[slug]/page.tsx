import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { BASE_URL, CMS_NAME, CMS_SEPARATOR } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";

import Container from "@/app/_components/container";
import { PostBody } from "@/app/_components/blog/post-body";
import { PostHeader } from "@/app/_components/blog/post-header";

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Container>
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            lastModified={post.lastModified ? post.lastModified : null}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} ${CMS_SEPARATOR} ${CMS_NAME}`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description: post.excerpt,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
    authors: [{ name: post.author.name, url: BASE_URL }],
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
