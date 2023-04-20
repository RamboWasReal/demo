import Link from "next/link"
export default function Home() {
  return (
    <main className="bg-[#1e293b] flex justify-center items-center h-screen">
      <div className="items-center justify-center flex flex-row gap-4">
        <Link href="/events">List</Link>
        <Link href="/events/create">Create</Link>
      </div>
    </main>
  )
}
