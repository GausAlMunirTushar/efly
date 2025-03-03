'use client'
import { useState } from 'react'

import { Plus } from 'lucide-react'
import CreateAccountGroup from './CreateAccountGroup'
import GroupList from './GroupList'
import Title from '@/components/common/Title'
import Button from '@/components/form/Button'
import Modal from '@/components/common/Modal'

const AccountGroup = () => {
	const [openModal, setOpenModal] = useState(false)

	const handleOpenModal = () => {
		setOpenModal(true)
	}
	const handleCloseModal = () => {
		setOpenModal(false)
	}
	return (
		<div className='px-4 py-2 box-shadow bg-white rounded-lg dark:bg-bg_dark'>
			<div className='flex items-center justify-between'>
				<Title>List of Group</Title>
				<Button onClick={handleOpenModal} leftIcon={<Plus />}>
					Create New Group
				</Button>
			</div>
			<div>
				<GroupList />
			</div>
			<Modal
				size='xl'
				title='Create New Group'
				isOpen={openModal}
				onClose={handleCloseModal}
			>
				<CreateAccountGroup />
			</Modal>
		</div>
	)
}

export default AccountGroup
