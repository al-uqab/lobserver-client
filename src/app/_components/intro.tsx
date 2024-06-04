import { IBM_Plex_Serif } from "next/font/google";

const ibmSerif = IBM_Plex_Serif({ weight: ["400", "700"], subsets: ["latin"] });

type Props = {
  title?: string;
  color?: string;
};

export function Intro({ title, color }: Props) {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1
        className={`${ibmSerif.className} text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 ${color ? `text-${color}` : ""}`}
      >
        {title ? title : "Blog."}
      </h1>
    </section>
  );
}
