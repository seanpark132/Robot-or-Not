"use client"

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'next/navigation'

interface FormData {
    nickname: string,
    numRounds: number,
    timerSeconds: number
};

interface Props {
    formData: FormData;
    setFormData: (value: ((value: FormData) => FormData)) => void;
    setGameActive: (value: boolean) => void;
};

export default function Lobby(props: Props) {
    const [gameId, setGameId] = useState("");
    const searchParams = useSearchParams();   
    const sharedGameId = searchParams.get("id");
    
    useEffect(() => {
        const uid = uuidv4();
        setGameId(uid);     
    }, []);
    
    const RoundsButton = (rounds :number) => {
        return(      
        <button 
            className={props.formData.numRounds === rounds ? 'lobby-highlight': 'px-2'} 
            type='button' 
            onClick={() => handleSettingButton('numRounds', rounds)}
            >
            {rounds}
        </button>              
        );
    };

    const TimerButton = (seconds: number) => {
        return(
            <button 
                className={props.formData.timerSeconds === seconds ? 'lobby-highlight': 'px-2'} 
                type='button' 
                onClick={() => handleSettingButton('timerSeconds', seconds)}
            >
            {`${seconds}s`}
            </button>
        )
    };

    return(
        <div>   
            <div>
                {gameId}
            </div>
            <form className='flex flex-col'>           
                <div className='flex'>
                    <section>    
                        <h2 className='mt-6 underline'>Lobby Settings</h2>
                        <div className='w-full'>
                            <div className='flex mt-2 w-full'>
                                <p className='w-1/4'># of rounds:</p>
                                <div className='flex w-2/3 justify-around'>
                                    {RoundsButton(5)}
                                    {RoundsButton(10)}
                                    {RoundsButton(15)}
                                    {RoundsButton(20)}                                    
                                </div>      
                            </div>      
                            <div className='flex mt-2'>
                                <p className='w-1/4'>Round Timer:</p>
                                <div className='flex w-2/3 justify-around'>
                                    {TimerButton(30)}
                                    {TimerButton(45)}
                                    {TimerButton(60)}
                                    {TimerButton(90)}
                                </div>
                            </div>    
                        </div>         
                    </section>
                </div>
                <button className="btn-submit" type="button" onClick={() => props.setGameActive(true)}>Start Game</button>
            </form>
        </div>        
    );
 
    function handleSettingButton(setting:string, n: number) {
        props.setFormData(prev => {
            return {
                ...prev,
                [setting]: n
            }
        });
    };
};