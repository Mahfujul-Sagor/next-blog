import BrowseByCat from "@/components/BrowseByCat";
import Featured from "@/components/Featured";
import PostCardList from "@/components/PostCardList";
import TopAuthors from "@/components/TopAuthors";


export default function Home({searchParams}) {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
    <main className="min-h-screen flex justify-center">
      <div className="max-w-[1170px] flex flex-col items-center">
        <Featured/>
        <hr />
        <BrowseByCat/>
        <PostCardList page={page} cat={cat} />
        <TopAuthors/>
      </div>
    </main>
  )
}
