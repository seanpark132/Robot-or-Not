"use client"

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    setGameActive: (value: boolean) => void;
};

interface FormData {
    nickname: string,
    numRounds: number,
    timerSeconds: number
};

export default function Lobby(props: Props) {
    const [gameId, setGameId] = useState("");
    const [formData, setFormData] = useState<FormData>({
        nickname: "",
        numRounds: 5,       
        timerSeconds: 30
    });     

    useEffect(() => {
        setGameId(uuidv4());

    }, []);

    return(
        <div>
            <form className='flex flex-col'>           
                <div className='flex'>
                    <section>                                     
                        <label className="text-lg" htmlFor='link'>Share Link:</label>
                        <div className='flex mb-2'>
                            <input className="lobby-input" type="text" value={`http://localhost:3000/game?${gameId}`} name='link' readOnly/>                        
                            <button className="bg-dark-blue p-2" type="button" onClick={() => handleCopy()}>Copy</button>
                        </div>                                 
                        <label className="text-lg" htmlFor='nickname'>Nickname:</label>
                        <div className='flex'>
                            <input 
                                className="lobby-input" 
                                type="text" 
                                value={formData.nickname}
                                name="nickname"
                                onChange={(e) => handleChange(e)}
                            />                    
                        </div>
                        <h2 className='mt-6 underline'>Lobby Settings</h2>
                        <div className='w-full'>
                            <div className='flex mt-2 w-full'>
                                <p className='w-1/4'># of rounds:</p>
                                <div className='flex w-2/3 justify-around'>
                                    <button className={formData.numRounds === 5 ? 'lobby-highlight': 'px-1'} type='button' onClick={() => handleSettingButton('numRounds', 5)}>5</button>
                                    <button className={formData.numRounds === 10 ? 'lobby-highlight': 'px-1'} type='button' onClick={() => handleSettingButton('numRounds', 10)}>10</button>
                                    <button className={formData.numRounds === 15 ? 'lobby-highlight': 'px-1'} type='button' onClick={() => handleSettingButton('numRounds', 15)}>15</button>
                                    <button className={formData.numRounds === 20 ? 'lobby-highlight': 'px-1'} type='button' onClick={() => handleSettingButton('numRounds', 20)}>20</button>
                                </div>      
                            </div>      
                            <div className='flex mt-2'>
                                <p className='w-1/4'>Round Timer:</p>
                                <div className='flex w-2/3 justify-around'>
                                    <button className={formData.timerSeconds === 30 ? 'lobby-highlight': 'px-1'} type='button' onClick={() => handleSettingButton('timerSeconds', 30)}>30s</button>
                                    <button className={formData.timerSeconds === 45 ? 'lobby-highlight': 'px-1'} type='button' onClick={() => handleSettingButton('timerSeconds', 45)}>45s</button>
                                    <button className={formData.timerSeconds === 60 ? 'lobby-highlight': 'px-1'} type='button' onClick={() => handleSettingButton('timerSeconds', 60)}>60s</button>
                                    <button className={formData.timerSeconds === 90 ? 'lobby-highlight': 'px-1'} type='button' onClick={() => handleSettingButton('timerSeconds', 90)}>90s</button>
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
        setFormData(prev  => {
            return {
                ...prev,
                [name]: value
            };
        });
    };

    function handleSettingButton(setting:string, n: number) {
        setFormData(prev => {
            return {
                ...prev,
                [setting]: n
            }
        });
    };
};