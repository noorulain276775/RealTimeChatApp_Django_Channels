import React from 'react'

export const Message = ({text,sent }) => {
  return (
    <div className={`message ${sent ? 'sent': 'received' }`}>
        <div className='message-bubble'>{text}</div>
    </div>
  )
}
