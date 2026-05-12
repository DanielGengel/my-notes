function getNoteTemplate(index) {
    // Only add edit button to saved and archived notes
    const showEditButton = !myNotes[index].isDeleted;

    return `
            <article class="noteCard ${myNotes[index].noteColor} ${myNotes[index].isDeleted ? "noteDeleted" : ""}" data-index="${index}">
                <h3>${myNotes[index].noteTitle}</h3>
                <p>${myNotes[index].noteText.substring(0, 120)}</p>

                <div class="noteActions">
                    ${
                        showEditButton
                            ? `
                    <button class="editButton" data-index="${index}">
                        <img src="./assets/img/icons/edit.svg" alt="Edit icon">
                    </button>
                    `
                            : ``
                    }
                    
                    <button class="archiveButton ${myNotes[index].isArchived ? "archived" : ""}" data-index="${index}">
                        <img src="./assets/img/icons/archive.svg" alt="Archive icon">
                    </button>

                    <button class="deleteButton" data-index="${index}">
                        <img src="./assets/img/icons/delete.svg" alt="Trash icon">
                    </button>
                </div>

            </article>
        `;
}