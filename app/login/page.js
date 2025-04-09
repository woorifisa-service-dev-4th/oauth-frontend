"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); // 👉 form 기본 동작 막기!!
    try {
      const response = await fetch("http://localhost:9000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: "client123",
          username: username,
          password: password,
          redirectUri: "http://localhost:3000/consent",
        }),
      });
      if (!response.ok) {
        throw new Error(`:x: 서버 응답 오류: ${response.status}`);
      }
      const data = await response.json();
      if (data.redirectUrl) {
        console.log(":링크: Redirecting to:", data.redirectUrl);
        window.location.href = data.redirectUrl; // :흰색_확인_표시: 백엔드에서 받은 URL로 이동
      } else {
        console.error(":x: Redirect URL이 응답에 없음");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-white shadow-md rounded-lg w-80"
      >
        <h2 className="text-2xl mb-4 text-center">로그인</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
