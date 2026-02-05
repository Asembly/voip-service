export interface SignalDto{
    event: SignalEvent, 
    data: Object,
    clientId: string
}

export enum SignalEvent{
    ANSWER="answer",
    OFFER="offer",
    CANDIDATE="candidate"
}