"use client"

import { useState } from 'react';
import Lobby from '@/app/components/Game/Lobby'
import Game from '@/app/components/Game/Game';
import './game.css'

export default function GamePage() {
    const [gameActive, setGameActive] = useState(false);    

    return (
        <main className='flex min-h-screen flex-col items-center justify-center p-8'>           
            {!gameActive ? <Lobby setGameActive={setGameActive}/>
            :<Game />}          
        </main>
    )
}   

