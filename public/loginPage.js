// Создаем объект класса UserForm
const userForm = new UserForm();
// Присваиваем loginFormCallback функцию для обработки попыток авторизации
userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        console.log(response); // Просматриваем ответ сервера в консоли
        if (response.success) {
            // Если авторизация успешна, обновляем страницу
            location.reload();
        } else {
            // Если авторизация не удалась, выводим сообщение об ошибке
            alert(response.error || "Ошибка авторизации. Проверьте логин и пароль.");
        }
    });
};
// Присваиваем registerFormCallback функцию для обработки попыток регистрации
userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        console.log(response); // Просматриваем ответ сервера в консоли
        if (response.success) {
            // Если регистрация успешна, обновляем страницу
            location.reload();
        } else {
            // Если регистрация не удалась, выводим сообщение об ошибке
            alert(response.error || "Ошибка регистрации. Попробуйте снова.");
        }
    });
};