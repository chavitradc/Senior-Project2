import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface CoordinatesSearchProps {
    onSearch: (lat: number, lng: number) => void;
}

export const CoordinatesSearch: React.FC<CoordinatesSearchProps> = ({ onSearch }) => {
    const [searchInput, setSearchInput] = useState<string>('');

    const handleSearch = () => {
        const [lat, lng] = searchInput.split(',').map(Number);
        if (!isNaN(lat) && !isNaN(lng)) {
            onSearch(lat, lng);
        }
    };

    return (
        <div className="absolute top-4 right-4 z-[1000] flex">
            <Input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Latitude,Longitude"
                className=" border bg-zinc-50 border-gray-300 "
            />
            <Button
                onClick={handleSearch}
                className=" text-white "
            >
                Search
            </Button>
        </div>
    );
};