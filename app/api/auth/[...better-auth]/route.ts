import { getAuth } from "@/lib/auth"

export async function GET(request: Request) {
  const auth = getAuth()
  return auth.handler.GET(request)
}

export async function POST(request: Request) {
  const auth = getAuth()
  return auth.handler.POST(request)
}
