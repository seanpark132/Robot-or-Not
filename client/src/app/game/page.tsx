"use client"

import { useState } from 'react';
import Game from '@/app/components/Game/Game';
import './game.css'

export default function GamePage() {
    const [gameActive, setGameActive] = useState(false);

    return (
        <main className='flex min-h-screen flex-col items-center justify-center p-8'>           
            {!gameActive ? <button className="text-5xl"onClick={() => setGameActive(true)}>Start Game</button>
            :<Game />}          
        </main>
    )
}   

