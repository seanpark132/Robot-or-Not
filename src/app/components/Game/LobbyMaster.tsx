"use client"

import { useState, useEffect, useContext } from 'react';
import { PusherContext } from '@root/lib/pusherContext';
import LobbySettings from './LobbySettings';
import { addUser, animals, distributeSettings, initGame, retrieveNames, updateName } from '@root/lib/utils';

interface Props { 
    isError: boolean;
    setIsError: (value: boolean) => void;
    gameId: string;   
    userId: string;
    settings: Settings;
    setSettings: (value: ((value: Settings) => Settings)) => void;
    setGameActive: (value: boolean) => void;
    setNumPlayers: (value: number) => void;
};

export default function LobbyMaster(props: Props) {   
    const [inputName, setInputName] = useState("");    
    const [nameArray, setNameArray] = useState<string[]>([]); 
    const pusher = useContext(PusherContext);
    const PAGE_URL = window.location.href;
       
    useEffect(() => {        
        const channel = pusher.subscribe(props.gameId);
        channel.bind("updateNames", (names: string[]) => {                      
            setNameArray(names);            
        });

        return () => {
            channel.unsubscribe();            
            channel.unbind("updateNames", (names: string[]) => {               
                setNameArray(names)                
            });           
        };

    }, []);
    
    useEffect(() => {   
        const initLobby = async (gameId: string, userId: string, name: string) => {
            try {
                await initGame(gameId);
                await addUser(gameId, userId, name);            
                await retrieveNames(gameId);  
            } catch(e) {
                props.setIsError(true);          
            };                                  
        };
                
        const randomNum = (Math.floor(Math.random() * 100) + 1).toString();
        const randomIndex = (Math.floor(Math.random() * animals.length));
        const randomAnimal = animals[randomIndex];
        const defaultName = randomAnimal + randomNum;
        setInputName(defaultName);          
      
        initLobby(props.gameId, props.userId, defaultName); 
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
                    <label className="text-lg" htmlFor='shareLink'>Share Link:</label>
                    <div className='flex mb-2'>
                        <input className="lobby-input" type="text" value={`${PAGE_URL}?id=${props.gameId}`} id='shareLink' readOnly/>                        
                        <button className="bg-dark-blue p-2" type="button" onClick={() => handleCopy()}>Copy</button>
                    </div>                                 
                    <label className="text-lg" htmlFor='nickname'>Nickname:</label>
                    <div className='flex'>
                        <input 
                            className="lobby-input" 
                            type="text"                                                 
                            value={inputName}                        
                            id="nickname"
                            onChange={(e) => setInputName(e.target.value)}
                        />        
                        <button className="bg-dark-blue py-2 px-4-5" type="button" onClick={async () => await handleUpdateName()}>OK</button>            
                    </div>                        
                    <LobbySettings settings={props.settings} setSettings={props.setSettings} />    
                </section>               
            </div>            
            <button className="btn-submit" type="button" onClick={() => handleStartGame()}>Start Game</button>            
        </div>        
    );
 
    function handleCopy() {
        navigator.clipboard.writeText(`${PAGE_URL}?id=${props.gameId}`);
        alert("URL copied to clipboard");
    };

    async function handleUpdateName() {   
        await updateName(props.userId, inputName);        
        await retrieveNames(props.gameId);               
        setInputName("");     
    };    

    async function handleStartGame() {     
        if (nameArray.length < 2) {
            alert("A minimum of 2 players are needed for multi-player.")
            return;
        };
        await distributeSettings(props.gameId, props.settings);
        props.setNumPlayers(nameArray.length);
        props.setGameActive(true);
    };

};
