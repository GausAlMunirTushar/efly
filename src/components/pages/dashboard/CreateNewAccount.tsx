'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import AccountForm from './AccountForm'
import AccountListTable from './create-new-account/AccountListTable'
import Modal from '@/components/common/Modal'
import Button from '@/components/form/Button'
import Title from '@/components/common/Title'

const CreateNewAccount = () => {
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
				<Title>Account List</Title>
				<Button onClick={handleOpenModal} leftIcon={<Plus />}>
					Create New Account
				</Button>
			</div>
			<div>
				<AccountListTable />
			</div>
			<Modal
				size='xl'
				title='Create New Group'
				isOpen={openModal}
				onClose={handleCloseModal}
			>
				<AccountForm />
			</Modal>
		</div>
	)
}

export default CreateNewAccount
