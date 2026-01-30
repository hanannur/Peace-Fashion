// "use client";

// import { useState } from "react";
// import  apiFetch  from "@/utils/api";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await apiFetch("/api/auth/login", {
//         method: "POST",
//         body: JSON.stringify({ email, password }),
//       });

//       window.location.href = "/";
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         className="w-full border p-2"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         className="w-full border p-2"
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       {error && <p className="text-red-500">{error}</p>}

//       <button className="w-full bg-black text-white p-2">
//         Login
//       </button>
//     </form>
//   );
// }
