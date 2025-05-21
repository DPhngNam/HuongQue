'use client'
import { useAuthStore } from '@/app/stores/authStore'
import React, { useEffect } from 'react'

export default function AuthInit() {
    const {initialize} = useAuthStore()
    useEffect(()=>{
        initialize()
    },[initialize])
  return null
}
