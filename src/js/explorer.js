// // explorer.js

// const fileExplorer = document.getElementById("explorer");

// // Definiáljuk a “Drive-szerű” mappastruktúrát
// const files = {
//   "html": ["meme-dash.html", "vicces.html", "vilagjegy.html"],
//   "images": ["cat1.jpg", "cat2.png"]
// };

// // Dinamikusan generáljuk a listát
// for (const folder in files) {
//   const folderDiv = document.createElement("div");
//   folderDiv.className = "folder";
//   folderDiv.innerHTML = `<strong>${folder}</strong>`;
  
//   const ul = document.createElement("ul");

//   files[folder].forEach(file => {
//     const li = document.createElement("li");
//     const link = document.createElement("a");
//     link.href = `${folder}/${file}`;
//     link.textContent = file;
//     link.target = "_blank";
//     li.appendChild(link);
//     ul.appendChild(li);
//   });

//   folderDiv.appendChild(ul);
//   fileExplorer.appendChild(folderDiv);
// }

const fileExplorer = document.getElementById("explorer");

// Drive-szerű mappastruktúra
let files = {
  "html": ["meme-dash.html", "vicces.html", "vilagjegy.html"],
  "images": ["cat1.jpg", "cat2.png"]
};

function render() {
  fileExplorer.innerHTML = "";

  for (const folder in files) {
    const folderDiv = document.createElement("div");
    folderDiv.className = "folder";

    const title = document.createElement("strong");
    title.textContent = "📁 " + folder;

    const ul = document.createElement("ul");

    files[folder].forEach((file, index) => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      li.style.alignItems = "center";

      const link = document.createElement("a");
      link.href = `${folder}/${file}`;
      link.textContent = file;
      link.target = "_blank";

      // 3 pötty gomb
      const menuBtn = document.createElement("span");
      menuBtn.textContent = "⋮";
      menuBtn.style.cursor = "pointer";
      menuBtn.style.padding = "0 8px";

      menuBtn.onclick = (e) => {
        e.stopPropagation();
        showMenu(folder, index, li);
      };

      li.appendChild(link);
      li.appendChild(menuBtn);
      ul.appendChild(li);
    });

    // + Hozzáadás mindig a lista végén
    const addLi = document.createElement("li");
    addLi.textContent = "+ Hozzáadás";
    addLi.style.cursor = "pointer";
    addLi.style.fontWeight = "bold";
    addLi.style.marginTop = "5px";

    addLi.onclick = () => {
      const newFile = prompt("Új fájl neve:");
      if (!newFile) return;

      files[folder].push(newFile);
      render();
    };

    ul.appendChild(addLi);

    folderDiv.appendChild(title);
    folderDiv.appendChild(ul);
    fileExplorer.appendChild(folderDiv);
  }
}

// Kontext menü
function showMenu(folder, index, parentElement) {
  removeMenus();

  const menu = document.createElement("div");
  menu.className = "context-menu";
  menu.style.position = "absolute";
  menu.style.background = "white";
  menu.style.border = "1px solid #ccc";
  menu.style.padding = "5px";
  menu.style.borderRadius = "6px";
  menu.style.display = "flex";
  menu.style.flexDirection = "column";

  const renameBtn = document.createElement("button");
  renameBtn.textContent = "Átnevezés";
  renameBtn.onclick = () => {
    const newName = prompt("Új név:", files[folder][index]);
    if (newName) {
      files[folder][index] = newName;
      render();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Törlés";
  deleteBtn.style.color = "red";
  deleteBtn.onclick = () => {
    if (confirm("Biztos törlöd?")) {
      files[folder].splice(index, 1);
      render();
    }
  };

  menu.appendChild(renameBtn);
  menu.appendChild(deleteBtn);

  parentElement.style.position = "relative";
  parentElement.appendChild(menu);
}

function removeMenus() {
  document.querySelectorAll(".context-menu").forEach(m => m.remove());
}

document.addEventListener("click", removeMenus);

render();