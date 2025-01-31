import { DialogContent } from "@mui/material";
import { FC } from "react";
import TutorialAcceptance from "../TutorialAcceptance/TutorialAcceptance";

interface WebSuggestionTutorialOverlayProps {
  closeDialog: () => void;
}

const WebSuggestionTutorialOverlay: FC<WebSuggestionTutorialOverlayProps> = ({
  closeDialog,
}) => {
  return (
    <DialogContent>
      <div className={"flex text-center items-center justify-center flex-col"}>
        <img
          className={"max-h-[60vh]"}
          alt="Example to show tutorial workings"
          src="https://filmabend-bucket.s3.eu-central-1.amazonaws.com/posters/tt0371746.jpg"
        ></img>
        <div
          className={
            "h-[750px] max-h-[60vh] max-w-[20vh] opacity-40 absolute w-[248px]-translate-x-1/2 bg-red-500 border-r-dashed border-r-2 border-r-white"
          }
        ></div>
        <div
          className={
            "h-[750px] max-h-[60vh] max-w-[20vh] opacity-40 absolute w-[250px] translate-x-1/2 bg-green-500"
          }
        ></div>
      </div>
      <div>
        To add the movie to the current event, click the <b>right</b> side of
        the image. <br />
        To decline adding the movie to the current event, click the <b>
          left
        </b>{" "}
        side of the image. <br />
      </div>
      <TutorialAcceptance closeDialog={closeDialog}></TutorialAcceptance>
    </DialogContent>
  );
};

export default WebSuggestionTutorialOverlay;
