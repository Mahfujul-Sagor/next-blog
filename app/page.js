"use client";

import BrowseByCat from "@/components/BrowseByCat";
import Featured from "@/components/Featured";
import PostCardList from "@/components/PostCardList";
import TopAuthors from "@/components/TopAuthors";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home({searchParams}) {
  const router = useRouter();
  const page = parseInt(searchParams.page) || 1;
  const [cat, setCat] = useState(searchParams.cat || "");

  const handleCatChange = (category)=> {
    setCat(category);
    router.push('/');
  };

  return (
    <main className="min-h-screen flex justify-center">
      <div className="max-w-[1170px] flex flex-col items-center">
        <Featured/>
        <hr />
        <BrowseByCat onCategorySelect={handleCatChange} />
        <PostCardList page={page} cat={cat} />
        <TopAuthors/>
      </div>
    </main>
  )
}