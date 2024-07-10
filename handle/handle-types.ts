import { NextResponse } from 'next/server'

export type SuccessPayload <Result> = { ok: true } & Result
export interface ErrorPayload { ok: false, errorMessage: string }
export type ResponsePayload <Result> = SuccessPayload<Result> | ErrorPayload
export type HandledResponse<Result> = Promise<NextResponse<ResponsePayload<Result>>>
