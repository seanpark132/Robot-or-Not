interface Settings {
  numRounds: number;
  timerSeconds: number;
}

interface Props {
  numRounds: number;
  setNumRounds: (value: number) => void;
}

export default function LobbySettings(props: Props) {
  const RoundsButton = (rounds: number) => {
    return (
      <button
        className={props.numRounds === rounds ? "lobby-highlight" : "px-1"}
        type="button"
        onClick={() => props.setNumRounds(rounds)}
      >
        {rounds}
      </button>
    );
  };

  // const TimerButton = (seconds: number) => {
  //     return(
  //         <button
  //             className={props.settings.timerSeconds === seconds ? 'lobby-highlight': 'px-1'}
  //             type='button'
  //             onClick={() => handleSettingButton('timerSeconds', seconds)}
  //         >
  //         {`${seconds}s`}
  //         </button>
  //     );
  // };

  return (
    <>
      <h2 className="mt-6 underline">Lobby Settings</h2>
      <div className="w-full">
        <div className="flex mt-2 w-full">
          <p className="w-1/4"># of rounds:</p>
          <div className="flex w-2/3 justify-around">
            {RoundsButton(5)}
            {RoundsButton(10)}
          </div>
        </div>
        {/* <div className='flex mt-2'>
                    <p className='w-1/4'>Round Timer:</p>
                    <div className='flex w-2/3 justify-around'>
                        {TimerButton(30)}
                        {TimerButton(45)}
                        {TimerButton(60)}                        
                    </div>
                </div>     */}
      </div>
    </>
  );
}
