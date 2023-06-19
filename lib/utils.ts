export const animals = [ 'Lion', 'Elephant', 'Monkey', 'Giraffe', 'Tiger', 'Kangaroo', 'Dolphin', 'Penguin', 'Cheetah', 'Rhino', 'Gorilla', 'Zebra', 'Octopus', 'Bear', 'Owl', 'Snake', 'Wolf', 'Crocodile',
 'Eagle', 'Shark', 'Hippopotamus', 'Flamingo', 'Jellyfish', 'Koala', 'Penguin', 'Chimpanzee', 'Panda', 'Parrot', 'Antelope', 'Bat', 'Seahorse', 'Ostrich', 'Gorilla', 'Camel', 'Lobster', 'Falcon', 
 'Peacock', 'Orangutan', 'Toucan', 'Sloth', 'Meerkat', 'Hedgehog', 'Raccoon', 'Bison', 'Hyena', 'Platypus', 'Squirrel', 'Lemur', 'Chameleon', 'Armadillo', 'Otter', 'Tapir', 'Gazelle', 'Vulture',
  'Alligator', 'Kangaroo', 'Cheetah', 'Ocelot', 'Walrus', 'Peacock', 'Gorilla', 'Giraffe', 'Rhino', 'Penguin', 'Tiger', 'Ostrich', 'Snake', 'Koala', 'Wolf', 'Panda', 'Chimpanzee', 'Elephant', 'Octopus',
   'Zebra', 'Dolphin', 'Bear', 'Crab', 'Flamingo', 'Seal', 'Jellyfish', 'Gorilla', 'Owl', 'Parrot', 'Platypus', 'Hedgehog', 'Raccoon', 'Sloth', 'Chameleon', 'Armadillo', 'Squirrel', 'Lemur', 'Orangutan',
    'Toucan', 'Antelope', 'Falcon', 'Peacock', 'Gazelle' ];

export function generateQuestions() { 
    return (
        fetch('../api/generateQuestion', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => json.response)
    );  
};

export function generateAIResponse(question: string) {
    return (
        fetch('../api/generateResponse', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: question })
        })
        .then(res => res.json())
        .then(json => json.response)
    );
};

export function initGame(gameId: string) {
    return (
        fetch('../api/initGame', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },          
            body: JSON.stringify({gameId: gameId})
        })
    );
};

export function addUser(gameId: string, userId: string, defaultName: string) {
    return (
        fetch('../api/addUser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },          
            body: JSON.stringify({gameId: gameId, userId: userId, defaultName: defaultName})
        })
    );
}

export function retrieveNames(gameId: string) {
    return (
        fetch('../api/retrieveNames', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },          
            body: JSON.stringify({gameId: gameId})
        })
    );
}

export function updateName(userId: string, newNickname: string) {
    return(
        fetch('../api/updateName', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },          
            body: JSON.stringify({userId: userId, newNickName: newNickname})
        })
    );
}