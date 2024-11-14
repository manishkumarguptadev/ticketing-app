"use client";
import { usePolling } from "@/hooks/usePolling";

export default function Poller({ ms }: { ms: number }) {
  usePolling(ms);
  return <></>;
}
