'use client';
import { Input } from '@nextui-org/input';
import { useSearchParams } from 'next/navigation';
import * as actions from '@/actions';

export default function SearchInput() {

  const searchParams = useSearchParams();

  return ( 
    <form action={actions.search}>
      <Input name='term' placeholder='Search something...' defaultValue={searchParams.get('term') ?? ''} />
    </form>
  )

}