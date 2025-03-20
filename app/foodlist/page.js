"use client";

import { useEffect, useState } from "react";

const FoodListPage = () => {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    fetchFoodList(token);
  }, []);

  const fetchFoodList = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/foodList", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("푸드리스트를 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      setFoodList(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 via-yellow-100 to-orange-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">푸드리스트</h2>
      {foodList.length > 0 ? (
        <ul className="w-full max-w-lg">
          {foodList.map((item, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <p>
                <strong>음식명:</strong> {item.name}
              </p>
              <p>
                <strong>가격:</strong> {item.price}원
              </p>
              <p>
                <strong>유저:</strong> {item.username}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">푸드리스트를 불러오는 중...</p>
      )}
    </div>
  );
};

export default FoodListPage;
