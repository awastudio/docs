// Estado da aplicação
let currentLanguage = 'en';

// Carrega o conteúdo quando a página terminar de carregar
document.addEventListener('DOMContentLoaded', function() {
    loadDocument('en');
});

// Função para trocar idioma
function switchLanguage(lang) {
    currentLanguage = lang;
    loadDocument(lang);
    
    // Atualiza o select
    document.getElementById('lang-select').value = lang;
    
    // Atualiza o atributo lang do HTML
    document.documentElement.lang = lang;
}

// Função para carregar o conteúdo do JSON
async function loadDocument(lang) {
    try {
        // Busca o arquivo JSON na pasta content local
        const response = await fetch(`content/${lang}.json`);
        const data = await response.json();
        
        // Atualiza o título da página
        document.getElementById('subtitle').textContent = data.pageTitle;
        document.title = `${data.pageTitle} - Idle Crypto Tycoon`;
        
        // Atualiza o last updated
        document.getElementById('last-updated').textContent = `📅 ${data.lastUpdated}`;
        
        // Monta o conteúdo HTML
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
