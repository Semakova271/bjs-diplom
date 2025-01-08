// Создание объекта для выхода из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = function() {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload(); // Обновляем страницу при успешном выходе
        }
    });
};
// Получение информации о текущем пользователе
ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data); // Отображаем данные пользователя
    }
});
// Создание объекта для работы с курсами валют
const ratesBoard = new RatesBoard();

function fetchCurrencyRates() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable(); // Очищаем таблицу перед заполнением
            ratesBoard.fillTable(response.data); // Заполняем таблицу новыми данными
        }
    });
}
fetchCurrencyRates();
setInterval(fetchCurrencyRates, 60000); // Обновляем курсы валют каждую минуту
// Создание объекта для операций с деньгами
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data); // Обновляем данные о пользователе
            moneyManager.setMessage(true, "Баланс успешно пополнен.");
        } else {
            moneyManager.setMessage(false, response.error); // Показываем причину ошибки
        }
    });
};
moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data); // Обновляем данные о пользователе
            moneyManager.setMessage(true, "Конвертация успешно выполнена.");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};
moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Перевод успешно выполнен.");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};
// Работа с избранным
const favoritesWidget = new FavoritesWidget();
const updateFavorites = (favorites) => {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(favorites); // Обновляем список избранных пользователей
};

// Получение списка избранного
ApiConnector.getFavorites((response) => {
    if (response.success) {
        updateFavorites(response.data); // Отображаем список избранных пользователей
        moneyManager.updateUsersList(response.data); // Обновляем выпадающий список для перевода
    }
});

// Добавление пользователя в избранное
favoritesWidget.addUserCallback = function(userId) {
    ApiConnector.addUserToFavorites(userId, (response) => {
        if (response.success) {
            updateFavorites(response.data); // Обновляем только представление
            favoritesWidget.setMessage(true, "Пользователь успешно добавлен в избранное!");
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
};

// Удаление пользователя из избранного
favoritesWidget.removeUserCallback = function(userId) {
    ApiConnector.removeUserFromFavorites(userId, (response) => {
        if (response.success) {
            updateFavorites(response.data); // Обновляем только представление
            favoritesWidget.setMessage(true, "Пользователь успешно удален из избранного!");
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
};