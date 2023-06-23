import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";

export async function POST(request: Request) {        
    const body = await request.json();
    const numRounds = body.numRounds

    try {
        console.log("started addGameData")
        const users = await findUsers(); 
        const userIds = users.map(user => user.id);  
        const senderIds = userIds.flatMap((userId) => Array(numRounds).fill(userId));  
        const receiverIds = reorderToReceiverIds(userIds, senderIds, numRounds);     
               
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
                receiverUserId: receiverUserId,
                isPlayed: false
            }
        });              
    };

    function reorderToReceiverIds(userIds: string[], sortedIds: string[], numRounds: number) {
        let reorderedIds = [...sortedIds];         
        let availIndexes = Array.from(sortedIds.keys()); 
        const lowestIndex = 0;
        const highestIndex = reorderedIds.length - 1; 
        
        userIds.forEach((id, index) => {
            const lowerIndex = index * numRounds;
            const upperIndex = (index + 1) * numRounds - 1;

            for (let i = 0; i < numRounds; i++ ) {
                let notReplaced = true;
                let randomAvailIndex = null

                while (notReplaced) {
                    const randomIndexOfAvailIndexes = Math.floor(Math.random() * availIndexes.length);                    
                    randomAvailIndex = availIndexes[randomIndexOfAvailIndexes]

                    if (containsValidIndex(availIndexes, lowerIndex, upperIndex, lowestIndex, highestIndex)) {
                        if (randomAvailIndex >= lowerIndex && randomAvailIndex <= upperIndex) {
                            continue;
                        };
                        reorderedIds[randomAvailIndex] = id;
                        availIndexes.splice(randomIndexOfAvailIndexes, 1);
                        notReplaced = false;                 
                    } else {
                        while (notReplaced) {
                            const randomI = Math.floor(Math.random() * reorderedIds.length);        
                            if (randomI >= lowerIndex && randomI <= upperIndex) {
                                continue;
                            };
                            const idCopy = reorderedIds[randomI];
                            reorderedIds[randomI] = id;
                            reorderedIds[randomAvailIndex] = idCopy;
                            availIndexes.splice(randomIndexOfAvailIndexes, 1);
                            notReplaced = false;              
                        };                  
                    };                            
                };
            };
        });     
        return reorderedIds;
    };

    function containsValidIndex(indexes: number[], lower: number, upper: number, lowest: number, highest: number) {
        return indexes.some(index => (index >= lowest && index < lower) || (index <= highest && index > upper));
    };


    // create a randomized receiverIds array from a sorted senderIds array. Example: senderIds: [1, 1, 1, 2, 2, 2, 3, 3, 3] => receiverIds: [2,3,2, 1,3,3, 1,1,2].
    // Makes sure that the sender and receiver's userIds are different.
    // function reorderToReceiverIds(sortedIds: string[]) {

    //     let reorderedIds = [...sortedIds];
    //     let availIndexes = Array.from(sortedIds.keys());       

    //     sortedIds.forEach(userId => {
    //         let notReplaced = true;
    //         while (notReplaced) {
    //             const randomIndex = Math.floor(Math.random() * availIndexes.length)
    //             const randomAvailIndex =  availIndexes[randomIndex];  

    //             // NEED TO SWAP POSITION OF TWO ID'S IF availIndexes does not contain an index that can be put into

    //             if (userId !== sortedIds[randomAvailIndex] && userId !== reorderedIds[randomAvailIndex]) {
    //                 reorderedIds[randomAvailIndex] = userId;
    //                 availIndexes.splice(randomIndex, 1);             
    //                 notReplaced = false;      
    //             };                            
                
    //             if (notReplaced && availIndexes.length === 1) {   
    //                 const lastAvailIndex = availIndexes[randomIndex] 

    //                 for (let i = 0; i < reorderedIds.length; i++) {

    //                     if (reorderedIds[i] !== sortedIds[lastAvailIndex]) {
    //                         const idCopy = reorderedIds[i];
    //                         reorderedIds[i] = sortedIds[lastAvailIndex];
    //                         reorderedIds[lastAvailIndex] = idCopy;
    //                         availIndexes.splice(randomIndex, 1);           
    //                         notReplaced = false;
    //                         break;
    //                     };
    //                 };
    //             };
    //         };          
    //     });  
        
    //     return reorderedIds;
    // };
    
};

    