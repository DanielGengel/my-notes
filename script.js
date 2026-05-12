const myNotesContainer = document.getElementById("myNotes");
const noteInputCard = document.getElementById("noteInputCard");
const noteTitleInput = document.getElementById("noteTitleInput");
const noteTextInput = document.getElementById("noteTextInput");
const archivedNotesContainer = document.getElementById("archivedNotes");
const deletedNotesContainer = document.getElementById("deletedNotes");
const noteOverlay = document.getElementById("noteOverlayID");
const overlayNoteTitle = document.getElementById("overlayNoteTitleID");
const overlayNoteText = document.getElementById("overlayNoteTextID");

const btnSaveNote = document.getElementById("buttonSaveNoteID");
btnSaveNote.addEventListener("click", saveNote);

const overlaySaveButton = document.getElementById("overlaySaveButtonID");
overlaySaveButton.addEventListener("click", saveOverlayChanges);

const overlayCloseButton = document.getElementById("overlayCloseButton");
overlayCloseButton.addEventListener("click", closeNoteOverlay);

// Create empty array or parse if array already available
let myNotes = JSON.parse(localStorage.getItem("myNotes")) || [];

// Default color
let selectedNoteColor = "yellow";
//let previousNoteColor = "";

// TODO: Add more background colors for notes
// const colors = ["yellow", "green", "blue", "pink", "gray"];

// Index of open note for edit in overlay
let currentOpenedNoteIndex = null;

function init() {
    showInstructions();
    applyNoteColor(noteInputCard, selectedNoteColor);
    renderNotes();
}

function renderNotes() {
    const archivedNotes = [];
    const deletedNotes = [];

    myNotesContainer.innerHTML = "";
    archivedNotesContainer.innerHTML = "";
    deletedNotesContainer.innerHTML = "";

    for (let i = 0; i < myNotes.length; i++) {
        const noteHTML = getNoteTemplate(i);

        if (myNotes[i].isDeleted) {
            deletedNotesContainer.innerHTML += noteHTML;
        } else if (myNotes[i].isArchived) {
            archivedNotesContainer.innerHTML += noteHTML;
        } else {
            myNotesContainer.innerHTML += noteHTML;
        }
    }

    // addEditEvents();
    // addArchiveEvents();
    // addDeleteEvents();

    addEventsToButtons(".noteCard", editNote);
    addEventsToButtons(".editButton", editNote);
    addEventsToButtons(".archiveButton", archiveNote);
    addEventsToButtons(".deleteButton", deleteNote);
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
        isArchived: false,
        isDeleted: false,
    });

    updateLocalStorage();
    clearNoteInputs();
    renderNotes();
}

function clearNoteInputs() {
    noteTitleInput.value = "";
    noteTextInput.value = "";
}

// Edit note in overlay
function editNote(index) {
    openNoteOverlay(index);
}

// Move note to archive or un-archive note (= move back to Saved Notes)
function archiveNote(index) {
    myNotes[index].isArchived = !myNotes[index].isArchived;
    myNotes[index].isDeleted = false;

    updateLocalStorage();
    renderNotes();
}

// Move note to deleted notes or delete forever depending on actual location
function deleteNote(index) {
    console.log("delete => " + index);

    if (myNotes[index].isDeleted === true) {
        // delete forever
        myNotes.splice(index, 1);
        updateLocalStorage();
        renderNotes();
        return;
    }

    myNotes[index].isDeleted = true;
    myNotes[index].isArchived = false;

    updateLocalStorage();
    renderNotes();
}

function updateLocalStorage() {
    localStorage.setItem("myNotes", JSON.stringify(myNotes));
}

// Close window when clicked outside lightbox
noteOverlay.addEventListener("click", (event) => {
    if (event.target === noteOverlay) {
        closeNoteOverlay();
    }
});