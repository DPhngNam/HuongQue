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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddProductDialog from "./AddProductDialog";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

type EditProduct = ProductProps & { description?: string };

function EditProductDialog({
  product,
  onSuccess,
  onClose,
}: {
  product: EditProduct;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const { register, handleSubmit, setValue, reset } = useForm<EditProduct>({
    defaultValues: product,
  });
  const { tenantId: id } = useParams();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await axiosInstance.patch(`/productservice/${product.id}`, data, {
        headers: { "X-Tenant-ID": id },
      });
      alert("Cập nhật sản phẩm thành công!");
      onSuccess();
      onClose();
    } catch (error) {
      alert("Cập nhật sản phẩm thất bại!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-5">
      <Input
        className="col-span-2"
        placeholder="Tên sản phẩm"
        {...register("name", { required: true })}
      />
      <Input
        placeholder="Giá"
        {...register("price", { required: true, valueAsNumber: true })}
      />
      <div className="col-span-2">
        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded"
          placeholder="Mô tả"
          {...register("description")}
        ></textarea>
      </div>
      <div className="col-span-2 flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          className="col-span-2 bg-blue-600 text-white rounded px-4 py-2 mt-2"
        >
          Lưu thay đổi
        </Button>
      </div>
    </form>
  );
}

export default function page() {
  const router = useRouter();
  const { tenantId: id } = useParams();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [editProduct, setEditProduct] = useState<ProductProps | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const fetchData = async (loadMore = false) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/productservice/paged`, {
        headers: {
          "X-Tenant-ID": id,
        },
        params: {
          page: loadMore ? page : 0, // Backend uses 0-based page index
          size: 10,
        },
      });
      const { content, last } = res.data; // Extract content and last page indicator
      if (loadMore) {
        setProducts((prev) => [...prev, ...content]);
        setPage((prev) => prev + 1);
      } else {
        setProducts(content);
      }
      setHasMore(!last); // If last is true, no more pages
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  console.log("Products:", products);
  const handleAddProduct = () => {
    router.push("/tenant/[tenantId]/add-product");
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      await axiosInstance.delete(`/productservice/${productId}`, {
        headers: {
          "X-Tenant-ID": id,
        },
      });
      fetchData();
    } catch (error) {
      alert("Xóa sản phẩm thất bại!");
      console.error(error);
    }
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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="justify-start  text-sm font-normal font-['Inter']">
                Thêm sản phẩm
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm sản phẩm</DialogTitle>
              </DialogHeader>
              <AddProductDialog onSuccess={() => fetchData()} />
            </DialogContent>
          </Dialog>
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
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        setEditProduct(item);
                        setEditDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleDeleteProduct(item.id)}
                    >
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
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
          </DialogHeader>
          {editProduct && (
            <EditProductDialog
              product={editProduct}
              onSuccess={() => fetchData()}
              onClose={() => setEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
