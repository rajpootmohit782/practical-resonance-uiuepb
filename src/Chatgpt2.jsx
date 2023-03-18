import React, { useState } from "react";
import "./styles.css";

function ChatGPT() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hi,i am Bot By Mohit Rajpoot, How can i help you finding things on internet?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = async () => {
    if (!inputMessage) return;
    setMessages([...messages, { role: "user", content: inputMessage }]);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: inputMessage }]
      })
    });
    const { choices } = await response.json();
    console.log(choices);
    if (choices) {
      setMessages([
        ...messages,
        {
          role: "bot",
          content: choices[0].message.content.replace(/\n/g, "<br/>")
        }
      ]);
      setInputMessage("");
    }
  };

  const handleInputMessageChange = (event) => {
    setInputMessage(event.target.value);
  };

  return (
    <div className="container">
      <div className="chatbox">
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.role === "bot" ? (
                <p dangerouslySetInnerHTML={{ __html: message.content }} />
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          ))}
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="Type your message"
            value={inputMessage}
            onChange={handleInputMessageChange}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatGPT;
