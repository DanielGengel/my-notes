// Three notes with some instructions on how to use the buttons

function showInstructions() {
    const alreadyShown = localStorage.getItem("instructionsShown");

    if (alreadyShown) {
        return;
    }

    myNotes.push({
        noteTitle: "INSTRUCTIONS FOR SAVED NOTES",
        noteText: "Saved notes can be edited, archived or deleted.",
        noteColor: "yellow",
        isArchived: false,
        isDeleted: false,
    });

    updateLocalStorage();

    myNotes.push({
        noteTitle: "INSTRUCTIONS FOR ARCHIVED NOTES",
        noteText: "Archived notes can be edited, un-archived (meaning put back to Saved Notes) or deleted.",
        noteColor: "yellow",
        isArchived: true,
        isDeleted: false,
    });

    updateLocalStorage();

    myNotes.push({
        noteTitle: "INSTRUCTIONS FOR DELETED NOTES",
        noteText: "Deleted notes can be permanently deleted, or put back to archive.",
        noteColor: "yellow",
        isArchived: false,
        isDeleted: true,
    });

    updateLocalStorage();

    localStorage.setItem("instructionsShown", "true");
}