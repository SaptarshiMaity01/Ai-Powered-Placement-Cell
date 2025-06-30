import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Save, Trash2 } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../services/eventService';

const ModernPersonalCalendar = () => {
  // State variables
  const [viewType, setViewType] = useState('month'); // month, day, week
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().toLocaleString('default', { month: 'long', year: 'numeric' }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    id: null,
    title: '',
    start: '',
    end: '',
    color: '#0a66c2', // LinkedIn blue as default
    description: ''
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Create date range for filtering events
      const startDate = new Date(currentDate);
      startDate.setDate(1); // First day of current month
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(currentDate);
      endDate.setMonth(endDate.getMonth() + 1, 0); // Last day of current month
      endDate.setHours(23, 59, 59, 999);
      
      const fetchedEvents = await getEvents(startDate, endDate);
      setEvents(fetchedEvents);
    } catch (err) {
      console.error("Failed to load events", err);
      setError(err.message || "Failed to load events");
    } finally {
      setIsLoading(false);
    }
  };

  // Load events when component mounts or when current date changes
  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  // Generate time slots for 24 hours
  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
      slots.push(`${i.toString().padStart(2, '0')}:00`);
      slots.push(`${i.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };
  
  const timeSlots = generateTimeSlots();
  
  // Navigation functions
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else { // month
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
    updateMonthDisplay(newDate);
  };
  
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else { // month
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
    updateMonthDisplay(newDate);
  };
  
  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    updateMonthDisplay(today);
  };
  
  const updateMonthDisplay = (date) => {
    setCurrentMonth(date.toLocaleString('default', { month: 'long', year: 'numeric' }));
  };
  
  // Open modal for new event
  const openNewEventModal = (date, timeSlot = '') => {
    let startTime, endTime;
    
    if (timeSlot) {
      // Parse the time slot
      const [hours, minutes] = timeSlot.split(':').map(Number);
      const eventDate = new Date(date);
      eventDate.setHours(hours, minutes, 0, 0);
      
      // Set end time as 1 hour later
      const endDate = new Date(eventDate);
      endDate.setHours(eventDate.getHours() + 1);
      
      startTime = eventDate.toISOString().slice(0, 16);
      endTime = endDate.toISOString().slice(0, 16);
    } else {
      // For month view where we just have a date
      const eventDate = new Date(date);
      eventDate.setHours(12, 0, 0, 0); // Default to noon
      
      const endDate = new Date(eventDate);
      endDate.setHours(eventDate.getHours() + 1);
      
      startTime = eventDate.toISOString().slice(0, 16);
      endTime = endDate.toISOString().slice(0, 16);
    }
    
    setNewEvent({
      id: null,
      title: '',
      start: startTime,
      end: endTime,
      color: '#0a66c2', // LinkedIn blue as default
      description: ''
    });
    
    setIsModalOpen(true);
  };
  
  // Close modal and reset new event
  const closeEventModal = () => {
    setIsModalOpen(false);
    setNewEvent({
      id: null,
      title: '',
      start: '',
      end: '',
      color: '#0a66c2',
      description: ''
    });
    setShowColorPicker(false);
  };
  
  // Handle event form changes
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };
  
  
  // Save event to backend
  const saveEventHandler = async () => {
    if (!newEvent.title.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      if (newEvent.id) {
        // Update existing event
        const updatedEvent = await updateEvent(newEvent.id, newEvent);
        setEvents(prevEvents => 
          prevEvents.map(event => 
            event._id === updatedEvent._id ? updatedEvent : event
          )
        );
      } else {
        // Create new event
        const createdEvent = await createEvent(newEvent);
        setEvents(prevEvents => [...prevEvents, createdEvent]);
      }
      
      closeEventModal();
    } catch (err) {
      console.error("Failed to save event", err);
      setError(err.message || "Failed to save event");
    } finally {
      setIsLoading(false);
    }
  };
  // Delete an event
  const deleteEventHandler = async (eventId) => {
    try {
      setIsLoading(true);
      setError(null);
     
      
      await deleteEvent(eventId);
      
      setEvents(prevEvents => 
        prevEvents.filter(event => (event._id !== eventId ))
      );
      closeEventModal();
    } catch (err) {
      console.error("Failed to delete event", err);
      setError(err.message || "Failed to delete event");
    } finally {
      setIsLoading(false);
    }
  };
  //Drag Event Function
  const handleDragStart = (event, e) => {
    e.dataTransfer.setData('text/plain', event._id); // Use _id instead of id
    setDraggedEvent(event);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move'; // Show move cursor
  };
  
  const handleDrop = async (date, timeSlot, e) => {
    e.preventDefault();
    if (!draggedEvent) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Parse the time slot
      const [hours, minutes] = timeSlot.split(':').map(Number);
      const eventDate = new Date(date);
      eventDate.setHours(hours, minutes, 0, 0);
      
      // Calculate event duration
      const oldStart = new Date(draggedEvent.start);
      const oldEnd = new Date(draggedEvent.end);
      const duration = oldEnd - oldStart;
      
      // Create new end time
      const newEnd = new Date(eventDate.getTime() + duration);
      
      // Update the event
      const updatedEvent = {
        ...draggedEvent,
        start: eventDate.toISOString(),
        end: newEnd.toISOString()
      };
      
      // Use _id instead of id for MongoDB
      await updateEvent(draggedEvent._id, updatedEvent);
      
      // Optimistically update the UI instead of refetching
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event._id === draggedEvent._id ? updatedEvent : event
        )
      );
      
      setDraggedEvent(null);
    } catch (err) {
      console.error("Failed to update event", err);
      setError(err.message || "Failed to update event");
      // Revert the UI if the update fails
      await fetchEvents();
    } finally {
      setIsLoading(false);
    }
  };
  
  // Edit an existing event
  // Fixed editEvent function
  const editEvent = (event) => {
    console.log("Editing event:", event);
    setNewEvent({
      id: event._id || event.id, // Handle both _id and id
      title: event.title,
      start: event.start.includes('T') ? event.start.slice(0, 16) : new Date(event.start).toISOString().slice(0, 16),
      end: event.end.includes('T') ? event.end.slice(0, 16) : new Date(event.end).toISOString().slice(0, 16),
      color: event.color,
      description: event.description || ''
    });
    setIsModalOpen(true);
  };
  
  // Get events for a specific date
  const getDateEvents = (date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate >= startOfDay && eventDate < endOfDay;
    });
  };
  
  // Get events for a specific time slot
  const getTimeSlotEvents = (date, timeSlot) => {
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const slotStart = new Date(date);
    slotStart.setHours(hours, minutes, 0, 0);
    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + 30);
    
    return events.filter(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      
      // Check if the event is on the same day
      const isSameDay = eventStart.getFullYear() === date.getFullYear() &&
                        eventStart.getMonth() === date.getMonth() &&
                        eventStart.getDate() === date.getDate();
      
      if (!isSameDay) return false;
      
      return (eventStart < slotEnd && eventEnd > slotStart) ||
             (Math.abs(eventStart.getTime() - slotStart.getTime()) < 1000 * 60 * 15);
    });
  };
  
  // Render the navigation header
  const renderNavigation = () => (
    <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="flex items-center">
        <button 
          onClick={() => setShowMonthPicker(!showMonthPicker)}
          className="text-lg font-semibold text-slate-900 hover:bg-slate-100 px-3 py-1 rounded"
        >
          {currentMonth}
        </button>
        
        {showMonthPicker && (
          <div className="absolute z-10 mt-2 bg-white border border-slate-200 rounded-lg p-4 shadow-lg">
            <div className="flex justify-between mb-2">
              <button 
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setFullYear(newDate.getFullYear() - 1);
                  setCurrentDate(newDate);
                  updateMonthDisplay(newDate);
                }}
                className="text-slate-700 hover:bg-slate-100 p-1 rounded"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-slate-900 font-medium">
                {currentDate.getFullYear()}
              </span>
              <button 
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setFullYear(newDate.getFullYear() + 1);
                  setCurrentDate(newDate);
                  updateMonthDisplay(newDate);
                }}
                className="text-slate-700 hover:bg-slate-100 p-1 rounded"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 12 }).map((_, i) => {
                const month = new Date(currentDate.getFullYear(), i, 1).toLocaleString('default', { month: 'short' });
                return (
                  <button
                    key={i}
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(i);
                      setCurrentDate(newDate);
                      updateMonthDisplay(newDate);
                      setShowMonthPicker(false);
                    }}
                    className={`p-2 text-sm rounded ${
                      currentDate.getMonth() === i 
                        ? 'bg-[#0a66c2] text-white' 
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {month}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          onClick={goToPrevious} 
          className="p-1 rounded hover:bg-slate-100 text-slate-700"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button 
          onClick={goToToday}
          className="px-3 py-1 text-sm bg-[#0a66c2] text-white rounded hover:bg-[#004182]"
        >
          Today
        </button>
        <button 
          onClick={goToNext} 
          className="p-1 rounded hover:bg-slate-100 text-slate-700"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
  
  // Render the day view
  const renderDayView = () => {
    const formattedDate = currentDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  
    return (
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
        {renderNavigation()}
        <div className="p-3 bg-slate-50 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">{formattedDate}</h2>
        </div>
  
        <div className="grid grid-cols-1">
          <div className="border-r border-slate-200">
            {timeSlots.map((timeSlot, index) => {
              const slotEvents = getTimeSlotEvents(currentDate, timeSlot);
              return (
                <div 
                  key={index} 
                  className="relative flex border-b border-slate-200 hover:bg-slate-50"
                >
                  <div className="w-24 py-2 px-2 text-xs text-slate-500 border-r border-slate-200">
                    {timeSlot}
                  </div>
                  <div 
                    className="flex-1 min-h-12 py-1 px-2 relative"
                    onClick={() => openNewEventModal(currentDate, timeSlot)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(currentDate, timeSlot, e)} // pass timeSlot for the drop event
                  >
                    {slotEvents.map(event => (
                      <div 
                        key={event.id}
                        className="my-1 p-1 text-xs rounded text-white cursor-move"
                        style={{ backgroundColor: event.color }}
                        draggable
                        onDragStart={(e) => handleDragStart(event, e)} // pass event for drag start
                        onClick={(e) => {
                          e.stopPropagation();
                          editEvent(event);
                        }}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs opacity-90">
                          {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                          {new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };;
  
  // Render month view
  const renderMonthView = () => {
    // Get the first day of the month
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    // Calculate the day of the week the first day falls on (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Generate days array for the calendar
    const daysArray = [];
    
    // Add days from previous month to fill the first week
    const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day);
      daysArray.push({ day, date, currentMonth: false });
    }
    
    // Add days from current month
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      daysArray.push({ day, date, currentMonth: true });
    }
    
    // Add days from next month to complete the last week
    const remainingDays = 7 - (daysArray.length % 7);
    if (remainingDays < 7) {
      for (let day = 1; day <= remainingDays; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day);
        daysArray.push({ day, date, currentMonth: false });
      }
    }
    
    return (
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
        {renderNavigation()}
        <div className="grid grid-cols-7 bg-slate-50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="px-4 py-2 text-center font-medium text-slate-500 border-r border-slate-200">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7">
          {daysArray.map((dayData, index) => {
            const isToday = dayData.date.getDate() === new Date().getDate() && 
                           dayData.date.getMonth() === new Date().getMonth() &&
                           dayData.date.getFullYear() === new Date().getFullYear();
            
            const isCurrent = dayData.date.getDate() === currentDate.getDate() && 
                             dayData.date.getMonth() === currentDate.getMonth() &&
                             dayData.date.getFullYear() === currentDate.getFullYear();
            
            const dayEvents = getDateEvents(dayData.date);
            
            return (
              <div 
                key={index} 
                className={`min-h-24 p-2 border-r border-b border-slate-200 relative ${
                  isToday ? 'bg-blue-50' : ''
                } ${
                  isCurrent ? 'ring-1 ring-[#0a66c2]' : ''
                } ${
                  !dayData.currentMonth ? 'bg-slate-50 text-slate-400' : 'text-slate-900'
                }`}
                onClick={() => {
                  setCurrentDate(dayData.date);
                  if (viewType === 'month') {
                    setViewType('day');
                  }
                }}
              >
                <div className={`font-medium text-sm mb-1 ${isToday ? 'text-[#0a66c2] font-semibold' : ''}`}>
                  {dayData.day}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map(event => (
                    <div 
                      key={event._id}
                      className="text-xs p-1 rounded truncate cursor-pointer text-white"
                      style={{ backgroundColor: event.color }}
                      onClick={(e) => {
                        e.stopPropagation();
                        editEvent(event);
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-slate-500">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
                {dayData.currentMonth && (
                  <button 
                    className="absolute bottom-1 right-1 text-slate-400 hover:text-[#0a66c2]"
                    onClick={(e) => {
                      e.stopPropagation();
                      openNewEventModal(dayData.date);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Render week view
  const renderWeekView = () => {
    // Get the week dates (Sunday to Saturday)
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDates = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + index);
      return date;
    });
    
    return (
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
        {renderNavigation()}
        <div className="grid grid-cols-8 bg-slate-50">
          <div className="py-2 px-4"></div>
          {weekDates.map((date, index) => {
            const isToday = date.getDate() === new Date().getDate() && 
                           date.getMonth() === new Date().getMonth() &&
                           date.getFullYear() === new Date().getFullYear();
            
            return (
              <div 
                key={index} 
                className={`px-4 py-2 text-center font-medium border-l border-slate-200 ${
                  isToday ? 'bg-blue-50' : ''
                }`}
              >
                <div className="text-slate-500">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}</div>
                <div className={`text-sm ${isToday ? 'text-[#0a66c2] font-semibold' : 'text-slate-900'}`}>
                  {date.getDate()}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="divide-y divide-slate-200">
          {timeSlots.filter((_, i) => i % 2 === 0).map((timeSlot, i) => {
            const [hours] = timeSlot.split(':').map(Number);
            
            return (
              <div key={i} className="grid grid-cols-8">
                <div className="py-4 px-4 font-medium text-sm text-slate-500">
                  {timeSlot}
                </div>
                {weekDates.map((date, index) => {
                  // Find events for this date and hour
                  const slotEvents = events.filter(event => {
                    const eventStart = new Date(event.start);
                    const eventEnd = new Date(event.end);
                    
                    // Check if the event is on the same day
                    const isSameDay = eventStart.getFullYear() === date.getFullYear() &&
                                     eventStart.getMonth() === date.getMonth() &&
                                     eventStart.getDate() === date.getDate();
                    
                    if (!isSameDay) return false;
                    
                    return eventStart.getHours() <= hours &&
                           eventEnd.getHours() > hours;
                  });
                  
                  return (
                    <div 
                      key={index} 
                      className="border-l border-slate-200 p-1 min-h-16 bg-white hover:bg-slate-50 relative"
                      onClick={() => openNewEventModal(date, timeSlot)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(date, timeSlot, e)}
                      data-date={date.toISOString()}
                      data-time={timeSlot}
                    >
                      {slotEvents.map(event => (
                        <div 
                          key={event._id}
                          className="text-white text-xs p-1 rounded cursor-move mb-1 select-none"
                          style={{ backgroundColor: event.color }}
                          draggable
                          onDragStart={(e) => handleDragStart(event, e)}
                          onClick={(e) => {
                            e.stopPropagation();
                            editEvent(event);
                          }}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Render sidebar navigation
  const renderSidebar = () => (
    <div className="w-64 mr-6">
      <div className="mb-4">
        <button
          className={`w-full mb-2 p-4 text-left rounded-lg border ${
            viewType === 'month' ? 'bg-white border-[#0a66c2] shadow-sm' : 'hover:bg-slate-50 border-slate-200'
          }`}
          onClick={() => setViewType('month')}
        >
          <div className={`font-medium ${
            viewType === 'month' ? 'text-[#0a66c2]' : 'text-slate-700'
          }`}>Calendar View</div>
        </button>
        
        <button
          className={`w-full mb-2 p-4 text-left rounded-lg border ${
            viewType === 'day' ? 'bg-white border-[#0a66c2] shadow-sm' : 'hover:bg-slate-50 border-slate-200'
          }`}
          onClick={() => setViewType('day')}
        >
          <div className={`font-medium ${
            viewType === 'day' ? 'text-[#0a66c2]' : 'text-slate-700'
          }`}>Day View</div>
        </button>
        
        <button
          className={`w-full p-4 text-left rounded-lg border ${
            viewType === 'week' ? 'bg-white border-[#0a66c2] shadow-sm' : 'hover:bg-slate-50 border-slate-200'
          }`}
          onClick={() => setViewType('week')}
        >
          <div className={`font-medium ${
            viewType === 'week' ? 'text-[#0a66c2]' : 'text-slate-700'
          }`}>Weekly View</div>
        </button>
      </div>
      
      <button 
        className="w-full py-3 px-4 bg-[#0a66c2] text-white rounded-lg hover:bg-[#004182] flex items-center justify-center shadow-sm"
        onClick={() => openNewEventModal(currentDate)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Event
      </button>
    </div>
  );
  
  // Render the event modal
  const renderEventModal = () => (
    isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md border border-slate-200 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-900">
              {newEvent.id ? 'Edit Event' : 'Add New Event'}
            </h3>
            <button 
              onClick={closeEventModal}
              className="text-slate-500 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleEventChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0a66c2] focus:border-[#0a66c2]"
                placeholder="Enter event title"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  name="start"
                  value={newEvent.start}
                  onChange={handleEventChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0a66c2] focus:border-[#0a66c2]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  name="end"
                  value={newEvent.end}
                  onChange={handleEventChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0a66c2] focus:border-[#0a66c2]"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Event Color
              </label>
              <div className="flex items-center">
                <div 
                  className="w-8 h-8 rounded-md mr-2 cursor-pointer border border-slate-300"
                  style={{ backgroundColor: newEvent.color }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                ></div>
                <span className="text-slate-700">{newEvent.color}</span>
              </div>
              {showColorPicker && (
                <div className="mt-2">
                  <HexColorPicker 
                    color={newEvent.color} 
                    onChange={(color) => setNewEvent(prev => ({ ...prev, color }))} 
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            {newEvent.id && (
              <button
                onClick={() => deleteEventHandler(newEvent.id)}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 flex items-center shadow-sm"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            )}
            <button
              onClick={closeEventModal}
              className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={saveEventHandler}
              className="px-4 py-2 text-sm text-white bg-[#0a66c2] rounded hover:bg-[#004182] flex items-center shadow-sm"
            >
              <Save className="w-4 h-4 mr-1" />
              Save Event
            </button>
          </div>
        </div>
      </div>
    )
  );
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Personal Calendar</h1>
          <p className="text-slate-600">Manage your schedule with ease</p>
        </header>
        
        <div className="flex">
          {renderSidebar()}
          
          <div className="flex-1">
            {viewType === 'month' && renderMonthView()}
            {viewType === 'day' && renderDayView()}
            {viewType === 'week' && renderWeekView()}
          </div>
        </div>
      </div>
      
      {renderEventModal()}
    </div>
  );
};

export default ModernPersonalCalendar;