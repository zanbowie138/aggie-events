import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";

interface TagSelectorProps {
  selectedTags: Set<string>;
  onTagsChange: (tags: Set<string>) => void;
  suggestedTags?: string[];
}

export default function TagSelector({ 
  selectedTags, 
  onTagsChange,
  suggestedTags = []
}: TagSelectorProps) {
  const [input, setInput] = useState('');

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !selectedTags.has(trimmedTag)) {
      const newTags = new Set(selectedTags);
      newTags.add(trimmedTag);
      onTagsChange(newTags);
    }
    setInput('');
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = new Set(selectedTags);
    newTags.delete(tag);
    onTagsChange(newTags);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {Array.from(selectedTags).map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 rounded-full py-1 px-3 text-sm text-gray-700 flex items-center gap-2"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="hover:text-maroon"
            >
              <IoClose />
            </button>
          </span>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input) {
              e.preventDefault();
              handleAddTag(input);
            }
          }}
          placeholder="Add tags (press Enter)"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-maroon"
        />
        
        {input && suggestedTags.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
            {suggestedTags
              .filter(tag => 
                tag.toLowerCase().includes(input.toLowerCase()) &&
                !selectedTags.has(tag)
              )
              .map(tag => (
                <button
                  key={tag}
                  onClick={() => handleAddTag(tag)}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100"
                >
                  {tag}
                </button>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
} 