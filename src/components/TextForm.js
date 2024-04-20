import React, { useState } from 'react';

export default function TextForm(props) {
    const [text, setText] = useState('enter text here');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState('Copy to Clipboard');

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert('converted to Uppercase' , 'success')
    };

    const handleDownClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert('converted to Lowercase' , 'success')
    };

    const handleClearClick = () => {
        setText('');
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleSpeakClick = () => {
        if ('speechSynthesis' in window) {
            if (isSpeaking) {
                // Stop speech
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            } else {
                // Start speech
                const speechSynthesisInstance = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(speechSynthesisInstance);
                setIsSpeaking(true);

                // Add event listener to update isSpeaking state when speech ends
                speechSynthesisInstance.onend = () => {
                    setIsSpeaking(false);
                };
            }
        } else {
            console.warn('Your browser does not support the SpeechSynthesis API.'); 
        }
    };

    const handleCopyClick = () => {
        // Use the Clipboard API to copy text to clipboard
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopyButtonText('Copied!');
                setTimeout(() => {
                    setCopyButtonText('Copy to Clipboard');
                }, 500);
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
            props.showAlert('text copied!' , 'success')
    };

    const handleMultiplyBy100 = () => {
        // Multiply the current text by 100
        const newText = Array(100).fill(text).join('\n');
        setText(newText);
    };

    const handleMultiplyBy1000 = () => {
        // Multiply the current text by 1000
        const newText = Array(1000).fill(text).join('\n');
        setText(newText);
    };

    return (
        <>
            <div className="container">
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        value={text}
                        id="mybox"
                        onChange={handleTextChange}
                        style={{
                            backgroundColor: props.mode === 'dark' ? '#333' : '#fff', // Updated colors
                            color: props.mode === 'dark' ? '#fff' : '#000' // Text color
                        }}
                        rows="7" 
                    ></textarea>
                </div>
                <button className="btn btn-primary" onClick={handleUpClick}>
                    Convert to Uppercase
                </button>
                <button className="btn btn-primary mx-3" onClick={handleDownClick}>
                    Convert to Lowercase
                </button>
                <button className="btn btn-primary" onClick={handleClearClick}>
                    Clear Text
                </button>
                <button className="btn btn-primary mx-3" onClick={handleSpeakClick}>
                    {isSpeaking ? 'Stop Speaking' : 'Speak'}
                </button>
                <button className="btn btn-primary " onClick={handleCopyClick}>
                    {copyButtonText}
                </button>
                
                {/* Add x100 and x1000 buttons */}
                <button className="btn btn-primary mx-3" onClick={handleMultiplyBy100}>
                    x100
                </button>
                <button className="btn btn-primary"  onClick={handleMultiplyBy1000}>
                    x1000
                </button>
            </div>
{/* https://www.nudepornpics.com/content/24625034/ */}
            <div className="container my-2">
                <h1>Your Text Summary</h1>
                <p>{text.split(' ').length} words, {text.length} characters</p>
                <p>{0.008 * text.split(' ').length} Minutes read</p>
                <h3>Preview</h3>
                <p>{text}</p>
            </div>
        </>
    );
}
