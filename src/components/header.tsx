import { type NextPage } from "next";
import Link from "next/link";

const Header: NextPage = () => {
  return (
    <>
      <nav h-16>
        <Link href="/">FireStock</Link>
      </nav>
    </>
  );
};

export default Header;
