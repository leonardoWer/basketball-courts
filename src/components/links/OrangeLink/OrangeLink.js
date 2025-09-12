import styles from "./OrangeLink.module.css"

export function OrangeLink({title, href}) {
    return `
        <a class=${styles.orangeLink} href="${href}">${title}</a>
    `
}