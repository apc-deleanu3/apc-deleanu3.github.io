# apc.deleanu3

Site-ul public al asociației de proprietari **A.P.C. A0120-0351** (str. Liviu Deleanu 3, Chișinău), publicat cu GitHub Pages. Tot conținutul este în română și rusă (butoanele RO / RU); butonul **A+** mărește textul.

| Fișier | Ce este |
|---|---|
| `index.html` | Pagina blocului: anunțul de vot (cu numărătoare inversă și „Adaugă în calendar”), scurtături, cât plătesc (după numărul apartamentului) și unde merg banii, canalele Viber (coduri QR, „Trimite invitația”), reparații (lista lucrărilor aprobate, cu stadiul, costul și sursa banilor), documente, cum plătesc (fără date bancare), avarii și urgențe, cine conduce, întrebări frecvente, contact. |
| `404.html` | Pagina arătată pentru o adresă greșită; legăturile încep cu `/`, fiindcă pagina poate apărea la orice adresă. |
| `robots.txt` | Paginile pot apărea în căutări; dosarul `data/` nu se indexează. Nu ascunde nimic: tot ce este pe site este public. |
| `calculator.html` | „Cât mă costă reparațiile?”: partea apartamentului din lucrările aprobate, o simulare și tabelul tuturor apartamentelor (CSV). |
| `afis.html` | Afiș A4 de tipărit pentru panoul informativ: coduri QR Viber și site, termenul de vot, numere de urgență, RO + RU. |
| `data/apartamente.csv` | Apartament, scară, suprafață (m²) din registrul cadastral: 222 de apartamente, 12.779,5 m². Scara e dedusă din numerotare (câte 36 de numere pe scară). |
| `data/reparatii.json` | Lista oficială a lucrărilor aprobate de Adunarea Generală (goală până la aprobare). |
| `data/vot.json` | Contorul de buletine predate (ascuns cât timp valoarea este `null`). |
| `documente/` | Versiuni publice, fără date personale: Statut, Regulament, Buget 2026, ordinea de zi a Adunării Generale — fiecare cu rezumat în rusă. |
| `assets/` | `style.css`, `site.js` (limba, textul mare, butonul „Sus”, tipărirea, tabelele late, alegerea 24 / 24a, textele care expiră singure), `icons.svg` (iconițe Tabler Icons, licență MIT), `vot-2026-ro.ics` și `vot-2026-ru.ics` (termenul de vot, pentru calendarul telefonului). |

## Actualizări

- **Suprafețe:** actualizați `data/apartamente.csv` (aceleași coloane). Numerele cu literă (ex. `24a`) sunt apartamente separate.
- **Lucrări:** adăugați în `data/reparatii.json` numai lucrările aprobate de Adunarea Generală, de exemplu:
  ```json
  { "denumire": "Hidroizolarea acoperișului", "denumire_ru": "Гидроизоляция крыши", "scara": 0, "cost_lei": 250000,
    "stare": "aprobata", "sursa": "fondul de reparație și dezvoltare", "sursa_ru": "фонд ремонта и развития",
    "hotarare": "Adunarea Generală din 05.10.2026, pct. 5", "hotarare_ru": "Общее собрание 05.10.2026, п. 5" }
  ```
  `scara: 0` = tot blocul; `1`–`6` = doar scara respectivă. `stare`: `aprobata`, `executie` sau `finalizata`. Câmpurile `_ru`, `sursa` și `hotarare` sunt opționale. Pagina blocului arată lista, iar calculatorul împarte costurile pe apartamente. Fără nume de firme cu prețuri din contracte nepublice și fără nume de persoane.
- **Contorul de buletine:** în `data/vot.json` scrieți numărul, de exemplu `"buletine_predate": 87, "actualizat": "30 septembrie"`. Puneți `null` ca să-l ascundeți. Afișați doar numărul de buletine, niciodată cum s-a votat.
- **Datele de plată:** nu se publică pe site (IBAN, IDNO, banca). Secțiunea „Cum plătesc?” trimite la factura lunară și la adresa de e-mail a asociației.
- **Termenul de vot:** apare în `index.html` (atributul `data-deadline`, atributele `data-until` / `data-from`, textele anunțului și data pentru Google Calendar `20261005T160000Z`), în `documente/adunarea-generala-2026.md` și `documente/regulament.md` (`data-until` / `data-from`), în `assets/vot-2026-ro.ics` / `vot-2026-ru.ics` și în `afis.html`. După termen, anunțul trece singur pe „Votul s-a încheiat”, iar caseta de vot dispare de pe afiș.
- **Texte care expiră singure:** orice element cu `data-until="2026-10-05T20:00:00+03:00"` dispare de la acea oră; unul cu `data-from="…"` apare abia de atunci (`assets/site.js`). Data se scrie cu fusul orar (`+03:00` vara, `+02:00` iarna). În textele construite din script se folosește `APC.past("…")`. Așa, după o dată cunoscută (termenul de vot, sfârșitul unei lucrări), pagina nu mai spune lucruri depășite, chiar dacă nu a actualizat-o nimeni.
- **Numere de urgență:** în `index.html` (secțiunea `#avarii`) și în `afis.html`. Verificate pe 29 septembrie 2026 pe acc.md (Apă-Canal), chisinaugaz.md, premierenergydistribution.md, termoelectrica.md și liftservice.md (lift: dispeceratul central 022 47 11 01 și serviciul de intervenție Buiucani 022 23 20 11). Iconița liftului este desenată direct în `index.html`, nu în `icons.svg`.
- **Data „Actualizat pe”:** în subsolul din `index.html` (RO și RU).
- **După ce schimbați `style.css`, `site.js`, `icons.svg` sau codurile QR:** înlocuiți peste tot `?v=20260930` cu data zilei (în `index.html`, `calculator.html`, `afis.html`, `404.html` și `_layouts/doc.html`). Altfel, browserele care au vizitat site-ul în ultimele 10 minute pot combina pagina nouă cu stilurile vechi și pagina apare stricată. Fișierele din `data/` se verifică la fiecare vizită și nu au nevoie de asta.

## Reguli pentru acest repo (public)

Nu adăugați nume, telefoane, numere de apartament legate de persoane sau datorii individuale, date bancare (IBAN), IDNO sau numere cadastrale.

Fonturile sunt cele instalate pe dispozitivul cititorului (fără Google Fonts), ca adresa IP a vizitatorilor să nu ajungă la terți. Nu adăugați scripturi, fonturi sau imagini încărcate de pe alte site-uri.

## Publicare

Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`. Adresa este `https://apc-deleanu3.github.io/`.
