import { useState } from "react";

export default function LoginUser() {
  const [login, LoginUser] = useState({ Username: "", Password: "" });

  async function LoginUsers(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5169/api/ClientApi/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: login.Username,
        password: login.Password,
      }),
    });

    if (response.ok) {
      window.location.href = "http:http://localhost:5173/";
    }
  }
  return (
    <>
      <form onSubmit={LoginUsers}>
        <input
          type="text"
          onChange={(e) => LoginUser({ ...login, Username: e.target.value })}
          placeholder="Enter Username"
        />
        <input
          type="text"
          onChange={(e) => LoginUser({ ...login, Password: e.target.value })}
          placeholder="Enter Password"
        />
        <button onck>Submit</button>
      </form>
    </>
  );
}
