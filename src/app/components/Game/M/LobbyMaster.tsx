"use client"

import { useState, useEffect } from 'react';
import LobbySettings from './LobbySettings';
import { addUser, animals, initGame, retrieveNames, updateName } from '../../../../../lib/utils';
import { pusherClient } from '../../../../../lib/pusher';

interface Settings {    
    numRounds: number,
    timerSeconds: number
};

interface Props { 
    gameId: string;   
    userId: string;
    settings: Settings;
    setSettings: (value: ((value: Settings) => Settings)) => void;
    setGameActive: (value: boolean) => void;
};

export default function LobbyMaster(props: Props) {   
    const [inputName, setInputName] = useState("");    
    const [nameArray, setNameArray] = useState<string[]>([]);   
    
    useEffect(() => {   
        const dbFunctions = async (gameId: string, userId: string, name: string) => {
            await initGame(gameId);
            await addUser(gameId, userId, name);
            await retrieveNames(gameId);                   
        };
        
        const randomNum = (Math.floor(Math.random() * 100) + 1).toString();
        const randomIndex = (Math.floor(Math.random() * animals.length));
        const randomAnimal = animals[randomIndex];
        const defaultName = randomAnimal + randomNum;
        setInputName(defaultName);          
      
        dbFunctions(props.gameId, props.userId, defaultName); 

    }, []);

    useEffect(() => {  
        const channel = pusherClient.subscribe(props.gameId);
        channel.bind("updateNames", (names: string[]) => {
            setNameArray(names);
        });

        return () => {
            pusherClient.unsubscribe(props.gameId);
            pusherClient.unbind("updateNames", (names: string[]) => {
                setNameArray(names)
            });
        };

    }, []);

    return(
        <div className='flex flex-col items-center'>                  
            <div className='lobby-nickname-container'>
                <h2>Joined Users:</h2>
                <div className='flex flex-wrap'>
                    {nameArray.map((nickname, index) => 
                        <h2 key={index} className='py-2 px-8'>{nickname}</h2>    
                    )}   
                </div>              
            </div>                
            <div className='flex'>
                <section>                                     
                <label className="text-lg" htmlFor='link'>Share Link:</label>
                <div className='flex mb-2'>
                    <input className="lobby-input" type="text" value={`http://localhost:3000/game-m?id=${props.gameId}`} name='link' readOnly/>                        
                    <button className="bg-dark-blue p-2" type="button" onClick={() => handleCopy()}>Copy</button>
                </div>                                 
                <label className="text-lg" htmlFor='nickname'>Nickname:</label>
                <div className='flex'>
                    <input 
                        className="lobby-input" 
                        type="text"                                                 
                        value={inputName}                        
                        name="nickname"
                        onChange={(e) => setInputName(e.target.value)}
                    />        
                    <button className="bg-dark-blue py-2 px-4-5" type="button" onClick={() => handleUpdateName()}>OK</button>            
                </div>                        
                <LobbySettings settings={props.settings} setSettings={props.setSettings} />
                </section>
            </div>            
            <button className="btn-submit" type="button" onClick={() => props.setGameActive(true)}>Start Game</button>            
        </div>        
    );
 
    function handleCopy() {
        navigator.clipboard.writeText(`http://localhost:3000/game-m?id=${props.gameId}`);
        alert("URL copied to clipboard");
    };

    async function handleUpdateName() {   
        await updateName(props.userId, inputName);
        await retrieveNames(props.gameId);   
        setInputName("");     
    };    
};