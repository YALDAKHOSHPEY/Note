document.addEventListener('DOMContentLoaded', function() {
  const noteInput = document.getElementById('note-input');
  const saveBtn = document.getElementById('save-btn');
  const notesList = document.getElementById('notes-list');
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  let currentEditId = null;
  
  // نمایش یادداشت‌ها
  function displayNotes() {
    if (notes.length === 0) {
      notesList.innerHTML = '<div class="empty-state">هنوز یادداشتی ثبت نشده است</div>';
      return;
    }
    
    notesList.innerHTML = '';
    notes.forEach(note => {
      const noteItem = document.createElement('li');
      noteItem.className = 'note-item';
      noteItem.innerHTML = `
        <div class="note-text">${note.text}</div>
        <div class="note-date">${new Date(note.id).toLocaleString('fa-IR')}</div>
        <div class="note-actions">
          <button class="edit-btn" data-id="${note.id}">ویرایش</button>
          <button class="delete-btn" data-id="${note.id}">حذف</button>
        </div>
      `;
      notesList.appendChild(noteItem);
    });
    
    // اضافه کردن event listener برای دکمه‌ها
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', deleteNote);
    });
    
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', editNote);
    });
  }
  
  // ذخیره یا ویرایش یادداشت
  function saveNote() {
    const noteText = noteInput.value.trim();
    
    if (noteText === '') {
      alert('لطفاً متن یادداشت را وارد کنید');
      return;
    }
    
    if (currentEditId) {
      // ویرایش یادداشت موجود
      notes = notes.map(note => 
        note.id === currentEditId ? {...note, text: noteText} : note
      );
      currentEditId = null;
      saveBtn.textContent = 'ذخیره یادداشت';
    } else {
      // اضافه کردن یادداشت جدید
      const newNote = {
        id: Date.now(),
        text: noteText
      };
      notes.unshift(newNote);
    }
    
    localStorage.setItem('notes', JSON.stringify(notes));
    noteInput.value = '';
    displayNotes();
  }
  
  // حذف یادداشت
  function deleteNote(e) {
    const id = Number(e.target.getAttribute('data-id'));
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
  }
  
  // ویرایش یادداشت
  function editNote(e) {
    const id = Number(e.target.getAttribute('data-id'));
    const noteToEdit = notes.find(note => note.id === id);
    noteInput.value = noteToEdit.text;
    noteInput.focus();
    currentEditId = id;
    saveBtn.textContent = 'ویرایش یادداشت';
  }
  
  // Event Listeners
  saveBtn.addEventListener('click', saveNote);
  
  // امکان ذخیره با کلید Enter (همراه با Ctrl)
  noteInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      saveNote();
    }
  });
  
  // نمایش اولیه یادداشت‌ها
  displayNotes();
});
