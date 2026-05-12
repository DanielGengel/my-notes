
function addEventsToButtons(buttonClass, functionToRun) {

    const buttons = document.querySelectorAll(buttonClass);

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function(event) {
            event.stopPropagation();
            const index = buttons[i].dataset.index;
            functionToRun(index);
        });
    }
}

// TODO: add more background colors
// Apply note color to container (input- or overlay-form(edit))
function applyNoteColor(container, color) {
    // Add new color to note
    container.classList.add(color);
}