import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import React from "react";
import { ShoppingCart } from "lucide-react";

const mockProducts = [
  {
    product: "Apple",
    productId: "P001",
    category: "Fruit",
    remaining: 120,
    turnover: 5000,
    increaseBy: 10,
  },
  {
    product: "Banana",
    productId: "P002",
    category: "Fruit",
    remaining: 80,
    turnover: 3200,
    increaseBy: 5,
  },
  {
    product: "Carrot",
    productId: "P003",
    category: "Vegetable",
    remaining: 200,
    turnover: 4100,
    increaseBy: 20,
  },
];

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-screen p-5">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="justify-start text-zinc-700 text-xl font-bold font-['Inter'] leading-loose">
          Best selling product
        </div>
        <button className="justify-start bg-transparent text-blue-800 text-sm font-normal font-['Inter']">
          See All
        </button>
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>ProductId</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Remaining quantity</TableHead>
            <TableHead>Turn Over</TableHead>
            <TableHead>Increase By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockProducts.map((item) => (
            <TableRow key={item.productId}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.productId}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.remaining}</TableCell>
              <TableCell>{item.turnover}</TableCell>
              <TableCell>{item.increaseBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex w-full h-full">
        {/*Header */}
        <div className="flex justify-between items-center w-full mt-4">
          <div className="flex justify-start items-center gap-2">
            <ShoppingCart />
            <text className="justify-start text-Colors-Text-Text-Primary text-base font-semibold font-['Inter'] leading-normal">
              Products
            </text>
          </div>
          <Button
         
            className="justify-start  text-sm font-normal font-['Inter']"
            >
            Add Product
            </Button>
        </div>
      </div>
    </div>
  );
}
