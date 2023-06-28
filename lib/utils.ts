export const animals = [ 'Lion', 'Elephant', 'Monkey', 'Giraffe', 'Tiger', 'Kangaroo', 'Dolphin', 'Penguin', 'Cheetah', 'Rhino', 'Gorilla', 'Zebra', 'Octopus', 'Bear', 'Owl', 'Snake', 'Wolf', 'Crocodile',
 'Eagle', 'Shark', 'Hippopotamus', 'Flamingo', 'Jellyfish', 'Koala', 'Penguin', 'Chimpanzee', 'Panda', 'Parrot', 'Antelope', 'Bat', 'Seahorse', 'Ostrich', 'Gorilla', 'Camel', 'Lobster', 'Falcon', 
 'Peacock', 'Orangutan', 'Toucan', 'Sloth', 'Meerkat', 'Hedgehog', 'Raccoon', 'Bison', 'Hyena', 'Platypus', 'Squirrel', 'Lemur', 'Chameleon', 'Armadillo', 'Otter', 'Tapir', 'Gazelle', 'Vulture',
  'Alligator', 'Kangaroo', 'Cheetah', 'Ocelot', 'Walrus', 'Peacock', 'Gorilla', 'Giraffe', 'Rhino', 'Penguin', 'Tiger', 'Ostrich', 'Snake', 'Koala', 'Wolf', 'Panda', 'Chimpanzee', 'Elephant', 'Octopus',
   'Zebra', 'Dolphin', 'Bear', 'Crab', 'Flamingo', 'Seal', 'Jellyfish', 'Gorilla', 'Owl', 'Parrot', 'Platypus', 'Hedgehog', 'Raccoon', 'Sloth', 'Chameleon', 'Armadillo', 'Squirrel', 'Lemur', 'Orangutan',
    'Toucan', 'Antelope', 'Falcon', 'Peacock', 'Gazelle' ];

export async function initGame(gameId: string) {
    await fetch('../api/initGame', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },          
            body: JSON.stringify({gameId: gameId})
        });    
};


export async function addUser(gameId: string, userId: string, defaultName: string) {
    await fetch('../api/addUser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },          
            body: JSON.stringify({gameId: gameId, userId: userId, defaultName: defaultName})
        });
};


export async function retrieveNames(gameId: string) {
    await fetch('../api/retrieveNames', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },          
            body: JSON.stringify({gameId: gameId})
        });    
};


export async function updateName(userId: string, newNickname: string) {
    await fetch('../api/updateName', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },          
            body: JSON.stringify({userId: userId, newNickName: newNickname})
        });
};


export async function distributeSettings(gameId:string, settings: Settings) {
    await fetch('../api/distributeSettings', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },          
            body: JSON.stringify({gameId: gameId, settings: settings})
        });    
};


export async function generateQuestions(numQuestions: number) { 
    const res = await fetch('../api/generateQuestions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },       
        body: JSON.stringify({ numQuestions: numQuestions})
    });

    const json = await res.json();
    return json.response;
};


export async function generateAIResponses(questions: string[]) {
    const res = await fetch('../api/generateAIResponses', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ questions: questions})
    })
    const json = await res.json();
    return json.response;
};


export async function addGameData(questions: string[], responses: string[], gameId: string) {
    await fetch('../api/addGameData', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({questions: questions, responses: responses, gameId: gameId })
    })    
};


export async function distributeGameData(gameId: string) {
    await fetch('../api/distributeGameData', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ gameId: gameId })
    })    
};


export async function updateUserResponse(gameDataId: number, userResponse: string) {
    await fetch('../api/updateUserResponse', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },          
        body: JSON.stringify({gameDataId: gameDataId, userResponse: userResponse})
    });
};


export async function updateUserIsReady(gameId: string, userId: string, readyStatus: boolean, nextGamePeriod: string) {
    await fetch('../api/updateUserIsReady', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },          
        body: JSON.stringify({gameId: gameId, userId: userId, readyStatus: readyStatus, nextGamePeriod: nextGamePeriod})
    });
};


export async function randomizeSendToUserIds(gameId: string) {
    await fetch('../api/randomizeSendToUserIds', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ gameId: gameId })
    });  
};


export async function randomizedToFalse(gameId: string) {
    await fetch('../api/randomizedToFalse', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ gameId: gameId })
    });  
};


export async function checkAllReady(gameId: string) {
    const res = await fetch('../api/checkAllReady', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ gameId: gameId })
    });
        
    const json = await res.json();
    return json.response;    
};


export async function sendSelectData(gameId: string, userId: string, selectData: SingleGameData) {
    await fetch('../api/sendSelectData', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ gameId: gameId, userId: userId, selectData: selectData })
    });  
};