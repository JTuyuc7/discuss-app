'use client';
import { useActionState, startTransition } from "react";
import { Input, Button, Textarea, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';

export interface PostCreateFormProps { 
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) { 

  const [formState, action, isPending] = useActionState(actions.createPost.bind(null, slug), { errors: {} });

  const handlePostSubmision = (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    })
  }

  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color="primary">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handlePostSubmision}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              type="text"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              type="text"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ') }
            />
            {
              formState.errors._form && (
                <div className="text-red-500 p-2 border border-red-400 rounded-lg">{formState.errors._form.join(', ')}</div>
              )
            }
          <FormButton isLoading={isPending} primaryColor="primary">Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}