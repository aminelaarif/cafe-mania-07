
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockMenu, mockHistoryContent, mockEvents } from '@/db/mockdata';

interface ContentContextType {
  menu: typeof mockMenu;
  historyContent: typeof mockHistoryContent;
  events: typeof mockEvents;
  updateMenu: (newMenu: typeof mockMenu) => void;
  updateHistoryContent: (newHistory: typeof mockHistoryContent) => void;
  updateEvents: (newEvents: typeof mockEvents) => void;
  addMenuItem: (categoryId: string, item: any) => void;
  updateMenuItem: (categoryId: string, itemId: string, updates: any) => void;
  deleteMenuItem: (categoryId: string, itemId: string) => void;
  addHistorySection: (section: any) => void;
  updateHistorySection: (sectionId: string, updates: any) => void;
  deleteHistorySection: (sectionId: string) => void;
  addEvent: (event: any) => void;
  updateEvent: (eventId: string, updates: any) => void;
  deleteEvent: (eventId: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState(mockMenu);
  const [historyContent, setHistoryContent] = useState(mockHistoryContent);
  const [events, setEvents] = useState(mockEvents);

  // Simuler la persistance en localStorage
  useEffect(() => {
    const savedMenu = localStorage.getItem('coffee-shop-menu');
    const savedHistory = localStorage.getItem('coffee-shop-history');
    const savedEvents = localStorage.getItem('coffee-shop-events');

    if (savedMenu) setMenu(JSON.parse(savedMenu));
    if (savedHistory) setHistoryContent(JSON.parse(savedHistory));
    if (savedEvents) setEvents(JSON.parse(savedEvents));
  }, []);

  const updateMenu = (newMenu: typeof mockMenu) => {
    setMenu(newMenu);
    localStorage.setItem('coffee-shop-menu', JSON.stringify(newMenu));
  };

  const updateHistoryContent = (newHistory: typeof mockHistoryContent) => {
    setHistoryContent(newHistory);
    localStorage.setItem('coffee-shop-history', JSON.stringify(newHistory));
  };

  const updateEvents = (newEvents: typeof mockEvents) => {
    setEvents(newEvents);
    localStorage.setItem('coffee-shop-events', JSON.stringify(newEvents));
  };

  const addMenuItem = (categoryId: string, item: any) => {
    const newMenu = menu.map(category => 
      category.id === categoryId 
        ? { ...category, items: [...category.items, { ...item, id: Date.now().toString() }] }
        : category
    );
    updateMenu(newMenu);
  };

  const updateMenuItem = (categoryId: string, itemId: string, updates: any) => {
    const newMenu = menu.map(category => 
      category.id === categoryId 
        ? {
            ...category,
            items: category.items.map(item =>
              item.id === itemId ? { ...item, ...updates } : item
            )
          }
        : category
    );
    updateMenu(newMenu);
  };

  const deleteMenuItem = (categoryId: string, itemId: string) => {
    const newMenu = menu.map(category => 
      category.id === categoryId 
        ? { ...category, items: category.items.filter(item => item.id !== itemId) }
        : category
    );
    updateMenu(newMenu);
  };

  const addHistorySection = (section: any) => {
    const newHistory = [...historyContent, { ...section, id: Date.now().toString() }];
    updateHistoryContent(newHistory);
  };

  const updateHistorySection = (sectionId: string, updates: any) => {
    const newHistory = historyContent.map(section =>
      section.id === sectionId ? { ...section, ...updates } : section
    );
    updateHistoryContent(newHistory);
  };

  const deleteHistorySection = (sectionId: string) => {
    const newHistory = historyContent.filter(section => section.id !== sectionId);
    updateHistoryContent(newHistory);
  };

  const addEvent = (event: any) => {
    const newEvents = [...events, { ...event, id: Date.now().toString() }];
    updateEvents(newEvents);
  };

  const updateEvent = (eventId: string, updates: any) => {
    const newEvents = events.map(event =>
      event.id === eventId ? { ...event, ...updates } : event
    );
    updateEvents(newEvents);
  };

  const deleteEvent = (eventId: string) => {
    const newEvents = events.filter(event => event.id !== eventId);
    updateEvents(newEvents);
  };

  return (
    <ContentContext.Provider value={{
      menu,
      historyContent,
      events,
      updateMenu,
      updateHistoryContent,
      updateEvents,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      addHistorySection,
      updateHistorySection,
      deleteHistorySection,
      addEvent,
      updateEvent,
      deleteEvent
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
