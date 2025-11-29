import React, { useEffect, useState } from "react";
import axios from "axios";

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/api/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Projects</h2>
      <ul className="list-disc pl-6">
        {projects.map(p => (
          <li key={p._id}>{p.name} — {p.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
