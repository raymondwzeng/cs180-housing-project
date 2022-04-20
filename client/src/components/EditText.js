/*
EditText.js

Contains the edit text boxes that are used on ALL edit fields within the card.
*/
export default function EditText(props) {
    return(
        <div>
            <label for={props.id}>{props.name}: </label>
            <input id={props.id} type="number" value={props.value}/>
        </div>
    )
}