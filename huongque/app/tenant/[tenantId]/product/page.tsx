"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { ShoppingCart, Pencil, Trash } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { ProductProps } from "@/app/models/Product.model";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

export default function page() {
  const router = useRouter();
  const { tenantId: id } = useParams();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async (loadMore = false) => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/productservice/`, {
          headers: {
            "X-Tenant-ID": id,
          },
          params: {
            page: loadMore ? page + 1 : page,
            size: 10,
          },
        });
        if (loadMore) {
          setProducts((prev) => [...prev, ...res.data]);
          setPage((prev) => prev + 1);
        } else {
          setProducts(res.data);
        }
        setHasMore(res.data.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, page]);

  console.log("Products:", products);
  const handleAddProduct = () => {
    router.push("/tenant/[tenantId]/add-product");
  };
  return (
    <div className="flex flex-col items-center  justify-start h-full w-full min-h-screen p-5 px-10">
      {/* <div className="flex justify-between items-center w-full mb-4">
        <div className="justify-start text-zinc-700 text-xl font-bold font-['Inter'] leading-loose">
          Sản phẩm bán chạy nhất
        </div>
        <button className="justify-start bg-transparent text-blue-800 text-sm font-normal font-['Inter']">
          Xem tất cả
        </button>
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Sản phẩm</TableHead>
            <TableHead>Mã sản phẩm</TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Tăng thêm</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.categoryName}</TableCell>
              <TableCell>{item.createAt}</TableCell>
              <TableCell>{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      {/* </Table> */}
      <div className="flex justify-center items-center flex-col w-full  h-full">
        {/*Header */}
        <div className="flex justify-between items-center w-full mt-4">
          <div className="flex justify-start items-center gap-2">
            <ShoppingCart />
            <span className="justify-start text-Colors-Text-Text-Primary text-base font-semibold font-['Inter'] leading-normal">
              Sản phẩm
            </span>
          </div>
          <Button
            onClick={handleAddProduct}
            className="justify-start  text-sm font-normal font-['Inter']"
          >
            Thêm sản phẩm
          </Button>
        </div>

        {/*Table */}
        <Table className="w-full px-5  mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Sản phẩm</TableHead>
              <TableHead>Mã sản phẩm</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Giá bán</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Chỉnh sửa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>
                      <span>
                        {item.name.length > 30
                          ? `${item.name.substring(0, 30)}...`
                          : item.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{item.name}</TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.categoryName}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  {format(new Date(item.createAt), "dd/MM/yyyy HH:mm")}
                </TableCell>
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
        onClick={() => fetchData(true)}
        disabled={!hasMore || loading}
        className="justify-start text-sm font-normal font-['Inter'] mt-4"
      >
        Tải thêm
      </Button>
    </div>
  );
}
