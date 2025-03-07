
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Mapbox token
mapboxgl.accessToken = "pk.eyJ1IjoiYW50YWx5YXR1cml6bSIsImEiOiJjbHMzdjNtMGIwYWNmMmtvNGVwZ3QzM29nIn0.KjYcUUiJVPbhbcAMKM66nA";

const HeatmapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    // Haritayı yükle
    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [33.9216, 35.1856], // KKTC koordinatları
        zoom: 11
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      
      // Harita yüklendiğinde
      map.current.on("load", () => {
        // Isı haritası katmanını ekle
        addHeatmapLayer();
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const addHeatmapLayer = () => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    // Örnek veri noktaları - gerçek uygulamada bu veriler API'den gelebilir
    const points = [
      [33.9216, 35.1856, 100], // Lefkoşa - yüksek yoğunluk
      [33.3597, 35.3446, 80],  // Girne - orta yoğunluk
      [33.9360, 35.2850, 60],  // Gönyeli - düşük yoğunluk
      [33.8790, 35.1170, 90],  // Lefkoşa merkez - orta-yüksek yoğunluk
      [34.0741, 35.1182, 70]   // Gazimağusa - orta yoğunluk
    ];

    // Kaynak ekleme
    const source = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: points.map(point => ({
          type: "Feature",
          properties: {
            intensity: point[2]
          },
          geometry: {
            type: "Point",
            coordinates: [point[0], point[1]]
          }
        }))
      }
    };

    // Eğer kaynak zaten varsa silip yeniden ekle
    if (map.current.getSource("heat-points")) {
      map.current.removeSource("heat-points");
    }
    
    if (map.current.getLayer("heatmap-layer")) {
      map.current.removeLayer("heatmap-layer");
    }

    // Kaynak ve katman ekle
    map.current.addSource("heat-points", source as any);
    map.current.addLayer({
      id: "heatmap-layer",
      type: "heatmap",
      source: "heat-points",
      paint: {
        "heatmap-weight": ["get", "intensity"],
        "heatmap-intensity": 0.8,
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0, "rgba(0, 0, 255, 0)",
          0.2, "rgba(0, 255, 255, 0.6)",
          0.4, "rgba(0, 255, 0, 0.6)",
          0.6, "rgba(255, 255, 0, 0.6)",
          0.8, "rgba(255, 0, 0, 0.6)",
          1, "rgba(255, 0, 0, 0.8)"
        ],
        "heatmap-radius": 30,
        "heatmap-opacity": 0.8
      }
    });
  };

  return (
    <div className="h-[400px] rounded-lg overflow-hidden relative">
      <div ref={mapContainer} className="absolute inset-0" />
      
      <div className="absolute top-2 right-2 bg-white p-2 rounded-md shadow-md z-10">
        <div className="text-xs font-semibold mb-1">Yoğunluk Seviyesi</div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-xs">Düşük</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs">Orta-Düşük</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-xs">Orta</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-xs">Orta-Yüksek</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs">Yüksek</span>
        </div>
      </div>
    </div>
  );
};

export default HeatmapView;
