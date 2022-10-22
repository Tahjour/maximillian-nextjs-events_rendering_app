import Link from "next/link";
import styles from "./button.module.css";

function Button(props) {
    if (!props.link) {
        return <button className={styles.btn} onClick={props.onClick}>
            {props.children}
        </button>;
    }
    return <Link href={props.link}>
        <a className={styles.btn}>{props.children}</a>
        {/* To place styles on the embedded 'a' tag in a Link component from NextJS, use it like this */}
    </Link>;
}

export default Button;