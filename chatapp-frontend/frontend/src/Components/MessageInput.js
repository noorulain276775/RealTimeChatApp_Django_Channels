import React, {useState} from 'react'

export const MessageInput = () => {
    const [inputValue, setInputValue] = useState("")
    const handleInputChange = (event)=> {
        setInputValue(event.target.value)

    } 

    const handleSentMessage = () => {
        console.log("Message sent")

    }
  return (
    <div className='message-input'>
        <textarea
        placeholder='Type your message'
        value = {inputValue}
        onChange={handleInputChange}
        />
        <button onClick={handleSentMessage}>Send</button>
    </div>
  )
}
