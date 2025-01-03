# ResevationSystem

Este es un sistema de gestión de reservas que permite a los usuarios crear, ver y gestionar reservas de espacios. La aplicación está construida con Angular y utiliza Angular Material para la interfaz de usuario.

## Características

- Crear nuevas reservas
- Ver reservas existentes en un calendario
- Filtrar reservas por espacio, usuario y rango de fechas
- Eliminar reservas
- Gestionar espacios (crear nuevos espacios)

## Requisitos

- Node.js (versión 12 o superior)
- Angular CLI (versión 12 o superior)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/sistema-de-gestion-de-reservas.git
   cd sistema-de-gestion-de-reservas
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso y despliegue

1. Inicia el servidor de desarrollo:

```bash
ng serve
```

2. Abre tu navegador y navega a `http://localhost:4200/`



## Estructura del Proyecto

Componentes Principales
ReservationsComponent
Este componente muestra una lista de reservas y permite crear nuevas reservas.

ManageSpacesComponent
Este componente permite gestionar los espacios, incluyendo la creación de nuevos espacios.

CalendarComponent
Este componente muestra las reservas en un calendario y permite filtrar las reservas por espacio, usuario y rango de fechas.

Casos de Uso
CreateReservationUseCase
Este caso de uso maneja la lógica para crear nuevas reservas.

CreateSpaceUseCase
Este caso de uso maneja la lógica para crear nuevos espacios.

Servicios
ReservationRepository
Este servicio maneja las operaciones CRUD para las reservas.

SpaceRepository
Este servicio maneja las operaciones CRUD para los espacios.

## Building

Para construir elproyecto

```bash
ng build
```

## Ejecutar pruebas unitarias

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

## Decisiones Arquitectónicas

Modularización
La aplicación está dividida en módulos para mejorar la organización y la mantenibilidad del código. Cada módulo representa una característica principal de la aplicación, como reservations y spaces.


Uso de Casos de Uso
Se utilizan casos de uso (use-cases) para encapsular la lógica de negocio. Esto permite separar la lógica de negocio de los componentes de presentación y facilita la reutilización y las pruebas unitarias.


Repositorios
Los repositorios (repositories) se encargan de las operaciones CRUD y la comunicación con la API. Esto permite centralizar la lógica de acceso a datos y facilita el cambio de la fuente de datos si es necesario.


Componentes de Presentación
Los componentes de presentación (presentation) se encargan de la interfaz de usuario y la interacción con el usuario. Se dividen en pages y components para una mejor organización.

