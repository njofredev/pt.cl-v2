# Requerimientos Técnicos y Arquitectura del Proyecto

Este documento responde de forma detallada a los requerimientos técnicos y preguntas sobre la arquitectura del sitio web de *Policlínico Tabancura*, estructurado para ser integrado directamente en la documentación oficial.

---

## 1. Tecnología Utilizada

### CMS o Framework Utilizado

**Framework Principal:** [Next.js](https://nextjs.org/) (Versión 16+), un framework de React de última generación que permite renderizado híbrido (SSR - Server Side Rendering, y SSG - Static Site Generation) para maximizar la velocidad de carga, interactividad y optimización SEO.

**Librería de UI:** [React](https://react.dev/) (Versión 19).

**Gestor de Base de Datos y ORM:** [Prisma ORM](https://www.prisma.io/), utilizado como intermediario entre la aplicación y la base de datos para consultas seguras, optimizadas y tipadas.

### Lenguaje de Programación

* **TypeScript:** Una extensión superconjunto de JavaScript de tipado fuerte que proporciona robustez al código, autocompletado inteligente y prevención activa de errores en tiempo de compilación.

### Estilos y Diseño

* **Tailwind CSS v4:** Motor de estilos utilitarios ultrarrápido utilizado para el diseño responsivo, temas dinámicos (Modo Oscuro/Claro) y transiciones fluidas.
* **Framer Motion:** Librería para micro-animaciones premium e interacciones visuales dinámicas.
* **Lucide React:** Set de iconos vectoriales modernos y consistentes.

### Base de Datos

* **PostgreSQL:** Sistema de base de datos relacional robusto, altamente escalable y seguro. Se conecta mediante Prisma ORM para administrar datos sensibles como profesionales, especialidades, y aranceles/convenios.

### Hosting y Servidor

* **Hosting Recomendado / Utilizado:** Usualmente este stack de Next.js se despliega en *Vercel* (la plataforma creadora de Next.js, óptima para Serverless y Edge Functions) o servidores VPS administrados (como AWS, DigitalOcean o Heroku) con Node.js en producción.
* **Base de Datos Hosting:** Servicios administrados de PostgreSQL como Supabase, AWS RDS, Neon Postgres o Render.

### Dominio

* Administrado y apuntado mediante registros *A* y *CNAME* a los servidores DNS de la plataforma de hosting (ej. Vercel / Cloudflare).

### Plugins y Dependencias Clave (Sin usar CMS tradicionales como WordPress)

No utiliza plugins de CMS convencionales, sino paquetes de código NPM de alto rendimiento para evitar vulnerabilidades de seguridad:

* `@prisma/client` (Acceso a base de datos).
* `radix-ui/react-dialog` & `radix-ui/react-slot` (Componentes accesibles y semánticos).
* `sharp` (Compresor y optimizador inteligente de imágenes al vuelo).

### Integraciones Externas

1. **I-Med:** Integración en los módulos de recepción física a través de lectores de huella dactilar para validación de copagos de Fonasa e Isapres en tiempo real.
2. **Dentalink / Medilink:** Conexión con los sistemas de gestión clínica e importación/sincronización de aranceles médicos y dentales.
3. **Validador Tarjeta Mi Vita:** Integración mediante iframe adaptativo de alta seguridad conectado a `https://mivita.policlinicotabancura.cl/` para validación directa de residencia en Vitacura.
4. **Google Reviews:** Módulo dinámico conectado para renderizar valoraciones y opiniones reales de pacientes.

---

## 2. Paleta de Colores y Tipografía (Identidad Visual)

### Colores Corporativos (Paleta Premium)

La aplicación utiliza una paleta institucional optimizada para legibilidad y accesibilidad (contraste mínimo superior a 4.5:1 según estándares WCAG):

* **Color Primario (Azul Oscuro Institucional):** `#162158` (o color primario equivalente)
  * *Uso:* Títulos, botones principales, headers y elementos estructurales clave tanto en modo claro como oscuro.
* **Color Secundario (Turquesa Dinámico):**
  * *Modo Claro:* `#227262` (Turquesa oscuro de alto contraste optimizado para ser perfectamente legible sobre fondos claros).
  * *Modo Oscuro:* `#31c4a4` (Turquesa brillante y luminoso que resalta perfectamente sobre fondos oscuros).
  * *Uso:* Botones de acción complementarios, badges, resaltados de texto y decoraciones dinámicas.
* **Fondo Claro (Gris Clínico Limpio Premium):** `#F8FAFC` (registrado como `--color-clinical-bg`)
  * *Uso:* Fondo general de la web en modo claro (equivalente a Slate 50), brindando una estética médica sumamente premium, pulcra y libre de tonos amarillos.
* **Fondo Oscuro (Azul Profundo / Slate 950):** `#020617` (o el equivalente de Tailwind Slate 950)
  * *Uso:* Fondo general de la web en modo oscuro para reducir la fatiga visual.

### Fuentes Utilizadas (Tipografía)

* **Tipografía Principal (SANS):** *Plus Jakarta Sans*
  * *Carga Optimizada por Next.js:* La fuente se carga mediante el módulo optimizado nativo `next/font/google` (`Plus_Jakarta_Sans`) importado en el diseño raíz de la aplicación. Esto asegura que la tipografía se auto-hospede en el propio servidor del proyecto, evitando peticiones externas adicionales y eliminando por completo los problemas de parpadeo o cambios bruscos en el diseño (Cumulative Layout Shift - CLS).
  * *Configuración de Carga:*
    * **Subsets:** `["latin"]` (Optimiza el peso de descarga al incluir únicamente los caracteres requeridos).
    * **Display:** `"swap"` (Usa una fuente del sistema de manera instantánea si es necesario, mientras se carga la definitiva en segundo plano).
  * **Variable CSS:** `--font-plus-jakarta-sans`
  * **Fallbacks del Sistema:** `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`.

---

## 3. Arquitectura del Proyecto

### Cómo está Organizada la Web

La aplicación sigue la arquitectura estándar de *Next.js App Router*, donde las rutas están definidas por la estructura de carpetas y los archivos `page.tsx` dentro de `src/app/`.

### Carpetas y Componentes Principales

```bash
pt.cl-v2/
├── prisma/                 # Esquemas de base de datos y migraciones (schema.prisma)
├── public/                 # Archivos estáticos (Logos de convenios, imágenes de sucursales, etc.)
└── src/
    ├── app/                # Rutas y páginas de la aplicación (App Router)
    │   ├── (public)/       # Grupo de rutas públicas (Home, Convenios, Nosotros, etc.)
    │   ├── globals.css     # Estilos globales y variables de tema (Tailwind CSS)
    │   └── layout.tsx      # Estructura e inyección HTML base (Header, Navbar, Footer)
    ├── components/         # Componentes React reutilizables (Hero, Carouseles, Calendario)
    │   └── ui/             # Componentes base atómicos de interfaz (Botones, diálogos)
    └── data/               # Archivos estáticos y lógica de obtención de datos (Profesionales)
```

### Ubicación de los Archivos Principales

* **Página de Convenios:** `src/app/(public)/convenios/page.tsx`
* **Página de Inicio (Home):** `src/app/(public)/page.tsx`
* **Base de datos (Esquema):** `prisma/schema.prisma`
* **Estilos Globales:** `src/app/globals.css`
* **Componente Hero:** `src/components/Hero.tsx`

---

## 4. Operación y Mantenimiento

### Qué Partes son Editables por el Equipo (Sin tocar código)

* **Información de Base de Datos:** A través del panel administrativo que interactúa con la base de datos (PostgreSQL), el equipo puede actualizar y publicar datos de:
  * Profesionales (Nombres, especialidades, sucursales, fotos).
  * Aranceles médicos y dentales de Dentalink/Medilink.
* **Archivos Estáticos en el Repositorio:** El equipo puede reemplazar imágenes, logos de convenios o PDFs directamente en la carpeta `/public/` con nombres de archivo idénticos para actualizar el contenido multimedia.

### Qué Partes Requieren Intervención Técnica (Requiere desarrollador)

* Modificaciones estructurales en el diseño y maquetación de componentes.
* Creación de nuevas páginas o cambio en las rutas dinámicas.
* Modificación del esquema de base de datos (`schema.prisma`) o adición de nuevos campos de datos.
* Configuración de nuevas integraciones externas basadas en APIs.

### Cómo se Hacen Respaldos (Backups)

1. **Código Fuente:** Respaldado de forma automática e histórica en el repositorio de *GitHub* (`https://github.com/njofredev/pt.cl-v2`) con control de versiones Git.
2. **Base de Datos (PostgreSQL):** Se configuran respaldos automáticos diarios (o por bloques de horas) programados directamente en el proveedor cloud de base de datos (ej. Supabase backups, AWS RDS Snapshots), que permiten retornar a cualquier punto del tiempo (Point-in-Time Recovery).

### Cómo se Recupera la Web si Algo Falla

1. **Fallo en el Código o Despliegue:** Al utilizar plataformas modernas con despliegue Git (como Vercel/Netlify), si una actualización genera un error en producción, el desarrollador puede hacer un *Rollback instantáneo (de 1 clic)* en el panel de control a la última versión estable anterior.
2. **Fallo de Base de Datos:** Restaurando la última copia de seguridad automática o snapshot directamente desde el panel del proveedor de hosting de base de datos.
3. **Control Local de Errores:** Next.js provee componentes `error.tsx` para capturar fallos inesperados de forma controlada y mostrar al usuario una interfaz amigable en lugar de una pantalla en blanco.

---

## 5. Medición, Analítica y Eventos de Conversión

El sitio web cuenta con una arquitectura de medición y analítica avanzada e interactiva (sin CMS ni plugins pesados de terceros) diseñada para recopilar datos de conversión de manera ágil y 100% compatible con Serverless.

### Herramientas Integradas de Medición
1. **Google Analytics 4 (GA4):** Medición de audiencias, comportamiento en el sitio y eventos dinámicos.
2. **Google Tag Manager (GTM):** Contenedor de etiquetas centralizado para administración ágil de tags.
3. **Meta Pixel (Facebook Pixel):** Trackeo de conversiones y audiencias personalizadas para campañas de marketing en Meta Ads.

### Estructura de la Solución (3 Capas)
* **Cargador Asíncrono de Scripts (`src/components/AnalyticsScripts.tsx`):** Inyecta de forma asíncrona y no bloqueante los scripts base de GA4, GTM y Meta Pixel. Además, monitoriza de forma automatizada las vistas de página (`PageView`) al navegar de forma virtual en Next.js.
* **Capa Intermedia Tipada (`src/lib/analytics.ts`):** Centraliza la lógica en una única función segura en TypeScript (`trackEvent`). Esta utilidad despacha los eventos a todas las plataformas en paralelo y los mapea a los eventos estándar requeridos por Meta Ads (ej. `InitiateCheckout`, `Lead`, `Purchase`).
* **Instrumentación en Componentes:** Todos los llamados a eventos de conversión se asocian de forma nativa a los manejadores de clics de los botones de la interfaz.

### Eventos de Conversión Instrumentados
El sistema recopila automáticamente los siguientes **10 eventos de conversión clave**:

| Evento | Qué mide | Disparador en el Código |
| :--- | :--- | :--- |
| `click_reservar_hora` | Clic en botones de reserva de horas | Botones de reserva del Navbar, del Hero principal y de las secciones de especialidades. |
| `click_whatsapp` | Clic en canales de WhatsApp | Widget flotante acordeón de WhatsApp (`WhatsAppFab`) y enlaces del footer. |
| `form_contacto_enviado` | Envío exitoso de formulario de Alianzas | Al completarse la petición de envío del formulario corporativo. |
| `click_llamar` | Clic en los números telefónicos directos | Enlaces de marcación telefónica (`tel:`) del top bar del Navbar y del Footer. |
| `click_mapa` | Clic en enlaces de direcciones físicas (Maps) | Enlaces e iconos de ubicación de las sedes (Vitacura y Tribunales) en barra superior y Footer. |
| `view_especialidad` | Visualización de páginas de especialidades | Al acceder a las vistas específicas de dental, mental, medicina y terapias. |
| `click_promocion` | Interacción con la barra de promoción (Sticky Bar) | Botón "Agendar" de la barra superior de promoción (limpieza dental). |
| `click_convenio` | Clic en convenios del Policlínico | Botón de "Ver más" de la tarjeta de convenio del vecino (**Tarjeta Mi Vita**). |
| `reserva_iniciada` | Inicio real del flujo de reserva del paciente | Al presionar el botón principal del Hero o Navbar para desplegar el selector de reserva. |
| `reserva_completada` | Confirmación de reserva exitosa | Integrado y preparado al completarse la confirmación de agenda. |

### Configuración en Producción (Variables de Entorno)
Para la correcta puesta en marcha del sitio web en producción y la activación de todos los servicios, integraciones y herramientas de analítica, se deben configurar las siguientes variables de entorno en el servidor de hosting (ej. Vercel) o en el archivo `.env.local` de producción:

#### Variables de Analítica y Marketing
* `NEXT_PUBLIC_GA_ID`: ID de medición de Google Analytics 4 (ej. `G-XXXXXXXXXX`).
* `NEXT_PUBLIC_GTM_ID`: ID de Google Tag Manager (ej. `GTM-XXXXXXX`).
* `NEXT_PUBLIC_PIXEL_ID`: ID de Meta Pixel (ej. `123456789012345`).

#### Variables de Sistema y Base de Datos
* `DATABASE_URL`: URI de conexión a la base de datos PostgreSQL (utilizada por Prisma ORM para gestionar y sincronizar profesionales, aranceles y convenios).
* `ADMIN_PASSWORD`: Contraseña administrativa del sistema para resguardar el acceso a los paneles privados del sitio web.

### Validación Técnica (Pruebas Locales)
En el entorno local de desarrollo (`npm run dev`), el sistema está diseñado para actuar de forma "silenciosa" (evitando peticiones externas innecesarias si las variables no existen) e **imprimir un log sumamente legible directamente en la Consola del Navegador** cada vez que el usuario realiza una acción medida:
```js
[Analytics Event] 📊 Disparado: "click_whatsapp" { label: "WhatsApp Vitacura" }
[Analytics Event] 📊 Disparado: "click_reservar_hora" { label: "Boton Principal Hero" }
```

