import Link from "next/link";

export default function Home() {

  return (
    <main className="flex justify-center p-8 min-h-screen">  
      <div className="flex flex-col items-center justify-center text-center w-fit">
        <Link href="/game-m" className="p-6 border-transparent bg-dark-blue rounded-xl w-full hover:bg-bright-pink">
            <p className="text-4xl font-bold">Play Multi-player</p>       
          </Link>  
        <Link href="" className="p-6 mt-16 border-transparent bg-dark-blue rounded-xl w-full">
          <p className="text-4xl font-semibold text-gray-500">Solo player in development</p>       
        </Link>  
      </div>
      {/* <Link className="text-5xl"href="/game-s">
        Play Solo-player
      </Link>       */}    
    </main> 
  )
};
