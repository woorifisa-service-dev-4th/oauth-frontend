"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConsentPage() {
  const router = useRouter();
  const [clientId, setClientId] = useState("");
  const [code, setCode] = useState("");
  const [checked, setChecked] = useState(false);
  const [clientSecret] = useState("secret123");
  const [redirectUri] = useState("http://localhost:3000/oauth");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const clientIdParam = urlParams.get("client_id");
    const codeParam = urlParams.get("code");

    if (!clientIdParam || !codeParam) {
      alert("잘못된 요청입니다.");
      router.push("/");
      return;
    }

    setClientId(clientIdParam);
    setCode(codeParam);
  }, [router]);

  const handleConsent = async (isApproved) => {
    if (!checked && isApproved) {
      alert("동의 사항을 확인하고 체크해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:9000/api/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          code,
          clientSecret,
          redirectUri,
          approved: isApproved,
          redirect_uri: "http://localhost:3000/mypage",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        router.push("/mypage");
        localStorage.setItem("access_token", data.token);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "승인 처리 중 오류 발생");
      }
    } catch (error) {
      console.error("승인 요청 실패:", error);
      alert("승인 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">
          {clientId}이(가) 계정 정보를 요청하고 있습니다.
        </h1>
        <label className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            className="mr-2"
          />
          동의합니다.
        </label>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => handleConsent(false)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            거부
          </button>
          <button
            onClick={() => handleConsent(true)}
            className={`px-4 py-2 text-white rounded ${
              checked ? "bg-green-500" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!checked}
          >
            승인
          </button>
        </div>
      </div>
    </div>
  );
}
