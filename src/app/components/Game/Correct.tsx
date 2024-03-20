interface Props {
  score: number;
  selectedResponse: string;
  humanResponse: string;
  senderNickname: string;
  didUserSubmit: boolean;
  handleNextRound: () => void;
}

export default function Correct(props: Props) {
  return (
    <div className="flex flex-col items-center text-center">
      <em>
        <p className="text-6xl text-green-400 font-extrabold ani-scale">
          Correct!
        </p>
      </em>
      <h2 className="mt-6 break-normal text-green-400 fade-in-500ms">
        {props.selectedResponse}
      </h2>
      <h2 className="my-4 text-green-400 fade-in-500ms">
        was {props.senderNickname}&apos;s response!
      </h2>
      <h2 className="fade-in-1">Current score: {props.score}</h2>
      {props.didUserSubmit ? (
        <h1 className="mt-8 py-2 px-4 self-center text-center">
          Waiting for others...
        </h1>
      ) : (
        <button
          className="btn-submit fade-in-1"
          onClick={() => props.handleNextRound()}
        >
          Next Round
        </button>
      )}
    </div>
  );
}
