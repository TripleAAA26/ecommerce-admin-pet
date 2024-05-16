'use client'

import { Modal } from '@/components/ui/modal'
import { useStoreModal } from '@/hooks/use-store-modal'

export function StoreModal() {
    const isOpen = useStoreModal((state) => state.isOpen)
    const onClose = useStoreModal((state) => state.onClose)

    return (
        <Modal
            title='Create store'
            description='Add a new store to manage products and categories'
            isOpen={isOpen}
            onClose={onClose}
        >
            Future Create Store Form
        </Modal>
    )
}