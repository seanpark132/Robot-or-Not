import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav>      
            <div className="flex items-center justify-center w-screen p-6">
                <Link href="" className="">
                    <Image className="max-h-8" src="logo.webp" alt="logo"></Image>
                </Link>
            </div>
        </nav>
    );
};