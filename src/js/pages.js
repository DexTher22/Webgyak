document.addEventListener("DOMContentLoaded", loadPages);

function addPage() {
    const title = prompt("Oldal neve:");
    if (!title) return;

    const url = prompt("Oldal linkje (pl: html/ujoldal.html vagy https://...)");
    if (!url) return;

    const pages = JSON.parse(localStorage.getItem("customPages")) || [];
    pages.push({ title, url });

    localStorage.setItem("customPages", JSON.stringify(pages));

    displayPage(title, url);
}

function loadPages() {
    const pages = JSON.parse(localStorage.getItem("customPages")) || [];
    pages.forEach(page => {
        displayPage(page.title, page.url);
    });
}

function displayPage(title, url) {
    const container = document.getElementById("customPages");

    const div = document.createElement("div");
    div.className = "d-grid gap-2 mb-2";

    div.innerHTML = `
        <a href="${url}" target="_blank" class="btn btn-outline-primary">
            📄 ${title}
        </a>
        <button class="btn btn-outline-danger btn-sm"
            onclick="deletePage('${title}')">
            ❌ Törlés
        </button>
    `;

    container.appendChild(div);
}

function deletePage(title) {
    let pages = JSON.parse(localStorage.getItem("customPages")) || [];
    pages = pages.filter(page => page.title !== title);

    localStorage.setItem("customPages", JSON.stringify(pages));

    location.reload();
}