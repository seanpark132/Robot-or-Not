"use client"

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import LobbyMaster from '@/app/components/Game/M/LobbyMaster'
import Game from '@/app/components/Game/M/Game';
import '../game.css'
 
interface Settings {    
    numRounds: number,
    timerSeconds: number
};

export default function GameMPage() {
    const [gameActive, setGameActive] = useState(false);   
    const [gameId, setGameId] = useState("");
    const [userId, setUserId] = useState("");
    const [settings, setSettings] = useState<Settings>({        
        numRounds: 5,       
        timerSeconds: 30 
    });      
    const searchParams = useSearchParams();    
    const sharedGameId = searchParams.get("id");

   useEffect(() => {
        if (searchParams) {
            if (sharedGameId) {
                setGameId(sharedGameId);                
            } else {                
                setGameId(uuidv4());              
            };   
            setUserId(uuidv4());                    
        };
    }, [searchParams]);

    return (
        <main className='flex min-h-screen flex-col items-center justify-center p-8'>           
            {gameActive ? <Game />:          
                (gameId.length > 0 &&      
                    (sharedGameId ? <h1>lol</h1>:
                        <LobbyMaster    
                            gameId={gameId}     
                            userId={userId}        
                            settings={settings} 
                            setSettings={setSettings} 
                            setGameActive={setGameActive}                                           
                        />
                    )
                )
            }
        </main>
    )
}   

