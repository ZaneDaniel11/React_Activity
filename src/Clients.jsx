import { useEffect, useState } from "react";

export default function Client() {
  const [clients, Clients] = useState([]);
  const [loading, Loading] = useState();

  const GetClients = async () => {
    const response = await fetch(
      "http://localhost:5169/api/ClientApi/GetClients",
      {
        method: "GET",
      }
    );

    const result = await response.json();
    console.log(result);
    Clients(result);
    Loading(false);
  };
  useEffect(() => {
    GetClients();
  }, []);
  return (
    <>
      <div>
        {clients.map((c) => (
          <li key={c.id}>{c.clientName}</li>
        ))}
      </div>
    </>
  );
}
