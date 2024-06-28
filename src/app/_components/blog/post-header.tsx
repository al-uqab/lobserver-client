import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/blog/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  lastModified?: string;
  author: Author;
};

export function PostHeader({
  title,
  coverImage,
  date,
  lastModified,
  author,
}: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:flex items-center justify-between md:mb-8">
        <Avatar name={author.name} picture={author.picture} />
        <div className="flex flex-col items-end">
          <DateFormatter dateString={date} />
          {lastModified && (
            <span className="opacity-50">
              Last Updated: <DateFormatter dateString={lastModified} />
            </span>
          )}
        </div>
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage
          title={title}
          src={coverImage}
          width={960}
          height={600}
          thumb={false}
        />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col gap-1 items-end md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
          <DateFormatter dateString={date} />
          {lastModified && (
            <div className="flex flex-col gap-1 items-end md:hidden mb-6">
              Last Updated: <DateFormatter dateString={lastModified} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
