declare global {
    interface Settings {    
        numRounds: number,
        timerSeconds: number
    };
    
    interface SingleGameData {
        id: number;
        question: string;
        aiResponse: string;
        userResponse: string | null;
        gameId: string;     
        userId: string;   
    };
};

export {}