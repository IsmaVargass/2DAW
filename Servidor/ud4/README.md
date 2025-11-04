# UD4 - Actividad 6: Gestor de Usuarios Seguros

## Estructura
- `actividad6/`
  - `assets/styles.css` — estilos.
  - `init.php` — configuración común, conexión PDO, funciones helper, CSRF.
  - `header.php`, `footer.php` — fragmentos UI.
  - `index.php` — redirección.
  - `register.php` — registro de usuarios.
  - `login.php` — inicio de sesión.
  - `logout.php` — cierre de sesión.
  - `usuarios_lista.php` — listado protegido.
  - `editar_usuario.php` — editar usuario.
  - `eliminar_usuario.php` — eliminar usuario.
  - `README.md` — documentación.

## Medidas de seguridad aplicadas
1. **Conexión segura con PDO** — todas las consultas usan `PDO` con `PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION`.
2. **Consultas preparadas** — `prepare()` y parámetros nombrados para evitar inyección SQL.
3. **Hashing de contraseñas** — `password_hash()` al registrar o cambiar contraseña; `password_verify()` en login.
4. **Protección de páginas privadas** — `require_login()` en `init.php` y comprobación de `$_SESSION['user_id']`.
5. **Regeneración de sesión** — `session_regenerate_id(true)` al iniciar sesión para mitigar fixation.
6. **CSRF básico** — token en formularios (`csrf_token()` / `csrf_check()`).
7. **Validación y sanitización** — `filter_var()` para emails, comprobaciones de longitud; `e()` (htmlspecialchars) para salida.
8. **Prevención de eliminación accidental** — confirmación en cliente y no permitir eliminar la propia cuenta desde la lista.
9. **Buenas prácticas de UI** — mensajes claros, validación server-side, formularios con valores "sticky".

## Notas de despliegue
- Esta app está pensada para **entorno local (XAMPP)**. En producción es obligatorio usar HTTPS y configurar cabeceras de seguridad adicionales (CSP, HSTS, cookies `Secure`/`HttpOnly`).
- Asegúrate de tener creada la tabla `usuarios` en la base de datos `empresa`:
  ```sql
  CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  );
