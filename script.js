// Seleciona os elementos
const form = document.getElementById('cadastroForm');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmarSenha');

// Eventos
nome.addEventListener('blur', () => validarCampo(nome, validarNome));
email.addEventListener('blur', () => validarCampo(email, validarEmail));
senha.addEventListener('input', () => validarCampo(senha, validarSenha));
confirmarSenha.addEventListener('input', () => validarCampo(confirmarSenha, validarConfirmacao));

// Função genérica
function validarCampo(input, funcaoValidadora) {
    const msgErro = document.getElementById(input.id + '-error');
    const resultado = funcaoValidadora(input.value);

    if (!resultado.valido) {
        input.classList.add('error');
        input.classList.remove('success');
        msgErro.textContent = resultado.mensagem;
    } else {
        input.classList.remove('error');
        input.classList.add('success');
        msgErro.textContent = '';
    }
}

// Validação Nome
function validarNome(valor) {
    if (!valor.trim()) return { valido: false, mensagem: '⚠️ Nome é obrigatório' };
    if (valor.length < 3) return { valido: false, mensagem: '⚠️ Mínimo 3 caracteres' };
    return { valido: true };
}

// Validação Email
function validarEmail(valor) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!valor) return { valido: false, mensagem: '⚠️ E-mail obrigatório' };
    if (!regex.test(valor)) return { valido: false, mensagem: '⚠️ Formato inválido' };

    return { valido: true };
}

// Validação Senha
function validarSenha(valor) {
    if (valor.length < 8) return { valido: false, mensagem: '⚠️ Mínimo 8 caracteres' };
    if (!/[A-Z]/.test(valor)) return { valido: false, mensagem: '⚠️ Precisa de 1 letra maiúscula' };
    if (!/[0-9]/.test(valor)) return { valido: false, mensagem: '⚠️ Precisa de 1 número' };

    return { valido: true };
}

// Validação Confirmar Senha
function validarConfirmacao(valor) {
    if (!valor) return { valido: false, mensagem: '⚠️ Confirme a senha' };
    if (valor !== senha.value) return { valido: false, mensagem: '⚠️ Senhas não coincidem' };

    return { valido: true };
}

// Validação ao enviar o formulário
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const validacoes = [
        validarCampo(nome, validarNome),
        validarCampo(email, validarEmail),
        validarCampo(senha, validarSenha),
        validarCampo(confirmarSenha, validarConfirmacao)
    ];

    // Verifica se tem erro
    const temErro = document.querySelectorAll('.error').length > 0;

    if (!temErro) {
        alert('✅ Cadastro realizado com sucesso!');
        form.reset();

        // remove estilos
        document.querySelectorAll('input').forEach(input => {
            input.classList.remove('success');
        });
    } else {
        alert('❌ Corrija os erros antes de enviar');
    }
});