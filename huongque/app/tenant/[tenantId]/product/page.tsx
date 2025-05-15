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
import { ShoppingCart, Pencil, Trash } from "lucide-react";

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

const products = [
  {
    product: "Apple",
    productId: "P001",
    category: "Fruit",
    cost: 1.2,
    extra: 0.5,
    price: 2.0,
  },
  {
    product: "Banana",
    productId: "P002",
    category: "Fruit",
    cost: 0.8,
    extra: 0.3,
    price: 1.5,
  },
  {
    product: "Carrot",
    productId: "P003",
    category: "Vegetable",
    cost: 0.5,
    extra: 0.2,
    price: 1.0,
  },
  {
    product: "Broccoli",
    productId: "P004",
    category: "Vegetable",
    cost: 0.7,
    extra: 0.4,
    price: 1.8,
  },
  {
    product: "Chicken",
    productId: "P005",
    category: "Meat",
    cost: 3.0,
    extra: 1.0,
    price: 5.0,
  },
];

export default function page() {
  return (
    <div className="flex flex-col items-center  justify-start h-full w-full min-h-screen p-5 px-10">
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
      <div className="flex justify-center items-center flex-col w-full  h-full">
        {/*Header */}
        <div className="flex justify-between items-center w-full mt-4">
          <div className="flex justify-start items-center gap-2">
            <ShoppingCart />
            <text className="justify-start text-Colors-Text-Text-Primary text-base font-semibold font-['Inter'] leading-normal">
              Products
            </text>
          </div>
          <Button className="justify-start  text-sm font-normal font-['Inter']">
            Add Product
          </Button>
        </div>

        {/*Table */}
        <Table className="w-full px-5  mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Id</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Extra</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item) => (
              <TableRow key={item.productId}>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.productId}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.cost}</TableCell>
                <TableCell>{item.extra}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button
        className="justify-start   text-sm font-normal font-['Inter'] mt-4"
      >
        Load more
      </Button>
    </div>
  );
}
