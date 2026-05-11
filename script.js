const myNotesContainer = document.getElementById("myNotes");
const noteTitleInput = document.getElementById("noteTitleInput");
const noteTextInput = document.getElementById("noteTextInput");

// Create empty array or parse if array already available
let myNotes = JSON.parse(localStorage.getItem("myNotes")) || [];
let selectedNoteColor = "#fff59d";


function renderNotes() {
    myNotesContainer.innerHTML = "";

    for (let i = 0; i < myNotes.length; i++) {
        const noteHTML = `
            <article class="noteCard" style="background-color: ${myNotes[i].noteColor}">
                <h3>${myNotes[i].noteTitle}</h3>
                <p>${myNotes[i].noteText.substring(0, 120)}</p>
            </article>
        `;

        myNotesContainer.innerHTML += noteHTML;
        console.log(noteHTML);
        
    }

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
    noteInputCard.style.backgroundColor = color;
}


