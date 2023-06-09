import Link from "next/link";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Link className="text-5xl"href="/game">
        Play!
      </Link>
    </main>
  )
};
