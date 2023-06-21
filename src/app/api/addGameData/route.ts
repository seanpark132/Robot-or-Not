import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";

export async function POST(request: Request) {        
    const body = await request.json();
    const numRounds = body.numRounds

    try {
        const users = await findUsers(); 
        const userIds = users.map(user => user.id);  
        const senderIds = userIds.flatMap((userId) => Array(numRounds).fill(userId));  
        const receiverIds = reorderToReceiverIds(senderIds);
        
        console.log(senderIds)
        console.log(receiverIds)
        for (let i = 0; i < body.questions.length; i++ ) {
            const question = body.questions[i];
            const aiResponse = body.responses[i];
            const senderUserId = senderIds[i];
            const receiverUserId = receiverIds[i];

            await addGameData(question, aiResponse, senderUserId, receiverUserId);            
        };
    
        return NextResponse.json({status: 200});

    } catch(error) {
        console.error("error in adding gameData");
        return new NextResponse('DatabaseError', { status: 500 });
    };

    async function findUsers() {        
        const users = await prisma.user.findMany({
            where: {
                gameId: body.gameId                
            }
        });       
        return users;
    };
  
    async function addGameData(question: string, aiResponse: string, senderUserId: string, receiverUserId: string) {        
        await prisma.gameData.create({
            data: {
                question: question,
                aiResponse: aiResponse,
                gameId: body.gameId,
                senderUserId: senderUserId,
                receiverUserId: receiverUserId
            }
        });              
    };


    // create a randomized receiverIds array from a sorted senderIds array. Example: senderIds: [1, 1, 1, 2, 2, 2, 3, 3, 3] => receiverIds: [2,3,2, 1,3,3, 1,1,2].
    // Makes sure that the sender and receiver's userIds are different.
    function reorderToReceiverIds(sortedIds: string[]) {
        let reorderedIds = [...sortedIds];          

        let allIndexes = Array.from(sortedIds.keys());       

        sortedIds.forEach(userId => {
            let notReplaced = true;
            while (notReplaced) {
                const randomIndex = Math.floor(Math.random() * allIndexes.length)
                const randomAvailIndex =  allIndexes[randomIndex];  

                if (userId !== sortedIds[randomAvailIndex] && userId !== reorderedIds[randomAvailIndex]) {
                    reorderedIds[randomAvailIndex] = userId;
                    allIndexes.splice(randomIndex, 1);             
                    notReplaced = false;
                };

                if (notReplaced && allIndexes.length === 1) {   
                    const lastAvailIndex = allIndexes[randomIndex] 

                    for (let i = 0; i < reorderedIds.length; i++) {

                        if (reorderedIds[i] !== sortedIds[lastAvailIndex]) {
                            const idCopy = reorderedIds[i];
                            reorderedIds[i] = sortedIds[lastAvailIndex];
                            reorderedIds[lastAvailIndex] = idCopy;
                            allIndexes.splice(randomIndex, 1);           
                            notReplaced = false;
                            break;
                        };
                    };
                };
            };            
        });  
        
        return reorderedIds;
    };
};

    