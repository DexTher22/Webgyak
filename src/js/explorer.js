// explorer.js

const fileExplorer = document.getElementById("explorer");

// Definiáljuk a “Drive-szerű” mappastruktúrát
const files = {
  "html": ["meme-dash.html", "vicces.html", "vilagjegy.html"],
  "images": ["cat1.jpg", "cat2.png"]
};

// Dinamikusan generáljuk a listát
for (const folder in files) {
  const folderDiv = document.createElement("div");
  folderDiv.className = "folder";
  folderDiv.innerHTML = `<strong>${folder}</strong>`;
  
  const ul = document.createElement("ul");

  files[folder].forEach(file => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `${folder}/${file}`;
    link.textContent = file;
    link.target = "_blank";
    li.appendChild(link);
    ul.appendChild(li);
  });

  folderDiv.appendChild(ul);
  fileExplorer.appendChild(folderDiv);
}