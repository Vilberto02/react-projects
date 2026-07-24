import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Greeting() {
  const user = {
    name: "Vilberto",
    lastname: "Patricio",
  };

  return (
    <div>
      <h2>
        {user.name} , {user.lastname}
      </h2>
    </div>
  );
}
root.render(<Greeting />);
