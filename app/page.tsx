import CreateListButtonView from '@/components/create-list-button-view'
import Link from 'next/link'

export default function Home (): JSX.Element {
  return (
    <>
      <div>
        <Link
          href='/protected'
          prefetch={false} // workaround until https://github.com/vercel/nextjs-postgres-auth-starter/pull/43 is deployed
        >
          Protected Page
        </Link>
      </div>
      <div>
        <CreateListButtonView />
      </div>
    </>
  )
}
