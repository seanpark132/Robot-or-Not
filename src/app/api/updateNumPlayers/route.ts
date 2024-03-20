import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prismaClient";

export async function POST(request: Request) {
	const body = await request.json();

	try {
		await updateNumPlayers(body.gameId, body.numPlayers);
		return new NextResponse("Updated numPlayers", { status: 200 });
	} catch (error) {
		console.error(error);
		return new NextResponse("DatabaseError", { status: 500 });
	}

	async function updateNumPlayers(gameId: string, numPlayers: number) {
		await prisma.game.update({
			where: {
				id: gameId,
			},
			data: {
				numPlayers: numPlayers,
			},
		});
	}
}
