import Link from "next/link";
import logo from "@/../public/logos/logo.png";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between items-center my-6 mx-4 md:my-8 md:mx-15">
        <Image src={logo} alt="female gaze small logo" />
        <nav className="flex justify-center font-bold gap-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  );
}
