import Link from "next/link";
import { CMS_NAME } from "@/lib/constants";
import Container from "@/app/_components/container";
import { IBM_Plex_Serif } from "next/font/google";

const ibmSerif = IBM_Plex_Serif({ weight: ["400", "700"], subsets: ["latin"] });

const Header = () => {
  return (
    <Container>
      <h2
        className={`${ibmSerif.className} text-2xl md:text-4xl text-emerald-900 font-bold tracking-tight md:tracking-tighter leading-tight mb-8 mt-4`}
      >
        <Link href="/">{CMS_NAME}</Link>.
      </h2>
    </Container>
  );
};

export default Header;
