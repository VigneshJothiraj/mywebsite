import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const filtered = allBlogs.filter((b) =>
    [
      'From Idea to Execution: Writing a PRD That Works - Part 1',
      'From Idea to Execution: Writing a PRD That Works - Part 2',
      'Why Porkbun is Winning: The Amul Analogy',
      'Cursor AI (Free trial): Building Websites Without Writing Code',
      'From Debugging Code to Brainstorming Screens: My Journey Collaborating With Designers',
      'Data-Driven Decision Making: My Go-To Frameworks for PM Prioritization',
    ].includes(b.title)
  )
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const posts = allCoreContent(
    sortPosts(
      allBlogs.filter((b) =>
        [
          'From Idea to Execution: Writing a PRD That Works - Part 1',
          'From Idea to Execution: Writing a PRD That Works - Part 2',
          'Why Porkbun is Winning: The Amul Analogy',
          'Cursor AI (Free trial): Building Websites Without Writing Code',
          'From Debugging Code to Brainstorming Screens: My Journey Collaborating With Designers',
          'Data-Driven Decision Making: My Go-To Frameworks for PM Prioritization',
        ].includes(b.title)
      )
    )
  )
  const pageNumber = parseInt(params.page as string)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
