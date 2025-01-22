import { redirect } from "next/navigation"
import PostList from "@/components/posts/post-list"
import { fetchPostsBySearchTerm } from "@/db/queries/posts"


interface SearchProps { 
  searchParams: Promise<{
    term: string
  }>
}

export default async function Search({ searchParams }: SearchProps) { 
  const { term } = await searchParams

  if (!term) {
    redirect('/')
  }

  return (
    <div>
      <h1>Search results for {term}</h1>
      <PostList fetchData={ () => fetchPostsBySearchTerm(term)} />
    </div>
  )
}