import React, { useEffect, useState } from "react";
import axios from "axios";

function Materials() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios.get("/api/materials")
      .then(res => setMaterials(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Materials</h2>
      <ul className="list-disc pl-6">
        {materials.map(m => (
          <li key={m._id}>{m.name} — {m.quantity}</li>
        ))}
      </ul>
    </div>
  );
}

export default Materials;
