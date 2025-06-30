import { useState } from "react";
import { Calendar } from "../components/ui/calendar";
import { Card, CardContent } from "../components/ui/card";
import { buttonVariants } from "../components/ui/button";
import { cn } from "../components/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  CalendarClock,
  Users,
  MapPin,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";

const EventCalendar = ({
  events = [
    {
      id: "1",
      title: "Google Technical Interview",
      date: new Date(2025, 3, 15), // April 15, 2025
      time: "10:00 AM - 11:30 AM",
      location: "Online (Google Meet)",
      type: "interview",
      description: "Technical interview for Frontend Developer position",
    },
    {
      id: "2",
      title: "Microsoft HR Round",
      date: new Date(2025, 3, 18), // April 18, 2025
      time: "2:00 PM - 3:00 PM",
      location: "Microsoft Office, Hyderabad",
      type: "interview",
      description: "Final HR round for Backend Engineer position",
    },
    {
      id: "3",
      title: "Resume Workshop",
      date: new Date(2025, 3, 20), // April 20, 2025
      time: "11:00 AM - 1:00 PM",
      location: "Seminar Hall B",
      type: "workshop",
      description: "Learn how to create an impressive resume with industry experts",
    },
    {
      id: "4",
      title: "Amazon Application Deadline",
      date: new Date(2025, 3, 22), // April 22, 2025
      type: "deadline",
      description: "Last date to apply for the Data Scientist position",
    },
    {
      id: "5",
      title: "Campus Hiring - Adobe",
      date: new Date(2025, 3, 25), // April 25, 2025
      time: "9:00 AM - 5:00 PM",
      location: "Main Auditorium",
      type: "admin",
      description: "Adobe campus hiring for multiple positions",
    },
  ],
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to check if a date has events
  const hasEvent = (date) => {
    return events.some(
      (event) =>
        date.getDate() === event.date.getDate() &&
        date.getMonth() === event.date.getMonth() &&
        date.getFullYear() === event.date.getFullYear()
    );
  };

  // Function to get events for the selected date
  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    
    return events.filter(
      (event) =>
        selectedDate.getDate() === event.date.getDate() &&
        selectedDate.getMonth() === event.date.getMonth() &&
        selectedDate.getFullYear() === event.date.getFullYear()
    );
  };

  // Function to get upcoming events (next 7 days)
  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    return events
      .filter((event) => event.date >= today && event.date <= nextWeek)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  // Function to format date
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const navigateToToday = () => {
    setSelectedDate(new Date());
  };

  const navigateToNextMonth = () => {
    if (selectedDate) {
      const nextMonth = new Date(selectedDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setSelectedDate(nextMonth);
    }
  };

  const navigateToPreviousMonth = () => {
    if (selectedDate) {
      const prevMonth = new Date(selectedDate);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      setSelectedDate(prevMonth);
    }
  };

  // Function to get icon for event type
  const getEventIcon = (type) => {
    switch (type) {
      case "interview":
        return <CalendarClock className="h-4 w-4 text-linkedin-blue" />;
      case "admin":
        return <AlertCircle className="h-4 w-4 text-purple-500" />;
      case "workshop":
        return <Users className="h-4 w-4 text-green-500" />;
      case "deadline":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <CalendarClock className="h-4 w-4" />;
    }
  };

  // Function to get color for event type
  const getEventColor = (type) => {
    switch (type) {
      case "interview":
        return "border-l-linkedin-blue";
      case "admin":
        return "border-l-purple-500";
      case "workshop":
        return "border-l-green-500";
      case "deadline":
        return "border-l-red-500";
      default:
        return "border-l-gray-500";
    }
  };

  const selectedDateEvents = getEventsForSelectedDate();
  const upcomingEvents = getUpcomingEvents();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-medium text-lg mb-4">Event Calendar</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Left Column: Calendar */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={navigateToPreviousMonth}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={navigateToToday}>
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={navigateToNextMonth}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <Calendar
    mode="single"
    selected={selectedDate}
    onSelect={setSelectedDate}
    className="border rounded-md"
    modifiers={{
      hasEvent: (date) => hasEvent(date),
    }}
    modifiersClassNames={{
      hasEvent: "bg-linkedin-light text-linkedin-blue font-medium",
      today: "bg-blue-50 text-blue-900 font-bold",
    }}
    classNames={{
      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
      month: "space-y-4",
      caption: "flex justify-center pt-1 relative items-center",
      caption_label: "text-sm font-medium",
      nav: "space-x-1 flex items-center",
      nav_button: cn(
        buttonVariants({ variant: "outline" }),
        "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
      ),
      nav_button_previous: "absolute left-1",
      nav_button_next: "absolute right-1",
      table: "w-full border-collapse",
      head_row: "flex",
      head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
      row: "flex w-full mt-2",
      cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent",
      day: cn(
        buttonVariants({ variant: "ghost" }),
        "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
      ),
      // ... rest of your classNames ...
    }}
  />
          
          {/* Selected Date Events */}
          {selectedDate && (
            <div className="mt-6">
              <h3 className="font-medium mb-3">
                Events on {formatDate(selectedDate)}
              </h3>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-2">
                  {selectedDateEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <CardContent className={`p-3 border-l-4 ${getEventColor(event.type)}`}>
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">{getEventIcon(event.type)}</div>
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            {event.time && <p className="text-sm text-gray-600">{event.time}</p>}
                            {event.location && (
                              <p className="text-sm text-gray-600 flex items-center mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {event.location}
                              </p>
                            )}
                            {event.description && (
                              <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No events scheduled for this day.</p>
              )}
            </div>
          )}
        </div>
        
        {/* Right Column: Upcoming Events */}
        <div>
          <h3 className="font-medium mb-3">Upcoming Events</h3>
          
          {upcomingEvents.length > 0 ? (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <CardContent className={`p-3 border-l-4 ${getEventColor(event.type)}`}>
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">{getEventIcon(event.type)}</div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{formatDate(event.date)}</p>
                          <h4 className="font-medium">{event.title}</h4>
                          {event.time && <p className="text-sm text-gray-600">{event.time}</p>}
                          {event.location && (
                            <p className="text-sm text-gray-600 flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {event.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-gray-500">No upcoming events in the next 7 days.</p>
          )}
          
          {/* Calendar Legend */}
          <div className="mt-6 border-t pt-4">
            <h4 className="font-medium mb-2">Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-linkedin-blue rounded-full mr-2"></div>
                <span className="text-sm">Interview</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-sm">Admin Event</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Workshop</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm">Deadline</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;