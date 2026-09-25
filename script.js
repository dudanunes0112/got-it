// Estado inicial da aplicação
let creditBalance = 3;      // Saldo atual de horas-crédito
let hoursTaught = 3;        // Horas acumuladas ensinando colegas
const targetHours = 10;     // Meta para emissão do certificado

// Mapeamento dos elementos da interface (DOM)
const creditDisplay = document.getElementById('credit-balance');
const hoursTaughtDisplay = document.getElementById('hours-taught');
const targetHoursDisplay = document.getElementById('target-hours');
const progressFill = document.getElementById('progress-fill');
const btnCertificate = document.getElementById('btn-certificate');

const alertAgendar = document.getElementById('alert-agendar');
const alertEnsinar = document.getElementById('alert-ensinar');

// Função para atualizar toda a interface em tempo real
function updateUI() {
  // Atualiza contadores numéricos
  creditDisplay.innerText = creditBalance;
  hoursTaughtDisplay.innerText = hoursTaught;
  targetHoursDisplay.innerText = targetHours;

  // Cálculo e atualização da barra de progresso
  const percentage = Math.min((hoursTaught / targetHours) * 100, 100);
  progressFill.style.width = `${percentage}%`;

  // Lógica do botão do certificado
  if (hoursTaught >= targetHours) {
    btnCertificate.disabled = false;
    btnCertificate.innerText = "🎓 Baixar Certificado Oficial de Impacto Social";
  } else {
    const remaining = targetHours - hoursTaught;
    btnCertificate.disabled = true;
    btnCertificate.innerText = `Emitir Certificado (Faltam ${remaining}h)`;
  }
}

// Ação: Agendar mentoria (Gasta 1 Hora-Crédito)
function agendarMentoria() {
  if (creditBalance > 0) {
    creditBalance--;
    updateUI();
    showAlert(alertAgendar, "✅ Mentoria agendada! 1 Hora-Crédito foi debitada do seu saldo.", "success");
  } else {
    showAlert(alertAgendar, "⚠️ Saldo insuficiente! Ajude um colega para recarregar suas Horas-Crédito.", "error");
  }
}

// Ação: Registrar mentoria ensinada (Ganha 1 Hora-Crédito e soma no Certificado)
function registrarMentoriaEnsinada() {
  creditBalance++;
  hoursTaught++;
  updateUI();
  showAlert(alertEnsinar, "🎉 Parabéns! Você ganhou +1 Hora-Crédito e avançou no seu Certificado.", "success");
}

// Ação: Baixar Certificado
function emitirCertificado() {
  alert("📜 Seu Certificado Oficial de Impacto Social foi gerado com sucesso! Ele foi enviado para o seu e-mail cadastrado.");
}

// Função auxiliar para exibir mensagens de aviso
function showAlert(element, message, type) {
  element.innerText = message;
  element.className = `alert alert-${type}`;
  element.style.display = 'block';

  setTimeout(() => {
    element.style.display = 'none';
  }, 4000);
}

// Inicializa a interface assim que a página é carregada
updateUI();