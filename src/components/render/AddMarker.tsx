import { MapPinPlusInside, MapPinXInside } from "lucide-react";

const AddMarkerControl: React.FC<{ isActive: boolean; onClick: () => void }> = ({ isActive, onClick }) => {
    return (
        <div className="leaflet-top leaflet-left mt-20">
            <div className="leaflet-control leaflet-bar">
                <button
                    role="button"
                    title={isActive ? "Cancel adding marker" : "Add new marker"}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClick();
                    }}
                    className={`w-[30px] h-[30px] leading-[30px] text-center font-bold no-underline block
                        ${isActive ? 'bg-red-200 text-red-600' : 'bg-white text-black'}
                        hover:bg-gray-100 transition-colors duration-200 flex justify-center items-center
                    `}
                >
                    {isActive ? <MapPinXInside /> : <MapPinPlusInside />}
                </button>
            </div>
        </div>
    );
};

export default AddMarkerControl;
