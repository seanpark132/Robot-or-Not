import Link from "next/link";

export default function Home() {

  return (
    <main className="flex justify-center p-8 min-h-screen">  
      <div className="flex flex-col items-center justify-center text-center w-fit">
        <Link href="/game-m" className="p-8 border-transparent bg-dark-blue rounded-xl w-full hover:bg-bright-pink">
            <p className="text-4xl font-bold">Play Multiplayer!</p>       
        </Link>  
      </div>
    </main> 
  )
};
