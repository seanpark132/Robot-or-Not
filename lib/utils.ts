export const animals = [ 'Lion', 'Elephant', 'Monkey', 'Giraffe', 'Tiger', 'Kangaroo', 'Dolphin', 'Penguin', 'Cheetah', 'Rhino', 'Gorilla', 'Zebra', 'Octopus', 'Bear', 'Owl', 'Snake', 'Wolf', 'Crocodile',
 'Eagle', 'Shark', 'Hippopotamus', 'Flamingo', 'Jellyfish', 'Koala', 'Penguin', 'Chimpanzee', 'Panda', 'Parrot', 'Antelope', 'Bat', 'Seahorse', 'Ostrich', 'Gorilla', 'Camel', 'Lobster', 'Falcon', 
 'Peacock', 'Orangutan', 'Toucan', 'Sloth', 'Meerkat', 'Hedgehog', 'Raccoon', 'Bison', 'Hyena', 'Platypus', 'Squirrel', 'Lemur', 'Chameleon', 'Armadillo', 'Otter', 'Tapir', 'Gazelle', 'Vulture',
  'Alligator', 'Kangaroo', 'Cheetah', 'Ocelot', 'Walrus', 'Peacock', 'Gorilla', 'Giraffe', 'Rhino', 'Penguin', 'Tiger', 'Ostrich', 'Snake', 'Koala', 'Wolf', 'Panda', 'Chimpanzee', 'Elephant', 'Octopus',
   'Zebra', 'Dolphin', 'Bear', 'Crab', 'Flamingo', 'Seal', 'Jellyfish', 'Gorilla', 'Owl', 'Parrot', 'Platypus', 'Hedgehog', 'Raccoon', 'Sloth', 'Chameleon', 'Armadillo', 'Squirrel', 'Lemur', 'Orangutan',
    'Toucan', 'Antelope', 'Falcon', 'Peacock', 'Gazelle' ];

export async function initGame(gameId: string) {
    const res = await fetch('../api/initGame', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },          
            body: JSON.stringify({ gameId: gameId })
    });   

    if (!res.ok) {
        throw new Error("error");
    };
};

export async function updateGameInfo(gameId: string, numPlayers: number, numRounds: number) {
    const res = await fetch('../api/updateGameInfo', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },     
            body: JSON.stringify({ gameId: gameId, numPlayers: numPlayers, numRounds: numRounds })
    });   

    if (!res.ok) {
        throw new Error("error");
    };
};


export async function addUser(gameId: string, userId: string, defaultName: string) {
    const res = await fetch('../api/addUser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },          
            body: JSON.stringify({gameId: gameId, userId: userId, defaultName: defaultName})
    });

    if (!res.ok) {
        throw new Error("error");
    };
};


export async function retrieveNames(gameId: string) {
    const res = await fetch('../api/retrieveNames', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },          
            body: JSON.stringify({gameId: gameId})
    });    

    if (!res.ok) {
        throw new Error("error");
    };
};


export async function updateName(userId: string, newNickname: string) {
    const res = await fetch('../api/updateName', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },          
            body: JSON.stringify({userId: userId, newNickName: newNickname})
    });

    if (!res.ok) {
        throw new Error("error");
    };
};


export async function sendNumRounds(gameId:string, numRounds: number) {
    const res = await fetch('../api/sendNumRounds', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },          
            body: JSON.stringify({gameId: gameId, numRounds: numRounds})
    });  
    
    if (!res.ok) {
        throw new Error("error");
    };
};


export async function generateQuestions(gameId: string) { 
    const res = await fetch('../api/generateQuestions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },       
        body: JSON.stringify({ gameId: gameId })
    });
    
    if (!res.ok) {
        throw new Error("error");
    };

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
    });
   
    const json = await res.json();
    return json.response;
};


export async function addGameData(questions: string[], responses: string[], gameId: string) {
    const res = await fetch('../api/addGameData', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({questions: questions, responses: responses, gameId: gameId })
    });
    
    if (!res.ok) {
        throw new Error("error");
    };
};


export async function distributeGameData(gameId: string) {
    const res = await fetch('../api/distributeGameData', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ gameId: gameId })
    }); 

    if (!res.ok) {
        throw new Error("error");
    };
};


export async function updateUserResponse(gameDataId: number, userResponse: string) {
    const res = await fetch('../api/updateUserResponse', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },          
        body: JSON.stringify({gameDataId: gameDataId, userResponse: userResponse})
    });

    if (!res.ok) {
        throw new Error("error");
    };
};

export async function randomizeSendToUserIds(gameId: string) {
    const res = await fetch('../api/randomizeSendToUserIds', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ gameId: gameId })
    });  

    if (!res.ok) {
        throw new Error("error");
    };
};


export async function randomizedToFalse(gameId: string) {
    const res = await fetch('../api/randomizedToFalse', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ gameId: gameId })
    });  

    if (!res.ok) {
        throw new Error("error");
    };
};


export async function readyCheck(gameId: string, nextGamePeriod: string) {
    const res = await fetch('../api/readyCheck', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ gameId: gameId, nextGamePeriod: nextGamePeriod })
    });

    if (!res.ok) {
        throw new Error("error");
    };  
};


export async function sendSelectData(gameId: string, userId: string, selectData: SingleGameData) {
    const res = await fetch('../api/sendSelectData', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ gameId: gameId, userId: userId, selectData: selectData })
    }); 
    
    if (!res.ok) {
        throw new Error("error");
    };
};


export async function updateScore(userId: string, score: number) {
    const res = await fetch('../api/updateScore', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },          
        body: JSON.stringify({userId: userId, score: score})
    });

    if (!res.ok) {
        throw new Error("error");
    };
};


export async function getAllUsers(gameId: string) {
    const res = await fetch('../api/getAllUsers', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ gameId: gameId })
    });
   
    const json = await res.json();
    return json.response;
};
