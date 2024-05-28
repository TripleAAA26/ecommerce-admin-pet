'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import AlertModal from '@/components/modals/alert-modal'

import { BillboardColumn } from '@/app/(dashboard)/[storeId]/(routes)/billboards/components/columns'

interface CellActionProps {
    data: BillboardColumn
}

export default function CellAction({ data }: CellActionProps) {
    const router = useRouter()
    const params = useParams()

    const [ loading, setLoading ] = useState(false)
    const [ open, setOpen ] = useState(false)

    function onCopy(id: string) {
        navigator.clipboard.writeText(id)
        toast.success('Billboard Id copied to the clipboard')
    }

    async function onDelete() {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/billboards/${data.id}`)
            router.refresh()

            toast.success('Billboard deleted.')

        } catch (error) {
            toast.error('Make sure you removed all categories using this billboard first.')
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className='mr-2 h-4 w-4' />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}
                    >
                        <Edit className='mr-2 h-4 w-4' />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className='mr-2 h-4 w-4' />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

