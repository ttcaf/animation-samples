import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-2xl font-bold">Animation Samples</h1>
        <nav className="mt-16">
          <Link href="/scroll-card-carousel">Scroll Card Carousel</Link>
        </nav>
      </main>
    </div>
  );
}
