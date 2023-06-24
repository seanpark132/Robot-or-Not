import Link from "next/link";

export default function Navbar() {
    return (
        <nav>      
            <div className="flex items-center justify-center w-screen p-6">
                <Link href="" className="">
                    <img className=" max-h-8" src="logo.webp"></img>
                </Link>
            </div>
        </nav>
    );
};