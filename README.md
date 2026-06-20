# LA CAPITAL RP — Sitio Web Oficial

Sitio web para el servidor de roleplay **LA CAPITAL RP**.  
Tecnologías: HTML5 · CSS3 · JavaScript vanilla (sin dependencias).

---

## 📁 Estructura de archivos

```
lacapitalrp/
├── index.html        ← Estructura principal de la página
├── styles.css        ← Todos los estilos y colores
├── script.js         ← Animaciones e interactividad
├── README.md         ← Esta guía
└── img/
    ├── logo.png           ← Logo para la navbar (reemplazar)
    ├── logo-main.png      ← Logo grande del hero (reemplazar)
    ├── favicon.ico        ← Favicon del navegador (reemplazar)
    └── staff/
        ├── owner.png      ← Foto del Owner
        ├── coowner1.png   ← Fotos de Co-Owners
        └── junta1.png     ← Fotos de Junta Directiva
```

---

## 🎨 Cambiar colores

Abre `styles.css` y edita el bloque `:root` al principio del archivo:

```css
:root {
  --bg:          #080010;   /* Fondo principal — oscuro morado */
  --accent:      #9B30FF;   /* Color morado principal */
  --accent-lite: #C084FC;   /* Morado claro (textos secundarios) */
  --white:       #F0F0F0;   /* Color de texto blanco */
}
```

---

## 🖼️ Añadir el logo

### En la navbar:
Busca en `index.html`:
```html
<!-- LOGO: reemplaza por <img src="img/logo.png" ... -->
LA <span>CAPITAL</span> RP
```
Reemplaza con:
```html
<img src="img/logo.png" alt="LA CAPITAL RP" class="nav-logo-img" />
```

### En el hero (logo grande):
Busca el bloque `.hero-logo-text` y reemplaza con:
```html
<img src="img/logo-main.png" alt="LA CAPITAL RP" class="hero-logo-img" />
```

---

## 👥 Editar el Staff

En `index.html`, busca la sección `id="staff"`.

### Cambiar nombre y cargo:
```html
<h3 class="staff-name">NOMBRE OWNER</h3>          <!-- Cambia el nombre -->
<span class="staff-badge owner-role">Owner</span>  <!-- Cambia el cargo -->
<p class="staff-desc">Fundador del proyecto.</p>   <!-- Descripción -->
```

### Añadir foto:
Reemplaza el bloque `<div class="avatar-ph">?</div>` con:
```html
<img src="img/staff/tunombre.png" alt="Tu Nombre" />
```

### Añadir un miembro más a la Junta:
Copia un bloque `<div class="staff-card junta-card">...</div>` completo
y pégalo dentro del `<div class="staff-row">` de la Junta Directiva.

### Añadir un nuevo tier (Admin, Moderador, etc.):
Copia el bloque completo:
```html
<div class="staff-tier">
  <div class="tier-badge junta-badge">⚜️ ADMIN</div>
  <div class="staff-row">
    ...tarjetas...
  </div>
</div>
```

---

## 🔗 Cambiar links de Discord y Redes

Busca en `index.html` y reemplaza `TU-LINK-AQUI` y `TU-USUARIO`:

| Qué cambiar | Buscar en HTML |
|---|---|
| Link Discord | `https://discord.gg/TU-LINK-AQUI` |
| TikTok | `https://tiktok.com/@TU-USUARIO` |
| Instagram | `https://instagram.com/TU-USUARIO` |
| YouTube | Descomenta el bloque comentado |

---

## 🎮 Código de conexión al servidor

El código actual es **LACAPIRP**.  
Para cambiarlo, actualiza en **dos lugares**:

1. En `index.html` busca: `<span class="connect-code" id="serverCode">LACAPIRP</span>`
2. En `script.js` busca: `const code = ... || 'LACAPIRP'`

---

## 📊 Estadísticas del hero

En `index.html`, busca el bloque `.hero-stats`:
```html
<span class="hstat-n" data-target="500">0</span>  <!-- Cambia 500 -->
<span class="hstat-n" data-target="20">0</span>   <!-- Cambia 20 -->
```
El número animará desde 0 hasta el valor de `data-target` al cargar.

---

## 🌍 Ubicación / Países

Busca `.loc-tags` en `index.html` (hay dos: en Nosotros y en Comunidad):
```html
<span class="loc-tag">🇨🇴 Colombia</span>   <!-- Agrega o quita países -->
<span class="loc-tag">🇲🇽 México</span>
```

---

## ✨ Animaciones (script.js)

| Animación | Cómo editar |
|---|---|
| Partículas | Cambia `PARTICLE_COUNT` (default: 80) |
| Líneas entre partículas | Cambia `MAX_DIST` (default: 130px) |
| Contador de stats | `duration: 1800` ms |
| Scroll reveal delay | `data-delay` automático (100ms entre tarjetas) |
| Glitch del logo | Interval de 5 segundos, editable al final de script.js |

---

## 🚀 Cómo publicar

### Opción A — GitHub Pages (gratis)
1. Sube los archivos a un repositorio en GitHub
2. Ve a Settings → Pages → Branch: main → /root
3. Tu sitio estará en `https://tuusuario.github.io/lacapitalrp`

### Opción B — Netlify (gratis, dominio personalizado)
1. Arrastra la carpeta completa a [netlify.com/drop](https://netlify.com/drop)
2. Listo — te dan un link inmediatamente

### Opción C — Servidor propio
Sube los archivos a la carpeta `public_html` o `www` de tu hosting.

---

## ✏️ Checklist de personalización

- [ ] Logo en navbar reemplazado
- [ ] Logo principal del hero reemplazado  
- [ ] Nombre del Owner añadido
- [ ] Fotos del Staff añadidas
- [ ] Link de Discord actualizado
- [ ] Usuario de TikTok actualizado
- [ ] Usuario de Instagram actualizado
- [ ] Países/región de ubicación correctos
- [ ] Estadísticas del hero actualizadas
- [ ] Código del servidor verificado (LACAPIRP)
- [ ] Copyright del footer con año correcto

---

**LA CAPITAL RP** — Creado con dedicación para la comunidad.
