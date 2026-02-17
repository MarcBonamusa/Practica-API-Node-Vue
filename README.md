# Practica API Node-Vue
## Arquitectura
**Frontend (SPA):** Vue 3 + Vite + Vue Router.

**Backend (API):** Node.js + Express.

**Seguretat:** Autenticació via JWT emmagatzemat en cookies.

## Endpoints API
### Autenticació
**POST /login & /register:** Gestió d'usuaris i emissió de cookie.

**POST /logout:** Tanca sessió (esborra cookie).

**GET /protected:** Valida l'estat de la sessió (ús intern del Router).

### Recurs: Golejadors
**GET /golejadors:** Llista tots els jugadors.

**POST /golejadors:** Crea un nou jugador (Protegit).

**PUT /golejadors/:id:** Edita un jugador (Protegit).

**DELETE /golejadors/:id:** Elimina un jugador (Protegit).

## Flux d'Autenticació
**Login:** El servidor valida credencials i retorna un JWT dins d'una cookie segura.

**Navegació:** Vue Router consulta /protected abans de carregar vistes privades.

**Peticions:** El frontend utilitza credentials: 'include' en cada fetch per enviar la cookie automàticament.

**Validació:** El middleware del backend verifica el token abans de donar accés a les dades.
