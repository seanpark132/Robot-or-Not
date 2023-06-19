import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";

export async function PATCH(request: Request) {        
    const body = await request.json();

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

    try {
        await updateName();       
        return NextResponse.json({});

    } catch(error) {
        console.error("error in retrieving names") 
        return new NextResponse('DatabaseError', { status: 500 });
    };
};