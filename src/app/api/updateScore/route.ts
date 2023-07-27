import { NextResponse } from "next/server";
import { prisma } from "@root/lib/prismaClient";

export async function POST(request: Request) {
	const body = await request.json();

	try {
		await updateScore(body.userId, body.score);
		return new NextResponse("Updated score", { status: 200 });
	} catch (error) {
		console.error("error in updating score");
		return new NextResponse("DatabaseError", { status: 500 });
	}

	async function updateScore(id: string, score: number) {
		await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				score: score,
			},
		});
	}
}
