# apc.deleanu3

Site-ul public al asociației de proprietari **A.P.C. A0120-0351** (str. Liviu Deleanu 3, Chișinău), publicat cu GitHub Pages.

| Fișier | Ce este |
|---|---|
| `index.html` | Pagina blocului: anunțuri, canalele Viber (cu coduri QR), cotizația lunară, documente, contacte. RO/RU. |
| `calculator.html` | Calculatorul reparațiilor: costul lucrărilor împărțit pe apartamente după suprafață (tot blocul sau o singură scară). |
| `data/apartamente.csv` | Apartament, scară, suprafață (m²). **Acum: date de exemplu** (220 ap., 12.745 m²). |
| `data/reparatii.json` | Lista oficială a lucrărilor planificate (goală până la aprobare). |
| `documente/` | Versiuni publice, fără date personale: Statut, Regulament, Buget 2026, ordinea de zi a Adunării Generale. |

## Actualizări

- **Suprafețe reale:** înlocuiți `data/apartamente.csv` (aceleași coloane), apoi în `data/reparatii.json` puneți `"apartamente_exemplu": false`.
- **Lucrări:** adăugați în `data/reparatii.json`, de exemplu:
  ```json
  { "denumire": "Hidroizolarea acoperișului", "scara": 0, "cost_lei": 250000 }
  ```
  `scara: 0` = tot blocul; `1`–`6` = doar scara respectivă.

## Reguli pentru acest repo (public)

Nu adăugați nume, telefoane, numere de apartament legate de persoane sau datorii individuale.

## Publicare

Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`. Adresa va fi `https://apc-deleanu3.github.io/`.
