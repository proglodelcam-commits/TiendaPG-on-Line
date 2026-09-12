# PG del Campo — Tienda PWA (Cliente)

Portal público para clientes de **PG del Campo**, Jinotepe, Carazo, Nicaragua.

## Secciones

1. **Inicio** — Carrusel de anuncios/banners (lee de Firebase `anuncios/`, se actualiza en tiempo real cuando el admin cambia banners)
2. **Tienda** — Catálogo de productos, carrito, checkout con WhatsApp y LAFISE
3. **Fidelidad** — Tarjeta de fidelidad, compras acumuladas, 2% de descuento cada 10 compras
4. **Contacto/Enlaces** — WhatsApp, LAFISE, redes

> **Nota:** La tarjeta "Panel Admin" fue removida de este portal. El acceso administrativo es por el portal Admin separado.

## Sistema de Series de Recibos

- **Serie A** → Ventas desde `tienda.html` (contador `meta/contador_recibo_A`, formato `A-0000001`)
- **Serie B** → Ventas desde `fidelidad.html` (contador `meta/contador_recibo_B`, formato `B-0000001`)

Cada sección genera su propia serie de recibos con prefijo y contador independiente en Firebase.

## Despliegue en GitHub Pages

1. Crear repositorio: `pg-del-campo-cliente`
2. Subir todos los archivos de esta carpeta al repositorio
3. Ir a Settings → Pages → Source: GitHub Actions
4. Hacer push a `main` — el workflow `.github/workflows/` despliega automáticamente

### URLs resultantes

- Admin: `https://FMARTINEZ20062024.github.io/pg-del-campo-admin/`
- Cliente: `https://FMARTINEZ20062024.github.io/pg-del-campo-cliente/`

### Firebase

El proyecto usa Firebase Realtime Database: `productos-globales-campo`
Las reglas de seguridad están en `database.rules.json`.

### Instalación como PWA

Al acceder desde un navegador móvil, aparecerá el banner "Añadir a pantalla de inicio". El Service Worker cachea las páginas principales para uso offline.

---
*PG del Campo, BS"D* — Jinotepe, Carazo, Nicaragua
