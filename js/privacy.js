let currentLanguage = 'en';

document.addEventListener('DOMContentLoaded', function() {
    loadDocument('en');
});

function switchLanguage(lang) {
    currentLanguage = lang;
    loadDocument(lang);

    document.getElementById('lang-select').value = lang;

    document.documentElement.lang = lang;
}

async function loadDocument(lang) {
    try {

        const response = await fetch(`content/${lang}.json`);
        const data = await response.json();

        document.getElementById('subtitle').textContent = data.pageTitle;
        document.title = `${data.pageTitle} - Idle Crypto Tycoon`;

        document.getElementById('last-updated').textContent = `📅 ${data.lastUpdated}`;

        let contentHTML = '';

        data.sections.forEach(section => {
            contentHTML += `<h2>${section.title}</h2>`;
            contentHTML += `<p>${section.content}</p>`;

            if (section.items) {
                contentHTML += '<ul>';
                section.items.forEach(item => {
                    contentHTML += `<li>${item}</li>`;
                });
                contentHTML += '</ul>';
            }
        });

        document.getElementById('main-content').innerHTML = contentHTML;

    } catch (error) {
        console.error('Error loading document:', error);
        document.getElementById('main-content').innerHTML = 
            '<p style="color: var(--accent-gold);">Error loading content. Please reload the page.</p>';
    }
}
