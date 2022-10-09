import styles from "./event-item.module.css";
import Button from "../ui/button";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";

function EventItem(props) {
    const { event } = props;
    const humanReadableDate = new Date(event.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: "numeric"
    });
    const formattedAddress = event.location.replace(", ", "\n");
    const exploreLink = `/events/${event.id}`;
    return <li className={styles.item}>
        <picture>
            <source srcSet={`/${event.image}`}></source>
            <img src={`/${event.image}`} alt="Event Image"></img>
        </picture>

        <div className={styles.content}>
            <div>
                <h2>{event.title}</h2>
                <div className={styles.date}>
                    <DateIcon></DateIcon>
                    <time>{humanReadableDate}</time>
                </div>
                <div className={styles.address}>
                    <AddressIcon></AddressIcon>
                    <address className={styles.address}>{formattedAddress}</address>
                </div>
            </div>
            <div className={styles.actions}>
                <Button link={exploreLink}>
                    <span>Explore Event</span>
                    <span className={styles.icon}><ArrowRightIcon></ArrowRightIcon></span>
                </Button>
            </div>
        </div>
    </li>;
}

export default EventItem;