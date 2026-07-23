/**
 * Scripts para funcionalidades das fases do RiddleZinho
 */

/**
 * Enviar senha ao pressionar Enter
 * Aceita o evento explícito (quando passado) ou o window.event global,
 * garantindo que a tecla Enter funcione mesmo com o handler inline
 * `onkeyup="enviarSenha();"` usado nas fases.
 */
function enviarSenha(event) {
  event = event || (typeof window !== 'undefined' ? window.event : undefined);
  if (event && (event.key === 'Enter' || event.keyCode === 13)) {
    passarDeFase();
  }
}

/**
 * Remover caracteres especiais da senha
 */
function removerCaracteresEspeciais(senhaSuja) {
  return senhaSuja.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/**
 * Passar de fase - navega para a próxima fase
 */
function passarDeFase() {
  const senha = document.getElementById('senha');
  if (!senha || senha.value === '') {
    return;
  }

  const senhaFormatada = removerCaracteresEspeciais(senha.value);
  const url = window.location.href;
  const newUrl = `${url.substring(0, url.lastIndexOf('/'))}/${senhaFormatada}`;

  // Registrar conclusão da fase antes de navegar
  registrarConclusaoFase(window.location.pathname.split('/').pop());

  window.location.href = newUrl;
}

/**
 * Registrar conclusão de fase na API
 * @param {string} faseId - ID da fase concluída
 */
async function registrarConclusaoFase(faseId) {
  const token = localStorage.getItem('authToken');

  if (!token || !faseId) {
    return;
  }

  try {
    const startTime = localStorage.getItem('faseStartTime');
    const timeSpent = startTime ? Math.floor((Date.now() - parseInt(startTime)) / 1000) : 0;

    const response = await fetch('/auth/complete-phase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        phaseId: faseId,
        timeSpent: timeSpent,
        score: 100
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Fase concluída!', data.stats);

      // Atualizar badge de progresso se existir
      atualizarBadgeProgresso(data.stats);
    } else if (response.status === 401) {
      // Token expirado, limpar auth
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  } catch (error) {
    console.error('Erro ao registrar conclusão:', error);
  }
}

/**
 * Atualizar badge de progresso na tela
 * @param {Object} stats - Estatísticas do usuário
 */
function atualizarBadgeProgresso(stats) {
  const badge = document.getElementById('user-progress-badge');
  if (!badge) {return;}

  const totalPhases = 99;
  const completedPhases = stats.completedPhases || 0;
  const progress = Math.floor((completedPhases / totalPhases) * 100);
  const score = stats.score || 0;

  badge.innerHTML = `
        <span class="progress-label">Seu Progresso</span>
        <span class="progress-value">${progress}%</span>
        <span class="score-label">${score} pts</span>
    `;
}

/**
 * Carregar progresso do usuário ao carregar a página
 */
async function carregarProgressoUsuario() {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Usuário não logado
    const badge = document.getElementById('user-progress-badge');
    if (badge) {
      badge.innerHTML = `
                <span class="progress-label">Seu Progresso</span>
                <span class="progress-value">--%</span>
                <span class="score-label">Não logado</span>
            `;
    }
    return;
  }

  try {
    const response = await fetch('/auth/profile', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (response.ok) {
      const data = await response.json();
      const stats = data.user.stats || {};
      atualizarBadgeProgresso(stats);

      // Salvar tempo de início da fase atual
      localStorage.setItem('faseStartTime', Date.now().toString());
    } else if (response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  } catch (error) {
    console.error('Erro ao carregar progresso:', error);
  }
}

/**
 * Voltar para a página anterior
 */
function voltar() {
  window.history.back();
}

/**
 * Oculta imagens que não conseguem carregar.
 * Várias fases legadas referenciam imagens-pista que ainda não foram
 * migradas do blog original. Em vez de exibir o ícone de imagem quebrada,
 * escondemos o elemento para preservar o layout da fase.
 */
function ocultarImagensQuebradas() {
  const imagens = document.querySelectorAll('img');
  imagens.forEach((img) => {
    const esconder = () => {
      img.style.display = 'none';
    };
    // Imagem já falhou antes deste script rodar
    if (img.complete && img.naturalWidth === 0) {
      esconder();
    }
    img.addEventListener('error', esconder);
  });
}

/**
 * Vincula o Enter do campo de senha de forma robusta, independente do
 * handler inline, cobrindo navegadores que não populam window.event.
 */
function vincularEnterSenha() {
  const senha = document.getElementById('senha');
  if (senha && !senha.dataset.enterBound) {
    senha.dataset.enterBound = '1';
    senha.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();
        passarDeFase();
      }
    });
  }
}

// Inicialização quando o DOM estiver pronto
function inicializarFase() {
  carregarProgressoUsuario();
  ocultarImagensQuebradas();
  vincularEnterSenha();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarFase);
  } else {
    inicializarFase();
  }
}
