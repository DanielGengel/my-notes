
function openNoteOverlay(index) {
    currentOpenedNoteIndex = index;

    // Don't open deleted notes for editing
    if (myNotes[index].isDeleted) {
        return;
    }

    overlayNoteTitle.value = myNotes[index].noteTitle;
    overlayNoteText.value = myNotes[index].noteText;
    noteOverlay.showModal();
}

function saveOverlayChanges() {
    const note = myNotes[currentOpenedNoteIndex];

    note.noteTitle = overlayNoteTitle.value;
    note.noteText = overlayNoteText.value;

    updateLocalStorage();
    renderNotes();
    noteOverlay.close(); // optional
}

function closeNoteOverlay() {
    noteOverlay.close();
}
