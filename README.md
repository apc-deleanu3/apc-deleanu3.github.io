# apc.deleanu3

Site-ul public al asociației de proprietari **A.P.C. A0120-0351** (str. Liviu Deleanu 3, Chișinău), publicat cu GitHub Pages.

| Fișier | Ce este |
|---|---|
| `index.html` | Pagina blocului: anunțuri, canalele Viber (cu coduri QR), cotizația lunară, documente, contacte. RO/RU. |
| `calculator.html` | Calculatorul reparațiilor: costul lucrărilor împărțit pe apartamente după suprafață (tot blocul sau o singură scară). |
| `data/apartamente.csv` | Apartament, scară, suprafață (m²) din registrul cadastral: 222 de apartamente, 12.779,5 m². Scara e dedusă din numerotare (câte 36 de numere pe scară). |
| `data/reparatii.json` | Lista oficială a lucrărilor planificate (goală până la aprobare). |
| `documente/` | Versiuni publice, fără date personale: Statut, Regulament, Buget 2026, ordinea de zi a Adunării Generale. |

## Actualizări

- **Suprafețe:** actualizați `data/apartamente.csv` (aceleași coloane). Numerele cu literă (ex. `24a`) sunt apartamente separate.
- **Lucrări:** adăugați în `data/reparatii.json`, de exemplu:
  ```json
  { "denumire": "Hidroizolarea acoperișului", "scara": 0, "cost_lei": 250000 }
  ```
  `scara: 0` = tot blocul; `1`–`6` = doar scara respectivă.

## Reguli pentru acest repo (public)

Nu adăugați nume, telefoane, numere de apartament legate de persoane sau datorii individuale.

## Publicare

Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`. Adresa va fi `https://apc-deleanu3.github.io/`.
