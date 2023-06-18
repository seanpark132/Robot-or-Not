"use client"

import { useState, useEffect } from 'react';
import { generateAIResponse, generateQuestions } from '../../../../../lib/utils';
import Loading from './Loading';
import Main from './Main';

export default function Game() {
    const [isLoading, setIsLoading] = useState(true);      
    const [questionArray, setQuestionArray] = useState<string[]>([]);
    const [responseArray, setResponseArray] = useState<string[]>([]);
    const [question, setQuestion] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [userResponse, setUserResponse] = useState("");

    useEffect(() => {
        const generate = async () => {
            const questions = await generateQuestions();

            setQuestionArray(questions);
            setQuestion(questions[0]);  
           
            const firstResponse = await generateAIResponse(questions[0])
            setAiResponse(firstResponse);
            setIsLoading(false); 

            const questionsExceptFirst = questions.slice(1);

            for (const question of questionsExceptFirst) {
                const res = await generateAIResponse(question);
                setResponseArray(prev => [...prev, res]);
            };
        };
                 
        generate();
    }, []);       
 
    return (
        <section>         
            {isLoading ? <Loading />: 
             <Main
                questionArray={questionArray}
                responseArray={responseArray}
                question={question}
                aiResponse={aiResponse}
                userResponse={userResponse}
                setQuestion={setQuestion}
                setAiResponse={setAiResponse}                
                setUserResponse={setUserResponse}
             />
            }                  
        </section>       
    );
};