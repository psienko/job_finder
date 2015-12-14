# job_finder
Projekt Aplikacje Internetowe

### Instalacja

Zainstaluj Gulp i Bower globalnie:

```sh
$ npm install -g gulp bower
$ git clone [git-repo-url] [nazwa-folderu-projektu] 
```

### Uruchomienie

```sh
$ cd [nazwa-folderu-projektu]/ui
$ bower install
$ npm install
$ gulp serve
```

### Testy

##### Testy Jednostkowe:

```sh
$ cd [nazwa-folderu-projektu]/ui
$ gulp test 
```

lub:

```sh
$ gulp test:auto 
```

To polecenie uruchamia unit testy przy każdej zmianie w plikach źródłowych.

##### Testy e2e:

```sh
$ cd [nazwa-folderu-projektu]/ui
$ gulp protractor 
```
