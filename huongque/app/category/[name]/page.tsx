'use client';
import Product from '@/app/components/products/Product';
import { ProductProps } from '@/app/models/Product.model';
import axiosInstance from '@/lib/axiosInstance';
import { useParams } from 'next/navigation';
import React from 'react'

export default function page() {
    const {name} = useParams();
    const [products, setProducts] = React.useState<ProductProps[]>([]);
    React.useEffect(() => {
      const fetchProducts = async () => {
        try{
          const res = await axiosInstance.get(`productservice/category/${name}` )
          setProducts(res.data || []);
        }catch (error) {
          console.error("Error fetching products:", error);
          setProducts([]);
        }
      }
       fetchProducts();   
    }, [name])
  return (
    <div className='flex justify-center items-center flex-col p-[96px]'>
      <h1 className='text-2xl font-bold mb-4'>Danh mục: {name}</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.map((product)=>(
          <Product key={product.id} product={product} />
        ))}
      </div>
     
    </div>
  )
}
