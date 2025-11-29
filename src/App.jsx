import React from "react";
import ProjectList from "./components/ProjectList";
import Materials from "./components/Materials";
import Vendors from "./components/Vendors";
import Labour from "./components/Labour.jsx";

function App() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600">
        BuildMitra Frontend ??
      </h1>
      <ProjectList />
      <Materials />
      <Vendors />
      <Labour />
    </div>
  );
}

export default App;
