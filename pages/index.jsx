import React from 'react'
import { useRouter } from 'next/router'

export default function index() {
    const router = useRouter()

    React.useEffect(() => {
        router.push('/ad-manage')
    }, [])

    return <div></div>
}
