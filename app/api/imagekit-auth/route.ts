import { NextResponse } from 'next/server'
import ImageKit from 'imagekit'

export async function GET(req: Request) {
    try {
        const imagekit = new ImageKit({
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string
        })

        const result = imagekit.getAuthenticationParameters()

        return NextResponse.json(result)

    } catch (error) {
        console.log('[IMAGEKIT_AUTH_GET]', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}