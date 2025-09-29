describe('Проверка авторизации', function () {

   it('Верный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/'); //зашла на сайта

        cy.get('#forgotEmailButton').should('be.visible'); //проверка кнопки восстан. пароль видна пользователю
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверка цвета кнопки восстановить пароль

        cy.get('#mail').type('german@dolnikov.ru'); //ввела верный логин
        cy.get('#pass').type('qa_one_love1'); //ввела верный пароль
        cy.get('#loginButton').click(); //нажала войти

        cy.wait(2000) //ожидание 2 секунды (2000 в милисекундах)

        cy.get('#messageHeader').contains('Авторизация прошла успешно'); //Проверяю что после аторизации вижу текст
        cy.get('#messageHeader').should('be.visible');//Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //есть крестик и он виден пользователю
        cy.get('#exitMessageButton > .exitIcon').click(); //проверка работы кнопки крестик
   })


   it('Верный логин и НЕверный пароль', function () {
        cy.visit('https://login.qa.studio/'); //зашла на сайта

        cy.get('#forgotEmailButton').should('be.visible'); //проверка кнопки восстан. пароль видна пользователю
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверка цвета кнопки восстановить пароль

        cy.get('#mail').type('german@dolnikov.ru'); //ввела верный логин
        cy.get('#pass').type('qa_one_love11'); //ввела НЕверный пароль 
        cy.get('#loginButton').click(); //нажала войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); //Проверяю что после клика войти вижу текст
        cy.get('#messageHeader').should('be.visible'); //Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //есть крестик и он виден пользователю
        cy.get('#exitMessageButton > .exitIcon').click(); //проверка работы кнопки крестик
   })
   

   it('Неверный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/'); //зашла на сайта

        cy.get('#forgotEmailButton').should('be.visible'); //проверка кнопки восстан. пароль видна пользователю
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверка цвета кнопки восстановить пароль

        cy.get('#mail').type('german@dolnikov.ku'); //ввела НЕверный логин
        cy.get('#pass').type('qa_one_love1'); //ввела верный пароль
        cy.get('#loginButton').click(); //нажала войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); //Проверяю что после клика войти вижу текст
        cy.get('#messageHeader').should('be.visible'); //Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //есть крестик и он виден пользователю
        cy.get('#exitMessageButton > .exitIcon').click(); //проверка работы кнопки крестик
   })


   it('Проверка валидации, в логине нет @', function () {
        cy.visit('https://login.qa.studio/'); //зашла на сайта

        cy.get('#forgotEmailButton').should('be.visible'); //проверка кнопки восстан. пароль видна пользователю
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверка цвета кнопки восстановить пароль

        cy.get('#mail').type('germandolnikov.ru'); //ввела логин без @
        cy.get('#pass').type('qa_one_love1'); //ввела верный пароль 
        cy.get('#loginButton').click(); //нажала войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); //Проверяю что после аторизации вижу текст
        cy.get('#messageHeader').should('be.visible'); //Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //есть крестик и он виден пользователю
        cy.get('#exitMessageButton > .exitIcon').click(); //проверка работы кнопки крестик
   })


   it('Проверка наличия и работы кнопки qa.studio', function () {
         cy.visit('https://login.qa.studio/'); //зашла на сайта
         cy.get('#forgotEmailButton').should('be.visible'); //проверка кнопки забыли пароль видна пользователю
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверка цвета кнопки забыли пароль
         cy.get('.link').should('be.visible'); //проверка что кнопка qa.studio видна пользователю
         cy.get('.link').click() // проверка что кнопка qa.studio кликабельна 
         cy.location('href', { timeout: 10000 }) // проверка что переход есть
   })


   it('Проверка работы кнопки Забыли пароль', function () {
        cy.visit('https://login.qa.studio/'); //зашла на сайта
        cy.get('#forgotEmailButton').should('be.visible'); //проверка кнопки забыли пароль видна пользователю
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверка цвета кнопки забыли пароль

        cy.get('#forgotEmailButton').click() //проверка что кнопка забыли пароль кликабельна
        cy.get('#mailForgot').type('german@dolnikov.ru'); //ввод правильного логина
        cy.get('#restoreEmailButton').click() //нажимаю на кнопку отправить код

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); //Проверяю что после нажатия на кнопку отправить вижу текст
        cy.get('#messageHeader').should('be.visible'); //Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //есть крестик и он виден пользователю
        cy.get('#exitMessageButton > .exitIcon').click(); //проверка работы кнопки крестик
   })


   it('Проверка на приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio/'); //зашла на сайта

        cy.get('#forgotEmailButton').should('be.visible'); //проверка кнопки восстан. пароль видна пользователю
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверка цвета кнопки восстановить пароль

        cy.get('#mail').type('GerMan@Dolnikov.ru'); //ввела верный логин с наличичем заглавных букв
        cy.get('#pass').type('qa_one_love1'); //ввела верный пароль 
        cy.get('#loginButton').click(); //нажала войти

        cy.get('#messageHeader').contains('Авторизация прошла успешно'); //Проверяю что после аторизации вижу текст
        cy.get('#messageHeader').should('be.visible'); //Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //есть крестик и он виден пользователю
        cy.get('#exitMessageButton > .exitIcon').click(); //проверка работы кнопки крестик
   })

})
