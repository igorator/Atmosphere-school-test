import useSWR from "swr";
import { fetchUsers, MAP_USERS_URL } from "@/api/usersApi";
import type { MapUser } from "@/types/MapUser";

export const useUsers = () => {
  return useSWR<MapUser[]>(MAP_USERS_URL, fetchUsers);
};
