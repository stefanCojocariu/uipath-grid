Componenta t-grid --------

- Intreaga logica a componentei este gestionata prin readonly #signals. Expunerea lor catre UI se face prin signals derivate asReadonly() sau computed(). Am folosit acest pattern pentru a evita orice modificarea venita din exterior asupra sursei signal-ului, SSOT, change detection nativ si performanta.

- Logica pentru paginare si sortare a fost pusa intr-un utils class cu metode statice pure. Pentru o mai buna testare si mentenanta a codului. Clasa nu este injectable pentru ca este stateless.

- Logica de sortare este inaintea paginarii pentru a mentine consistenta UX.

- Am folosit content children signal pentru a lua coloanele din template-ul parinte. Am ales sa folosesc signal-ul pentru ca simplica reactivitatea la schimbarea de coloane.

- Metodele syncData, syncPageSize sunt apelate ori de cate ori input-urile data si pageSize se schimba. Am ales effect() pentru ca simplifica reactivitatea la schimbarea de input-uri.

- Metodele onChangePage, onPageSizeChange, onSortChange sunt user interactions ce modifica signal-urile interne si signal-urile de UI se recalculeaza.

- onSortChange emite catre parinte noul sortChange si il seteaza in #currentSort signal pentru a se recalcula viewRows. Parintele primeste emisia si updateaza coloana sortata + reset la restul cu sort none.

Metode

- syncData --> se recalculeaza viewRows, totalPages, totalRows UI signals
- syncPageSize --> se recalculeaza viewRows, totalPages UI signal
- onChangePage --> se recalculeaza viewRows UI signal
- onPageSizeChange --> se recalculeaza viewRows, totalPages UI signals
- onSortChange called --> se recalculeaza viewRows UI signal

Componenta pagination --------

- Este o componenta aproape dumb, primeste date si emite catre parinte:

Methode

- onChangePage(click Prev, Next): verifica daca nextPage-ul este valid si il emite catre parinte, in caz contrar nu face nimic
- onPageSizeChange(select option): parseaza valoarea option-ului si o emite catre parinte

Componenta t-column --------

- Este un dumb component ce depinde de parinte, ea doar descrie coloana
