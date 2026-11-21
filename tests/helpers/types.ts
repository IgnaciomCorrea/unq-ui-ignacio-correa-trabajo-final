import type { Mock } from 'vitest'

export type FetchMock = Mock<typeof fetch>

export type DictionaryReply = () => Response | Promise<Response>

export type DictionaryAnswer = (exists: boolean) => void
