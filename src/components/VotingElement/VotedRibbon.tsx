interface VotedRibbonProps {
  eventClosed: boolean;
  votesAmount: number;
}

const VotedRibbon = ({ eventClosed, votesAmount }: VotedRibbonProps) => {
  return (
    <div
      className={
        "absolute -left-[5px] -top-[5px] z-10 overflow-hidden w-[75px] h-[75px] text-right block backface-hidden"
      }
    >
      <span
        className={
          "text-[10px] font-bold text-white uppercase text-center leading-5 -rotate-45 w-[100px] block bg-[linear-gradient(#f79e05_0%,_#8f5408_100%)] [box-shadow:0_3px_10px_-5px_rgba(0,_0,_0,_1)] absolute top-[19px] -left-[21px]"
        }
      >
        <span className="absolute left-0 top-full border-l-[#8f5408] border-solid border-[3px] border-t-[#8f5408] border-r-transparent border-b-transparent"></span>
        {eventClosed ? `Votes: ${votesAmount.toString()}` : "Voted"}
        <span className="absolute right-0 top-full border-l-transparent border-solid border-[3px] border-t-[#8f5408] border-r-[#8f5408] border-b-transparent"></span>
      </span>
    </div>
  );
};
export default VotedRibbon;
