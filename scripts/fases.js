function limparString(e) {
    const character = String.fromCharCode(e.keyCode);
    if (!(/^[a-zA-Z0-9]+$/igm).test(character)) {
        console.log("entrou")
        e.preventDefault();
        return false;
    }
    if (e.keyCode === 13)
        passarDeFase();
}

function passarDeFase() {
    const senha = document.getElementById("senha").value;
    if (senha === '') return;
    const url = window.location.href;
    window.location.href = `${url.substring(0, url.lastIndexOf("/"))}/${senha.toLowerCase()}.html`;
}