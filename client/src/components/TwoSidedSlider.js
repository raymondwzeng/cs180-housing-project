import ReactSlider from 'react-slider'
import './Slider.css'

/*
The TwoSidedSlider originally within App.js. Takes in no new parameters.

Note: The state should be established in the parent component, and onChange should change this.
*/
function TwoSidedSlider(props) {
    return (
        <ReactSlider
            className={"horizontal-slider " + props.className}
            id={props.id}
            thumbClassName={"slider-thumb " + props.className + "-value"}
            trackClassName="slider-track"
            defaultValue={[props.min, props.max]}
            min={props.min}
            max={props.max}
            // value ={props.valueNow}
            ariaLabel={['Lower thumb', 'Upper thumb']}    // aria text for screen readers
            // ariaValuetext={state => `Thumb value ${state.valueNow}`}
            // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            pearling
            onChange={props.onChange}
          />
      );
}

export default TwoSidedSlider