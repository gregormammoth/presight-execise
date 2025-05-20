import * as React from 'react';
import config from '../../config';

const Text: React.FC = () => {
  const [displayText, setDisplayText] = React.useState<string>('');
  const [completeText, setCompleteText] = React.useState<string>('');
  const [isStreaming, setIsStreaming] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchText = async () => {
      try {
        setIsStreaming(true);
        const response = await fetch(`${config.api.baseUrl}/api/text/paragraphs`);
        const reader = response.body?.getReader();
        if (!reader) throw new Error('Failed to get reader');
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            setIsStreaming(false);
            break;
          }

          const chunk = decoder.decode(value);
          setDisplayText(prev => prev + chunk);
        }

        setCompleteText(displayText);
        
      } catch (error) {
        console.error('Error fetching text:', error);
        setIsStreaming(false);
      }
    };

    fetchText();
  }, []);
  return (
    <div className="p-4">{displayText}{isStreaming ? '...' : ''}</div>
  )
};

export default Text;
