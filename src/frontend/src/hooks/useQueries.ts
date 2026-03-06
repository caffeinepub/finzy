import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useActor } from "./useActor";

export function useGetSignupCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["signupCount"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getSignupCount();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetSignups() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["signups"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSignups();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAddSignup() {
  const { actor } = useActor();
  const actorRef = useRef(actor);
  actorRef.current = actor;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
    }: {
      name: string;
      email: string;
      phone?: string;
    }) => {
      // Wait up to 15s for actor to become available
      let resolvedActor = actorRef.current;
      if (!resolvedActor) {
        for (let i = 0; i < 30; i++) {
          await new Promise((r) => setTimeout(r, 500));
          resolvedActor = actorRef.current;
          if (resolvedActor) break;
        }
      }
      if (!resolvedActor)
        throw new Error("Unable to connect. Please refresh and try again.");
      if (phone !== undefined && "addSignupWithPhone" in resolvedActor) {
        return (resolvedActor as any).addSignupWithPhone(
          name,
          email,
          phone ?? "",
        );
      }
      return resolvedActor.addSignup(name, email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signupCount"] });
      queryClient.invalidateQueries({ queryKey: ["signups"] });
    },
  });
}
