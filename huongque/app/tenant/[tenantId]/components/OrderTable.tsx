import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OrderTable() {
  // Sample data
  const orders = [
    {
      method: "Credit Card",
      created: "2025-05-10",
      total: "$120.00",
      paymentStatus: "Paid",
    },
    {
      method: "PayPal",
      created: "2025-05-09",
      total: "$75.50",
      paymentStatus: "Pending",
    },
    {
      method: "Bank Transfer",
      created: "2025-05-08",
      total: "$200.00",
      paymentStatus: "Failed",
    },
    {
      method: "Cash",
      created: "2025-05-07",
      total: "$50.00",
      paymentStatus: "Paid",
    },
  ];
  return (
    <Table>
      <TableCaption>Recent Orders</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Method</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Payment Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order, index) => (
          <TableRow key={index}>
            <TableCell>{order.method}</TableCell>
            <TableCell>{order.created}</TableCell>
            <TableCell>{order.total}</TableCell>
            <TableCell>{order.paymentStatus}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
