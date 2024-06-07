'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ImagePlus, Trash } from 'lucide-react'
import axios from 'axios'
import { IKUpload } from 'imagekitio-react'

import { Button } from '@/components/ui/button'

interface ImageUploadOptions {
    disabled?: boolean
    onChange: (value: string) => void
    onRemove: (value: string) => void
    value: string[]
}


const authenticator = async () => {
    try {
        const response = await axios.get('/api/imagekit-auth')

        if (!response) {
            throw new Error(`Request failed`)
        }

        return response.data
    } catch (error: any) {
        throw new Error(`Authentication request failed: ${error.message}`)
    }
}

export default function ImageUpload({ disabled, onChange, onRemove, value }: ImageUploadOptions) {
    const ikUploadRefTest = useRef(null)

    function onSuccess(res: any) {
        onChange(res.url)
    }

    // Prevent from hydration error
    const [ isMounted, setIsMounted ] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }

    return (
        <div>
            <div className='mb-4 flex items-center gap-4'>
                {value.map(url =>
                    <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
                        <div className='z-10 absolute top-2 right-2'>
                            <Button type='button' variant='destructive' size='icon' onClick={() => onRemove(url)}>
                                <Trash className='h-4 w-4' />
                            </Button>
                        </div>
                        <Image
                            fill
                            className='object-cover'
                            src={url}
                            alt='Image'
                        />
                    </div>
                )}
            </div>
            <div>
                <IKUpload
                    publicKey='public_1/eNQSZws9RGBWKXr1/6Stj1xKE='
                    urlEndpoint='https://ik.imagekit.io/t18fqvt5e9'
                    authenticator={authenticator}
                    onSuccess={onSuccess}
                    onError={(error) => console.log('Error', error)}
                    style={{ display: 'none' }}
                    ref={ikUploadRefTest}
                />
                <Button
                    type='button'
                    disabled={disabled}
                    variant='secondary'
                    onClick={() => {
                        //@ts-ignore
                        ikUploadRefTest.current.click()
                    }}
                >
                    <ImagePlus className='h-4 w-4 mr-2' />
                    Upload an Image
                </Button>
            </div>
        </div>
    )
}

