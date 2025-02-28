import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

enum ProService {
  YES = 1,
  NO = 0,
}
interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}
const serviceList: ServiceProps[] = [
  {
    title: "Integración de Dominio Personalizado",
    description:
      "Obtén un dominio personalizado para tu sitio web y mejora tu presencia en línea.",
    pro: 0,
  },
  {
    title: "Integraciones con Redes Sociales",
    description:
      "Conecta tus cuentas de redes sociales para una gestión más eficiente de tu marca.",
    pro: 0,
  },
  {
    title: "Integraciones de Marketing por Correo Electrónico",
    description: "Automatiza tus campañas de correo electrónico y llega a más clientes.",
    pro: 0,
  },
  {
    title: "Optimización SEO",
    description: "Mejora el posicionamiento de tu sitio web en los motores de búsqueda.",
    pro: 1,
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Servicios
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Haz Crecer Tu Negocio
      </h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Desde marketing y ventas hasta operaciones y estrategia, tenemos la
        experiencia para ayudarte a alcanzar tus objetivos.
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto">
        {serviceList.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="bg-muted/60 dark:bg-card h-full relative"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Badge
              data-pro={ProService.YES === pro}
              variant="secondary"
              className="absolute -top-2 -right-3 data-[pro=false]:hidden"
            >
              PRO
            </Badge>
          </Card>
        ))}
      </div>
    </section>
  );
};
