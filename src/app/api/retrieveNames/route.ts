import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prismaClient";
import { pusherServer } from "@/app/lib/pusher";

export async function POST(request: Request) {
	const body = await request.json();

	try {
		const users = await findUsers();
		const names = users.map((obj) => obj.nickname);

		await pusherServer
			.trigger(body.gameId, "updateNames", names)
			.catch((error: any) => {
				console.error(error);
			});

		return new NextResponse("Updated lobby names", { status: 200 });
	} catch (error) {
		console.error(error);
		return new NextResponse("DatabaseError", { status: 500 });
	}

	async function findUsers() {
		const users = await prisma.user.findMany({
			where: {
				gameId: body.gameId,
			},
		});
		return users;
	}
}
