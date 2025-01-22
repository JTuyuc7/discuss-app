'use client'
import { useActionState, startTransition } from "react"
import { Input, Textarea } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover"
import * as actions from "@/actions"
import { Form } from "@nextui-org/react"
import FormButton from "../common/form-button"

export default function TopicCreateForm() {
  const [formState, action, isPending] = useActionState(actions.createTopic, { errors: {} })

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(() => {
      action(formData)
    })
  }

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary" variant="flat">Create Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form onSubmit={handleSubmitForm}>
          <div className="flex flex-col p-4 gap-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              placeholder="Name"
              label="Name"
              labelPlacement="outside"
              errorMessage={formState.errors.name}
              isInvalid={!!formState.errors.name?.join(', ')}
            />
            <Textarea
              name="description"
              placeholder="Describe your topic"
              label="Description"
              labelPlacement="outside"
              errorMessage={formState.errors.description}
              isInvalid={!!formState.errors.description?.join(', ')}
            />

            {!!formState.errors._form && (
              <div className="text-red-500 p-2 border border-red-400 rounded-lg">{formState.errors._form.join(', ')}</div>
            )}

            <FormButton primaryColor="primary" isLoading={isPending}>Create Topic</FormButton>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  )
}