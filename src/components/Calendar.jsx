import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useEffect } from "react";
import { fetchTrainings } from "../trainingapi";
import { useState } from "react";

function TrainingsCalendar() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings()
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }, []);

    const localizer = momentLocalizer(moment)

    const events = trainings.map(training => ({
        id: training.id,
        title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
        start: new Date(training.date),
        end: moment(training.date).add(training.duration, 'minutes').toDate()
    }));

    const timeFormats = {
        eventTimeFormat: {
            hour: 'numeric',
            minute: '2-digit',
            hour12: false // Aseta 24-tunninen muotoilu tapahtumille
        },
        slotLabelFormat: {
            hour: 'numeric',
            minute: '2-digit',
            hour12: false // Aseta 24-tunninen muotoilu aikavälien otsikoille
        },
    };

    return (
        <div style={{ height: 600, width: 1300 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                {...timeFormats}
            />
        </div>
    );

}


export default TrainingsCalendar;