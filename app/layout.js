"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setIsAuthenticated(!!token);
    }, []);

    return (
        <html lang="ko">
        <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        <nav className="p-4 bg-blue-600 dark:bg-gray-800 text-white flex justify-between shadow-md">
            <h1 className="text-2xl font-bold">OAuth Demo</h1>
            {isAuthenticated ? (
                <button
                    onClick={() => {
                        localStorage.removeItem("access_token");
                        setIsAuthenticated(false);
                        router.push("/login");
                    }}
                    className="px-4 py-2 bg-red-500 rounded-md shadow-md"
                >
                    로그아웃
                </button>
            ) : (
                <button
                    onClick={() => router.push("/login")}
                    className="px-4 py-2 bg-green-500 rounded-md shadow-md"
                >
                    로그인
                </button>
            )}
        </nav>
        <main className="p-6">{children}</main>
        </body>
        </html>
    );
}
