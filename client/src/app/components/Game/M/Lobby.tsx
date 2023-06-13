"use client"

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'next/navigation'
import { io } from "socket.io-client";

const socket = io("http://localhost:3001")

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
        if (sharedGameId) {
            setGameId(sharedGameId);   
            socket.emit("join-room", sharedGameId)     
        } else {
            const uid = uuidv4();
            setGameId(uid);
            socket.emit("join-room", uid);
        };

    }, []);
    
    const RoundsButton = (rounds :number) => {
        return(
            <button 
                className={props.formData.numRounds === rounds ? 'lobby-highlight': 'px-1'} 
                type='button' 
                onClick={() => handleSettingButton('numRounds', rounds)}
            >
            {rounds}
            </button>
        )
    };

    const TimerButton = (seconds: number) => {
        return(
            <button 
                className={props.formData.timerSeconds === seconds ? 'lobby-highlight': 'px-1'} 
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
                        <label className="text-lg" htmlFor='link'>Share Link:</label>
                        <div className='flex mb-2'>
                            <input className="lobby-input" type="text" value={`http://localhost:3000/game?id=${gameId}`} name='link' readOnly/>                        
                            <button className="bg-dark-blue p-2" type="button" onClick={() => handleCopy()}>Copy</button>
                        </div>                                 
                        <label className="text-lg" htmlFor='nickname'>Nickname:</label>
                        <div className='flex'>
                            <input 
                                className="lobby-input" 
                                type="text" 
                                value={props.formData.nickname}
                                name="nickname"
                                onChange={(e) => handleChange(e)}
                            />                    
                        </div>
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
 
    function handleCopy() {
        navigator.clipboard.writeText(`http://localhost:3000/game?${gameId}`);
        alert("URL copied to clipboard");
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        props.setFormData(prev  => {
            return {
                ...prev,
                [name]: value
            };
        });
    };

    function handleSettingButton(setting:string, n: number) {
        props.setFormData(prev => {
            return {
                ...prev,
                [setting]: n
            }
        });
    };
};