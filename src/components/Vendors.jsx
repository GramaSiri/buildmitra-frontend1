import React, { useEffect, useState } from "react";
import axios from "axios";

function Vendors() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    axios.get("/api/vendors")
      .then(res => setVendors(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Vendors</h2>
      <ul className="list-disc pl-6">
        {vendors.map(v => (
          <li key={v._id}>{v.name} — {v.contact}</li>
        ))}
      </ul>
    </div>
  );
}

export default Vendors;
