import type { Post } from '@prisma/client';
import { db } from '@/db';

export type PostsWithData = (
  Post & {
    topic: { slug: string },
    user: { name: string },
    _count: { comments: number }
  }
)

// export type PostsWithData = Awaited<ReturnType< typeof fetchPostsByTopicSlug>>[number]

export function fetchPostsBySearchTerm(term: string): Promise<PostsWithData[]> { 

  return db.post.findMany({
    where: {
      OR: [
        { title: { contains: term } },
        { content: { contains: term } }
      ]
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } }
    }
  }) as Promise<PostsWithData[]>
}

export function fetchPostsByTopicSlug(slug: string) {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } }
    }
  }) as Promise<PostsWithData[]>
}

export async function fetchTopPosts(): Promise<PostsWithData[]> {
  return db.post.findMany({
    orderBy: [
      {
        comments: {
          _count: 'desc'
        }
      }
    ],
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } }
    },
    take: 5
  }) as Promise<PostsWithData[]>
}