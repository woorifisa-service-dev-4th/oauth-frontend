"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyPage() {
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            alert("로그인이 필요합니다.");
            router.push("/login");
            return;
        }

        fetchUserData(token);
    }, []);

    const fetchUserData = async (token) => {
        const response = await fetch("http://localhost:8080/api/restaurant", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUserData(data);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl">마이페이지</h2>
            {userData ? <pre className="bg-gray-200 p-4">{JSON.stringify(userData, null, 2)}</pre> : <p>불러오는 중...</p>}
        </div>
    );
}
