"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem("user_session", JSON.stringify(data.user));
                router.push("/oauth"); // OAuth 인증 페이지로 이동
            } else {
                setError("로그인 실패! 아이디/비밀번호 확인하세요.");
            }
        } catch (error) {
            setError("서버 오류 발생");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded-lg w-80">
                <h2 className="text-2xl mb-4 text-center">로그인</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)}
                       className="w-full p-2 mb-2 border rounded" required />
                <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)}
                       className="w-full p-2 mb-2 border rounded" required />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">로그인</button>
            </form>
        </div>
    );
}
