import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addSignup(name, email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signupCount"] });
      queryClient.invalidateQueries({ queryKey: ["signups"] });
    },
  });
}
