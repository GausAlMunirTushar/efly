'use client'

import React from 'react'
import Table from '@/components/common/Table'

const AccountListTable = () => {
	const columns = [
		{ Header: 'Account Name', accessor: 'accountName' },
		{ Header: 'Email', accessor: 'email' },
		{ Header: 'Status', accessor: 'status' },
		{ Header: 'Role', accessor: 'role' },
		{ Header: 'Created At', accessor: 'createdAt' }
	]

	const data = [
		{
			accountName: 'John Doe',
			email: 'john.doe@example.com',
			status: 'Active',
			role: 'Admin',
			createdAt: '2024-01-15'
		},
		{
			accountName: 'Jane Smith',
			email: 'jane.smith@example.com',
			status: 'Inactive',
			role: 'User',
			createdAt: '2024-01-10'
		},
		{
			accountName: 'Michael Johnson',
			email: 'michael.johnson@example.com',
			status: 'Active',
			role: 'Moderator',
			createdAt: '2024-02-05'
		}
	]

	return (
		<div className='p-4'>
			<Table columns={columns} data={data} />
		</div>
	)
}

export default AccountListTable
