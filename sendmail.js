document.getElementById('Enviar').addEventListener('click', sendMail);

function sendMail(e) {
    e.preventDefault();

    // Obtém os valores dos campos de entrada do formulário
    const mail = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;

    // Elementos de feedback e botão de envio
    const feedback = document.getElementById('feedback');
    const enviarButton = document.getElementById('Enviar');

    // Verifica se todos os campos foram preenchidos
    if (mail && message && name && phone && company) {
        // Desabilita o botão de envio e mostra mensagem de carregamento
        enviarButton.disabled = true;
        feedback.style.display = 'block';
        feedback.textContent = 'Enviando sua mensagem...';

        console.log('Tentando enviar o e-mail...'); // Log para depuração

        // Usa a biblioteca Email.js para enviar o e-mail
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "berlofacosta@hotmail.com",
            Password: "8EBAB7FEFB386E39117430A84839423CDCBE",
            Port: 2525, // Adiciona a porta do servidor SMTP
            To: "m.berlofa@uni9.edu.br",
            From: "berlofacosta@hotmail.com",
            Subject: `${name} Enviando E-mail Com Javascript`,
            Body: `Email: ${mail} \nTelefone: ${phone} \nEmpresa: ${company} \nMensagem: ${message}`,
        }).then(() => {
            console.log('E-mail enviado com sucesso!'); // Log para sucesso
            // Mensagem de sucesso
            feedback.textContent = 'Sua mensagem foi enviada com sucesso!';
            feedback.style.color = 'green';

            // Reabilita o botão e limpa o formulário após 3 segundos
            setTimeout(() => {
                enviarButton.disabled = false;
                feedback.style.display = 'none';
                document.querySelector('.contact-form').reset();
            }, 3000);
        }).catch((error) => {
            console.error('Erro ao enviar o e-mail:', error); // Log para erros
            // Mensagem de erro em caso de falha
            feedback.textContent = 'Erro ao enviar a mensagem. Tente novamente.';
            feedback.style.color = 'red';
            enviarButton.disabled = false;
        });
    } else {
        // Caso algum campo não esteja preenchido, mostra mensagem de aviso
        feedback.style.display = 'block';
        feedback.textContent = 'Preencha todos os campos para enviar sua mensagem!';
        feedback.style.color = 'red';
    }
}
