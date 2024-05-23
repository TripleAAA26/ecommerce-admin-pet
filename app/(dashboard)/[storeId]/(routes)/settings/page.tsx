import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import prismadb from '@/lib/prismadb'
import SettingsForm from '@/app/(dashboard)/[storeId]/(routes)/settings/components/settings-form'

interface SettingsPageProps {
    params: {
        storeId: string
    }
}

export default async function SettingsPage({ params }: SettingsPageProps) {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if (!store) {
        redirect('/')
    }

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <SettingsForm initialData={store} />
            </div>
        </div>
    )
}

