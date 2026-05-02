'use client';

import { useState, useEffect, useCallback } from 'react';

export interface XPEvent {
  id: string;
  label: string;
  points: number;
  discovered: boolean;
}

const XP_EVENTS: XPEvent[] = [
  { id: 'hero_viewed', label: 'Entered the universe', points: 10, discovered: false },
  { id: 'about_viewed', label: 'Learned the story', points: 20, discovered: false },
  { id: 'skills_interacted', label: 'Explored the arsenal', points: 30, discovered: false },
  { id: 'education_viewed', label: 'Traced the journey', points: 20, discovered: false },
  { id: 'nai_opened', label: 'Met NAI', points: 40, discovered: false },
  { id: 'nai_messaged', label: 'Talked to NAI', points: 60, discovered: false },
  { id: 'terminal_opened', label: 'Found the terminal', points: 100, discovered: false },
  { id: 'humans_visited', label: 'Met the human', points: 150, discovered: false },
  { id: 'contact_viewed', label: 'Ready to connect', points: 30, discovered: false },
  { id: 'contact_submitted', label: 'Made contact', points: 200, discovered: false },
];

const TOTAL_XP = 660;
const STORAGE_KEY = 'nai_xp_data';

interface XPData {
  events: Record<string, boolean>;
  totalXP: number;
}

export function useXPSystem() {
  const [events, setEvents] = useState<XPEvent[]>(XP_EVENTS);
  const [totalXP, setTotalXP] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Save to localStorage
  const saveXPData = useCallback((updatedEvents: XPEvent[], newTotalXP: number) => {
    try {
      const data: XPData = {
        events: updatedEvents.reduce((acc, event) => {
          acc[event.id] = event.discovered;
          return acc;
        }, {} as Record<string, boolean>),
        totalXP: newTotalXP
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Silently fail - XP is not critical
    }
  }, []);

  const triggerXPInternal = useCallback((eventId: string) => {
    setEvents(prevEvents => {
      const eventIndex = prevEvents.findIndex(e => e.id === eventId);

      if (eventIndex === -1) return prevEvents;

      const event = prevEvents[eventIndex];

      // Already discovered
      if (event.discovered) return prevEvents;

      // Mark as discovered
      const updatedEvents = [...prevEvents];
      updatedEvents[eventIndex] = { ...event, discovered: true };

      // Calculate new total
      const newTotalXP = updatedEvents
        .filter(e => e.discovered)
        .reduce((sum, e) => sum + e.points, 0);

      setTotalXP(newTotalXP);
      setPercentage((newTotalXP / TOTAL_XP) * 100);

      // Save to localStorage
      saveXPData(updatedEvents, newTotalXP);

      return updatedEvents;
    });
  }, [saveXPData]);

  // Load from localStorage on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: XPData = JSON.parse(stored);

        // Update events with discovered status
        const updatedEvents = XP_EVENTS.map(event => ({
          ...event,
          discovered: data.events[event.id] || false
        }));

        setEvents(updatedEvents);
        setTotalXP(data.totalXP);
        setPercentage((data.totalXP / TOTAL_XP) * 100);
      }

      // Check if humans page was visited (stored separately)
      const humansVisited = localStorage.getItem('nai_xp_humans');
      if (humansVisited === 'true') {
        triggerXPInternal('humans_visited');
      }
    } catch {
      // Silently fail - XP is not critical
    }
  }, [triggerXPInternal]);

  const triggerXP = useCallback((eventId: string) => {
    if (!mounted) return;
    triggerXPInternal(eventId);
  }, [mounted, triggerXPInternal]);

  return {
    events,
    totalXP,
    percentage,
    triggerXP,
    mounted
  };
}
