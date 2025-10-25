// Idioma padrão
let currentLanguage = 'pt-br';

// Carrega o conteúdo quando a página terminar de carregar
document.addEventListener('DOMContentLoaded', function() {
    loadLanguage('pt-br');
});

// Função para trocar idioma
function switchLanguage(lang) {
    currentLanguage = lang;
    loadLanguage(lang);
    
    // Atualiza botões
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('btn-' + lang).classList.add('active');
}

// Função para carregar o conteúdo do JSON
async function loadLanguage(lang) {
    try {
        // Busca o arquivo JSON
        const response = await fetch(`content/${lang}.json`);
        const data = await response.json();
        
        // Atualiza os elementos da página
        document.getElementById('subtitle').textContent = data.subtitle;
        document.getElementById('flag-large').textContent = data.flag;
        document.getElementById('page-title').textContent = data.pageTitle;
        document.documentElement.lang = lang;
        
        // Monta o conteúdo HTML
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
        console.error('Erro ao carregar idioma:', error);
        document.getElementById('main-content').innerHTML = 
            '<p>Erro ao carregar conteúdo. Por favor, recarregue a página.</p>';
    }
}
