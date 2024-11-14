import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const usePolling = (ms: number) => {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => {
      router.refresh();
    }, ms);
    return () => clearInterval(id);
  }, []);
};
