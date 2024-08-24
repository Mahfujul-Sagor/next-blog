import BrowseByCat from "@/components/BrowseByCat";
import Featured from "@/components/Featured";
import TopAuthors from "@/components/TopAuthors";


export default function Home() {
  return (
    <main className="min-h-screen flex justify-center">
      <div className="max-w-[1080px]">
        <Featured/>
        <hr />
        <BrowseByCat/>
        <TopAuthors/>
      </div>
    </main>
  )
}
