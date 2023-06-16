"use client"

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { io } from "socket.io-client";
import LobbySettings from './LobbySettings';
import { animals } from '../../../../../lib/utils';

const socket = io("http://localhost:3001")

interface Settings {    
    numRounds: number,
    timerSeconds: number
};

interface Props {
    setName: (value: string) => void;
    settings: Settings;
    setSettings: (value: ((value: Settings) => Settings)) => void;
    setGameActive: (value: boolean) => void;    
    sharedGameId: string | null
};

export default function Lobby(props: Props) {
    const [gameId, setGameId] = useState("");
    const [inputName, setInputName] = useState("");
    const [isLobbyMaster, setIsLobbyMaster] = useState(true);   
    const [nameArray, setNameArray] = useState<string[]>([]);   
    
    useEffect(() => {        
        const randomNum = (Math.floor(Math.random() * 100) + 1).toString();
        const randomIndex = (Math.floor(Math.random() * animals.length));
        const randomAnimal = animals[randomIndex];
        const defaultName = randomAnimal + randomNum;
        setInputName(defaultName);  

        if (props.sharedGameId) {     
            setGameId(props.sharedGameId);  
            setIsLobbyMaster(false);

            socket.emit("join-room", props.sharedGameId);             
            socket.emit("data-to-room", defaultName, "new-name", props.sharedGameId);                          
        } else {
            setNameArray(prev => [...prev, defaultName]);
            const uid = uuidv4();            
            setGameId(uid);      
                 
            socket.emit("join-room", uid);  
                
            socket.on("new-name", newName => {                
                setNameArray(prev => {
                    const newNameArray = [...prev, newName]
                    socket.emit("data-to-room", newNameArray, "name-array", uid )
                    return newNameArray
                });                                    
            });                                 
        };

        socket.on("name-array", updatedNameArray => {            
            setNameArray(updatedNameArray);            
        });   

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
                    <input className="lobby-input" type="text" value={`http://localhost:3000/game-m?id=${gameId}`} name='link' readOnly/>                        
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
                    <button className="bg-dark-blue py-2 px-4-5" type="button" onClick={() => handleNameButton()}>OK</button>            
                </div>                        
                {isLobbyMaster && <LobbySettings settings={props.settings} setSettings={props.setSettings} />}
                </section>
            </div>
            {isLobbyMaster ? <button className="btn-submit" type="button" onClick={() => props.setGameActive(true)}>Start Game</button>: 
            <h2 className='mt-6 self-center'>Waiting for lobby maker to start...</h2>}            
        </div>        
    );
 
    function handleCopy() {
        navigator.clipboard.writeText(`http://localhost:3000/game-m?id=${gameId}`);
        alert("URL copied to clipboard");
    };

    function handleNameButton() {    
    };    

};