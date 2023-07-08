'use client'

import { readyCheck } from '@root/lib/utils';
import { useState, useEffect } from 'react';

interface Props {    
    isError: boolean;
    setIsError: (value: boolean) => void;
    gameId: string,
    userId: string,
    score: number;
    roundNumber: number;
    numRounds: number;
    selectedResponse: string;   
    humanResponse: string; 
    senderNickname: string;
    setRoundNumber: (value: ((value:number) => number)) => void;  
};

export default function Score(props: Props) {
    const [didUserSubmit, setDidUserSubmit] = useState(false);   
    const [isCorrect, setIsCorrect] = useState<boolean>(true);
 
    useEffect(() => {
        const reset = async () => {   
            if (props.humanResponse === props.selectedResponse) {
                setIsCorrect(true);
            } else {
                setIsCorrect(false);
            };         
        };    

        reset();
    }, [])
    
    const Correct = () => {
        return (
            <div className="flex flex-col items-center text-center">
                <em><p className="text-6xl text-green-400 font-extrabold ani-scale">Correct!</p></em>
                <h2 className="mt-6 break-normal text-green-400 fade-in-1">{props.selectedResponse}</h2>
                <h2 className="my-4 text-green-400 fade-in-1">was {props.senderNickname}&apos;s response!</h2>
                <h2 className='fade-in-2'>Current score: {props.score}</h2>
                {didUserSubmit ? <h1 className='mt-8 py-2 px-4 self-center text-center'>Waiting for others...</h1>
                :<button className="btn-submit fade-in-2" onClick={() => handleNextRound()} >Next Round</button>}                         
            </div>
        )
    };

    const Incorrect = () => {
        return (
            <div className="flex flex-col items-center text-center">
                <em><p className="text-6xl text-red-500 font-extrabold ani-scale">Incorrect!</p></em>
                <h2 className="mt-6 break-normal text-red-500 fade-in-1">{props.selectedResponse}</h2>
                <h2 className="my-4 text-red-500 fade-in-1">was a Robot&apos;s response!</h2>
                <h2 className='fade-in-2'>Current score: {props.score}</h2>
                {didUserSubmit ? <h1 className='mt-8 py-2 px-4 self-center text-center'>Waiting for others...</h1>
                :<button className="btn-submit fade-in-2" onClick={() => handleNextRound()} >Next Round</button>}                      
            </div>
        )
    };
    
    return (
        <>
        {isCorrect ? <Correct /> : <Incorrect /> }
        </>    
    );

    async function handleNextRound() {              
        setDidUserSubmit(true);   
        try {
            if (props.roundNumber === props.numRounds) {
                await readyCheck(props.gameId, "endScreen"); 
                return;
            }; 
                   
            props.setRoundNumber(prev => prev + 1);  
            await readyCheck(props.gameId, "write"); 
        } catch(error) {
            props.setIsError(true);
        }; 
    };
};