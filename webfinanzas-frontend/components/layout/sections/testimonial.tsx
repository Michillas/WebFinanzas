"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: "https://github.com/shadcn.png",
    name: "John Doe",
    userName: "Gerente de Producto",
    comment:
      "Me encanta esta aplicación para gestionar mi empresa junto con los productos que ofertamos.",
    rating: 5.0,
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Sophia Collins",
    userName: "Analista de Ciberseguridad",
    comment:
      "FireNances me ha ayudado a organizar mis finanzas personales de manera eficiente y segura. ¡Altamente recomendado!",
    rating: 4.8,
  },

  {
    image: "https://github.com/shadcn.png",
    name: "Adam Johnson",
    userName: "Director de Tecnología",
    comment:
      "Gracias a FireNances, ahora tengo un control total sobre mis inversiones y gastos. La interfaz es muy intuitiva.",
    rating: 4.9,
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Ethan Parker",
    userName: "Científico de Datos",
    comment:
      "FireNances me ha permitido ahorrar más dinero al proporcionarme análisis detallados de mis hábitos de gasto.",
    rating: 5.0,
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Ava Mitchell",
    userName: "Gerente de Proyectos de TI",
    comment:
      "La plataforma de FireNances es fácil de usar y me ha ayudado a planificar mis finanzas a largo plazo.",
    rating: 5.0,
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Isabella Reed",
    userName: "Ingeniera DevOps",
    comment:
      "FireNances es una herramienta esencial para cualquier persona que quiera mejorar su salud financiera.",
    rating: 4.9,
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Testimonios
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Escucha lo que dicen nuestros más de 1000 clientes
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pt-6 pb-0">
                  <div className="flex gap-1 pb-6">
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src="https://avatars.githubusercontent.com/u/75042455?v=4"
                        alt="radix"
                      />
                      <AvatarFallback>SV</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
