import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { MapUser } from "../types/MapUser.ts";

const USERS_QUANTITY: number = 10000;

const INTERESTS: string[] = [
  "music",
  "react",
  "hiking",
  "travel",
  "photography",
  "gaming",
  "cooking",
  "design",
  "fitness",
  "movies",
  "reading",
  "cycling",
  "art",
  "swimming",
  "tech",
];

const FIRST_NAMES: string[] = [
  "Alex",
  "Sam",
  "Taylor",
  "Jamie",
  "Jordan",
  "Casey",
  "Riley",
  "Morgan",
  "Avery",
  "Quinn",
];

const LAST_NAMES: string[] = [
  "Miller",
  "Johnson",
  "Williams",
  "Brown",
  "Davis",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
];

const COORDINATES_RANGE = {
  LAT: { MIN: -70, MAX: 70 },
  LON: { MIN: -140, MAX: 140 },
};

type SeedMapUsersOptions = {
  usersQuantity: number;
  interests: readonly string[];
  outputDir?: string;
  fileName?: string;
};

const DEFAULT_OUTPUT_DIR = "public/data";
const DEFAULT_OUTPUT_FILE = "mapUsers.json";

const randomItem = <T>(items: readonly T[]): T => {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
};

const randomSubset = (items: readonly string[]): string[] => {
  const count = Math.max(1, Math.floor(Math.random() * 3) + 1);
  const pool = [...items];
  const result: string[] = [];

  for (let i = 0; i < count; i += 1) {
    const index = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(index, 1)[0]);
  }

  return result;
};

const randomCoordinate = (min: number, max: number): number => {
  return Number((Math.random() * (max - min) + min).toFixed(6));
};

const generateUsers = (
  usersQuantity: number,
  interests: readonly string[],
): MapUser[] => {
  if (interests.length === 0) {
    throw new Error("Interests list cannot be empty.");
  }

  return Array.from({ length: usersQuantity }, (_, index) => ({
    id: index + 1,
    name: `${randomItem(FIRST_NAMES)} ${randomItem(LAST_NAMES)}`,
    interests: randomSubset(interests),
    lat: randomCoordinate(COORDINATES_RANGE.LAT.MIN, COORDINATES_RANGE.LAT.MAX),
    lon: randomCoordinate(COORDINATES_RANGE.LON.MIN, COORDINATES_RANGE.LON.MAX),
  }));
};

const seedMapUsersJSON = async ({
  usersQuantity = USERS_QUANTITY,
  interests = INTERESTS,
  outputDir = DEFAULT_OUTPUT_DIR,
  fileName = DEFAULT_OUTPUT_FILE,
}: SeedMapUsersOptions): Promise<string> => {
  const users = generateUsers(usersQuantity, interests);
  const outputPath = join(process.cwd(), outputDir, fileName);

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, JSON.stringify(users, null, 2), "utf8");

  return outputPath;
};

seedMapUsersJSON({ usersQuantity: USERS_QUANTITY, interests: INTERESTS });
