document.addEventListener('DOMContentLoaded', function () {
	// Підключення intlTelInput до поля телефону
	const input = document.querySelector('#telefone');
	const iti = intlTelInput(input, {
		initialCountry: 'br',
		separateDialCode: true,
		preferredCountries: ['br', 'us'],
		utilsScript:
			'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
	});

	// Валідація форми
	const form = document.getElementById('contactForm');

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		let valid = true;

		// Валідація імені
		const nome = document.getElementById('nome');
		const nomeError = document.getElementById('nomeError');
		if (nome.value.trim() === '') {
			nomeError.textContent = 'Por favor, insira o seu nome.';
			valid = false;
		} else {
			nomeError.textContent = '';
		}

		// Валідація прізвища
		const sobrenome = document.getElementById('sobrenome');
		const sobrenomeError = document.getElementById('sobrenomeError');
		if (sobrenome.value.trim() === '') {
			sobrenomeError.textContent = 'Por favor, insira o seu sobrenome.';
			valid = false;
		} else {
			sobrenomeError.textContent = '';
		}

		// Валідація email
		const email = document.getElementById('email');
		const emailError = document.getElementById('emailError');
		const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
		if (!emailPattern.test(email.value.trim())) {
			emailError.textContent = 'Por favor, insira um email válido.';
			valid = false;
		} else {
			emailError.textContent = '';
		}

		// Валідація телефону
		const telefoneError = document.getElementById('telefoneError');
		if (input.value.trim() === '' || !iti.isValidNumber()) {
			telefoneError.textContent =
				'Por favor, insira um número de telefone válido.';
			valid = false;
		} else {
			telefoneError.textContent = '';
		}

		// Якщо валідація пройшла успішно
		if (valid) {
			form.style.display = 'none';
			document.getElementById('thankYou').style.display = 'block';
		}
	});
});

// Скролінг до форми за кліком на кнопки або посилання
document.querySelectorAll('a, button').forEach((item) => {
	item.addEventListener('click', function (event) {
		event.preventDefault();
		document
			.getElementById('contactForm')
			.scrollIntoView({ behavior: 'smooth' });
	});
});
