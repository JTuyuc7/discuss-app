import type { Comment } from "@prisma/client";
import { db } from "@/db";
import { cache } from "react";

export type CommentsWithAuthor = (
  Comment & {
    user: { name: string | null, image: string | null }
  }
)

// export type CommentsWithAuthor = Awaited<ReturnType<typeof fetchCommentsByPostId>>[number]
// export const fetchCommentsByPostId = (postId: string): Promise<CommentsWithAuthor[]> => {
//   console.log('from db')
//   return db.comment.findMany({
//     where: { postId },
//     include: { user: { select: { name: true, image: true } } }
//   })
// }

export const fetchCommentsByPostId = cache((postId: string): Promise<CommentsWithAuthor[]> => {
  console.log('from db')
  return db.comment.findMany({
    where: { postId },
    include: { user: { select: { name: true, image: true } } }
  })
})