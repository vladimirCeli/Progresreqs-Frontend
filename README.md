# Progresreqs-Frontend

Progresreqs-Frontend es una aplicación web desarrollada con **React** y **Vite**, utilizando **TailwindCSS** para el diseño y **ESLint** para mantener buenas prácticas de código. 

## 🚀 Tecnologías Utilizadas
- **React** + **Vite**
- **TailwindCSS**
- **ESLint**
- **PostCSS**
- **Azure Static Web Apps** (para despliegue)
- **Material UI**
- **Framer Motion**
- **Axios**
- **React Router**
- **React ChartJS 2**
- **Moment.js**
- **React Quill**

---

## 📦 Instalación y Configuración

### 1️⃣ Clonar el repositorio
```sh
git clone https://github.com/vladimirCeli/Progresreqs-Frontend.git
cd Progresreqs-Frontend
```

### 2️⃣ Instalar dependencias
```sh
npm install
```

### 3️⃣ Ejecutar en modo desarrollo
```sh
npm run dev
```
Luego, abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### 4️⃣ Construir para producción
```sh
npm run build
```

### 5️⃣ Previsualizar la versión de producción
```sh
npm run preview
```

### 6️⃣ Ejecutar Linter
```sh
npm run lint
```

---

## 📂 Estructura del Proyecto
```
Progresreqs-Frontend/
│── public/               # Archivos estáticos
│── src/                  # Código fuente
│   ├── assets/           # Recursos estáticos (imágenes, íconos, etc.)
│   ├── components/       # Componentes reutilizables
│   ├── context/          # Context API para manejo de estado global
│   ├── hooks/            # Custom Hooks
│   ├── pages/            # Páginas de la aplicación
│   ├── services/         # Llamadas a APIs y lógica de negocio
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Punto de entrada de la app
│── .eslintrc.cjs         # Configuración de ESLint
│── tailwind.config.js    # Configuración de TailwindCSS
│── vite.config.js        # Configuración de Vite
│── package.json          # Dependencias y scripts
│── README.md             # Documentación del proyecto
```

---

## 📜 Dependencias Principales
Este proyecto utiliza varias dependencias para mejorar la funcionalidad y el diseño:

### 📌 Dependencias de Producción
- `@emotion/react`, `@emotion/styled` - Estilos dinámicos
- `@mui/material`, `@mui/icons-material` - Componentes Material UI
- `axios` - Cliente HTTP para consumir APIs
- `framer-motion` - Animaciones fluidas
- `react-router-dom` - Navegación de páginas
- `react-chartjs-2` - Gráficos dinámicos
- `react-quill` - Editor de texto enriquecido
- `moment` - Manejo de fechas y tiempos
- `react-toastify` - Notificaciones amigables

### 📌 Dependencias de Desarrollo
- `eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks` - Reglas de calidad de código
- `tailwindcss`, `postcss`, `autoprefixer` - Diseño moderno con TailwindCSS
- `vite`, `@vitejs/plugin-react` - Entorno de desarrollo rápido

---

## 🚀 Despliegue en Azure Static Web Apps
Este proyecto está configurado para ser desplegado en **Azure Static Web Apps**.

### 📌 Pasos para desplegar en Azure:
1. **Autenticarse en Azure**
   ```sh
   az login
   ```
2. **Crear un recurso de Static Web Apps**
   ```sh
   az staticwebapp create -n ProgresreqsFrontend -g MiGrupoDeRecursos -s https://github.com/vladimirCeli/Progresreqs-Frontend -l centralus -b main --token GITHUB_PERSONAL_ACCESS_TOKEN
   ```
3. **Verificar en Azure Portal** que el despliegue fue exitoso.

---

## 🛠 Mantenimiento y Desarrollo
- Usa `npm run lint` para revisar el código con ESLint.
- Crea nuevas ramas para trabajar en características (`feature/nueva-funcionalidad`).
- Haz pull requests en GitHub para revisión de código.

---

## ✨ Contribuciones
¡Las contribuciones son bienvenidas! Si deseas mejorar el proyecto, abre un **Issue** o envía un **Pull Request**.

---

## 📜 Licencia
Este proyecto está bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

