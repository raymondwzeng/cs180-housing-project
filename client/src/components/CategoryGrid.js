/*
    CategoryGrid.js

    The grid of category buttons that is used in /routes/Graphs.js
*/
import "./CategoryGrid.css"

export default function CategoryGrid(props) {
    return (
        <div className="grid">
            {props.items.map(item => {
                return <button className={props.selectedItem == item ? "selected-item" : ""} key={item} onClick={props.changed}>{item.replaceAll("_", " ")}</button>
            })}
        </div>
    )
}