import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">LOGO</h1>
        <nav className="flex justify-center font-bold py-10 gap-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  );
}
