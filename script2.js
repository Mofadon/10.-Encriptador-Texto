document.addEventListener('DOMContentLoaded', function() {
    // Selecciona los elementos necesarios
    const textarea = document.getElementById('valorUsuario');
    const btnAjustar = document.querySelector('.btn1');
    const btnCopy = document.querySelector('.btncopy');
    const btnClean = document.querySelector('.btnclean');
    const outputText = document.querySelector('.ingtxt1');
    const mensajeCopy = document.querySelector('.mjscopy');
    const checkImg = document.querySelector('.check');

    // Función para eliminar mayúsculas, acentos y caracteres especiales
    function ajustarTexto(text) {
        // Convertir a minúsculas
        let textoAjustado = text.toLowerCase();

        // Eliminar acentos
        textoAjustado = textoAjustado.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        // Eliminar caracteres especiales
        textoAjustado = textoAjustado.replace(/[^a-z0-9\s]/g, '');

        return textoAjustado;
    }

    // Evento para el botón "Ajustar Texto"
    btnAjustar.addEventListener('click', function() {
        const texto = textarea.value.trim();

        if (!texto) {
            alert('Por favor ingrese el texto que desea ajustar');
        } else {
            const textoAjustado = ajustarTexto(texto);
            outputText.textContent = textoAjustado;
            alert('Texto ajustado correctamente');
        }
    });

    // Evento para el botón "Copiar"
    btnCopy.addEventListener('click', function() {
        const textoParaCopiar = outputText.textContent.trim();

        if (!textoParaCopiar) {
            alert('Debe ingresar el texto que desea ajustar en el panel izquierdo e intentar nuevamente');
        } else {
            navigator.clipboard.writeText(textoParaCopiar)
                .then(() => {
                    mensajeCopy.style.display = 'block';
                    checkImg.style.display = 'block';
                })
                .catch(err => {
                    console.error('Error al copiar el texto: ', err);
                });
        }
    });

    // Evento para el botón "Limpiar"
    btnClean.addEventListener('click', function() {
        // Restablece el contenido de los campos de texto
        textarea.value = '';
        outputText.textContent = 'Ingrese su texto en el recuadro izquierdo para eliminar mayúsculas, acentos y caracteres especiales';
        
        // Oculta los mensajes de confirmación
        mensajeCopy.style.display = 'none';
        checkImg.style.display = 'none';

        // Deshabilita temporalmente el botón de limpiar y cambia su estilo
        btnClean.disabled = true;
        btnClean.textContent = 'Restaurando...';

        // Usa setTimeout para reactivar el botón después de 3 segundos
        setTimeout(function() {
            btnClean.disabled = false;
            btnClean.textContent = 'Limpiar';
        }, 3000); // 3000 milisegundos = 3 segundos
    });
});
