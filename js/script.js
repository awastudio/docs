let currentLanguage = 'en';
let currentDocument = 'privacy';

document.addEventListener('DOMContentLoaded', function() {
    loadDocument('privacy', 'en');
});

function switchLanguage(lang) {
    currentLanguage = lang;
    loadDocument(currentDocument, lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('btn-' + lang).classList.add('active');
}

function switchDocument(doc) {
    currentDocument = doc;
    loadDocument(doc, currentLanguage);

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('tab-' + doc).classList.add('active');
}

async function loadDocument(doc, lang) {
    try {

        const response = await fetch(`content/${doc}-${lang}.json`);
        const data = await response.json();

        document.getElementById('subtitle').textContent = data.subtitle;
        document.getElementById('flag-large').textContent = data.flag;
        document.getElementById('page-title').textContent = data.pageTitle;
        document.documentElement.lang = lang;

        updateTabTexts(lang);

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
        console.error('Error loading document:', error);
        document.getElementById('main-content').innerHTML = 
            '<p>Error loading content. Please reload the page.</p>';
    }
}

function updateTabTexts(lang) {
    const tabTexts = {
        'en': {
            privacy: 'Privacy Policy',
            terms: 'Terms of Service'
        },
        'pt-br': {
            privacy: 'Política de Privacidade',
            terms: 'Termos de Uso'
        }
    };

    document.getElementById('tab-privacy-text').textContent = tabTexts[lang].privacy;
    document.getElementById('tab-terms-text').textContent = tabTexts[lang].terms;
}
