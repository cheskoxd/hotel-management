# Manual de Usuario

## Navegacion
- Para [Usuarios](#introducción)
- Para [Desarrolladores](#documentación-para-desarrollo)

## Introducción
Bienvenido al Sistema de Gestión de Hotel. Esta aplicación permite administrar el check-in y check-out de huéspedes, gestionar la disponibilidad de habitaciones y registrar nuevos huéspedes.

---

## Acceso al Sistema
1. **Abrir la aplicación**: Accede a la [URL](https://hotel.chesko.dev/).
2. **Pantalla principal**: Al ingresar, será dirigido al panel de administración.

---

## Funcionalidades Principales

### 1. Crear Huésped
Para registrar un nuevo huésped:
1. Navegue a la pestaña **"Create Guest"**.
2. Ingrese el **nombre del huésped**.
3. Haga clic en **"Create Guest"**.
4. El huésped se añadirá al sistema y podrá realizar check-in.

---

### 2. Check-in y Check-out
#### **Check-in**
1. Acceda a la pestaña **"Check-in/Check-out"**.
2. Seleccione el **huésped** en el primer desplegable.
3. Seleccione la **habitación** en el segundo desplegable.
4. Haga clic en **"Check-in"**.
5. El huésped será registrado en la habitación.

#### **Check-out**
1. En la pestaña **"Check-in/Check-out"**, seleccione la **habitación** donde se encuentra el huésped.
2. Haga clic en **"Check-out"**.
3. La habitación quedará disponible para nuevos huéspedes.

---

### 3. Ver Disponibilidad de Habitaciones
1. Acceda a la pestaña **"Room Availability"**.
2. Se mostrará una lista de habitaciones con su estado:
   - **Verde**: Disponible.
   - **Rojo**: Ocupada.
3. Haga clic en una habitación para ver detalles.

---

## Consideraciones
- Un huésped solo puede registrarse en una habitación a la vez.
- No se puede hacer check-in en una habitación ocupada.
- No se puede hacer check-out si la habitación ya está vacía.


---

## **Documentación para Desarrollores**  

### **1. Descripción General**  
Este proyecto es un **Sistema de Gestión Hotelera** desarrollado con **React**, **TypeScript**, **Tailwind CSS** y **PocketBase** como backend. Ofrece funcionalidades para gestionar huéspedes, habitaciones, registros de entrada (check-in) y salida (check-out).  

---

### **2. Estructura del Directorio**  
El proyecto sigue una estructura modular. A continuación, se muestra el árbol de directorios con explicaciones:  

```
└── ./
    ├── src
    │   ├── components
    │   │   ├── ui
    │   │   │   ├── badge.tsx
    │   │   │   ├── button.tsx
    │   │   │   ├── dialog.tsx
    │   │   │   ├── input.tsx
    │   │   │   ├── label.tsx
    │   │   │   ├── select.tsx
    │   │   │   ├── separator.tsx
    │   │   │   ├── table.tsx
    │   │   │   └── tabs.tsx
    │   │   ├── check-in-out.tsx
    │   │   ├── create-guest.tsx
    │   │   └── room-availability.tsx
    │   ├── db
    │   │   └── db.ts
    │   ├── lib
    │   │   ├── data.ts
    │   │   └── utils.ts
    │   ├── pages
    │   │   ├── Admin.tsx
    │   │   └── Login.tsx
    │   ├── App.css
    │   ├── index.css
    │   ├── main.tsx
    │   ├── Router.tsx
    │   └── vite-env.d.ts
    ├── index.html
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.ts
```  

---

### **3. Archivos Clave y su Funcionalidad**  

#### **3.1. Componentes**  
- **`/src/components/ui/`**: Contiene componentes reutilizables de UI creados con **Radix UI** y **Tailwind CSS**.  
  - **`badge.tsx`**: Componente de insignia personalizable.  
  - **`button.tsx`**: Botón con múltiples variantes (predeterminado, destructivo, contorno, etc.).  
  - **`dialog.tsx`**: Componente de cuadro de diálogo modal.  
  - **`input.tsx`**: Campo de entrada estilizado.  
  - **`label.tsx`**: Etiqueta para formularios.  
  - **`select.tsx`**: Componente de selección desplegable.  
  - **`separator.tsx`**: Separador horizontal o vertical.  
  - **`table.tsx`**: Tabla con encabezados, filas y celdas.  
  - **`tabs.tsx`**: Componente de navegación con pestañas.  

- **`check-in-out.tsx`**: Maneja el proceso de check-in y check-out de los huéspedes.  
- **`create-guest.tsx`**: Permite la creación de nuevos huéspedes.  
- **`room-availability.tsx`**: Muestra la disponibilidad y detalles de las habitaciones.  

#### **3.2. Base de Datos y API**  
- **`/src/db/db.ts`**: Contiene la configuración de PocketBase y funciones para interactuar con la base de datos:  
  - `createGuest`: Crea un nuevo huésped.  
  - `getRooms`: Obtiene todas las habitaciones.  
  - `getGuests`: Obtiene todos los huéspedes.  
  - `checkIn`: Maneja el registro de entrada de huéspedes.  
  - `checkOut`: Maneja el registro de salida de huéspedes.  

#### **3.3. Páginas**  
- **`Admin.tsx`**: Panel de administración con pestañas para gestionar huéspedes, habitaciones y check-ins/check-outs.  

#### **3.4. Utilidades**  
- **`/src/lib/utils.ts`**: Funciones de utilidad, incluyendo `cn` para combinar clases de Tailwind CSS.  
- **`/src/lib/data.ts`**: Definiciones de tipos para huéspedes, habitaciones e interfaces relacionadas.  

#### **3.5. Estilos**  
- **`/src/App.css`**: Estilos CSS globales.  
- **`/src/index.css`**: Estilos base de Tailwind CSS y temas personalizados.  
- **`tailwind.config.js`**: Configuración de Tailwind CSS con temas y colores personalizados.  

#### **3.6. Configuración**  
- **`vite.config.ts`**: Configuración de Vite con alias de rutas.  
- **`postcss.config.js`**: Configuración de PostCSS para Tailwind CSS.  
- **`index.html`**: Punto de entrada de la aplicación.  

---

### **4. Funcionalidades Clave**  
1. **Gestión de Huéspedes**:  
   - Crear nuevos huéspedes.  
   - Ver detalles de huéspedes.  

2. **Gestión de Habitaciones**:  
   - Consultar disponibilidad de habitaciones.  
   - Registrar huéspedes en habitaciones y gestionar check-ins/check-outs.  

3. **Actualización en Tiempo Real**:  
   - Uso de suscripciones en PocketBase para actualizar el estado de las habitaciones dinámicamente.  

4. **Interfaz Responsiva**:  
   - Construida con Tailwind CSS para una mejor experiencia en todos los dispositivos.  

---

### **5. Cómo Ejecutar el Proyecto**  
1. **Requisitos Previos**:  
   - Tener instalado Node.js y npm.  
   - Ejecutar el servidor de PocketBase (actualizar la URL en `db.ts` si es necesario).  

2. **Pasos**:  
   - Clonar el repositorio.  
   - Ejecutar `npm install` para instalar las dependencias.  
   - Ejecutar `npm run dev` para iniciar el servidor de desarrollo.  
   - Acceder a la aplicación en `http://localhost:5173`.  

---

### **6. Ejemplos de Código**  

#### **6.1. Crear un Huésped**  
```tsx
import { createGuest } from '@/db/db';

const handleCreateGuest = async () => {
  if (name.trim()) {
    await createGuest({ name });
    setName('');
  }
};
```  

#### **6.2. Registrar la Entrada de un Huésped**  
```tsx
import { checkIn } from '@/db/db';

const handleCheckIn = async () => {
  if (selectedGuest && selectedRoom) {
    await checkIn(selectedGuest, selectedRoom);
    onRefresh();
  }
};
```  

#### **6.3. Actualización en Tiempo Real de Habitaciones**  
```tsx
useEffect(() => {
  pb.collection('rooms').subscribe('*', (e) => {
    if (e.action === "update") {
      const updatedRooms = rooms.map((room) =>
        room.id === e.record.id ? { ...room, ...e.record } : room
      );
      setRooms(updatedRooms);
    }
  });
}, []);
```  

---

### **7. Dependencias**  
- **Frontend**:  
  - React, TypeScript, Vite  
  - Tailwind CSS, Radix UI  
- **Backend**:  
  - PocketBase  

---