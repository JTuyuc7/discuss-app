'use server'
import { z } from 'zod'
import { auth } from '@/auth'
import type { Topic } from '@prisma/client'
import { db } from '@/db'
import { redirect } from 'next/navigation'
import paths from '@/paths'
import { revalidatePath } from 'next/cache'

const createTopicSchema = z.object({
  name: z.string().min(3).regex(/^[a-z-]+$/, { message: 'Only lowercase letters and dashes are allowed' }),
  description: z.string().min(10),
})

export interface CreateTopicForm { 
  errors: {
    name?: string[]
    description?: string[]
    _form?: string[]
  }
}

export async function createTopic(formState: CreateTopicForm, formData: FormData): Promise<CreateTopicForm> { 
  // TODO: REVALIDATE TOPICS LIST

  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    }
  }

  const session = await auth()
  if (!session || !session.user) { 
    return {
      errors: {
        _form: ['You must be signed in to create a topic']
      }
    }
  }

  let topic: Topic
  try {
    
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      }
    })

  } catch (error: unknown) {
    if (error instanceof Error) { 
      return {
        errors: {
          _form: [error.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong']
        }
      }
    }
  }

  revalidatePath(paths.homePath())
  redirect(paths.topicShow(topic.slug))
}