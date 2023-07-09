declare global {
    
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