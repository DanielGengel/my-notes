const myNotesContainer = document.getElementById("myNotes");
const noteInputCard = document.getElementById("noteInputCard");
const noteTitleInput = document.getElementById("noteTitleInput");
const noteTextInput = document.getElementById("noteTextInput");
const btnSaveNote = document.getElementById("buttonSaveNoteID");
const noteColorSelection = document.getElementById("noteColorSelectionID");

// Create empty array or parse if array already available
let myNotes = JSON.parse(localStorage.getItem("myNotes")) || [];

// Default color
let selectedNoteColor = "yellow";
let previousNoteColor = "yellow";

// Background colors for notes
const colors = ["yellow", "green", "blue", "pink", "gray"];

// saveNote without brackets to not run the function at file load
btnSaveNote.addEventListener("click", saveNote);

function init() {
    addColorButtons();
    renderNotes();
    noteInputCard.classList.add(selectedNoteColor);
}

function renderNotes() {
    let html = "";
    myNotesContainer.innerHTML = "";

    for (let i = 0; i < myNotes.length; i++) {
        console.log(getNoteTemplate(i));
        html += getNoteTemplate(i);
    }
    myNotesContainer.innerHTML = html;
}

function getNoteTemplate(index) {
    return `
            <article class="noteCard ${myNotes[index].noteColor}">
                <h3>${myNotes[index].noteTitle}</h3>
                <p>${myNotes[index].noteText.substring(0, 120)}</p>
            </article>
        `;
}

function saveNote() {
    const noteTitle = noteTitleInput.value.trim();
    const noteText = noteTextInput.value.trim();

    if (noteTitle === "" || noteText === "") {
        alert("Bitte Titel und Notiz eingeben.");
        return;
    }

    myNotes.push({
        noteTitle: noteTitle,
        noteText: noteText,
        noteColor: selectedNoteColor,
    });

    localStorage.setItem("myNotes", JSON.stringify(myNotes));

    clearNoteInputs();

    renderNotes();
}

function clearNoteInputs() {
    noteTitleInput.value = "";
    noteTextInput.value = "";
}

function selectNoteColor(color) {
    selectedNoteColor = color;
    noteInputCard.classList.remove(previousNoteColor);
    noteInputCard.classList.add(color);
    previousNoteColor = color;
    console.log(selectedNoteColor);
}

function addColorButtons() {
    for (let i = 0; i < colors.length; i++) {
        const button = document.createElement("button");
        button.classList.add("colorButton", colors[i]);

        button.addEventListener("click", () => {
            selectNoteColor(colors[i]);
            
            
        });
        noteColorSelection.appendChild(button);
    }
}
