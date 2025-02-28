import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "TabletSmartphone",
    title: "Amigable para Móviles",
    description:
      "Accede a tus finanzas desde cualquier lugar con nuestra aplicación móvil intuitiva y fácil de usar.",
  },
  {
    icon: "BadgeCheck",
    title: "Seguridad Garantizada",
    description:
      "Tus datos están protegidos con los más altos estándares de seguridad y encriptación.",
  },
  {
    icon: "Goal",
    title: "Objetivos Financieros",
    description:
      "Establece y sigue tus metas financieras para alcanzar la libertad económica que deseas.",
  },
  {
    icon: "PictureInPicture",
    title: "Visualización Clara",
    description:
      "Gráficos y reportes detallados para que puedas entender mejor tu situación financiera.",
  },
  {
    icon: "MousePointerClick",
    title: "Acciones Rápidas",
    description:
      "Realiza transferencias y pagos de manera rápida y sencilla con solo unos clics.",
  },
  {
    icon: "Newspaper",
    title: "Noticias Financieras",
    description:
      "Mantente informado con las últimas noticias y tendencias del mundo financiero.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Características
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Lo que nos hace diferentes
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        En FireNances, nos dedicamos a proporcionarte las mejores herramientas para gestionar tus finanzas personales de manera eficiente y segura.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
