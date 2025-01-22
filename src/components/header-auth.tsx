'use client'

import { NavbarItem } from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'
import { Avatar } from '@nextui-org/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover'
import { Spinner } from '@nextui-org/spinner'
import { useSession } from "next-auth/react"
import * as actions from "@/actions"


export default function HeaderAuth() { 
  const session = useSession()

  let authContent: React.ReactNode
  if (session.status === "loading") { 
    authContent = <Spinner label='Loading' color='primary' />
  }
  else if (session.data?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.data?.user.image as string} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <Button color="primary" variant="flat" onClick={actions.signOut}>Sign Out</Button>
          </div>
        </PopoverContent>
      </Popover>
    )
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="secondary" variant="bordered">Sign In</Button>
          </form>
        </NavbarItem>

        <NavbarItem>
          <form action={actions.signIn}>
            <Button color="primary" variant="flat" type="submit">Sign Up</Button>
          </form>
        </NavbarItem>
      </>
    )
  }

  return authContent
}
