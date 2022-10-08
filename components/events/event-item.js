import Link from "next/link";

function EventItem(props) {
    const { event } = props;
    const humanReadableDate = new Date(event.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: "numeric"
    });
    const formattedAddress = event.location.replace(", ", "\n");
    const exploreLink = `/events/${event.id}`;
    return <li>
        <picture>
            <source srcSet={`/${event.image}`}></source>
            <img src={`/${event.image}`} alt="Event Image"></img>
        </picture>
        
        <div>
            <div>
                <h2>{event.title}</h2>
                <div>
                    <time>{humanReadableDate}</time>
                </div>
                <div>
                    <address>{formattedAddress}</address>
                </div>
            </div>
            <div>
                <Link href={exploreLink}>Explore Event</Link>
            </div>
        </div>
    </li>;
}

export default EventItem;