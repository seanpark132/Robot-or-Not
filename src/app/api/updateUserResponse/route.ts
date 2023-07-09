import { NextResponse } from "next/server";
import { prisma } from "@root/lib/prismaClient";

export async function PATCH(request: Request) {        
    const body = await request.json();

    async function updateUserResponse() {        
        await prisma.gameData.update({
            where: {
                id: body.gameDataId      
            },
            data: {
                userResponse: body.userResponse
            }
        });         
    };

    try {
        await updateUserResponse();       
        return new NextResponse('Updated user response', { status: 200 });
        
    } catch(error) {
        console.error("error in updating userResponse") 
        return new NextResponse('DatabaseError', { status: 500 });
    };
};