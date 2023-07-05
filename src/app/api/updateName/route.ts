import { NextResponse } from "next/server";
import { prisma } from "@root/lib/prismaClient";

export async function POST(request: Request) {        
    const body = await request.json();

    try {
        await updateName();       
        return new NextResponse('Updated name', { status: 200 });

    } catch(error) {
        console.error("error in updating names") 
        return new NextResponse('DatabaseError', { status: 500 });
    };

    async function updateName() {        
        await prisma.user.update({
            where: {
                id: body.userId            
            },
            data: {
                nickname: body.newNickName
            }
        });         
    };
};