import { NextResponse } from "next/server";
import { prisma } from "@root/lib/prismaClient";
import { pusherServer } from "@root/lib/pusher";

export async function POST(request: Request) {
	const body = await request.json();

	try {
		await updateNumReady(body.gameId);
		const gameInfo = await getGameInfo(body.gameId);
		const numPlayers = gameInfo?.numPlayers;
		const numReady = gameInfo?.numReady;

		if (numReady === numPlayers) {
			await pusherServer
				.trigger(body.gameId, "allReady", body.nextGamePeriod)
				.catch((error: any) => {
					console.log(error);
				});

			await resetNumReady(body.gameId);
		}

		return new NextResponse("Ready check done", { status: 200 });
	} catch (error) {
		console.error("Error in ready check");
		return new NextResponse("DatabaseError", { status: 500 });
	}

	async function updateNumReady(gameId: string) {
		await prisma.game.update({
			where: {
				id: gameId,
			},
			data: {
				numReady: {
					increment: 1,
				},
			},
		});
	}

	async function getGameInfo(gameId: string) {
		const gameInfo = await prisma.game.findFirst({
			where: {
				id: gameId,
			},
		});

		return gameInfo;
	}

	async function resetNumReady(gameId: string) {
		await prisma.game.update({
			where: {
				id: gameId,
			},
			data: {
				numReady: 0,
			},
		});
	}
}
