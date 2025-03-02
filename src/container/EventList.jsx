import "react-quill/dist/quill.snow.css";
import { useCookies } from "react-cookie";
import { getActiveUpcomingEvents } from "../apis/events";
import { useEffect, useState } from "react";

const EventList = () => {
  const [cookies, setCookie] = useCookies([]);
  const [activeEvents, setActiveEvents] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState(null);

  useEffect(() => {
    getActiveUpcomingEventsApi(cookies.jwt);
  },[]);

  const getActiveUpcomingEventsApi = async () => {
    const [result, error] = await getActiveUpcomingEvents(cookies.jwt);
    handleResponse([result, error]);
  };

  const handleResponse = async ([response, error]) => {
    if (error) {
      //TODO handle error
    } else {
      console.log(response);
      setActiveEvents(response.active);
      setUpcomingEvents(response.upcoming);
    }
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl">Events</h1>
         Events active :{activeEvents == null? "" : activeEvents.length}
         Events upcoming :{upcomingEvents== null? "": upcomingEvents.length} 
      </div>
    </div>
  );
};
export default EventList;
