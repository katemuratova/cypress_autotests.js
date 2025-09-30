import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

     beforeEach('Начало теста', function () {
         cy.visit('/');
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
         cy.get(main_page.fogot_pass_btn).should('be.visible'); //проверка кнопки восстан. пароль видна пользователю
           });

     afterEach ('Конец теста', function (){
          if (this.currentTest.title === 'Проверка наличия и работы кнопки qa.studio') { //пропускаю один автотест
               return;
          } 
          cy.get(result_page.close).should('be.visible'); //есть крестик и он виден пользователю
          cy.get(result_page.close).click(); //проверка работы кнопки крестик
     })


   it('Верный логин и верный пароль', function () {
        cy.get(main_page.email).type(data.login); //ввела верный логин
        cy.get(main_page.password).type(data.password); //ввела верный пароль
        cy.get(main_page.login_button).click(); //нажала войти

        cy.get(result_page.title).should('be.visible'); //Текст виден пользователю
        cy.get(result_page.title).contains('Авторизация прошла успешно'); //Проверяю что после аторизации вижу текст

   })


   it('Верный логин и НЕверный пароль', function () {
        cy.get(main_page.email).type(data.login); //ввела верный логин
        cy.get(main_page.password).type('qa_one_love11'); //ввела НЕверный пароль 
        cy.get(main_page.login_button).click(); //нажала войти

        cy.get(result_page.title).should('be.visible'); //Текст виден пользователю
        cy.get(result_page.title).contains('Такого логина или пароля нет'); //Проверяю что после неуспешной аторизации вижу текст
   })
   

   it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('german@dolnikov.ku'); //ввела НЕверный логин
        cy.get(main_page.password).type(data.password); //ввела верный пароль
        cy.get(main_page.login_button).click(); //нажала войти

        cy.get(result_page.title).should('be.visible'); //Текст виден пользователю
        cy.get(result_page.title).contains('Такого логина или пароля нет'); //Проверяю что после неуспешной аторизации вижу текст
   })


   it('Проверка валидации, в логине нет @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); //ввела логин без @
        cy.get(main_page.password).type(data.password); //ввела верный пароль 
        cy.get(main_page.login_button).click(); //нажала войти

        cy.get(result_page.title).should('be.visible'); //Текст виден пользователю
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); //Проверяю что после неуспешной аторизации вижу текст
   })


   it('Проверка наличия и работы кнопки qa.studio', function () {
         cy.get(main_page.footer).should('be.visible'); //проверка что кнопка qa.studio видна пользователю
         cy.get(main_page.footer).click() // проверка что кнопка qa.studio кликабельна 
         cy.location('href', { timeout: 10000 }) // проверка что переход есть
   })


   it('Проверка работы кнопки Забыли пароль', function () {
        cy.get(main_page.fogot_pass_btn).click() //проверка что кнопка забыли пароль кликабельна
        cy.get(recovery_page.email).type(data.login); //ввод правильного логина
        cy.get(recovery_page.send_button).click() //нажимаю на кнопку отправить код

        cy.get(result_page.title).should('be.visible'); //Текст виден пользователю
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); //Проверяю что после неуспешной аторизации вижу текст
   })


   it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); //ввела верный логин с наличичем заглавных букв
        cy.get(main_page.password).type(data.password); //ввела верный пароль 
        cy.get(main_page.login_button).click(); //нажала войти

        cy.get(result_page.title).should('be.visible'); //Текст виден пользователю
        cy.get(result_page.title).contains('Авторизация прошла успешно'); //Проверяю что после аторизации вижу текст


   })

})
