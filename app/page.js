"use client";

import { useEffect, useState } from "react";

export default function Home() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch("http://localhost:9000/api/auth/authorize", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("유저 정보를 가져올 수 없습니다.");

            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error:", error);
            localStorage.removeItem("access_token");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">홈 페이지</h1>
            {userData ? (
                <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                    <p className="text-lg">안녕하세요, {userData.name}님!</p>
                </div>
            ) : (
                <p>로그인하세요.</p>
            )}
        </div>
    );
}
