import { createContext, useContext, useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import * as signalR from "@microsoft/signalr";
import type { ProgressMessage } from "../types";

const HUB_URL = import.meta.env.VITE_HUB_URL;

interface TimetableHubContextValue {
  progress: ProgressMessage | null;
  isConnected: boolean;
  isProcessing: boolean;
  isCompleted: boolean;
  activeTimetableId: string | null;
  startProcessing: (timetableId: string) => Promise<void>;
  cancelProcessing: () => Promise<void>;
}

const TimetableHubContext = createContext<TimetableHubContextValue | null>(null);

// Mounted once at the app root so the connection survives page navigation.
export function TimetableHubProvider({ children }: { children: ReactNode }) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const activeTimetableIdRef = useRef<string | null>(null);
  const [progress, setProgress] = useState<ProgressMessage | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTimetableId, setActiveTimetableId] = useState<string | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL)
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveProgress", (data: ProgressMessage) => {
      setProgress(data);

      if (data.status === 2 && activeTimetableIdRef.current) {
        connection
          .invoke("LeaveTimetableGroup", activeTimetableIdRef.current)
          .catch((err) => console.error("LeaveTimetableGroup error:", err));
        activeTimetableIdRef.current = null;
        setActiveTimetableId(null);
        setIsProcessing(false);
        setIsCompleted(true);
      }
    });

    connection.onreconnecting(() => setIsConnected(false));
    connection.onreconnected(() => {
      setIsConnected(true);
      // Rejoin the group in case the reconnect dropped the previous membership.
      if (activeTimetableIdRef.current) {
        connection
          .invoke("JoinTimetableGroup", activeTimetableIdRef.current)
          .catch((err) => console.error("JoinTimetableGroup error:", err));
      }
    });
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

  const startProcessing = useCallback(async (timetableId: string) => {
    if (connectionRef.current?.state !== signalR.HubConnectionState.Connected) {
      throw new Error("SignalR connection is not established.");
    }
    await connectionRef.current.invoke("JoinTimetableGroup", timetableId);
    activeTimetableIdRef.current = timetableId;
    setActiveTimetableId(timetableId);
    setProgress(null);
    setIsCompleted(false);
    setIsProcessing(true);
  }, []);

  // Requires a matching "CancelTimetableGeneration" hub method on the backend.
  const cancelProcessing = useCallback(async () => {
    const timetableId = activeTimetableIdRef.current;
    if (!timetableId || connectionRef.current?.state !== signalR.HubConnectionState.Connected) return;

    try {
      await connectionRef.current.invoke("CancelTimetableGeneration", timetableId);
    } catch (err) {
      console.error("CancelTimetableGeneration error:", err);
    } finally {
      await connectionRef.current
        .invoke("LeaveTimetableGroup", timetableId)
        .catch((err) => console.error("LeaveTimetableGroup error:", err));
      activeTimetableIdRef.current = null;
      setActiveTimetableId(null);
      setIsProcessing(false);
      setIsCompleted(false);
      setProgress(null);
    }
  }, []);

  return (
    <TimetableHubContext.Provider
      value={{ progress, isConnected, isProcessing, isCompleted, activeTimetableId, startProcessing, cancelProcessing }}
    >
      {children}
    </TimetableHubContext.Provider>
  );
}

export function useTimetableHub() {
  const ctx = useContext(TimetableHubContext);
  if (!ctx) {
    throw new Error("useTimetableHub must be used within a TimetableHubProvider");
  }
  return ctx;
}
