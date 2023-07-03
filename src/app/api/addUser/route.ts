import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";

export async function POST(request: Request) {        
    const body = await request.json();

    async function addUser() {        
        await prisma.user.create({
            data: {
                id: body.userId,
                nickname: body.defaultName,
                score: 0,
                gameId: body.gameId,           
                isReady: false
            }
        });                  
    };

    try {
        await addUser();
        return new NextResponse('Added User', { status: 200 });

    } catch(error) {
        console.error("error");
        return new NextResponse('Database Error', { status: 500 });
    };
};