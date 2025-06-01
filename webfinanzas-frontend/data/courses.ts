export const coursesData = [
  {
    id: 1,
    title: "Fundamentos de Presupuesto",
    img: "courses/1.jpg",
    shortDescription: "Aprende a crear y mantener un presupuesto efectivo",
    description:
      "Este curso te enseñará los fundamentos para crear un presupuesto personal efectivo que te ayudará a controlar tus finanzas y alcanzar tus metas financieras.",
    category: "presupuesto",
    categoryName: "Presupuesto",
    duration: 45,
    progress: 0,
    difficulty: "Principiante",
    rating: 4.8,
    studentsCount: 1245,
    lastUpdate: "15/03/2024",
    instructor: {
      name: "Ana Martínez",
      role: "Asesora Financiera Certificada",
      bio: "Ana tiene más de 10 años de experiencia en asesoría financiera personal. Es especialista en presupuestos y ha ayudado a cientos de familias a organizar sus finanzas.",
      avatar: "/placeholder.svg?height=100&width=100&text=AM",
      socialMedia: {
        linkedin: "anamartinez",
        twitter: "ana_finanzas",
        website: "anamartinez.com",
      },
    },
    tags: ["presupuesto", "finanzas básicas", "ahorro", "organización financiera"],
    certification: true,
    community: {
      membersCount: 856,
      activeDiscussions: 23,
    },
    lessons: [
      {
        id: 101,
        title: "Introducción al Presupuesto Personal",
        description: "Conoce los conceptos básicos del presupuesto y por qué es importante",
        content:
          "Un presupuesto personal es una herramienta financiera que te permite planificar y controlar tus ingresos y gastos. Es el primer paso para tomar control de tus finanzas personales. En esta lección, aprenderás por qué es crucial tener un presupuesto, independientemente de tu nivel de ingresos, y cómo puede ayudarte a alcanzar tus metas financieras a corto y largo plazo.",
        duration: 12,
        hasQuiz: true,
        completed: false,
      },
      {
        id: 102,
        title: "Identificando Ingresos y Gastos",
        description: "Aprende a categorizar y registrar todos tus ingresos y gastos",
        content:
          "Para crear un presupuesto efectivo, primero debes identificar todas tus fuentes de ingresos y categorizar tus gastos. En esta lección, aprenderás a clasificar tus gastos en categorías como necesidades básicas, gastos discrecionales y ahorros/inversiones. También veremos cómo registrar correctamente tus ingresos variables y gastos ocasionales.",
        duration: 15,
        hasQuiz: true,
        completed: false,
      },
      {
        id: 103,
        title: "Creando tu Primer Presupuesto",
        description: "Paso a paso para elaborar un presupuesto personalizado",
        content:
          "En esta lección práctica, te guiaremos paso a paso en la creación de tu presupuesto personal. Aprenderás diferentes métodos de presupuesto como el 50/30/20, presupuesto de base cero, y el método de sobres. Elegiremos el que mejor se adapte a tu situación financiera y estilo de vida.",
        duration: 18,
        interactive:
          "Vamos a crear tu presupuesto personalizado. Completa los siguientes campos con tus ingresos y gastos mensuales para generar automáticamente tu presupuesto.",
        calculatorType: "Presupuesto",
        hasQuiz: false,
        completed: false,
      },
      {
        id: 104,
        title: "Seguimiento y Ajustes",
        description: "Técnicas para mantener tu presupuesto actualizado",
        content:
          "Crear un presupuesto es solo el primer paso. En esta lección, aprenderás cómo hacer seguimiento a tus gastos diarios, revisar periódicamente tu presupuesto y hacer los ajustes necesarios. Conocerás herramientas y aplicaciones que pueden facilitar este proceso y mantener tu presupuesto siempre actualizado.",
        duration: 10,
        hasQuiz: true,
        completed: false,
      },
    ],
    resources: [
      {
        title: "Plantilla de Presupuesto Mensual",
        description: "Hoja de cálculo lista para usar con fórmulas automáticas",
        type: "excel",
        downloadCount: 876,
      },
      {
        title: "Guía de Categorías de Gastos",
        description: "Lista completa de categorías para clasificar tus gastos correctamente",
        type: "pdf",
        downloadCount: 654,
      },
      {
        title: "Checklist de Revisión Mensual",
        description: "Pasos a seguir para revisar y ajustar tu presupuesto cada mes",
        type: "pdf",
        downloadCount: 432,
      },
    ],
    relatedCourses: [2, 4],
    successStories: [
      {
        name: "Carlos Rodríguez",
        story: "Gracias a este curso, logré ahorrar €3,000 en seis meses siguiendo el método 50/30/20.",
        avatar: "/placeholder.svg?height=50&width=50&text=CR",
      },
      {
        name: "María López",
        story: "Por fin entiendo cómo organizar mis finanzas. He reducido mis gastos innecesarios en un 40%.",
        avatar: "/placeholder.svg?height=50&width=50&text=ML",
      },
    ],
  },
  {
    id: 2,
    title: "Estrategias de Ahorro Efectivas",
    img: "courses/2.jpg",
    shortDescription: "Técnicas prácticas para maximizar tus ahorros",
    description:
      "Descubre estrategias probadas para aumentar tus ahorros sin sacrificar tu calidad de vida. Este curso te enseñará métodos prácticos para ahorrar más dinero cada mes.",
    category: "ahorro",
    categoryName: "Ahorro",
    duration: 30,
    progress: 25,
    difficulty: "Intermedio",
    rating: 4.7,
    studentsCount: 987,
    lastUpdate: "02/04/2024",
    instructor: {
      name: "Roberto Sánchez",
      role: "Experto en Finanzas Personales",
      bio: "Roberto es autor de dos libros sobre ahorro inteligente y ha ayudado a miles de personas a desarrollar hábitos de ahorro efectivos a través de sus talleres y cursos.",
      avatar: "/placeholder.svg?height=100&width=100&text=RS",
      socialMedia: {
        linkedin: "robertosanchez",
        twitter: "roberto_ahorro",
        website: "ahorracontigo.com",
      },
    },
    tags: ["ahorro", "hábitos financieros", "metas financieras"],
    certification: true,
    community: {
      membersCount: 723,
      activeDiscussions: 18,
    },
    lessons: [
      {
        id: 201,
        title: "Fundamentos del Ahorro",
        description: "Principios básicos para desarrollar el hábito del ahorro",
        content:
          "El ahorro es la base de la salud financiera. En esta lección, aprenderás por qué es importante ahorrar, cuáles son los diferentes tipos de ahorro (emergencia, metas a corto plazo, jubilación) y cómo desarrollar una mentalidad de ahorro que te permita ser consistente a lo largo del tiempo.",
        duration: 8,
        hasQuiz: true,
        completed: true,
      },
      {
        id: 202,
        title: "El Fondo de Emergencia",
        description: "Cómo crear y mantener un fondo para imprevistos",
        content:
          "Un fondo de emergencia es tu red de seguridad financiera. En esta lección, aprenderás cuánto deberías tener en tu fondo de emergencia según tu situación personal, dónde guardarlo para que sea accesible pero genere algo de rendimiento, y cómo reconstruirlo después de usarlo.",
        duration: 10,
        hasQuiz: true,
        completed: false,
      },
      {
        id: 203,
        title: "Técnicas de Ahorro Automático",
        description: "Sistemas para ahorrar sin esfuerzo consciente",
        content:
          "El ahorro automático es la forma más efectiva de asegurar que ahorres consistentemente. En esta lección, aprenderás a configurar transferencias automáticas, usar aplicaciones de redondeo, y otras técnicas que te permiten ahorrar sin tener que tomar decisiones constantes.",
        duration: 12,
        interactive:
          "Vamos a calcular cuánto podrías ahorrar utilizando diferentes métodos automáticos. Ingresa tu ingreso mensual y el porcentaje que deseas ahorrar.",
        calculatorType: "Ahorro Automático",
        hasQuiz: false,
        completed: false,
      },
      {
        id: 204,
        title: "Ahorro para Metas Específicas",
        description: "Estrategias para ahorrar para objetivos a corto y mediano plazo",
        content:
          "Ahorrar con un propósito específico aumenta tu motivación y probabilidades de éxito. En esta lección, aprenderás a establecer metas de ahorro SMART (específicas, medibles, alcanzables, relevantes y con tiempo definido) y las mejores estrategias para cada tipo de meta.",
        duration: 10,
        hasQuiz: true,
        completed: false,
      },
    ],
    resources: [
      {
        title: "Calculadora de Fondo de Emergencia",
        description: "Herramienta para determinar cuánto necesitas en tu fondo de emergencia",
        type: "excel",
        downloadCount: 765,
      },
      {
        title: "Guía de Cuentas de Ahorro",
        description: "Comparativa de diferentes tipos de cuentas para tus ahorros",
        type: "pdf",
        downloadCount: 543,
      },
      {
        title: "Plantilla de Seguimiento de Metas de Ahorro",
        description: "Hoja de cálculo para monitorear el progreso hacia tus metas financieras",
        type: "excel",
        downloadCount: 621,
      },
    ],
    relatedCourses: [1, 6],
    successStories: [
      {
        name: "Laura Gómez",
        story: "Implementé el sistema de ahorro automático y en un año logré juntar para el enganche de mi casa.",
        avatar: "/placeholder.svg?height=50&width=50&text=LG",
      },
    ],
  },
  {
    id: 3,
    title: "Introducción a la Inversión",
    img: "courses/3.jpg",
    shortDescription: "Conceptos básicos para comenzar a invertir",
    description:
      "Este curso te introduce al mundo de las inversiones de manera clara y sencilla. Aprenderás los conceptos fundamentales que necesitas conocer antes de comenzar a invertir tu dinero.",
    category: "inversion",
    categoryName: "Inversión",
    duration: 60,
    progress: 0,
    difficulty: "Intermedio",
    rating: 4.9,
    studentsCount: 1532,
    lastUpdate: "20/03/2024",
    instructor: {
      name: "Miguel Ángel Torres",
      role: "Asesor de Inversiones",
      bio: "Miguel Ángel tiene 15 años de experiencia en mercados financieros. Ha trabajado como asesor de inversiones para importantes entidades bancarias y ahora se dedica a la educación financiera.",
      avatar: "/placeholder.svg?height=100&width=100&text=MT",
      socialMedia: {
        linkedin: "miguelangeltorres",
        twitter: "miguel_inversiones",
        website: "invierteconmiguel.com",
      },
    },
    tags: ["inversión", "mercados financieros", "riesgo", "rendimiento"],
    certification: true,
    community: {
      membersCount: 1245,
      activeDiscussions: 42,
    },
    lessons: [
      {
        id: 301,
        title: "¿Qué es Invertir?",
        description: "Conceptos básicos y diferencia entre ahorrar e invertir",
        content:
          "Invertir significa poner tu dinero a trabajar para generar más dinero a través del tiempo. En esta lección, aprenderás la diferencia fundamental entre ahorrar e invertir, por qué es importante invertir para construir riqueza a largo plazo, y los conceptos básicos que todo inversionista principiante debe conocer.",
        duration: 15,
        hasQuiz: true,
        completed: false,
      },
      {
        id: 302,
        title: "Tipos de Inversiones",
        description: "Panorama general de las diferentes opciones de inversión",
        content:
          "Existen muchos vehículos de inversión disponibles, cada uno con diferentes niveles de riesgo y potencial de rendimiento. En esta lección, conocerás las principales categorías de inversiones: acciones, bonos, fondos mutuos, ETFs, bienes raíces, y más. Entenderás las características básicas de cada uno y para qué tipo de inversionista son más adecuados.",
        duration: 18,
        hasQuiz: true,
        completed: false,
      },
      {
        id: 303,
        title: "Riesgo y Rendimiento",
        description: "Entendiendo la relación entre riesgo y potencial de ganancia",
        content:
          "La relación entre riesgo y rendimiento es fundamental en el mundo de las inversiones. En esta lección, aprenderás cómo evaluar el riesgo de una inversión, por qué generalmente mayor riesgo implica mayor potencial de rendimiento, y cómo determinar tu propia tolerancia al riesgo basado en tu edad, objetivos financieros y personalidad.",
        duration: 12,
        interactive:
          "Vamos a determinar tu perfil de riesgo como inversionista. Responde a las siguientes preguntas para descubrir si eres un inversionista conservador, moderado o agresivo.",
        hasQuiz: false,
        completed: false,
      },
      {
        id: 304,
        title: "Creando tu Primera Cartera de Inversión",
        description: "Pasos prácticos para comenzar a invertir",
        content:
          "En esta lección práctica, aprenderás los pasos para crear tu primera cartera de inversión. Desde cómo elegir una plataforma o broker, hasta cómo diversificar tus inversiones según tu perfil de riesgo y objetivos. También discutiremos estrategias simples pero efectivas para inversionistas principiantes.",
        duration: 15,
        hasQuiz: true,
        completed: false,
      },
      {
        id: 305,
        title: "Errores Comunes del Inversionista Principiante",
        description: "Aprende a evitar los errores más frecuentes",
        content:
          "Muchos inversionistas principiantes cometen los mismos errores que pueden costarles dinero y frustración. En esta lección, identificaremos los errores más comunes como invertir sin un plan, dejarse llevar por emociones, intentar cronometrar el mercado, y no diversificar adecuadamente. Aprenderás estrategias prácticas para evitar estos errores.",
        duration: 10,
        hasQuiz: true,
        completed: false,
      },
    ],
    resources: [
      {
        title: "Glosario de Términos de Inversión",
        description: "Diccionario completo con los términos más importantes del mundo de las inversiones",
        type: "pdf",
        downloadCount: 1243,
      },
      {
        title: "Cuestionario de Perfil de Riesgo",
        description: "Herramienta para determinar tu tolerancia al riesgo como inversionista",
        type: "pdf",
        downloadCount: 987,
      },
      {
        title: "Guía de Plataformas de Inversión",
        description: "Comparativa de diferentes brokers y plataformas para inversionistas principiantes",
        type: "pdf",
        downloadCount: 876,
      },
    ],
    relatedCourses: [5, 6],
    successStories: [
      {
        name: "Javier Méndez",
        story: "Después de este curso, comencé a invertir en ETFs y en dos años mi cartera ha crecido un 15%.",
        avatar: "/placeholder.svg?height=50&width=50&text=JM",
      },
      {
        name: "Sofía Ramírez",
        story:
          "Gracias a los conocimientos adquiridos, pude diversificar mis inversiones y reducir mi exposición al riesgo.",
        avatar: "/placeholder.svg?height=50&width=50&text=SR",
      },
    ],
  },
  {
    id: 4,
    title: "Control de Deudas",
    img: "courses/4.jpg",
    shortDescription: "Estrategias para manejar y reducir tus deudas",
    description:
      "Aprende a manejar tus deudas de manera efectiva, reducir intereses y crear un plan para liberarte de deudas problemáticas. Este curso te dará herramientas prácticas para tomar control de tu situación financiera.",
    category: "presupuesto",
    categoryName: "Presupuesto",
    duration: 40,
    progress: 0,
    difficulty: "Principiante",
    rating: 4.6,
    studentsCount: 876,
    lastUpdate: "05/04/2024",
    instructor: {
      name: "Patricia Vega",
      role: "Especialista en Finanzas Personales",
      bio: "Patricia se especializa en ayudar a personas a salir de deudas. Ha desarrollado metodologías efectivas para el manejo de deudas y la reconstrucción del crédito personal.",
      avatar: "/placeholder.svg?height=100&width=100&text=PV",
      socialMedia: {
        linkedin: "patriciavega",
        twitter: "patricia_finanzas",
        website: "sindeudas.com",
      },
    },
    tags: ["deudas", "crédito", "presupuesto", "libertad financiera"],
    certification: true,
    community: {
      membersCount: 654,
      activeDiscussions: 32,
    },
    lessons: [
      {
        id: 401,
        title: "Entendiendo tus Deudas",
        description: "Cómo identificar y organizar todas tus deudas",
        content:
          "El primer paso para controlar tus deudas es entenderlas completamente. En esta lección, aprenderás a hacer un inventario detallado de todas tus deudas, incluyendo saldos, tasas de interés, pagos mínimos y fechas de vencimiento. También aprenderás a diferenciar entre deudas 'buenas' (productivas) y 'malas' (consumo).",
        duration: 10,
        hasQuiz: true,
        completed: false,
      },
      {
        id: 402,
        title: "Estrategias de Pago de Deudas",
        description: "Métodos efectivos para reducir tus deudas sistemáticamente",
        content:
          "Existen diferentes estrategias para pagar deudas, cada una con sus ventajas. En esta lección, aprenderás sobre el método de la bola de nieve (pagar primero las deudas más pequeñas) y el método de la avalancha (pagar primero las deudas con mayor tasa de interés). Analizaremos cuál es mejor según tu situación personal y motivación.",
        duration: 12,
        interactive:
          "Vamos a crear tu plan personalizado de pago de deudas. Ingresa tus deudas actuales con sus saldos y tasas de interés para calcular el mejor método para ti.",
        calculatorType: "Pago de Deudas",
        hasQuiz: false,
        completed: false,
      },
      {
        id: 403,
        title: "Negociación con Acreedores",
        description: "Técnicas para negociar mejores condiciones para tus deudas",
        content:
          "Muchas personas no saben que es posible negociar con acreedores. En esta lección, aprenderás técnicas efectivas para negociar tasas de interés más bajas, eliminar cargos por mora, e incluso establecer planes de pago más favorables. También discutiremos cuándo y cómo acercarse a diferentes tipos de acreedores.",
        duration: 8,
        hasQuiz: true,
        completed: false,
      },
      {
        id: 404,
        title: "Consolidación y Refinanciamiento",
        description: "Cuándo y cómo consolidar o refinanciar tus deudas",
        content:
          "La consolidación y el refinanciamiento pueden ser herramientas poderosas para manejar deudas. En esta lección, aprenderás la diferencia entre estas dos estrategias, cuándo cada una es apropiada, y cómo evaluar si te convienen según tu situación financiera. También veremos los pros y contras de diferentes opciones de consolidación.",
        duration: 10,
        hasQuiz: true,
        completed: false,
      },
    ],
    resources: [
      {
        title: "Plantilla de Inventario de Deudas",
        description: "Hoja de cálculo para organizar todas tus deudas y crear un plan de pago",
        type: "excel",
        downloadCount: 765,
      },
      {
        title: "Guía de Negociación con Acreedores",
        description: "Scripts y consejos para negociar efectivamente con diferentes tipos de acreedores",
        type: "pdf",
        downloadCount: 543,
      },
      {
        title: "Calculadora de Consolidación de Deudas",
        description: "Herramienta para determinar si la consolidación te beneficiaría financieramente",
        type: "excel",
        downloadCount: 432,
      },
    ],
    relatedCourses: [1, 2],
    successStories: [
      {
        name: "Alejandro Díaz",
        story: "Siguiendo el método de la bola de nieve, logré pagar €15,000 en deudas en solo 18 meses.",
        avatar: "/placeholder.svg?height=50&width=50&text=AD",
      },
    ],
  },
  {
    id: 5,
    title: "Finanzas para Emprendedores",
    img: "courses/5.jpg",
    shortDescription: "Gestión financiera para pequeños negocios",
    description:
      "Este curso está diseñado para emprendedores y dueños de pequeños negocios que quieren mejorar la gestión financiera de sus empresas. Aprenderás conceptos esenciales de contabilidad, flujo de caja y planificación financiera.",
    category: "inversion",
    categoryName: "Inversión",
    duration: 55,
    progress: 0,
    difficulty: "Avanzado",
    rating: 4.7,
    studentsCount: 654,
    lastUpdate: "10/03/2024",
    instructor: {
      name: "Daniel Herrera",
      role: "Emprendedor y Consultor Financiero",
      bio: "Daniel ha fundado tres empresas exitosas y ahora se dedica a asesorar a emprendedores en la gestión financiera de sus negocios. Es especialista en startups y modelos de negocio escalables.",
      avatar: "/placeholder.svg?height=100&width=100&text=DH",
      socialMedia: {
        linkedin: "danielherrera",
        twitter: "daniel_emprende",
        website: "emprendeconexito.com",
      },
    },
    tags: ["emprendimiento", "negocios", "flujo de caja", "rentabilidad"],
    certification: true,
    community: {
      membersCount: 543,
      activeDiscussions: 28,
    },
    lessons: [
      {
        id: 501,
        title: "Finanzas Personales vs. Finanzas del Negocio",
        description: "Cómo separar tus finanzas personales de las de tu empresa",
        content:
          "Uno de los errores más comunes de los emprendedores es mezclar sus finanzas personales con las del negocio. En esta lección, aprenderás la importancia de mantener estas finanzas separadas, cómo establecer esta separación correctamente, y las mejores prácticas para manejar la relación financiera entre tú y tu empresa.",
        duration: 12,
        hasQuiz: true,
        completed: false,
      },
      {
        id: 502,
        title: "Entendiendo el Flujo de Caja",
        description: "Cómo gestionar y proyectar el flujo de efectivo de tu negocio",
        content:
          "El flujo de caja es el oxígeno de cualquier negocio. En esta lección, aprenderás qué es el flujo de caja, cómo difiere de las ganancias, y por qué es crucial para la supervivencia de tu empresa. Desarrollarás habilidades para proyectar y gestionar el flujo de caja de manera efectiva, incluso en tiempos de incertidumbre.",
        duration: 15,
        interactive:
          "Vamos a crear una proyección de flujo de caja para tu negocio. Ingresa tus ingresos y gastos esperados para los próximos meses para visualizar tu situación de liquidez.",
        calculatorType: "Flujo de Caja",
        hasQuiz: false,
        completed: false,
      },
      {
        id: 503,
        title: "Fijación de Precios y Márgenes",
        description: "Estrategias para determinar precios rentables para tus productos o servicios",
        content:
          "Fijar precios adecuados es fundamental para la rentabilidad de tu negocio. En esta lección, aprenderás diferentes métodos de fijación de precios, cómo calcular tus costos correctamente, entender los márgenes de contribución y beneficio, y cómo ajustar tus precios según el mercado y tu propuesta de valor.",
        duration: 14,
        hasQuiz: true,
        completed: false,
      },
      {
        id: 504,
        title: "Financiamiento para Emprendedores",
        description: "Opciones de financiamiento para iniciar o hacer crecer tu negocio",
        content:
          "Todo emprendedor necesita capital en algún momento. En esta lección, exploraremos las diferentes fuentes de financiamiento disponibles para pequeños negocios, desde bootstrapping y financiamiento propio, hasta préstamos bancarios, inversores ángeles, capital de riesgo y crowdfunding. Analizaremos los pros y contras de cada opción.",
        duration: 14,
        hasQuiz: true,
        completed: false,
      },
    ],
    resources: [
      {
        title: "Plantilla de Proyección de Flujo de Caja",
        description: "Hoja de cálculo para proyectar y monitorear el flujo de efectivo de tu negocio",
        type: "excel",
        downloadCount: 543,
      },
      {
        title: "Guía de Estructura Legal y Fiscal",
        description: "Información sobre diferentes estructuras legales y sus implicaciones fiscales",
        type: "pdf",
        downloadCount: 432,
      },
      {
        title: "Calculadora de Punto de Equilibrio",
        description: "Herramienta para determinar cuánto necesitas vender para cubrir tus costos",
        type: "excel",
        downloadCount: 387,
      },
    ],
    relatedCourses: [3, 4],
    successStories: [
      {
        name: "Elena Castro",
        story: "Implementé las técnicas de flujo de caja y logré estabilizar las finanzas de mi startup en tres meses.",
        avatar: "/placeholder.svg?height=50&width=50&text=EC",
      },
      {
        name: "Ricardo Fuentes",
        story: "Gracias a este curso, pude negociar con éxito una ronda de financiamiento para mi empresa.",
        avatar: "/placeholder.svg?height=50&width=50&text=RF",
      },
    ],
  },
  {
    id: 6,
    title: "Planificación para la Jubilación",
    img: "courses/6.jpg",
    shortDescription: "Prepárate financieramente para tu retiro",
    description:
      "Este curso te guiará en la creación de un plan sólido para tu jubilación. Aprenderás a calcular cuánto necesitas ahorrar, qué vehículos de inversión utilizar y cómo maximizar tus ahorros para el retiro.",
    category: "ahorro",
    categoryName: "Ahorro",
    duration: 50,
    progress: 0,
    difficulty: "Intermedio",
    rating: 4.8,
    studentsCount: 765,
    lastUpdate: "25/03/2024",
    instructor: {
      name: "Carmen Olivares",
      role: "Planificadora Financiera Certificada",
      bio: "Carmen se especializa en planificación para la jubilación y ha ayudado a cientos de personas a prepararse adecuadamente para esta etapa de la vida. Es autora del libro 'Tu Jubilación Ideal'.",
      avatar: "/placeholder.svg?height=100&width=100&text=CO",
      socialMedia: {
        linkedin: "carmenolivares",
        twitter: "carmen_jubilacion",
        website: "jubilacionideal.com",
      },
    },
    tags: ["jubilación", "retiro", "pensiones", "inversión a largo plazo"],
    certification: true,
    community: {
      membersCount: 876,
      activeDiscussions: 35,
    },
    lessons: [
      {
        id: 601,
        title: "Fundamentos de la Jubilación",
        description: "Conceptos básicos sobre la planificación del retiro",
        content:
          "La jubilación es una de las metas financieras más importantes en la vida. En esta lección, aprenderás por qué es crucial comenzar a planificar tu jubilación lo antes posible, cómo funciona el interés compuesto a tu favor, y los conceptos básicos que necesitas entender antes de crear tu plan de jubilación.",
        duration: 12,
        hasQuiz: true,
        completed: false,
      },
      {
        id: 602,
        title: "¿Cuánto Necesitas para Jubilarte?",
        description: "Cálculos y estimaciones para tu meta de jubilación",
        content:
          "Una de las preguntas más importantes es cuánto dinero necesitarás para jubilarte cómodamente. En esta lección, aprenderás diferentes métodos para calcular tu 'número mágico', considerando factores como tu estilo de vida deseado, la inflación, expectativa de vida, y gastos médicos potenciales.",
        duration: 15,
        interactive:
          "Vamos a calcular cuánto necesitas ahorrar para tu jubilación. Ingresa tu edad actual, edad deseada de jubilación e ingresos actuales para obtener una estimación personalizada.",
        calculatorType: "Jubilación",
        hasQuiz: false,
        completed: false,
      },
      {
        id: 603,
        title: "Vehículos de Inversión para el Retiro",
        description: "Opciones disponibles para invertir para tu jubilación",
        content:
          "Existen diferentes vehículos de inversión diseñados específicamente para la jubilación, cada uno con sus ventajas fiscales y características. En esta lección, conocerás las opciones disponibles en tu país, cómo funcionan, sus límites de contribución, y cómo elegir las mejores para tu situación personal.",
        duration: 13,
        hasQuiz: true,
        completed: false,
      },
      {
        id: 604,
        title: "Estrategias de Inversión para Diferentes Edades",
        description: "Cómo ajustar tu estrategia según te acercas a la jubilación",
        content:
          "Tu estrategia de inversión para la jubilación debe cambiar con el tiempo. En esta lección, aprenderás cómo ajustar tu asignación de activos según tu edad y proximidad a la jubilación, desde estrategias agresivas en tus años jóvenes hasta enfoques más conservadores a medida que te acercas al retiro.",
        duration: 10,
        hasQuiz: true,
        completed: false,
      },
    ],
    resources: [
      {
        title: "Calculadora de Jubilación",
        description: "Herramienta completa para determinar tus necesidades de jubilación y plan de ahorro",
        type: "excel",
        downloadCount: 654,
      },
      {
        title: "Guía de Vehículos de Inversión para el Retiro",
        description: "Comparativa detallada de diferentes opciones para invertir para tu jubilación",
        type: "pdf",
        downloadCount: 543,
      },
      {
        title: "Checklist de Preparación para la Jubilación",
        description: "Lista de verificación con pasos a seguir en cada década de tu vida",
        type: "pdf",
        downloadCount: 432,
      },
    ],
    relatedCourses: [2, 3],
    successStories: [
      {
        name: "Fernando Ruiz",
        story:
          "Comencé a planificar mi jubilación a los 35 años siguiendo este curso y ahora a los 45 ya tengo el 60% de mi meta.",
        avatar: "/placeholder.svg?height=50&width=50&text=FR",
      },
      {
        name: "Isabel Moreno",
        story:
          "Este curso me ayudó a entender que nunca es tarde para empezar. A mis 50 años, he logrado crear un plan realista para mi retiro.",
        avatar: "/placeholder.svg?height=50&width=50&text=IM",
      },
    ],
  },
]