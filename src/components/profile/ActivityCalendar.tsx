import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from "../../app/page.module.css";

interface ActivityCalendarProps {
  username: string;
}

interface ActiveDaysResponse {
  activeDays: string[];
}

const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ username }) => {
  const [activeDays, setActiveDays] = useState<string[]>([]);

  useEffect(() => {
    const fetchActiveDays = async () => {
      try {
        const response = await axios.get<ActiveDaysResponse>(`/api/activeDays?username=${username}`);
        setActiveDays(response.data.activeDays);
      } catch (error) {
        console.error('Error fetching active days:', error);
      }
    };

    if (username) {
      fetchActiveDays();
    }
  }, [username]);

  const tileClassName = ({ date }: { date: Date }) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return activeDays.includes(dateString) ? `${styles.highlight}` : '';
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-6 rounded-lg shadow-lg bg-transparent">
        <h1 className="text-2xl font-bold mb-4">Activity Calendar</h1>
        <Calendar
        //   tileContent={tileContent}
        tileClassName={tileClassName}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ActivityCalendar;
