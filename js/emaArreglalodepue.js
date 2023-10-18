document.addEventListener('DOMContentLoaded', function() {
    var radioTarjeta = document.getElementById('radioTarjeta');
    var radioTransferencia = document.getElementById('radioTransferencia');

    function actualizarCampos() {
        var camposTarjeta = document.querySelectorAll('#dato1, #dato2, #fecha, #dato4');
        var camposTransferencia = document.querySelectorAll('#nombres, #bnkacc');

        camposTarjeta.forEach(function(campo) {
            campo.disabled = !radioTarjeta.checked;
        });

        camposTransferencia.forEach(function(campo) {
            campo.disabled = !radioTransferencia.checked;
        });
    }

    // Ejecuta la función inicialmente para establecer el estado inicial
    actualizarCampos();

    if (radioTarjeta && radioTransferencia) {
        radioTarjeta.addEventListener('change', actualizarCampos);
        radioTransferencia.addEventListener('change', actualizarCampos);
    } else {
        console.error('Elementos no encontrados con los IDs proporcionados.');
    }

    var formularioPago = document.getElementById('formularioPago');
    if (formularioPago) {
        formularioPago.addEventListener('submit', function(event) {
            //  que este seleccionado una opcio
            if (!radioTarjeta.checked && !radioTransferencia.checked) {
                event.preventDefault();
                Swal.fire({
                    icon: 'error',
                    title: 'Opción no seleccionada',
                    text: 'Por favor, selecciona una opción de pago.',
                });
                return;
            }

            var campoCodigo = document.getElementById('dato4');

            // validacione tarjeta
            if (radioTarjeta.checked) {
                var camposTarjeta = document.querySelectorAll('#dato1, #dato2, #fecha, #dato4');
                var camposVacios = Array.from(camposTarjeta).some(function(campo) {
                    return campo.value.trim() === '';
                });

                if (camposVacios) {
                    event.preventDefault();
                    Swal.fire({
                        icon: 'error',
                        title: 'Campos incompletos',
                        text: 'Por favor, completa todos los campos de tarjeta.',
                    });
                    return;
                }
            }

            event.preventDefault(); // cancela envio
            // Simulación de verificación de pago
            var exitoPago = Math.random() < 0.5; // Simula un 50% de éxito

            if (exitoPago) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Pago exitoso!',
                    text: 'Gracias por tu pago.',
                });

                // reset forzado
                formularioPago.reset();
                actualizarCampos(); // actualiza los campos
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Pago fallido',
                    text: 'Hubo un problema con tu pago. Inténtalo de nuevo.',
                });
            }
        });
    } else {
        console.error('Elemento de formulario no encontrado con el ID proporcionado.');
    }
});