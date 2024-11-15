# 📊 Mood Tracker

**Mood Tracker** — это веб-приложение, позволяющее пользователям отслеживать свои эмоции и настроения каждый день. Приложение предоставляет удобный интерфейс для ведения записей, визуализирует данные в виде графиков и облака слов, а также даёт статистику и аналитику, основанную на ваших записях.

## 🚀 Features

-   **Дневник эмоций**: Добавляйте ежедневные записи с выбором эмоций и описанием ситуации.
-   **Календарь настроений**: Просматривайте историю своих эмоций на удобном календаре
-   **Облако слов**: Визуализирует наиболее часто употребляемые слова в ваших записях за определённый период времени.
-   **Графики статистики**: Гистограммы и круговые диаграммы, показывающие распределение эмоций по времени дня и категории.
-   **Переключение темы**: Поддержка светлой и тёмной темы с автоматическим переключением в зависимости от предпочтений пользователя.

## 🛠️ Tech Stack

-   **React** + **TypeScript**: Современный стек для создания интерфейсов.
-   **Vite**: Быстрая сборка проекта с поддержкой модулей ES.
-   **Material-UI**: Компоненты для удобного создания адаптивного интерфейса.
-   **Recharts**: Библиотека для построения графиков и визуализации данных.
-   **Wordcloud.js**: Используется для создания облака слов на основе записей пользователя.
-   **LocalStorage**: Хранение пользовательских данных на клиенте.

## 🌐 Demo

Проект доступен по адресу: [Mood Tracker на GitHub Pages](https://shilllo.github.io/mood-tracker/)

## 🛡️ Лицензия

Этот проект распространяется под лицензией MIT. Подробнее см. файл [LICENSE](./LICENSE).

## ✅ TODO

### Функционал

-   [ ] **Экспорт данных** в формат CSV или JSON
-   [ ] **Календарь настроений**: Просматривайте историю своих эмоций на удобном календаре, где каждый день окрашен в цвет доминирующего настроения.
-   [ ] **Анализ эмоций**: Автоматические выводы, такие как "Вы чаще испытываете тревогу по утрам" или "Ваш уровень счастья выше по выходным".

### Аналитика и визуализация

-   [ ] **Тепловая карта (heatmap)** для отображения частоты эмоций по дням недели

### Улучшение UX/UI

-   [ ] **Адаптивность интерфейса для мобильных устройств**

### Технические задачи

-   [ ] **Сохранение данных в IndexedDB** для повышения надёжности хранения
-   [ ] **Оптимизация производительность приложения**, используя memoization и оптимизацию ререндеров
