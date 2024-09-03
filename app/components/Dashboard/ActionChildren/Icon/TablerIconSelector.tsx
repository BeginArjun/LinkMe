import React, { useState, useMemo } from 'react';
import * as TablerIcons from '@tabler/icons-react';

const INITIAL_DISPLAY_COUNT = 600;

interface TablerIconSelectorProps {
  onSelect: (iconName: string) => void;
}

const TablerIconSelector: React.FC<TablerIconSelectorProps> = ({ onSelect }) => {
  const allIconNames = Object.keys(TablerIcons.icons) as Array<keyof typeof TablerIcons.icons>;
  const [selectedIcon, setSelectedIcon] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredIcons = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return allIconNames.filter((iconName) =>
      iconName.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery, allIconNames]);

  const iconsToDisplay = useMemo(() => {
    return filteredIcons.slice(0, INITIAL_DISPLAY_COUNT);
  }, [filteredIcons]);

  const handleIconClick = (iconName: string) => {
    setSelectedIcon(iconName);
    onSelect(iconName);
  };

  return (
    <div className="p-4 max-h-[400px] overflow-y-auto">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search icons..."
        className="w-full p-2 mb-4 border rounded-lg"
      />
      <div className="grid grid-cols-6 gap-4">
        {iconsToDisplay.map((iconName) => {
          const IconComponent = TablerIcons[iconName];
          return (
            <button
              key={iconName}
              className={`flex justify-center items-center p-2 border rounded-lg ${
                selectedIcon === iconName ? 'border-blue-500' : 'border-gray-300'
              } hover:border-blue-500`}
              onClick={() => handleIconClick(iconName)}
            >
              <IconComponent className="w-8 h-8" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TablerIconSelector;