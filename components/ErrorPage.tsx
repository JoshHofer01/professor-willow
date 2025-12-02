import React from 'react'

const ErrorPage = ({ message }: { message: string}) => {
  return (
    <div>ErrorPage {message}</div>
  )
}

export default ErrorPage