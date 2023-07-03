import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";
import { pusherServer } from "../../../../lib/pusher";

export async function POST(request: Request) {    

    const body = await request.json();

    try {   
        const gameData: SingleGameData[] = await findGameData();  
        const uniqueUserIds = [...new Set(gameData.map(item => item.userId))]   
        
        await triggerGameDataSend(gameData, uniqueUserIds);       
      
        return new NextResponse('Distributed GameData', { status: 200 });

    } catch(error) {
        console.error("Error in distributing gameData") 
        return new NextResponse('Internal Server Error', { status: 500 });
    };

    async function findGameData() {        
        const gameData = await prisma.gameData.findMany({
            where: {
                gameId: body.gameId                
            }
        });       
        return gameData;
    };

    async function triggerGameDataSend(data: SingleGameData[], uniqueIds: string[]) {
        await Promise.all(
            uniqueIds.map(async (id:string) => {
                const filteredById = data.filter(gameData => gameData.userId === id);
                const requiredData = filteredById.map(({gameId, ...required }) => required);
                
                const dataInfo = {
                    userId: id, 
                    data: requiredData
                };          
            
                await pusherServer.trigger(body.gameId, "receiveGameData", dataInfo )
                .catch((error: any) => {
                    console.log(error);
                });            
            })
        );
    };
};
