import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";

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
        return NextResponse.json({});
        
    } catch(error) {
        console.error("error in updating userResponse") 
        return new NextResponse('DatabaseError', { status: 500 });
    };
};