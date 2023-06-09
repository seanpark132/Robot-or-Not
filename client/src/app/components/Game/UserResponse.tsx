interface Props {
    question: string;
    aiResponse: string;
    userResponse: string;
    setUserResponse: (value: string) => void; 
    setGamePeriod: (value: string) => void;
};

export default function UserResponse(props: Props) {
    
    function handleSubmit() {
        if (props.userResponse.length < 1) {
            alert("Please enter a response with at least 1 word");
            return;
        };
        props.setGamePeriod("select")
        return;
    };

    return(
        <div className="flex flex-col">
            <h2>Question:</h2>
            <p>{props.question}</p>
            <h2 className="mt-6">Robot Response:</h2>
            <p className="mb-6">{props.aiResponse}</p>  
            <label htmlFor="humanResponse">Your Response:</label>
            <textarea 
                className="input-human-response" 
                name="humanResponse"
                value={props.userResponse}
                onChange={(e) => props.setUserResponse(e.target.value)}
            />  
            <div className="mt-1 w-full h-5"><p className="text-sm float-right mr-1">Word Count: 0/30</p></div>
            <button 
                className="btn-submit" 
                onClick={(e) => handleSubmit()}
            >
            Submit
            </button>
        </div>
    );
};