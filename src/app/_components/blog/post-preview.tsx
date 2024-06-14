import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          src={coverImage}
          width={960 / 2}
          height={250}
        />
      </div>
      <h4 className="text-2xl mb-3 leading-snug font-bold">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h4>
      <div className="text-sm mb-4 text-right">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-md leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );
}
