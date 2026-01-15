import styles from "./MapPage.module.css";
import { Map } from "@/components/Map/Map";
import { MapFilter } from "@/components/MapFilter/MapFilter";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useUsers } from "@/hooks/useUsers";
import { normalizeQuery } from "@/utils/normalizeQuery";
import { useMemo, useState } from "react";

export function MapPage() {
  const { data, error, isLoading } = useUsers();
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);
  const handleInputChange = (value: string) => {
    setInputValue(value);
    setQuery(value);
  };

  const normalizedQuery = normalizeQuery(debouncedQuery);
  const filteredUsers = useMemo(() => {
    if (!data) {
      return [];
    }

    if (!normalizedQuery) {
      return data;
    }

    return data.filter((user) =>
      user.interests.some((interest) =>
        interest.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [data, normalizedQuery]);
  if (isLoading) {
    return <div className={styles.message}>Loading users...</div>;
  }

  if (error) {
    return <div className={styles.message}>Failed to load users.</div>;
  }

  return (
    <section className={styles.page}>
      <MapFilter value={inputValue} onChange={handleInputChange} />
      <Map users={filteredUsers} />
    </section>
  );
}
