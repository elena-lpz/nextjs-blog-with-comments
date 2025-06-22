import Link from "next/link";
import logo from "@/../public/logos/logo.png";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between items-center my-6 mx-4 md:my-8 md:mx-15">
        <Image src={logo} alt="female gaze small logo" />
        <nav className="flex justify-center text-lg md:text-xl font-semibold gap-4 ">
          <Link href="/" className="hover:text-heading">
            Home
          </Link>
          <Link href="/about" className="hover:text-heading">
            About
          </Link>
          <Link href="/blog" className="hover:text-heading">
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
