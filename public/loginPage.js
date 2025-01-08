// Создаем объект класса UserForm
const userForm = new UserForm();

// Обработка события авторизации
userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        if (response.success) {
            // Обновление страницы при успешной авторизации
            location.reload();
        } else {
            // Вывод ошибки на страницу
            userForm.setLoginErrorMessage(response.error);
        }
    });
};

// Обработка события регистрации
userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        if (response.success) {
            // Обновление страницы при успешной регистрации
            location.reload();
        } else {
            // Вывод ошибки на страницу
            userForm.setRegisterErrorMessage(response.error);
        }
    });
};
