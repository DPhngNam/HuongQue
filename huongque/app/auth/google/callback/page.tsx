import React from 'react'

export default function page() {
  return (
    <div>
      <h1>google success </h1>
        <p>Login Success</p>
        <div className="flex flex-col gap-4">
          <span className="text-sm font-bold">Access Token: </span>
          <span className="text-sm font-bold">Refresh Token: </span>
          </div>
    </div>
  )
}
