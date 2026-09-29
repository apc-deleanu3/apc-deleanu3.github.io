# apc.deleanu3

Site-ul public al asociației de proprietari **A.P.C. A0120-0351** (str. Liviu Deleanu 3, Chișinău), publicat cu GitHub Pages. Tot conținutul este în română și rusă (butoanele RO / RU); butonul **A+** mărește textul.

| Fișier | Ce este |
|---|---|
| `index.html` | Pagina blocului: anunțul de vot (cu numărătoare inversă și „Adaugă în calendar”), scurtături, cât plătesc (după numărul apartamentului) și unde merg banii, canalele Viber (coduri QR, „Trimite invitația”), reparații, documente, cum plătesc, avarii și urgențe, cine conduce, întrebări frecvente, contact. |
| `calculator.html` | „Cât mă costă reparațiile?”: partea apartamentului din lucrările aprobate, o simulare și tabelul tuturor apartamentelor (CSV). |
| `afis.html` | Afiș A4 de tipărit pentru panoul informativ: coduri QR Viber și site, termenul de vot, numere de urgență, RO + RU. |
| `data/apartamente.csv` | Apartament, scară, suprafață (m²) din registrul cadastral: 222 de apartamente, 12.779,5 m². Scara e dedusă din numerotare (câte 36 de numere pe scară). |
| `data/reparatii.json` | Lista oficială a lucrărilor planificate (goală până la aprobare). |
| `data/vot.json` | Contorul de buletine predate (ascuns cât timp valoarea este `null`). |
| `data/plati.json` | Datele bancare ale asociației (secțiunea „Cum plătesc?” le afișează doar dacă `iban` este completat). |
| `documente/` | Versiuni publice, fără date personale: Statut, Regulament, Buget 2026, ordinea de zi a Adunării Generale — fiecare cu rezumat în rusă. |
| `assets/` | `style.css`, `site.js` (limba, textul mare, butonul „Sus”, tipărirea, tabelele late, alegerea 24 / 24a), `icons.svg` (iconițe Tabler Icons, licență MIT), `vot-2026-ro.ics` și `vot-2026-ru.ics` (termenul de vot, pentru calendarul telefonului). |

## Actualizări

- **Suprafețe:** actualizați `data/apartamente.csv` (aceleași coloane). Numerele cu literă (ex. `24a`) sunt apartamente separate.
- **Lucrări:** adăugați în `data/reparatii.json`, de exemplu:
  ```json
  { "denumire": "Hidroizolarea acoperișului", "scara": 0, "cost_lei": 250000 }
  ```
  `scara: 0` = tot blocul; `1`–`6` = doar scara respectivă. Pagina blocului arată apoi numărul de lucrări aprobate.
- **Contorul de buletine:** în `data/vot.json` scrieți numărul, de exemplu `"buletine_predate": 87, "actualizat": "30 septembrie"`. Puneți `null` ca să-l ascundeți. Afișați doar numărul de buletine, niciodată cum s-a votat.
- **Datele de plată:** completați `data/plati.json` (`beneficiar`, `idno`, `iban`, `banca`, `destinatia`, `termen`). Câmpurile `null` nu se afișează.
- **Termenul de vot:** apare în `index.html` (atributul `data-deadline`, textele anunțului și data pentru Google Calendar `20261005T160000Z`), în `assets/vot-2026-ro.ics` / `vot-2026-ru.ics` și în `afis.html`. După termen, anunțul trece singur pe „Votul s-a încheiat”, iar caseta de vot dispare de pe afiș.
- **Numere de urgență:** în `index.html` (secțiunea `#avarii`) și în `afis.html`. Verificate pe 29 septembrie 2026 pe acc.md (Apă-Canal), chisinaugaz.md, premierenergydistribution.md, termoelectrica.md și liftservice.md (lift: dispeceratul central 022 47 11 01 și serviciul de intervenție Buiucani 022 23 20 11). Iconița liftului este desenată direct în `index.html`, nu în `icons.svg`.
- **Data „Actualizat pe”:** în subsolul din `index.html` (RO și RU).
- **După ce schimbați `style.css`, `site.js`, `icons.svg` sau codurile QR:** înlocuiți peste tot `?v=20260929` cu data zilei (în `index.html`, `calculator.html`, `afis.html` și `_layouts/doc.html`). Altfel, browserele care au vizitat site-ul în ultimele 10 minute pot combina pagina nouă cu stilurile vechi și pagina apare stricată. Fișierele din `data/` se verifică la fiecare vizită și nu au nevoie de asta.

## Reguli pentru acest repo (public)

Nu adăugați nume, telefoane, numere de apartament legate de persoane sau datorii individuale.

## Publicare

Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`. Adresa este `https://apc-deleanu3.github.io/`.
