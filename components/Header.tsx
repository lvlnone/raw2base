import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          Raw2Base
        </Link>

        <nav className="flex gap-6 text-sm text-zinc-300">
          <Link href="/upload" className="hover:text-white">
            Upload
          </Link>
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
        </nav>
      </div>
    </header>
  );
}