const createBtn = document.querySelector(".create-btn");
const notesContainer = document.getElementById("notes-container");

// Load saved notes when page opens
function loadNotes() {
    notesContainer.innerHTML = "";
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach(noteText => {
        createNote(noteText);
    });
}

// Save all notes to localStorage
function saveNotes() {
    const notes = [];
    document.querySelectorAll(".note textarea").forEach(textarea => {
        notes.push(textarea.value);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Create a note
function createNote(text = "") {
    const note = document.createElement("div");
    note.className = "note";

    const textarea = document.createElement("textarea");
    textarea.rows = 3;
    textarea.value = text;
    textarea.placeholder = "Write your note...";

    const del = document.createElement("img");
    del.src = "images/delete.png";
    del.className = "delete";

    // Save on typing
    textarea.addEventListener("keyup", saveNotes);

    // Delete note
    del.addEventListener("click", () => {
        note.remove();
        saveNotes();
    });

    note.appendChild(textarea);
    note.appendChild(del);
    notesContainer.appendChild(note);
}

// Button click → create new note
createBtn.addEventListener("click", () => {
    createNote();
    saveNotes();
});

// Load notes on page refresh
loadNotes();
