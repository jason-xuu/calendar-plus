import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import fuzzysort from "fuzzysort"; // npm install fuzzysort

interface EventItem {
  id: string;
  title: string;
  start: string;
  allDay?: boolean;
}

interface SearchEventsProps {
  events: EventItem[];
  onEventSelect: (event: EventItem) => void;
}

const SearchEvents: React.FC<SearchEventsProps> = ({ events, onEventSelect }) => {
  const [query, setQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<EventItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const results = fuzzysort.go(query, events, { key: "title" });
      setFilteredEvents(results.map(res => res.obj));
    } else {
      setFilteredEvents([]);
    }
  }, [query, events]);

  const handleSelectEvent = (event: EventItem) => {
    setQuery('');
    setFilteredEvents([]);
    onEventSelect(event);
  };

  const handleClearSearch = () => {
    setQuery('');
    setFilteredEvents([]);
  };

  // Press "/" to focus the search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search events..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pr-10"
        />
        {query && (
          <button
            onClick={handleClearSearch}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {filteredEvents.length > 0 && (
        <ul className="absolute z-20 w-full mt-2 bg-background border border-border rounded-md shadow-md max-h-60 overflow-auto">
          {filteredEvents.map((event) => (
            <li
              key={event.id}
              onClick={() => handleSelectEvent(event)}
              className="px-4 py-2 hover:bg-muted cursor-pointer text-foreground"
            >
              {event.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchEvents;
