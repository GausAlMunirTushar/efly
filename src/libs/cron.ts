import cron from 'node-cron'

const scheduleBackup = async () => {
	cron.schedule('0 0 * * *', async () => {
		console.log('Running daily backup...')
		await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/backup`, {
			method: 'POST'
		})
	})

	cron.schedule('0 0 * * 0', async () => {
		console.log('Running weekly backup...')
		await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/backup`, {
			method: 'POST'
		})
	})

	cron.schedule('0 0 1 * *', async () => {
		console.log('Running monthly backup...')
		await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/backup`, {
			method: 'POST'
		})
	})
}

export default scheduleBackup
