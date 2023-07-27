import { NextResponse } from "next/server";
import { prisma } from "@root/lib/prismaClient";

export async function POST(request: Request) {
	const body = await request.json();

	try {
		// To prevent multiple clients from setting isRandomized to false (only needs to be done once / round)
		const game = await findGame();
		if (game!.isRandomized === false) {
			return new NextResponse("isRandomized is already false", {
				status: 200,
			});
		}

		await updateIsRandomized();

		return new NextResponse("Set isRandomized to false", { status: 200 });
	} catch (error) {
		console.error("Error in setting isRandomized to false");
		return new NextResponse("DatabaseError", { status: 500 });
	}

	async function findGame() {
		const game = await prisma.game.findFirst({
			where: {
				id: body.gameId,
			},
		});
		return game;
	}

	async function updateIsRandomized() {
		await prisma.game.update({
			where: {
				id: body.gameId,
			},
			data: {
				isRandomized: false,
			},
		});
	}
}
