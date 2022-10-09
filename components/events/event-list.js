import EventItem from "./event-item";
import styles from "./event-list.module.css";

function EventList(props) {
    const { events } = props;
    return <ul className={styles.list}>
        {events.map(event => <EventItem key={event.id} event={event} />)}
    </ul>;
}

export default EventList;