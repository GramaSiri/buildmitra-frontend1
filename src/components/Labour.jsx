import React, { useEffect, useState } from "react";
import axios from "axios";

function Labour() {
  const [labour, setLabour] = useState([]);

  useEffect(() => {
    axios.get("/api/labour")
      .then(res => setLabour(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Labour</h2>
      <ul className="list-disc pl-6">
        {labour.map(l => (
          <li key={l._id}>{l.name} — {l.role}</li>
        ))}
      </ul>
    </div>
  );
}

export default Labour;
