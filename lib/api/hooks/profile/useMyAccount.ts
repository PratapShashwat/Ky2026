import { useQuery } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import {
  MyProfileWithAccountProgressQuery,
  type MyAccountResponseType,
} from "@/lib/api/graphql/queries/user.queries";

/**
 * Hook to fetch the current user's account data via GraphQL
 * Returns combined profile (Prisma) + progress (MongoDB) data
 */
export function useMyAccount() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.user;

  const { data, loading, error, refetch } = useQuery<MyAccountResponseType>(
    MyProfileWithAccountProgressQuery,
    {
      skip: !isAuthenticated,
      fetchPolicy: "cache-first", // Use cache, only fetch if not in cache
    },
  );

  return {
    // Data
    account: data?.myAccount ?? null,
    profile: data?.myAccount?.profile ?? null,
    progress: data?.myAccount?.progress ?? null,

    // Status
    isLoading: loading,
    isError: !!error,
    error,

    // Actions
    refetch,
  };
}
