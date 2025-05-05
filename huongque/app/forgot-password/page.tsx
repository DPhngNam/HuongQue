import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Car } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <Card className='w-[564px] gap-4 h-[400px] justify-center p-9 '>
        <CardHeader>
            <CardTitle className='text-2xl font-bold'>Forgot Password</CardTitle>
            <CardDescription className='text-sm text-gray-500'>
              Enter your email address and we will send you a link to reset your password.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form>
                <div className='grid w-full items-center gap-4'>
                <div className='grid w-full items-center gap-4'>
                    <Label htmlFor="email" className='text-sm font-medium text-gray-700'>Email</Label>
                    <Input type="email" id="email" className='border border-gray-300 rounded-4xl p-2' />
                </div>
                </div>
            </form>
            <Button className='bg-[#00CC96] text-white rounded-4xl w-full h-[56px] mt-7'>Send Reset Link</Button>
        </CardContent>
      </Card>

    </div>
  )
}
