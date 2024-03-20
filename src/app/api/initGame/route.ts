import { NextResponse } from "next/server";
import { prisma } from "@root/lib/prismaClient";

export async function POST(request: Request) {
	const body = await request.json();

	try {
		await initGame(body.gameId);
		return new NextResponse("Initialized game", { status: 200 });
	} catch (error) {
		console.error(error);
		return new NextResponse("Database Error", { status: 500 });
	}

	async function initGame(gameId: string) {
		await prisma.game.create({
			data: {
				id: gameId,
				rounds: 5,
				numPlayers: 0,
				numReady: 0,
				isRandomized: false,
			},
		});
	}
}
