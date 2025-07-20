const saveBtn = document.getElementById("save-btn");
const noteInput = document.getElementById("note-input");
const notesList = document.getElementById("notes-list");

function loadNotes() {
  notesList.innerHTML = "";
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note;

    const viewBtn = document.createElement("button");
    viewBtn.textContent = "نمایش";
    viewBtn.onclick = () => alert(note);

    const delBtn = document.createElement("button");
    delBtn.textContent = "حذف";
    delBtn.onclick = () => {
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      loadNotes();
    };

    li.appendChild(viewBtn);
    li.appendChild(delBtn);
    notesList.appendChild(li);
  });
}

saveBtn.addEventListener("click", () => {
  const note = noteInput.value.trim();
  if (note) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    noteInput.value = "";
    loadNotes();
  }
});

window.onload = loadNotes;