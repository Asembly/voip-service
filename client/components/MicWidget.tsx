import { RefObject } from "react";
import { Footer } from "./Footer";
import { MicStatus } from "./MicStatus";
import { RecordButton } from "./RecordButton";

export function MicWidget(props: {isMute: boolean, setIsMute: (arg: any) => void, trackStream: RefObject<MediaStreamTrack| null>}) {

  return (
    <div className="bg-gray-800 rounded-2xl p-8 w-full border border-gray-700">
      <MicStatus isRecording={props.isMute}/>
      <RecordButton 
        isMute={props.isMute} 
        onClick={() => {
          props.setIsMute(!props.isMute)
          if(props.trackStream.current != null)
          {
            console.log(props.isMute)
            props.trackStream.current.enabled = !props.isMute
          }
        }} 
      />
      <Footer />
    </div>
  );
}