import RunningCalculator from "@/components/running-calculator";
import { Metadata } from "next";

import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/blog/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/blog/more-stories";
import { getAllPosts } from "@/lib/api";

export const metadata: Metadata = {
  title: "LObserver - Running Calories Burned Calculator",
  description:
    "Calculate the calories burned during your runs with LeObserver's running calculator. Track your health and fitness easily.",
  authors: [{ name: "LObserver", url: "https://lobserver.com/" }],
};

export default function Home() {
  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <main>
      <RunningCalculator />
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
