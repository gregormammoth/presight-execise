
import * as React from 'react';

const Text = () => {
  const [displayText, setDisplayText] = React.useState('');
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [fullText, setFullText] = React.useState('');

  React.useEffect(() => {
    const fetchText = async () => {
      try {
        setIsStreaming(true);
        const response = await fetch('http://localhost:3001/api/text/paragraphs');
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = '';

        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            setIsStreaming(false);
            setFullText(accumulatedText);
            break;
          }

          const chunk = decoder.decode(value);
          accumulatedText += chunk;
          setFullText(accumulatedText);
        }
      } catch (error) {
        console.error('Error fetching text:', error);
        setIsStreaming(false);
      }
    };

    fetchText();
  }, []);

  React.useEffect(() => {
    if (!isStreaming && currentIndex >= fullText.length) {
      return;
    }

    const timer = setTimeout(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [currentIndex, fullText, isStreaming]);

  return (
    <div>{displayText}{isStreaming ? ' Streaming...' : ''}</div>
  );
};

export default Text;
