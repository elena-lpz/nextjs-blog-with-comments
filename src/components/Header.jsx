import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="flex justify-center font-bold py-10 gap-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/blog">Photography Blog</Link>
      </nav>
    </header>
  );
}
