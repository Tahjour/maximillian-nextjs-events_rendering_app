export async function getAllEvents() {
    const datbaseURL = "https://react-routing-demo-default-rtdb.firebaseio.com/events.json";
    const response = await fetch(datbaseURL);
    const data = await response.json();
    const allEvents = [];
    for (const key in data) {
        const event = {
            id: key,
            ...data[key]
        };
        allEvents.push(event);
    }
    return allEvents;
}

export async function getFeaturedEvents() {
    return (await getAllEvents()).filter(event => event.isFeatured);
}

export async function getEventById(id) {
    return (await getAllEvents()).find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    let allEvents = await getAllEvents();
    let filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === (month - 1);
    });
    // console.log(filteredEvents);
    return filteredEvents;
}