"use client"

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import Lobby from '@/app/components/Game/M/Lobby'
import Game from '@/app/components/Game/M/Game';
import '../game.css'
 
interface Settings {    
    numRounds: number,
    timerSeconds: number
};

export default function GameMPage() {
    const [gameActive, setGameActive] = useState(false);   
    const [settings, setSettings] = useState<Settings>({        
        numRounds: 5,       
        timerSeconds: 30 
    });  
    const [isParamsChecked, setIsParamsChecked] = useState(false);

    const searchParams = useSearchParams();    
    const sharedGameId = searchParams.get("id");

   useEffect(() => {
        if (searchParams) {
            setIsParamsChecked(true);
        };
    },[searchParams]);

    return (
        <main className='flex min-h-screen flex-col items-center justify-center p-8'>           
            {gameActive ? <Game />:          
                isParamsChecked &&      
                <Lobby                     
                    settings={settings} 
                    setSettings={setSettings} 
                    setGameActive={setGameActive}   
                    sharedGameId={sharedGameId}                 
                />
            }          
        </main>
    )
}   

