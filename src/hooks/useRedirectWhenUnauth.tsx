import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRedirectWhenUnuth(location: string) {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(location);
    }
  }, [status]);

  return {
    status,
  };
}
