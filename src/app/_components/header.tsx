import Link from "next/link";
import { CMS_NAME } from "@/lib/constants";
import Container from "@/app/_components/container";

const Header = () => {
  return (
    <Container>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-12 mt-8">
        <Link href="/" className="hover:underline">
          {CMS_NAME}
        </Link>
        .
      </h2>
    </Container>
  );
};

export default Header;
