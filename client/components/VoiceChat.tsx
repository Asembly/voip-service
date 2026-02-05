"use client";
import { useEffect, useRef, useState } from "react";
import { JoinSessionButton } from "./ui/JoinSessionButton";
import { CreateSessionButton } from "./ui/CreateSessionButton";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { SignalDto, SignalEvent } from "@/utils/types";
import { v4 } from "uuid";
import { listenRoute, sendRoute } from "@/utils/const";
import { Header } from "./Header";
import { MicWidget } from "./MicWidget";
import { env } from "process";

var clientId: string = v4().substring(0, 8);
const SIGNAL_SERVER_URL = process.env.NEXT_PUBLIC_WEBSOCKET;

export function VoiceChat() {
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const stompRef = useRef<Client | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const micRef = useRef<HTMLAudioElement>(null);
  const localTrackRef = useRef<MediaStreamTrack>(null);

  const [isMute, setIsMute] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const stompClient = new Client({
    webSocketFactory: () =>
      new SockJS(SIGNAL_SERVER_URL || "http://localhost:8081/ws"),
    reconnectDelay: 5000,
  });

  useEffect(() => {

    const iceServers =
      typeof window !== "undefined"
        ? JSON.parse(process.env.NEXT_PUBLIC_ICE_SERVERS || "[]")
        : [];

    stompClient.onConnect = async (event) => {
      console.log("StompJS is connected: ", event.headers);
      console.log("Current client id: ", clientId);

      stompRef.current = stompClient;

      console.log(iceServers);

      const pc = new RTCPeerConnection({ iceServers });
      pcRef.current = pc;
      console.log("Peer created!");

      stompClient.subscribe(listenRoute, async (msg) => {
        console.log("StompJS subscribed to: ", listenRoute);

        const parsed: SignalDto = JSON.parse(msg.body);

        if (!pc || parsed.clientId === clientId) return;

        switch (parsed.event) {
          case SignalEvent.ANSWER:
            await pc.setRemoteDescription(
              new RTCSessionDescription(
                parsed.data as RTCSessionDescriptionInit,
              ),
            );
            break;
          case SignalEvent.CANDIDATE:
            await pc.addIceCandidate(new RTCIceCandidate(parsed.data));
            break;
          case SignalEvent.OFFER:
            await pc.setRemoteDescription(
              new RTCSessionDescription(
                parsed.data as RTCSessionDescriptionInit,
              ),
            );

            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);

            stompClient.publish({
              destination: sendRoute,
              body: JSON.stringify({
                event: SignalEvent.ANSWER,
                data: answer,
                clientId: clientId,
              } as SignalDto),
            });
            break;
        }
      });
    };
    stompClient.activate();
    stompClient.onStompError = (event) => {
      console.log("StompJS error with connected: ", event.body);
    };
  });

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      <Header />
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-center space-y-8">
          <MicWidget
            isMute={isMute}
            setIsMute={setIsMute}
            trackStream={localTrackRef}
          />
          <div
            className="rounded-lg transition-all duration-300 font-medium space-y-5 w-full flex"
            style={{ display: isConnected ? "none" : "initial" }}
          >
            <div>
              <CreateSessionButton
                stompRef={stompRef}
                pcRef={pcRef}
                clientId={clientId}
                audioRef={audioRef}
                localTrackRef={localTrackRef}
                micRef={micRef}
                setIsConnection={setIsConnected}
              />
            </div>
            <div>
              <JoinSessionButton
                stompRef={stompRef}
                pcRef={pcRef}
                clientId={clientId}
                audioRef={audioRef}
                localTrackRef={localTrackRef}
                micRef={micRef}
                setIsConnection={setIsConnected}
              />
            </div>
          </div>
          <div className="w-full flex justify-start font-sans italic text-sm">
            {isConnected ? (
              <div>
                Вы подключены к сессии
                <br></br>
                <span className="opacity-50">можете говорить</span>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
      <audio ref={micRef} autoPlay muted playsInline />
      <audio
        ref={audioRef}
        autoPlay
        onPlay={() => console.log("Audio play")}
        playsInline
      />
    </div>
  );
}
