'use client';
import { useParams } from 'next/navigation';
import CategoryPageContent from '../components/CategoryPageContent';


export default function Page() {
  const { name } = useParams();
  return <CategoryPageContent categorySlug={name as string} />;
}