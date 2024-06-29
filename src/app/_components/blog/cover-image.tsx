import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import cn from "classnames";

type Props = {
  title: string;
  src: string;
  slug?: string;
  width?: number;
  height?: number;
  tailwindHeight?: string;
  tailwindHeightInPx?: number;
  thumb?: boolean;
};

const CoverImage: FC<Props> = ({
  title,
  src,
  slug,
  width = 600,
  height = 400,
  thumb = true,
}) => {
  if (!title || !src) {
    console.error(
      "CoverImage component is missing required props: title and src.",
    );
    return null;
  }

  const dynamicHeightClass = thumb
    ? `md:min-h-[250px] md:max-h-[250px]`
    : `md:min-h-[600px] md:max-h-[600px]`;

  const imageClass = cn("rounded-3xl w-full object-cover", dynamicHeightClass, {
    "hover:shadow-lg transition-shadow duration-200": slug,
  });

  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={imageClass}
      width={width}
      height={height}
      loading="lazy"
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
