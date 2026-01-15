import "leaflet";

declare module "leaflet" {
  interface MarkerClusterGroupOptions extends L.LayerOptions {
    chunkedLoading?: boolean;
    chunkInterval?: number;
    chunkDelay?: number;
    removeOutsideVisibleBounds?: boolean;
    maxClusterRadius?: number;
    animateAddingMarkers?: boolean;
  }

  interface MarkerClusterGroup extends L.Layer {
    addLayers(layers: L.Layer[]): this;
    clearLayers(): this;
  }

  function markerClusterGroup(
    options?: L.MarkerClusterGroupOptions,
  ): MarkerClusterGroup;
}

declare module "leaflet.markercluster";
