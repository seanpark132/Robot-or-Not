import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";

export async function POST(request: Request) {        
    const body = await request.json();

    try {
        const selectGameData = await findSelectGameData();      
               
        return NextResponse.json({response: selectGameData});

    } catch(error) {
        console.error("error in retrieving selectGameData") 
        return new NextResponse('DatabaseError', { status: 500 });
    };

    async function findSelectGameData() {        
        const selectGameData = await prisma.gameData.findFirst({
            where: {
                userResponse: {
                    not: null
                },
                receiverUserId: body.receiverUserId,  
                isPlayed: false
            }   
        });       
        return selectGameData;
    };

};