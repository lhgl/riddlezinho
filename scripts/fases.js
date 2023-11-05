function enviarSenha(event) {
    if (event.keyCode === 13) {
        passarDeFase();
    }
}

function removerCaracteresEspeciais(senhaSuja) {
    return senhaSuja.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function passarDeFase() {
    const senha = document.getElementById("senha").value;
    if (senha === '') {
        return;
    }
    const senhaFormatada = removerCaracteresEspeciais(senha);
    const url = window.location.href;

    window.location.href = `${url.substring(0, url.lastIndexOf("/"))}/${senhaFormatada}.html`;
}

function voltar(){
    window.history.back();
}