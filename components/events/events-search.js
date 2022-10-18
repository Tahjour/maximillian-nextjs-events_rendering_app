import Button from "../ui/button";
import { Months } from "./months";
import styles from "./events-search.module.css";
import { useRef } from "react";
import { useRouter } from "next/router";

function EventSearch(props) {
    const router = useRouter();
    const yearInputRef = useRef();
    const monthInputRef = useRef();

    function sumbitHandler(event) {
        event.preventDefault();

        const selectedYear = yearInputRef.current.value;
        const selectedMonth = monthInputRef.current.value;
        const fullPath = `/events/${selectedYear}/${selectedMonth}`;
        router.push(fullPath);
    }
    return <form className={styles.form} onSubmit={sumbitHandler}>
        <div className={styles.controls}>
            <div className={styles.control}>
                <label htmlFor="year">Year</label>
                <select id="year" ref={yearInputRef}>
                    <option>-- Select Year --</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                </select>
            </div>
            <div className={styles.control}>
                <label htmlFor="month">Month</label>
                <select id="month" ref={monthInputRef}>
                    <option>-- Select Month --</option>
                    {Months.map(month => {
                        return <option key={month.id} value={month.id}>{month.name}</option>;
                    })}
                </select>
            </div>
        </div>
        <Button>
            Find Events
        </Button>
    </form>;
}

export default EventSearch;