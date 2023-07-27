import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
	return (
		<nav>
			<div className="flex items-center justify-center w-screen p-6">
				<Link href="/">
					<Image
						src="/logo.webp"
						className=" w-auto h-auto"
						height={35}
						width={350}
						alt="logo"
						priority
					></Image>
				</Link>
			</div>
		</nav>
	);
}
