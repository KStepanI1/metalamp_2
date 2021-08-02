import "./__filter.scss"

import "../../dropdown/dropdown.js"
import "../../text-field/text-field.js"
import "../../checkbox-button/checkbox-button.js"
import "../../rangeSlider/rangeSlider.js"
import "../../rich-checkbox-button/rich-checkbox-button.js"

import createCalendar from "../../../js/calendar";
import Calendar from "../../calendar/calendar";
import setSlider from "../../../js/rangeSlider";
import Dropdown from "../../dropdown/dropdown";

const guestsDropdown = new Dropdown('guests-field', 'guests-dropdown', 'guests');
const roomAmenitiesDropdown = new Dropdown('room-amenities-field', 'room-amenities-dropdown', 'room-amenities');

guestsDropdown.setDropdown();
roomAmenitiesDropdown.setDropdown();

const datepicker = createCalendar().data('datepicker');
const calendar = new Calendar(['date-range'], 'calendar');
const dateRange = document.getElementById('date-range')
const submit = document.querySelector('#calendar .datepicker__submit');

calendar.setSwitchCalendar();

function updateSelectedValues() {
    let dates = datepicker.selectedDates;
    if (dates.length > 0) {
        if (dates[0] === undefined || dates[1] === undefined) {
            dateRange.value = '';
        } else {
            dateRange.value = ("0" + dates[0].getDate()).slice(-2) + "." + ("0" + (dates[0].getMonth() + 1)).slice(-2)
                                + ' - '
                                + ("0" + dates[1].getDate()).slice(-2) + "." + ("0" + (dates[1].getMonth() + 1)).slice(-2);
        }
    }
}

document.getElementById(calendar.calendarId).addEventListener('click', updateSelectedValues);

submit.addEventListener('click', (e) => {
    e.stopPropagation();
    calendar.toggleCalendar();
})

const slider = document.getElementById('filter-rangeSlider');
const sliderRangeSpan = document.getElementById('filter-rangeSlider-range');

function updateSliderValues() {
    const currentValues = slider.noUiSlider.get();
    sliderRangeSpan.innerText = parseInt(currentValues[0]) + '₽' + ' - ' + parseInt(currentValues[1]) + '₽';
}

setSlider(slider);
updateSliderValues();

slider.noUiSlider.on('update', function () {
    updateSliderValues();
})


const additionalAmenitiesExpand = document.getElementById('additional-amenities-expand');

additionalAmenitiesExpand.addEventListener('click', function () {
    document.querySelector('.additional-amenities__items').classList.toggle('-shown-');
    additionalAmenitiesExpand.classList.toggle('-active-');
})


export {roomAmenitiesDropdown, guestsDropdown, calendar};