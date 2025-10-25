let currentLanguage = 'en';

document.addEventListener('DOMContentLoaded', function() {
    loadLanguage('en'); 
});

function switchLanguage(lang) {
    currentLanguage = lang;
    loadLanguage(lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('btn-' + lang).classList.add('active');
}

async function loadLanguage(lang) {
    try {

        const response = await fetch(`content/${lang}.json`);
        const data = await response.json();

        document.getElementById('subtitle').textContent = data.subtitle;
        document.getElementById('flag-large').textContent = data.flag;
        document.getElementById('page-title').textContent = data.pageTitle;
        document.documentElement.lang = lang;

        let contentHTML = `<span class="last-updated">📅 ${data.lastUpdated}</span>`;

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
        console.error('Error loading language:', error);
        document.getElementById('main-content').innerHTML = 
            '<p>Error loading content. Please reload the page.</p>';
    }
}
