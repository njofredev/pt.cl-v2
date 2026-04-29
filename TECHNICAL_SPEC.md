# Especificaciones Técnicas - Nueva Web Policlínico Tabancura 🏥

Este documento resume la base tecnológica, capacidades y limitaciones del proyecto de la nueva web.

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (Type-safe development)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/ui](https://ui.shadcn.com/) (Componentes premium y consistentes)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/) (Micro-interacciones y transiciones fluidas)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Backend de Integración**: [FastAPI](https://fastapi.tiangolo.com/) (Cerebro API)
- **Despliegue**: [Coolify](https://coolify.io/) (Autogestionado en Ubuntu Server)

---

## ✅ Lo que PODEMOS hacer

1.  **Interfaz Premium y Rápida**: Gracias a Next.js y Server Components, la web será extremadamente rápida y con un SEO optimizado.
2.  **Filtros Inteligentes**: Implementar buscadores y filtros avanzados para profesionales y servicios (objetivo actual).
3.  **Integración de Datos**: Conectar con Dentalink y Medilink a través de la Cerebro API para mostrar información en tiempo real (disponibilidad, presupuestos).
4.  **Diseño Responsivo Total**: La web se verá perfecta en móviles, tablets y escritorio.
5.  **Accesibilidad**: Cumplimiento de estándares para que personas con discapacidades puedan navegar sin problemas.
6.  **Dashboard de Paciente**: Crear áreas privadas para que los pacientes vean sus citas y documentos.

## ❌ Lo que NO podemos hacer (o requiere precauciones)

1.  **Modificar Datos de Terceros Directamente**: No podemos alterar la lógica interna de Dentalink o Medilink sin pasar por sus respectivas APIs y validaciones.
2.  **Notificaciones Push Nativas**: Al ser una web (no app nativa), las notificaciones push requieren que el usuario acepte permisos de navegador (PWA).
3.  **Soporte a Navegadores Obsoletos**: No daremos soporte a Internet Explorer o versiones muy antiguas de navegadores para no comprometer la seguridad y el rendimiento.
4.  **Almacenamiento de Fichas Médicas Sensibles en el Frontend**: Por seguridad y cumplimiento (HIPAA/Ley de Derechos y Deberes), la información sensible solo se procesa en tránsito o en backend seguro, nunca queda expuesta en el código cliente.

---

## 🎯 Próximo Hito: Navegación y Mapa del Sitio

Inspirado en estructuras institucionales robustas (como Policlínico El Salto), implementaremos una arquitectura de información clara y accesible:

### Arquitectura de Navegación (Navbar & Footer)

1.  **Inicio (Home)**
2.  **Nosotros**
    - Quiénes Somos
    - Misión y Visión
    - Equipo Médico (Buscador integrado)
3.  **Servicios Médicos**
    - Salud Dental
    - Salud Mental
    - Medicina General
    - Terapias Alternativas
4.  **Gestión Digital (Cerebro API)**
    - Presupuestos Online
    - Resultados de Exámenes
5.  **Contacto y Sedes**

---

## 🎨 Identidad Visual
- **Colores**: Azul Policlínico (#2563eb), Blanco Puro, Slate Grays para textos.
- **Componentes**: Menús desplegables (Dropdowns) para navegación profunda sin saturar el header.
- **Footer**: Mapa del sitio detallado para mejorar el SEO y la usabilidad.

