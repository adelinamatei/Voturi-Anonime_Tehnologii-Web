# Voturi-Anonime_Tehnologii-Web
CLIENT
Deschidem proiectul in Visual Studio Code si in acesta deschidem un nou terminal.
Folosim $cd client.
Pentru a instala cele necesare pentru a rula proiectul, folosim:
npm install
npm install express
Pentru a rula proiectul:
npm start

Așteptăm să ni se deschidă pagina web http://localhost:3000.

SERVER
Deschidem un nou terminal in Visual Studio Code, dar nu-l inchidem pe cel anterior. (Terminal->New Terminal)
$cd server

Trebuie instalat nodemon global:
npm install –g nodemon

Apoi rămân de instalat celelalte dependențe:
npm install

Instalăm XAMPP: https://www.apachefriends.org/index.html

În XAMPP: Apache: Start
          MySQL: Start -> Admin


În XAMPP rulăm MySql la portul default de 3306. Rulăm pe localhost.
După ce am deschis phpAdmin, trebuie creată: 
•	O bază de date numită anon_grading_db (Selectăm „Baze de date”, apoi „Creează bază de date”->Introducem numele apoi selectăm „Creează”)
•	Un user numit „sequelize”, cu parola care se gaseste în appsettings.json: PAROLA ESTE  "password": "_?aaD045.h" (Selectăm „Conturi utilizator” -> „Adaugă cont utilizator”, apoi introducem numele, alegem numele gazdei localhost, adăugăm parola de mai sus, o tastăm din nou; La privilegii globale bifăm tot, apoi „Execută”, apoi bifăm tot din nou la privilegii globale, apoi „Execută”)


Pentru a popula baza de date, rulam comanda:
node seeds/initial_seed.js


npm start
Așteptăm să ne apară:
Successfully connected to the database...
Listening on port 8080...

Dăm refresh la pagina web, așteptăm și folosim aplicația!
