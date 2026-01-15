import type { MapUser } from "@/types/MapUser";

export const MAP_USERS_URL = "/data/users.json";

export const fetchUsers = async (url: string): Promise<MapUser[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch map users.");
  }

  return response.json() as Promise<MapUser[]>;
};
