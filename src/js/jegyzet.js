// console.log("jegyzet.js betöltve");

// document.addEventListener("DOMContentLoaded", () => {

//   const notesContainer = document.getElementById('notes-container');
//   const addBtn = document.getElementById('add-note');

//   if (!notesContainer || !addBtn) return;

//   let notes = JSON.parse(localStorage.getItem('notes')) || [];

//   function saveNotes() {
//     localStorage.setItem('notes', JSON.stringify(notes));
//   }

//   function createNote(id, content = '') {
//     const noteDiv = document.createElement('div');
//     noteDiv.className = 'note';
//     noteDiv.dataset.id = id;

//     const textarea = document.createElement('textarea');
//     textarea.value = content;

//     textarea.addEventListener('input', (e) => {
//       notes = notes.map(n =>
//         n.id === id ? { id, content: e.target.value } : n
//       );
//       saveNotes();
//     });

//     const delBtn = document.createElement('button');
//     delBtn.className = 'delete';
//     delBtn.innerText = 'X';

//     delBtn.addEventListener('click', () => {
//       notes = notes.filter(n => n.id !== id);
//       saveNotes();
//       noteDiv.remove();
//     });

//     noteDiv.appendChild(textarea);
//     noteDiv.appendChild(delBtn);
//     notesContainer.appendChild(noteDiv);
//   }

//   notes.forEach(n => createNote(n.id, n.content));

//   addBtn.addEventListener('click', () => {
//     const id = Date.now();
//     notes.push({ id, content: '' });
//     saveNotes();
//     createNote(id, '');
//   });

//   textarea.addEventListener('input', (e) => {
//   e.target.style.height = 'auto';              // reset
//   e.target.style.height = Math.min(e.target.scrollHeight, window.innerHeight/3) + 'px';
// });

// });

console.log("jegyzet.js betöltve");

document.addEventListener("DOMContentLoaded", () => {
  const notesContainer = document.getElementById('notes-container');
  const addBtn = document.getElementById('add-note');

  if (!notesContainer || !addBtn) return;

  // jegyzetek betöltése localStorage-ből
  let notes = JSON.parse(localStorage.getItem('notes')) || [];

  function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  // Jegyzet létrehozása
  function createNote(id, content = '') {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    noteDiv.dataset.id = id;

    const textarea = document.createElement('textarea');
    textarea.value = content;

    textarea.addEventListener('input', (e) => {
      // mentés localStorage-be
      notes = notes.map(n => n.id === id ? {id, content: e.target.value} : n);
      saveNotes();

      // automatikus magasság
      e.target.style.height = 'auto';
      e.target.style.height = Math.min(e.target.scrollHeight, window.innerHeight/3) + 'px';
    });

    const delBtn = document.createElement('button');
    delBtn.className = 'delete';
    delBtn.innerText = 'X';
    delBtn.addEventListener('click', () => {
      notes = notes.filter(n => n.id !== id);
      saveNotes();
      noteDiv.remove();
    });

    noteDiv.appendChild(textarea);
    noteDiv.appendChild(delBtn);
    notesContainer.appendChild(noteDiv);

    // inicializálás: ha van szöveg, állítsuk be a magasságot
    textarea.style.height = Math.min(textarea.scrollHeight, window.innerHeight/3) + 'px';
  }

  // meglévő jegyzetek betöltése
  notes.forEach(n => createNote(n.id, n.content));

  // új jegyzet hozzáadása
  addBtn.addEventListener('click', () => {
    const id = Date.now();
    notes.push({id, content: ''});
    saveNotes();
    createNote(id, '');
  });
});