import styles from "./MapFilter.module.css";

type MapFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export const MapFilter = ({ value, onChange }: MapFilterProps) => {
  return (
    <div className={styles.toolbar}>
      <label className={styles.label} htmlFor='interest-filter'>
        Filter by interest:
      </label>
      <input
        id='interest-filter'
        className={styles.input}
        type='text'
        placeholder='music, react, hiking...'
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};
