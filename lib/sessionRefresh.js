"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SessionRefresher() {
  const { update } = useSession();

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("SessionRefresher: update called"); //TRYING
      update();
    }, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, [update]);

  return null;
}
