'use server'
import { cookies } from 'next/headers'
export async function clearNewTheme (): Promise<void> {
  cookies().delete('newTheme')
}
