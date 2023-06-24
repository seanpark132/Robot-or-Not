import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";

export async function POST(request: Request) {        
    const body = await request.json();

    try {       
        // To prevent multiple clients from randomizing user ids (only needs to be done once / round)
        const game = await findGame();   
                   
        if (game!.isRandomized === true) {
            return NextResponse.json({});
        };
               
        await updateIsRandomized();
        
        const users = await findUsers();
        const userIds = users.map(user => user.id);
        let remainingIds = [...userIds];
        
        for (let i = 0; i < userIds.length; i++ ) {
            let isIdSame = true;
            let randomId = "";

            while (isIdSame) {
                const randomIndex = Math.floor(Math.random() * remainingIds.length);        
                randomId = remainingIds[randomIndex]
                if (randomId !== userIds[i]) {
                    remainingIds.splice(randomIndex, 1);
                    isIdSame = false;                    
                };
            };
            
            await updateSendToUserId(userIds[i], randomId); 
        };
        console.log("randomized send to userIds")                     
        return NextResponse.json({});

    } catch(error) {
        console.error("error in randomizing sendToUserIds") 
        return new NextResponse('DatabaseError', { status: 500 });
    };

    async function findGame() {        
        const game = await prisma.game.findFirst({
            where: {
                id: body.gameId
            }   
        });       
        return game;
    };

    async function updateIsRandomized() {
        await prisma.game.update({
            where: {
                id: body.gameId
            },
            data: {
                isRandomized: true
            }
        });
    };
    
    async function findUsers() {        
        const users = await prisma.user.findMany({
            where: {
                gameId: body.gameId                
            }
        });       
        return users;
    };

    async function updateSendToUserId(selfId: string, sendToId: string) {
        await prisma.user.update({
            where: {
                id: selfId
            },
            data: {
                sendToUserId: sendToId
            }
        });
    };

};