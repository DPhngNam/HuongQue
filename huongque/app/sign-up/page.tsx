import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React from 'react'

export default function SignUp() {
  return (
    <div className='flex flex-col p-[96px]'>
      {/* Sign up form */}
      <h1 className="w-[564px] justify-start text-gray-900 text-4xl font-bold font-['Montserrat'] leading-[56px]">Create Account</h1>
      
      <Card className='w-[564px] mt-8'>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>


        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='grid w-full items-center gap-4'>
                <Label htmlFor="name" className='text-sm font-medium text-gray-700'>User Name</Label>
                <Input type="text" id="name" className='border border-gray-300 rounded-4xl p-2' />
              </div>
              <div className='grid w-full items-center gap-4'>
                <Label htmlFor="email" className='text-sm font-medium text-gray-700'>Email</Label>
                <Input type="email" id="email" className='border border-gray-300 rounded-4xl p-2' />
              </div>
              <div className='grid w-full items-center gap-4'>
                <Label htmlFor="password" className='text-sm font-medium text-gray-700'>Password</Label>
                <Input type="password" id="password" className='border border-gray-300 rounded-4xl p-2' />
              </div>
              <div className='grid w-full items-center gap-4'>
                <Label htmlFor="confirm-password" className='text-sm font-medium text-gray-700'>Confirm Password</Label>
                <Input type="password" id="confirm-password" className='border border-gray-300 rounded-4xl p-2' />
              </div>
              
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col justify-between '>
          <Button className='bg-[#00CC96] text-white rounded-4xl w-full h-[56px]'>Sign Up</Button>
          <div className='flex flex-row justify-between mt-4'>
            <p className='text-sm text-gray-500'>Already have an account?</p>
            <Button variant="link" className='text-sm text-[#00CC96]'>Log In</Button>
          </div>
          <div className='flex flex-row justify-between mt-4'>
            <p className='text-sm text-gray-500'>By signing up, you agree to our</p>
            <Button variant="link" className='text-sm text-[#00CC96]'>Terms of Service</Button>
          </div>
        
        </CardFooter>
      </Card>
    </div>
  )
}
