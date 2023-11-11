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
    const newUrl = `${url.substring(0, url.lastIndexOf("/"))}/${senhaFormatada}`;

    window.location.href = newUrl;

}

function voltar(){
    window.history.back();
}