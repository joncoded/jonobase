/*
jonobase by @joncoded (aka @jonchius)
/app/api/revalidate/route.ts
On-Demand ISR webhook handler for Sanity
*/

import { revalidatePath, revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

// Secret token to verify Sanity webhook requests
const secret = process.env.SANITY_REVALIDATE_SECRET

export async function POST(req: NextRequest) {
  try {
    // Parse and verify the webhook payload
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: { current?: string }
      join?: string
      kind?: string
    }>(req, secret)

    // Verify the signature if a secret is configured
    if (secret && !isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 })
    }

    // If no body or no type, return early
    if (!body?._type) {
      return new NextResponse("No body or type found", { status: 400 })
    }

    // Revalidate based on document type
    const { _type, slug, join, kind } = body

    // Revalidate the home page
    revalidatePath("/")

    // Revalidate based on document type
    switch (_type) {
      case "post":
        // Revalidate the specific post if slug exists
        if (slug?.current && join && kind) {
          revalidatePath(`/${join}/${kind}/${slug.current}`)
          revalidatePath(`/${join}/${kind}`)
          revalidatePath(`/${join}`)
        }
        // Revalidate all posts listing pages
        revalidateTag("posts")
        break

      case "nook":
        if (slug?.current) {
          revalidatePath(`/nooks/${slug.current}`)
        }
        revalidatePath("/nooks")
        revalidateTag("nooks")
        break

      case "heap":
        if (slug?.current) {
          revalidatePath(`/heaps/${slug.current}`)
        }
        revalidatePath("/heaps")
        revalidateTag("heaps")
        break

      case "base":
        // Revalidate everything for base config changes
        revalidatePath("/", "layout")
        revalidateTag("base")
        break

      default:
        // For unknown types, revalidate everything
        revalidatePath("/", "layout")
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      body,
    })
  } catch (err: any) {
    console.error("Revalidation error:", err)
    return new NextResponse(err.message, { status: 500 })
  }
}
