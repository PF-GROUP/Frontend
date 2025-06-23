"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import apiService from '@/services/apiService'
import { useAuthContext } from '../../../../context/authContext';

export default function LogoutPage() {
  const router = useRouter()
    const {ResetUserData} = useAuthContext();
  useEffect(() => {
    apiService.post('/auth/logout', {}, true)
    router.push('/')
    ResetUserData();
  }, [])

  return <div>Loging out...</div>
}
