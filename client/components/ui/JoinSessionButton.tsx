import { sendRoute } from "@/utils/const";
import { SignalDto, SignalEvent } from "@/utils/types";
import { Client } from "@stomp/stompjs";
import { RefObject } from "react";

export function JoinSessionButton(props: {
  pcRef: RefObject<RTCPeerConnection | null>;
  stompRef: RefObject<Client | null>;
  clientId: string;
  micRef: RefObject<HTMLAudioElement | null>;
  localTrackRef: RefObject<MediaStreamTrack | null>;
  audioRef: RefObject<HTMLAudioElement | null>;
  setIsConnection: (arg: any) => void;
}) {
  const joinConnection = async () => {
    const pc: RTCPeerConnection = props.pcRef.current!;

    const stompClient = props.stompRef.current;

    pc.ondatachannel = (event) => {
      console.log("Join to channel: ", event.channel);
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        stompClient?.publish({
          destination: sendRoute,
          body: JSON.stringify({
            event: SignalEvent.CANDIDATE,
            data: event.candidate,
            clientId: props.clientId,
          } as SignalDto),
        });
      }
    };

    try {
      if (!props.micRef?.current || !props.audioRef?.current || !pc) return;
      const mic = props.micRef.current!;
      const audio = props.audioRef.current!;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      mic.srcObject = stream; 

      stream.getAudioTracks().forEach((track) => {
        pc.addTrack(track, stream);
        props.localTrackRef.current = track; 
        console.log("🔸 addTrack:", track.kind, track.id);
      });

      pc.ontrack = (event) => {
        console.log("Remote stream:", event.streams[0]?.id);
        audio.srcObject = event.streams[0];
        audio.play().catch((e) => console.log("Audio play fail:", e)); // ✅
      };
    } catch (err) {
      console.error("Media error:", err); 
    }

    pc.onconnectionstatechange = (event) => {
      if (pc.connectionState != null)
      {
        console.log("🔗 Connection:", pc.connectionState);
        props.setIsConnection(true)
      }
    };
  };

  return (
    <div>
      <button
        onClick={joinConnection}
        className="bg-indigo-500 hover:bg-indigo-600 text-white w-full h-10 rounded-lg"
      >
        Присоединится
      </button>
    </div>
  );
}
