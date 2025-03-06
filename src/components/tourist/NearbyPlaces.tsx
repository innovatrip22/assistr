
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";

type LocationType = {
  latitude: number;
  longitude: number;
} | null;

type PlaceType = {
  name: string;
  distance: string;
  duration: string;
};

const NearbyPlaces = () => {
  const [userLocation, setUserLocation] = useState<LocationType>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<PlaceType[]>([
    {
      name: "Ercan Havalimanı",
      distance: "15.3 km",
      duration: "22 dakika",
    },
    {
      name: "Girne Limanı",
      distance: "3.8 km",
      duration: "10 dakika",
    },
    {
      name: "Salamis Harabeleri",
      distance: "8.5 km",
      duration: "18 dakika",
    },
  ]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  const handleGetDirections = (place: string) => {
    if (userLocation) {
      window.open(
        `https://www.google.com/maps/dir/${userLocation.latitude},${userLocation.longitude}/${encodeURIComponent(
          place + " KKTC"
        )}`,
        "_blank"
      );
    }
  };

  return (
    <div className="space-y-4">
      {userLocation ? (
        <>
          <div className="bg-accent p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Navigation className="w-4 h-4 text-primary" />
              <p className="text-sm">
                Konumunuz: {userLocation.latitude.toFixed(4)},{" "}
                {userLocation.longitude.toFixed(4)}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {nearbyPlaces.map((place) => (
              <div
                key={place.name}
                className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium">{place.name}</h3>
                  <p className="text-sm text-gray-600">
                    {place.distance} • {place.duration}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleGetDirections(place.name)}
                >
                  Yol Tarifi Al
                </Button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-500 text-center">
          Yakındaki yerleri görebilmek için konum izni vermeniz gerekiyor.
        </p>
      )}
    </div>
  );
};

export default NearbyPlaces;
