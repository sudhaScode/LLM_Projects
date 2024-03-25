import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

    const initialAction = () => {
        const message = createChatBotMessage('Just type in your name to begin.');
        updateState(message, "age")
    }

    const afterNameMessage = () => {
        const message = createChatBotMessage("Let me know your age so I can suggest the best ride for you.")
        updateState(message, "preference")
    }

    const afterAgeMessage = () => {
        const message = createChatBotMessage("do you lean towards a fast and thrilling ride or prefer a more relaxed and comfortable one?", {
            widget: "startSlow"
        })
        updateState(message)
    }

    const finalResult = (name, age, preference, vehicle) => {
        const message = createChatBotMessage(`Got it, ${name}! Based on your age ${age} and preference for a ${preference} ride, I recommend the '${vehicle}.' Enjoy the thrill!`, {
            widget: "finalImage"
        })
        updateState(message)
    }

    const updateState = (message, checker) => {
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
            checker,
        }))
    }

    const sendMessageToAPI = async (message) => {
        //message += " if it is greeting greet the user"
        //console.log(message)
        try {
          const response = await fetch('http://127.0.0.1:8000/query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: message}),
          });
     
          if (response.ok) {
            const result = await response.json();
            // Call the appropriate actions based on the API response
            //console.log(result.bot_reply.response);
            return result.bot_reply.response;
          } else {
            console.error('Failed to fetch data from the server');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
 
      const handleAPIResponse = async (response) => {
        try {
            const rawResponse = await sendMessageToAPI(response);
            console.log(rawResponse)
            const formattedResponse = formatResponse(rawResponse);
            const message = createChatBotMessage(formattedResponse);
            updateState(message);
        } catch (error) {
            console.error('Error handling API response:', error);
        }
    };
    const formatResponse = (rawResponse) => {
        // Replace asterisks with bold dots
        const formattedResponse = rawResponse.replace(/-\*/g, '- **');
      
        // Split points into separate lines
        const lines = formattedResponse.split(/\s*[\r\n]+\s*/);
      
        // Join lines with line breaks
        const finalResponse = lines.join('\n');
      
        return finalResponse;
      };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        initialAction,
                        afterNameMessage,
                        afterAgeMessage,
                        finalResult,
                        handleAPIResponse
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;