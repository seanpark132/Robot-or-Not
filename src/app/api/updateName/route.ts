import { NextResponse } from "next/server";
import { prisma } from "@root/lib/prismaClient";

export async function POST(request: Request) {
	const body = await request.json();

	try {
		await updateName(body.userId, body.newNickName);

		return new NextResponse("Updated name", { status: 200 });
	} catch (error) {
		console.error("error in updating names");
		return new NextResponse("DatabaseError", { status: 500 });
	}

	async function updateName(id: string, nickname: string) {
		await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				nickname: nickname,
			},
		});
	}
}
