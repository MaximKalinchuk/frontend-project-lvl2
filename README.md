### Hexlet tests and linter status:
[![Actions Status](https://github.com/MaximKalinchuk/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/MaximKalinchuk/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/e2ad1ccf806198e410ea/maintainability)](https://codeclimate.com/github/MaximKalinchuk/frontend-project-lvl2/maintainability)
![example workflow](https://github.com/MaximKalinchuk/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)

#### **Что это такое?**
Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

#### **Возможности утилиты:**

* Поддержка разных входных форматов: yaml, json
* Генерация отчета в виде plain text, stylish и json

#### **Установка пакета:**

* Убедитесь, что у вас установленна [Node.js v.16.13.2](https://nodejs.org/en/) или новее.
* Склонируйте репозиторий на свой компьютер: 
  * `git clone git@github.com:MaximKalinchuk/frontend-project-lvl2.git`

  __*Все команды выполнять в корне проекта /backend-project-lvl1*__

* Перейдите в корень проекта */backend-project-lvl1* и выполните команды:
  * `make install` - Установка зависимостей
  * `make link` - Установка пакетов

* Воспользуйтесь командой для просмотра возможностей программы:
  * `gendiff -h`

### **Примеры использования:**
___
1. #### Сравнение плоских JSON файлов:

[![asciicast](https://asciinema.org/a/459211.svg)](https://asciinema.org/a/459211)

2. #### Сравнение плоских YAML файлов:

[![asciicast](https://asciinema.org/a/l7vKNbagXpmCpmcQac7LY0I1T.svg)](https://asciinema.org/a/l7vKNbagXpmCpmcQac7LY0I1T)

3. #### Рекурсивное стравнение JSON и YAML файлов:

[![asciicast](https://asciinema.org/a/465144.svg)](https://asciinema.org/a/465144)

4. #### Плоский формат сравнения JSON и YAML файлов:

[![asciicast](https://asciinema.org/a/465944.svg)](https://asciinema.org/a/465944)

5. #### Вывод сравнения в JSON формате:

[![asciicast](https://asciinema.org/a/466314.svg)](https://asciinema.org/a/466314)