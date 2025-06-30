import React, { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const EventCard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();

        // Filter upcoming events, sort by start date, and limit to 3
        const sortedEvents = data
          .filter(event => new Date(event.start) >= new Date())
          .sort((a, b) => new Date(a.start) - new Date(b.start))
          .slice(0, 3);

        setEvents(sortedEvents);
      } catch (err) {
        setError("Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="space-y-4">
      {/* Loading state */}
      {loading && (
        <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-600">
          Loading events...
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center border border-red-100">
          {error}
        </div>
      )}

      {/* Display events if they exist */}
      {!loading && !error && events.length > 0 ? (
        events.map((event) => (
          <div
            key={event._id}
            className="p-5 bg-white rounded-lg border border-gray-200 hover:border-blue-100 hover:shadow-sm transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {event.title}
                </h2>
                <p className="text-sm text-gray-600 mb-3">{event.description}</p>
              </div>
              {event.isNew && (
                <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">
                  New
                </span>
              )}
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>
                  {new Date(event.start).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {event.end && (
                    <>
                      {" "} - {" "}
                      {new Date(event.end).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </>
                  )}
                </span>
              </div>

              {event.time && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{event.time}</span>
                </div>
              )}

              {event.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
              <Link
                to={"/eventcalendar"}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))
      ) : (
        !loading && (
          <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-600 border border-gray-200">
            No upcoming events found
          </div>
        )
      )}
    </div>
  );
};

export default EventCard;
