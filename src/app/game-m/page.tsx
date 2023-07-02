"use client"

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import LobbyMaster from '@/app/components/Game/M/LobbyMaster'
import LobbyGuest from '@/app/components/Game/M/LobbyGuest';
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
    const [numPlayers, setNumPlayers] = useState(1);
    const [isLobbyMaster, setIsLobbyMaster] = useState(false);
    const [isError, setIsError] = useState(false);

    const searchParams = useSearchParams();    
    const sharedGameId = searchParams.get("id");

   useEffect(() => {
        if (searchParams) {
            if (sharedGameId) {
                setGameId(sharedGameId);                
            } else {                
                setGameId(uuidv4());  
                setIsLobbyMaster(true);            
            };   
            setUserId(uuidv4());                    
        };
    }, [searchParams]);

    if (isError) {
        return(
            <main className='flex min-h-screen flex-col items-center justify-center px-10 py-16'>     
                <h1 className='text-5xl'>Something went wrong!</h1>      
            </main>
        )
    };

    return (
        <main className='flex min-h-screen flex-col items-center justify-center px-10 py-16'>           
            {gameActive ? 
                <Game 
                    isError={isError}
                    setIsError={setIsError}
                    gameId={gameId} 
                    userId={userId} 
                    settings={settings} 
                    numPlayers={numPlayers} 
                    isLobbyMaster={isLobbyMaster} 
                />        
                :(gameId.length > 0 &&      
                    (sharedGameId ? 
                        <LobbyGuest 
                            isError={isError}
                            setIsError={setIsError}
                            gameId={gameId} 
                            userId={userId} 
                            setSettings={setSettings} 
                            setGameActive={setGameActive}
                        />
                        :<LobbyMaster    
                            isError={isError}
                            setIsError={setIsError}
                            gameId={gameId}     
                            userId={userId}        
                            settings={settings} 
                            setSettings={setSettings} 
                            setGameActive={setGameActive}    
                            setNumPlayers={setNumPlayers}                                       
                        />
                    )
                )
            }
        </main>
    )
}   

