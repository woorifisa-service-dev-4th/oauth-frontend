"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthPage() {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("user_session");
        if (!user) {
            alert("로그인이 필요합니다.");
            router.push("/login");
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            exchangeCodeForToken(code);
        } else {
            requestAuthorizationCode();
        }
    }, []);

    const requestAuthorizationCode = () => {
        const authUrl = `http://localhost:9000/oauth2/authorize?response_type=code&client_id=oauth2-client-app&redirect_uri=http://localhost:3000/oauth`;
        window.location.href = authUrl;
    };

    const exchangeCodeForToken = async (code) => {
        try {
            const response = await fetch("http://localhost:9000/api/auth/token", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    client_id: "oauth2-client-app",
                    client_secret: "secret",
                    redirect_uri: "http://localhost:3000/mypage",
                    code: code,
                }),
            });

            const data = await response.json();
            localStorage.setItem("access_token", data.access_token);
            router.push("/");
        } catch (error) {
            console.error("토큰 요청 실패:", error);
        }
    };

    return <p className="text-center mt-20 text-lg">OAuth 인증 진행 중...</p>;
}
