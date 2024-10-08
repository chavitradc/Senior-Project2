"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Suspense, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { VictimSheet } from "@/components/VictimSheet";
import { MapComponent } from "@/components/MapComponent";


type Victim = {
  id: string;
  lat: number;
  lng: number;
  status: "pending" | "rescued";
};

type Location = {
  id: string;
  lat: number;
  lng: number;

};

const CENTER_COORDINATES = {
  lng: 97.7304863,
  lat: 13.9724094,
};

const SAMPLE_VICTIMS: Victim[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    lat: 14.0395107,
    lng: 100.6127897,

    status: "pending",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    lat: 13.7388624,
    lng: 100.5258328,

    status: "pending",
  },
];


const mapVictimToLocation = (victim: Victim): Location => ({
  id: victim.id,
  lat: victim.lat,
  lng: victim.lng,
});

const Home = () => {
  const [victims, setVictims] = useState<Victim[]>(SAMPLE_VICTIMS);
  const [selectedVictim, setSelectedVictim] = useState<Victim | null>(null);

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  const handleRescueComplete = (id: string) => {
    setVictims((prevVictims) =>
      prevVictims.map((victim) =>
        victim.id === id ? { ...victim, status: "rescued" } : victim
      )
    );
    setSelectedVictim(null);
  };

  const filteredVictims: Location[] = victims.map(mapVictimToLocation);

  const handleLocationSelect = (location: Location) => {
    const victim = victims.find((v) => v.id === location.id) || null;
    setSelectedVictim(victim);
  };

  return (
    <div className="flex h-screen w-full relative">
      <Suspense fallback={<LoadingSpinner />}>
        <div className="w-full h-full">
          {filteredVictims.length > 0 ? (
            <MapComponent
              center={CENTER_COORDINATES}
              locations={filteredVictims}
              onLocationSelect={handleLocationSelect}
            />
          ) : (
            <div>No victims available</div>
          )}
          <VictimSheet
            victim={selectedVictim}
            isOpen={!!selectedVictim}
            onClose={() => setSelectedVictim(null)}
            onRescueComplete={handleRescueComplete}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default Home;

