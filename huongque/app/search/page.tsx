'use client';

import { SetStateAction, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchResult {
  id: string;
  // Add other properties as needed
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
    const results = await fetch(`/api/products?search=${searchQuery}`);
    const data = await results.json();
    setSearchResults(data);

  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Products</h1>
      
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No results found. Try searching for something else.
          </div>
        ) : (
          searchResults.map((result: SearchResult) => (
            <div key={result.id} className="border rounded-lg p-4">
              {/* Result item content will go here */}
            </div>
          ))
        )}
      </div>
    </div>
  );
} 