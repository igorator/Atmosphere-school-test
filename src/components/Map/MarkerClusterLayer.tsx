import {
  createElementObject,
  createLayerComponent,
  type LeafletContextInterface,
  type LayerProps,
} from "@react-leaflet/core";
import L from "leaflet";
import "leaflet.markercluster";
import type { MapUser } from "@/types/MapUser";

type MarkerClusterLayerProps = LayerProps & {
  users: MapUser[];
  icon: L.Icon;
  options?: L.MarkerClusterGroupOptions;
  buildPopup: (user: MapUser) => string;
};

type ClusterState = {
  added: boolean;
  users: MapUser[];
  icon: L.Icon;
  buildPopup: (user: MapUser) => string;
};

const clusterState = new WeakMap<L.MarkerClusterGroup, ClusterState>();

const syncMarkers = (
  cluster: L.MarkerClusterGroup,
  users: MapUser[],
  icon: L.Icon,
  buildPopup: (user: MapUser) => string,
) => {
  const markers = users.map((user) =>
    L.marker([user.lat, user.lon], { icon }).bindPopup(buildPopup(user)),
  );

  cluster.clearLayers();
  if (markers.length > 0) {
    cluster.addLayers(markers);
  }
};

const createCluster = (
  props: MarkerClusterLayerProps,
  context: LeafletContextInterface,
) => {
  const instance = L.markerClusterGroup(props.options);
  clusterState.set(instance, {
    added: false,
    users: props.users,
    icon: props.icon,
    buildPopup: props.buildPopup,
  });

  instance.on("add", () => {
    const state = clusterState.get(instance);
    if (!state) {
      return;
    }
    state.added = true;
    syncMarkers(instance, state.users, state.icon, state.buildPopup);
  });

  instance.on("remove", () => {
    const state = clusterState.get(instance);
    if (state) {
      state.added = false;
    }
  });

  return createElementObject(instance, context);
};

const updateCluster = (
  instance: L.MarkerClusterGroup,
  props: MarkerClusterLayerProps,
  prevProps: MarkerClusterLayerProps,
) => {
  if (
    props.users !== prevProps.users ||
    props.icon !== prevProps.icon ||
    props.buildPopup !== prevProps.buildPopup
  ) {
    const state = clusterState.get(instance);
    if (!state) {
      return;
    }
    state.users = props.users;
    state.icon = props.icon;
    state.buildPopup = props.buildPopup;

    if (state.added) {
      syncMarkers(instance, props.users, props.icon, props.buildPopup);
    }
  }
};

export const MarkerClusterLayer = createLayerComponent<
  L.MarkerClusterGroup,
  MarkerClusterLayerProps
>(createCluster, updateCluster);
