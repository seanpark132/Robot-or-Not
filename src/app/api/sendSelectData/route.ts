import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prismaClient";
import { pusherServer } from "@/app/lib/pusher";

export async function POST(request: Request) {
	const body = await request.json();

	try {
		const user = await findUser();
		const receiverId = user?.sendToUserId;
		const senderNickname = user?.nickname;

		await pusherServer
			.trigger(body.gameId, "receiveSelectData", {
				receiverId: receiverId,
				nickname: senderNickname,
				selectData: body.selectData,
			})
			.catch((error: any) => {
				console.error(error);
			});

		return new NextResponse("Sent SelectData", { status: 200 });
	} catch (error) {
		console.error("Error in sending selectData");
		return new NextResponse("Internal Server Error", { status: 500 });
	}

	async function findUser() {
		const user = await prisma.user.findFirst({
			where: {
				id: body.userId,
			},
		});
		return user;
	}
}
