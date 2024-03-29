# Manager de cautari integrat cu Bing Search

Proiectul va fi conceput in React accesand comanda 'npx create-react-app', iar pentru Baza de date am folosit MariaDB dar si Sequelize ORM. Postman va avea rolul de testare pentru functionarea bazei de date cand interfata nu va fi creata interfata.

# Cerinte de sistem proiect

1. Instalarea NodeJS de aici https://nodejs.org/dist/v16.13.1/node-v16.13.1-x64.msi
2. Instalarea POSTMAN de aici https://www.postman.com/downloads/
3. Instalarea MariaDB de aici https://mariadb.org/download/?t=mariadb&p=mariadb&r=11.3.0&os=windows&cpu=x86_64&pkg=msi&m=chroot-network
4. Instalarea Sequelize ORM de aici https://sequelize.org/

!!! Important: 
1. Portul pe care serverul de nodeJS(frontend-ul) este configurat este 3000 iar partea de backend va fi configurata pe portul 8080.
2. Se executa comanda git clone github.com:AlexandruCristian25/Proiect-Tehnologii-Web-Manager-de-cautari-integrat-cu-Bing-Search/tweb-app.
3. Pentru instalea pachetelor aferente aplicatiei se va utiliza comanda 'npm install'.

# Specificatii proiect

Proiectul va fi impartit in doua parti; partea de Frontend va contine designul aplicatiei iar partea de backend va contine serverul unde va fi disponibila si baza de date.
1. Pentru aceasta aplicatie primul pas va fi crearea unei baze de date iar in ajutor ne va veni MariaDB si Sequelize ORM. Pe partea de server cele doua aplicatii vor fi principalii creatori ai bazei de date iar Postman va fi o verificare in plus pentru a vedea functionalitate bazei de date in lipsa unei interfete.
2. Pasul urmator va fi crearea unui motor de cautare care va contine un formular prin care utilizatorii cand vor accesa a doua oara cuvintele cheie vor fi disponibile la accesarea lor. Crearea formularului va fi utila pentru introducerea datelor in trimiterea informatiilor catre server. Formularul va avea si o lista care va contine toate cuvintele cheie ce au fost trimise de fiecare utilizator in parte si va aparea ori de cate ori formularul va fi accesat.
3. Obiectele pe care formularul le va contine sunt urmatoarele:
- o casuta de cautare in care se va adauga un placeholder pentr a-l ajuta pe utilizator ce va avea de facut;
- un buton care va avea rolul de trimitere a informatiilor introduse pentru fi regasite in baza de date cand vor fi aceesate de mai mute ori;

**BACKEND**
- Se va instala pachetul de "Node Modules" folosind comanda "npm install";
- Din terminal in directorul "database" se va scrie comanda "node ./api.js" care va porni serverul si baza de date configurate pe portul 8080;
- In HeidiSQL cu configuratia "Network type: MariaDB or MySQL (TCP/IP)", "Library: libmariadb.dll", "Hostname/IP: localhost", "Username: root", "Password: root", "Port: 3306" se va accesa baza de date;
- In fisierul "operation-api.js" din directorul "database" se vor putea observa operatiile de tip CRUD cu exemplele aferente ce vor putea fi vazute in Postman, cu caile de acces aferente fiecare operatii.
- Dupa executarea acestor operatii se vor observa in baza de date schimbarile produse prin accesarea butonului de "refresh" care va reinprospata baza de date.

**FRONTEND**
- Se va instala pachetul de "Node Modules" folosind comanda "npm install" in directorul de "web_search";
- Din terminal in directorul "web_search" se va scrie comanda "npm start" care va porni aplicatia;
- Interfata va avea componente doua butoane, unul purtand numele de "Administrare rezultate cautare" iar cel de-a doilea are numele de "Search", cat si un formular care ne va returna rezultatele cautate sub forma unui tabel;
- Butonul "Administrare rezultate cautare" ne va trimite catre pagina principala unde va va afla tabelul cu toate rezultatele existente in baza de date cat si un buton care ne va permite adaugarea unei noi categorii;
- Butonul "Search" ne va trimite catre formularul de cautare;
