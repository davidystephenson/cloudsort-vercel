'use client'

export default function ContainerView ({
  children,
  shade
}: {
  children: React.ReactNode
  shade: string | undefined
}): JSX.Element | null {
  return (
    <div className='container mx-auto'>
      {children}
    </div>
  )
}
