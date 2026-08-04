import { useEffect, useRef, useState, useCallback } from "react";
import * as signalR from "@microsoft/signalr";
import type { ProgressMessage } from "../types";

const HUB_URL = "http://localhost:5191/timetableProgressHub";

export function useTimetableHub() {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [progress, setProgress] = useState<ProgressMessage | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL)
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveProgress", (data: ProgressMessage) => {
      setProgress(data);
    });

    connection.onreconnecting(() => setIsConnected(false));
    connection.onreconnected(() => setIsConnected(true));
    connection.onclose(() => setIsConnected(false));

    connection
      .start()
      .then(() => setIsConnected(true))
      .catch((err) => console.error("SignalR connection error:", err));

    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, []);

  const joinGroup = useCallback(async (timetableId: string) => {
    if (connectionRef.current?.state !== signalR.HubConnectionState.Connected) {
      throw new Error("SignalR connection is not established.");
    }
    await connectionRef.current.invoke("JoinTimetableGroup", timetableId);
  }, []);

  const leaveGroup = useCallback(async (timetableId: string) => {
    if (connectionRef.current?.state !== signalR.HubConnectionState.Connected) return;
    try {
      await connectionRef.current.invoke("LeaveTimetableGroup", timetableId);
    } catch (err) {
      console.error("LeaveTimetableGroup error:", err);
    }
  }, []);

  return { progress, isConnected, joinGroup, leaveGroup };
}
