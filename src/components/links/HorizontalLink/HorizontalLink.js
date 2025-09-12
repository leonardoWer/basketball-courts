import styles from "./HorizontalLink.module.css"

export function HorizontalLink({title, href}) {
    return `
        <a class=${styles.horizontalLink} href="${href}">
            <span class=${styles.horizontalLink__arrowContainer}>
              <i class="fa fa-arrow-down ${styles.hlArrowContainer__arrow}"></i>
            </span>
    
            <span class=${styles.horizontalLink__title}>${title}</span>
        </a>
    `
}