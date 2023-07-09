'use client'

import { readyCheck } from '@root/lib/utils';
import { useState, useEffect } from 'react';
import Correct from './Correct';
import Incorrect from './Incorrect';

interface Props {    
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

    return (
        <>
            {isCorrect ? 
            <Correct 
                score={props.score}
                selectedResponse={props.selectedResponse}
                humanResponse={props.humanResponse}
                senderNickname={props.senderNickname}
                didUserSubmit={didUserSubmit}
                handleNextRound={handleNextRound}
            /> 
            :<Incorrect
                score={props.score}
                selectedResponse={props.selectedResponse}
                humanResponse={props.humanResponse}
                senderNickname={props.senderNickname}
                didUserSubmit={didUserSubmit}
                handleNextRound={handleNextRound}
            /> 
            }
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