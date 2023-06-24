import Link from "next/link";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center p-8">  
      <Link className="text-4xl font-semibold"href="/game-m">
        Play Multi-player
      </Link>  
      <h1 className=" text-gray-500 text-4xl font-semibold mt-16">Solo-player mode in development</h1>    
      {/* <Link className="text-5xl"href="/game-s">
        Play Solo-player
      </Link>       */}    
    </main> 
  )
};
