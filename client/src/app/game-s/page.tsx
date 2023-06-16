"use client"

import { useState } from 'react';
import Lobby from '@/app/components/Game/S/Lobby'
import Game from '@/app/components/Game/S/Game';
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

    return (
        <main className='flex min-h-screen flex-col items-center justify-center p-8'>           
            {!gameActive ? <Lobby settings={settings} setSettings={setSettings} setGameActive={setGameActive}/>
            :<Game />}          
        </main>
    )
}   

