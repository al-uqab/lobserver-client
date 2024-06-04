import { IBM_Plex_Serif } from "next/font/google";
import markdownStyles from "./markdown-styles.module.css";

const ibmSerif = IBM_Plex_Serif({ weight: ["400", "700"], subsets: ["latin"] });

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
