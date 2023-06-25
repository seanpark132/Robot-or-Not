import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";
import { pusherServer } from "../../../../lib/pusher";

export async function POST(request: Request) {    

    const body = await request.json();

    try {   
        const gameData: SingleGameData[] = await findGameData();  
        const uniqueUserIds = [...new Set(gameData.map(item => item.userId))]   
        
        uniqueUserIds.map(async (id) => {
            const filteredById = gameData.filter(item => item.userId === id);
            const requiredData = filteredById.map(({gameId, ...required }) => required);
            
            const dataInfo = {
                userId: id, 
                data: requiredData
            };          
         
            await pusherServer.trigger(body.gameId, "receiveGameData", dataInfo )
            .catch((error: any) => {
                console.log(error);
            });         
            
        });     
        
        console.log("distributed gameData")
        return NextResponse.json({});

    } catch(error) {
        console.error("error in distributing gameData") 
        return new NextResponse('InternalError', { status: 500 });
    };

    async function findGameData() {        
        const gameData = await prisma.gameData.findMany({
            where: {
                gameId: body.gameId                
            }
        });       
        return gameData;
    };
};
