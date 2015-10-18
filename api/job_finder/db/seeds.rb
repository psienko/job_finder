# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

trades = [
  { name: 'Edukacja',                 subtrades: "Bibliotekarz/Bibliotekarka, Instruktor nauki jazdy, Nauczyciel, Nauczyciel przedszkola, Nauczyciel psycholog, Nauczyciel logopeda, Opiekunka dziecięca, Pedagog szkolny, Wychowawca kolonii, Wychowawca w placówkach, Wykładowca na kursach".split(', ') },
  { name: 'Finanse i Bankowość',      subtrades: "Agent ubezpieczeniowy, Analityk finansowy, Broker ubezpieczeniowy, Doradca kredytowy, Doradca podatkowy, Księgowa, Księgowy, Makler".split(', ') },
  { name: 'Handel i Sprzedaż',        subtrades: "Agent ds. odszkodowań, Agent nieruchomości, Doradca finansowy, Hostessa, Kasjer sprzedawca, Kierownik sklepu, Konsultant, Kontroler finansowy, Kontroler jakości, Magazynier, Pakowacz, Przedstawiciel handlowy, Telemarketer".split(', ') },
  { name: 'Inżynieria i Budownictwo', subtrades: "Architekt, Brukarz, Cieśla, Dekarz, Elektryk, Geodeta, Hydraulik, Inżynier geotechnik, Inżynier projektant dróg, Kafelkarz, glazurnik, Kierownik budowy, Konstruktor budowlany, Kosztorysant, Monter wentylacji, Murarz, Ślusarz, Stolarz, Tynkarz, Urbanista".split(', ') },
  { name: 'Medycyna i Farmacja',      subtrades: "Alergolog, Anestezjolog, Chirurg ogólny, Dermatolog, wenerolog, Diabetolog, Diagnosta laboratoryjny, Endokrynolog, Farmaceuta, Fizjoterapeuta, Ginekolog onkolog, Kardiochirurg, Kardiolog, Lekarz medycyny, Lekarz medycyny pracy, Lekarz medycyny sądowej, Masażysta, Masażystka, Nefrolog, Neurolog, Okulista, Onkolog, Optometrysta, Opiekun/opiekunka osób starszych, Optyk, Technik optyk, Ortoptystka, ortoptysta, Pediatra, Pielęgniarka, Położna, Położnik ginekolog, Ratownik medyczny, Stomatolog, dentysta, Technik dentystyczny, Technik farmaceutyczny, Technik weterynarii, Urolog, Weterynarz".split(', ') },
  { name: 'Obsuga pojazdów i maszyn', subtrades: "Blacharz samochodowy, Diagnosta samochodowy, Elektromechanik, Kierowca autobusu, Kierowca ciężarówki, Lakiernik samochodowy, Maszynista, Mechanik samochodowy, Operator koparki, Operator maszyn budowlanych, Operator wózków widłowych, Pilot samolotu, Taksówkarz, Tokarz".split(', ') },
  { name: 'Prawo i Administracja',    subtrades: "Adwokat, Archiwista, Audytor, Biegły sądowy, Komornik, Kurator sądowy, Notariusz, Pracownik socjalny, Prokurator, Radca prawny, Rzecznik patentowy, Sędzia, Specjalista ds. BHP, Syndyk, Tłumacz przysięgły, Windykator".split(', ') },
  { name: 'Służba Publiczna',         subtrades: "Agent celny, Agent ochrony, Detektyw, Inżynier pożarnictwa, Policjant, Polityk, Strażak, Strażnik Miejski, Żołnierz".split(', ') },
  { name: 'IT i Telekomunikacja',     subtrades: "Administrator sieci komputerowych, Grafik komputerowy, Informatyk, Konsultant SAP, Pozycjoner stron internetowych, Programista, Projektant stron WWW, Specjalista ds. bazy danych, Specjalista ds. IT".split(', ') },
  { name: 'Turystyka i Rekreacja',    subtrades: "Stewardesa / steward, Barista, Barman, Cukiernik, Dietetyk, Instruktor Nordic Walking, Kelner, Kucharz, Pilot wycieczek, Przewodnik turystyczny, Recepcjonista/recepcjonistka, Rezydent, Sommelier".split(', ') },
  { name: 'Pozostałe',                subtrades: "Aktor/aktorka, Copywriter, Dekorator wnętrz, Dziennikarz, Fotograf, Fotomodel/fotomodelka, Fryzjer, Kosmetyczka, Krawiec, Ksiądz, Kurier, Listonosz, Logistyk, Model/modelka, Pisarz/Pisarka, Piosenkarz, piosenkarka, Politolog, Prezes, Projektantka, Projektant mody, Rolnik, Scenarzysta, Sekretarka, Specjalista ds. kadr i płac, Spedytor, Stylista, Tatuażysta, Trener personalny/Trener osobisty".split(', ') }
]
  # źródło http://www.zawodowe.com/Kategorie_4

  # =================BEGIN - creating categories
  trades.each do |trade| 
    parent = Category.create name: trade[:name]
    trade[:subtrades].each { |subtrade| parent.children.create name: subtrade }
  end
  # =================BEGIN - creating categories