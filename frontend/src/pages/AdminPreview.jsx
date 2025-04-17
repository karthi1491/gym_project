import React, { useState, useEffect } from "react";
import { useAdmin } from "../context/AdminContext"; // Import the useAdmin hook

const AdminPreview = () => {
  const { admin } = useAdmin(); // Access admin data from context
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.log("Admin data from context:", admin); // Log admin data
    if (!admin) {
      console.log("No admin data found.");
    }
  }, [admin]);

  if (!admin) return <p className="text-center mt-10 text-gray-600">No admin data found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <div className="flex gap-2 overflow-x-auto">
            {admin.gymImages?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Gym ${i}`}
                className="w-40 h-40 object-cover rounded-xl border"
              />
            ))}
          </div>

          <a
            href={admin.location.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 mt-4 underline text-sm"
          >
            View Location on Google Maps
          </a>
        </div>

        <div className="w-full md:w-1/2 space-y-2">
          <h2 className="text-xl font-semibold">
            {admin.firstName} {admin.lastName}
          </h2>
          <p className="text-gray-600">{admin.email}</p>
          <p>📍 {admin.location.address}</p>
          <p>🧭 Coordinates: {admin.location.coordinates.join(", ")}</p>
          <p className="text-green-600">
            💸 Subscription: {admin.subscriptionPrices?.monthly} /month
          </p>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-4 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
          >
            {showDetails ? "Hide Details" : "Show Full Preview"}
          </button>

          {showDetails && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Trainer Images</h3>
              <div className="flex gap-2 overflow-x-auto">
                {admin.trainerImages?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Trainer ${i}`}
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPreview;
