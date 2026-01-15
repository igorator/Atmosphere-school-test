import styles from "./Map.module.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import type { MapUser } from "@/types/MapUser";
import { MarkerClusterLayer } from "@/components/Map/MarkerClusterLayer";

const CLUSTER_OPTIONS: L.MarkerClusterGroupOptions = {
  chunkedLoading: true,
  chunkInterval: 200,
  chunkDelay: 50,
  removeOutsideVisibleBounds: true,
  maxClusterRadius: 80,
  animateAddingMarkers: false,
};

const markerIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type MapProps = {
  users: MapUser[];
};

const buildPopupHtml = (user: MapUser) => {
  const interestsListMarkup = user.interests
    .map((interest) => `<div>- ${interest}</div>`)
    .join("");

  return `<div><strong>${user.name}</strong><div>Interests:</div>${interestsListMarkup}</div>`;
};

export const Map = ({ users }: MapProps) => {
  return (
    <div className={styles.wrapper}>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        className={styles.map}
        scrollWheelZoom
        minZoom={2}
        maxZoom={6}
        maxBounds={[
          [-85.05112878, -240],
          [85.05112878, 240],
        ]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MarkerClusterLayer
          users={users}
          icon={markerIcon}
          options={CLUSTER_OPTIONS}
          buildPopup={buildPopupHtml}
        />
      </MapContainer>
    </div>
  );
};
