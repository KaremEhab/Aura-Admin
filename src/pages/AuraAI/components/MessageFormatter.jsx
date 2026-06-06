import React from 'react';

// Renders a single line of text with bold, mentions, and template pills parsed
const parseText = (text) => {
  if (!text) return null;

  // Split by bold (**text** or *text*) or brackets ([text])
  const parts = text.split(/(\[.*?\]|\*{1,2}.*?\*{1,2})/g);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-title">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <strong key={i} className="font-bold text-title">{part.slice(1, -1)}</strong>;
    }

    if (part.startsWith('[') && part.endsWith('TEMPLATE]')) {
      return (
        <span key={i} className="inline-flex items-center px-2 py-0.5 mx-1 rounded-full text-[10px] font-bold bg-primary-lite border border-primary-border text-primary uppercase tracking-wider">
          {part.slice(1, -1)}
        </span>
      );
    }
    if (part.startsWith('[') && part.endsWith('PLAN]')) {
      return (
        <span key={i} className="inline-flex items-center px-2 py-0.5 mx-1 rounded-full text-[10px] font-bold bg-purple-500/10 border border-purple-500/30 text-purple-400 uppercase tracking-wider">
          {part.slice(1, -1)}
        </span>
      );
    }
    if (part.startsWith('[@') && part.endsWith(']')) {
      return (
        <span key={i} className="inline-flex items-center px-2 py-0.5 mx-1 rounded-full text-[10px] font-bold bg-sidebar border border-secondary/50 text-secondary uppercase tracking-wider">
          {part.slice(2, -1)}
        </span>
      );
    }

    // Now process the non-bold, non-bracket part for legacy pills just in case
    const subParts = part.split(/(@[A-Za-z0-9_ ]+|tmp_[a-z_]+|pl_[a-z_]+)/g);
    
    return subParts.map((subPart, j) => {
      if (subPart.startsWith('@')) {
        return (
          <span key={`${i}-${j}`} className="inline-flex items-center px-2 py-0.5 mx-1 rounded-full text-[10px] font-bold bg-sidebar border border-secondary/50 text-secondary uppercase tracking-wider">
            {subPart.slice(1)}
          </span>
        );
      }
      if (subPart.startsWith('tmp_')) {
        const type = subPart.split('_')[1];
        return (
          <span key={`${i}-${j}`} className="inline-flex items-center px-2 py-0.5 mx-1 rounded-full text-[10px] font-bold bg-primary-lite border border-primary-border text-primary uppercase tracking-wider">
            {type} TEMPLATE
          </span>
        );
      }
      if (subPart.startsWith('pl_')) {
        const type = subPart.split('_')[1];
        return (
          <span key={`${i}-${j}`} className="inline-flex items-center px-2 py-0.5 mx-1 rounded-full text-[10px] font-bold bg-purple-500/10 border border-purple-500/30 text-purple-400 uppercase tracking-wider">
            {type} PLAN
          </span>
        );
      }
      return subPart;
    });
  });
};

export const MessageFormatter = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const renderedLines = [];
  let bulletGroup = [];

  const flushBullets = () => {
    if (bulletGroup.length > 0) {
      renderedLines.push(
        <div key={`bullet-${renderedLines.length}`} className="border-l-2 border-stroke pl-4 my-2 flex flex-col gap-1 py-1">
          {bulletGroup.map((bullet, idx) => (
            <div key={idx} className="text-[14px] text-title">
              {parseText(bullet)}
            </div>
          ))}
        </div>
      );
      bulletGroup = [];
    }
  };

  lines.forEach((line, index) => {
    if (line.trim().startsWith('- ')) {
      bulletGroup.push(line.trim().substring(2));
    } else {
      flushBullets();
      renderedLines.push(
        <div key={`line-${index}`} className={`text-[14px] leading-relaxed ${index !== 0 ? 'mt-2' : ''}`}>
          {parseText(line)}
        </div>
      );
    }
  });

  flushBullets();

  return <div className="w-full text-title">{renderedLines}</div>;
};
