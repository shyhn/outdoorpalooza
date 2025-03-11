
import React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventsFilterProps {
  activeFilters: {
    type: string | null;
    difficulty: string | null;
    date: string | null;
  };
  onFilterChange: (filterType: string, value: string | null) => void;
}

const EventsFilter: React.FC<EventsFilterProps> = ({ activeFilters, onFilterChange }) => {
  // Options de filtre
  const typeOptions = [
    { value: 'hiking', label: '🥾 Randonnée' },
    { value: 'biking', label: '🚵‍♂️ VTT' },
    { value: 'water', label: '🚣‍♀️ Activités Nautiques' },
    { value: 'camping', label: '⛺ Camping' },
    { value: 'climbing', label: '🧗‍♀️ Escalade' },
  ];
  
  const difficultyOptions = [
    { value: 'easy', label: 'Facile' },
    { value: 'moderate', label: 'Modéré' },
    { value: 'hard', label: 'Difficile' },
  ];
  
  const dateOptions = [
    { value: 'upcoming', label: 'À venir' },
    { value: 'weekend', label: 'Ce week-end' },
    { value: 'month', label: 'Ce mois-ci' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Filtre par type d'activité */}
      <div>
        <h3 className="font-medium text-sm text-forest-800 mb-2">Type d'activité</h3>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onFilterChange('type', option.value)}
              className={cn(
                'flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                activeFilters.type === option.value
                  ? 'bg-forest-100 text-forest-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {activeFilters.type === option.value && (
                <CheckIcon className="w-3 h-3 mr-1" />
              )}
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Filtre par niveau de difficulté */}
      <div>
        <h3 className="font-medium text-sm text-forest-800 mb-2">Niveau</h3>
        <div className="flex flex-wrap gap-2">
          {difficultyOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onFilterChange('difficulty', option.value)}
              className={cn(
                'flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                activeFilters.difficulty === option.value
                  ? 'bg-forest-100 text-forest-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {activeFilters.difficulty === option.value && (
                <CheckIcon className="w-3 h-3 mr-1" />
              )}
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Filtre par date */}
      <div>
        <h3 className="font-medium text-sm text-forest-800 mb-2">Date</h3>
        <div className="flex flex-wrap gap-2">
          {dateOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onFilterChange('date', option.value)}
              className={cn(
                'flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                activeFilters.date === option.value
                  ? 'bg-forest-100 text-forest-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {activeFilters.date === option.value && (
                <CheckIcon className="w-3 h-3 mr-1" />
              )}
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsFilter;
