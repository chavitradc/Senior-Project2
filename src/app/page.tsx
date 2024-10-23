"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Suspense, useState, useMemo, useCallback } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { VictimSheet } from "@/components/VictimSheet";
import { Map } from "@/components/Map";

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
  status: "pending" | "rescued";
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
    lat: 14.3170581,
    lng: 100.5258328,
    status: "pending",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    lat: 13.9388624,
    lng: 100.5258328,
    status: "rescued",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    lat: 18.3170581,
    lng: 99.3986862,
    status: "pending",
  },
];

const mapVictimToLocation = (victim: Victim): Location => ({
  id: victim.id,
  lat: victim.lat,
  lng: victim.lng,
  status: victim.status,
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

  const filteredVictims = useMemo(() => victims.map(mapVictimToLocation), [victims]);

  const handleRescueComplete = useCallback((id: string) => {
    setVictims((prevVictims) =>
      prevVictims.map((victim) =>
        victim.id === id ? { ...victim, status: "rescued" } : victim
      )
    );
    setSelectedVictim(null);
  }, []);

  const handleAddLocation = useCallback((location: Location) => {
    const newVictim: Victim = {
      ...location,
      status: "pending",
    };
    setVictims((prevVictims) => [...prevVictims, newVictim]);
  }, []);

  const handleLocationSelect = useCallback((location: Location | null) => {
    if (location) {
      const victim = victims.find((v) => v.id === location.id) || null;
      setSelectedVictim(victim);
    } else {
      setSelectedVictim(null);
    }
  }, [victims]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen w-full relative">
      <Suspense fallback={<LoadingSpinner />}>
        <div className="w-full h-full">
          <Map
            center={CENTER_COORDINATES}
            locations={filteredVictims}
            onLocationSelect={handleLocationSelect}
            activeLocationId={selectedVictim?.id || null}
            onAddLocation={handleAddLocation}
          />
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
