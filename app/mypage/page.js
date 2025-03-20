"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    try {
      const response = await fetch("http://localhost:9000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("유저 정보를 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToFoodList = () => {
    router.push("/foodlist");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-lg text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">마이페이지</h2>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        {userData ? (
          <div className="text-center">
            <h3 className="text-2xl text-gray-700 font-semibold mb-6">
              환영합니다, {userData.username}님!
            </h3>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md mt-6">
              <h4 className="text-xl font-medium text-gray-800 mb-4">
                유저 정보
              </h4>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-lg text-gray-700 mb-2">
                  <strong>이름:</strong> {userData.username}
                </p>
              </div>
            </div>

            <button
              onClick={navigateToFoodList}
              className="mt-8 bg-blue-500 text-white py-2 px-6 rounded-xl hover:bg-blue-600"
            >
              푸드리스트 보기
            </button>
          </div>
        ) : (
          <p className="text-gray-500">불러오는 중...</p>
        )}
      </div>
    </div>
  );
}
