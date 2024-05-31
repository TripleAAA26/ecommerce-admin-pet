'use client'

import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'

import { OrderColumn, columns } from '@/app/(dashboard)/[storeId]/(routes)/orders/components/columns'

interface OrderClientProps {
    data: OrderColumn[]
}

export default function OrderClient({ data }: OrderClientProps) {

    return (
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Manage orders for your store"
            />
            <Separator/>
            <DataTable searchKey="products" columns={columns} data={data}/>
        </>
    )
}

