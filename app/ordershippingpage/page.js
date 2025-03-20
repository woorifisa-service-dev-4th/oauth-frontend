"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const orders = [
  { id: "123456789", date: "2025-03-20", amount: "15,300", status: "결제완료", shipping: "배송준비중" },
  { id: "987654321", date: "2025-03-19", amount: "12,800", status: "주문확인", shipping: "배송중" },
  { id: "456789123", date: "2025-03-18", amount: "21,500", status: "결제완료", shipping: "배송완료" },
];

export default function OrderShippingPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">주문/배송 조회</h2>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>주문번호</TableHead>
                <TableHead>주문일자</TableHead>
                <TableHead>총금액</TableHead>
                <TableHead>결제상태</TableHead>
                <TableHead>배송상태</TableHead>
                <TableHead>상세</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.amount} 원</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.shipping}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          주문 상세 <ChevronDown size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>결제완료</DropdownMenuItem>
                        <DropdownMenuItem>준비중</DropdownMenuItem>
                        <DropdownMenuItem>배송중</DropdownMenuItem>
                        <DropdownMenuItem>배송완료</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
