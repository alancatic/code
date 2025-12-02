let events = {};
let currentDayCell = null;
//stores events and current day selected

// runs after the html content is loaded
document.addEventListener("DOMContentLoaded", () => {
    const dayCells = document.querySelectorAll(".calendar tbody td");
    // selects all day cells in the calendar

    // loop through each cell in the calendar
    dayCells.forEach(cell => { 
        const day = cell.textContent.trim();

        // only cells with a number can have events
        if (day !== "") { 
            cell.addEventListener("click", () => {
                // saves the day you click
                currentDayCell = { cell, day };

                const eventList = document.getElementById("eventList");
                eventList.innerHTML = "";

		// loads existing events for that day
                if (events[day]) {
                    events[day].forEach(ev => {
                        const li = document.createElement("li");
                        li.textContent = `${ev.time} - ${ev.title}: ${ev.desc}`;
                        eventList.appendChild(li);
                    });
                }

                // clears input fields so its empty every time you open a day
                document.getElementById("eventTitle").value = "";
                document.getElementById("eventDesc").value = "";
                document.getElementById("eventTime").value = "";

                // shows the window for the popup
                document.getElementById("eventModal").style.display = "flex";
            });
        }
    });

    // when the user clicks add event
    document.getElementById("addEventBtn").addEventListener("click", () => {
        let title = document.getElementById("eventTitle").value.trim();
        let desc  = document.getElementById("eventDesc").value.trim();
        let time  = document.getElementById("eventTime").value.trim();
	// reads input values

	// if any field is empty it gives an alert
        if (!title || !desc || !time) {
            alert("Please fill in all fields.");
            return;
        }

	// if the event has no events, it creates an array and adds it
        if (!events[currentDayCell.day]) {
            events[currentDayCell.day] = [];
        }

        events[currentDayCell.day].push({ title, desc, time });

	// adds an event dot when there are events present for the day
        if (!currentDayCell.cell.querySelector(".eventDot")) {
            let dot = document.createElement("div");
            dot.classList.add("eventDot");
            currentDayCell.cell.appendChild(dot);
        }

	// displays the new event in the popup
        const eventList = document.getElementById("eventList");
        const li = document.createElement("li");
        li.textContent = `${time} - ${title}: ${desc}`;
        eventList.appendChild(li);

	// clears input fields after saving
        document.getElementById("eventTitle").value = "";
        document.getElementById("eventDesc").value = "";
        document.getElementById("eventTime").value = "";
    });

    // if user clicks outside the popup it closes the popup
    document.getElementById("eventModal").addEventListener("click", e => {
        if (e.target.id === "eventModal") {
            document.getElementById("eventModal").style.display = "none";
        }
    });
});

