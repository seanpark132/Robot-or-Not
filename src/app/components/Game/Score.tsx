'use client'

import { useState, useEffect } from 'react';
import { updateUserIsReady } from '../../../../lib/utils';


interface Props {    
    isError: boolean;
    setIsError: (value: boolean) => void;
    gameId: string,
    userId: string,
    score: number;
    roundNumber: number;
    maxRounds: number;
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

            await updateUserIsReady(props.gameId, props.userId, false, "score");  
        };    

        reset();
    }, [])
    
    const Correct = () => {
        return (
            <div className="flex flex-col items-center text-center">
                <em><p className="text-6xl text-green-400 font-extrabold">Correct!</p></em>
                <h2 className="font-normal mt-6 break-normal">{props.selectedResponse}</h2>
                <h2 className="my-4 text-green-400">was {props.senderNickname}&apos;s response!</h2>
                <h2>Current score: {props.score}</h2>
                {didUserSubmit ? <h1 className='mt-8 py-2 px-4 self-center text-center'>Waiting for others...</h1>
                :<button className="btn-submit" onClick={() => handleNextRound()} >Next Round</button>}                         
            </div>
        )
    };

    const Incorrect = () => {
        return (
            <div className="flex flex-col items-center text-center">
                <em><p className="text-6xl text-red-500 font-extrabold">Incorrect!</p></em>
                <h2 className="font-normal mt-6 break-normal">{props.selectedResponse}</h2>
                <h2 className="my-4 text-red-500">was a Robot&apos;s response!</h2>
                <h2>Current score: {props.score}</h2>
                {didUserSubmit ? <h1 className='mt-8 py-2 px-4 self-center text-center'>Waiting for others...</h1>
                :<button className="btn-submit" onClick={() => handleNextRound()} >Next Round</button>}                      
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
        if (props.roundNumber === props.maxRounds) {
            await updateUserIsReady(props.gameId, props.userId, true, "endScreen"); 
            return;
        }; 
               
        props.setRoundNumber(prev => prev + 1);  
        await updateUserIsReady(props.gameId, props.userId, true, "write"); 
    };
};