import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prismaClient";

export async function POST(request: Request) {
	const body = await request.json();

	try {
		const users = await findUsers(body.gameId);

		return NextResponse.json({ response: users });
	} catch (error) {
		console.error(error);
		return new NextResponse("DatabaseError", { status: 500 });
	}

	async function findUsers(gameId: string) {
		const users = await prisma.user.findMany({
			where: {
				gameId: gameId,
			},
		});
		return users;
	}
}
