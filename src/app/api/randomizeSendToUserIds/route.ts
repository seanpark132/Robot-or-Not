import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prismaClient";

export async function POST(request: Request) {
	const body = await request.json();

	try {
		// To prevent multiple clients from randomizing user ids (only needs to be done once / round)
		const game = await findGame();

		if (game!.isRandomized === true) {
			return new NextResponse("Already randomized", { status: 200 });
		}

		await updateIsRandomized();

		const users = await findUsers();
		const userIds = users.map((user) => user.id);

		const shuffledIds = shuffleArrayWithNewPositions(userIds);

		for (let i = 0; i < userIds.length; i++) {
			await updateSendToUserId(userIds[i], shuffledIds[i]);
		}

		return new NextResponse("Randomized SendToUserIds", { status: 200 });
	} catch (error) {
		console.error(error);
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
				isRandomized: true,
			},
		});
	}

	async function findUsers() {
		const users = await prisma.user.findMany({
			where: {
				gameId: body.gameId,
			},
		});
		return users;
	}

	function shuffleArrayWithNewPositions(array: string[]) {
		const arrayCopy = [...array];

		for (let i = array.length - 1; i >= 1; i--) {
			let j = Math.floor(Math.random() * i);
			let tmp = arrayCopy[i];
			arrayCopy[i] = arrayCopy[j];
			arrayCopy[j] = tmp;
		}

		return arrayCopy;
	}

	async function updateSendToUserId(selfId: string, sendToId: string) {
		await prisma.user.update({
			where: {
				id: selfId,
			},
			data: {
				sendToUserId: sendToId,
			},
		});
	}
}
