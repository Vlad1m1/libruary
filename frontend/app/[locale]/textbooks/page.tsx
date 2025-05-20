"use client";

import { title, card } from "@/components/primitives";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { useState, useEffect } from "react";

const Textbooks = () => {
  const [textbooks, setTextbooks] = useState([
    { id: 1, name: "Друг: Азбука и первое чтение после азбуки",  year: 1940, pages: 270, author: "О. Х. Озолина, Э. П. Озолин." },
    { id: 2, name: "Азбука с картинками для прилежных детей: № 1", year: 1874, pages: 270, author: "О. Х. Озолина, Э. П. Озолин."  },
    { id: 3, name: "Азбука с картинками для прилежных детей: № 2", year: 1874, pages: 270, author: "О. Х. Озолина, Э. П. Озолин."  },
    { id: 4, name: "Друг: Азбука и первое чтение после азбуки", year: 1940, pages: 270, author: "О. Х. Озолина, Э. П. Озолин."  },
    { id: 5, name: "Азбука с картинками для прилежных детей: № 1", year: 1874, pages: 270, author: "О. Х. Озолина, Э. П. Озолин."  },
    { id: 6, name: "Азбука с картинками для прилежных детей: № 2", year: 1874, pages: 270, author: "О. Х. Озолина, Э. П. Озолин."  },
    { id: 7, name: "Друг: Азбука и первое чтение после азбуки", year: 1940, pages: 270, author: "О. Х. Озолина, Э. П. Озолин."  },
    { id: 8, name: "Азбука с картинками для прилежных детей: № 1", year: 1874, pages: 270, author: "О. Х. Озолина, Э. П. Озолин."  },
    { id: 9, name: "Азбука с картинками для прилежных детей: № 2", year: 1874, pages: 270, author: "О. Х. Озолина, Э. П. Озолин."  },
  ]);

  return (
    <div className="justify-items-center">
      <h1 className={title()}>Учебники</h1>
      <section className="grid grid-cols-3 gap-4 justify-center mt-6">
        {textbooks.map((textbook) => (
          <Card key={ textbook.id } isBlurred className="max-w-[300px]">
            <Image
              alt="Обложка книги"
              src="https://heroui.com/images/hero-card-complete.jpeg" // Путь к изображению в public/
              className="w-full h-[300px] object-cover"
            />
						<Divider/>
            <CardBody>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">
                  {textbook.name}
                </h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">{textbook.author}</p>
              <Divider className="my-3" />
              <div className="flex gap-2 mt-3">
                <Badge>{ textbook.year }</Badge>
				<Badge>{ textbook.pages } с.</Badge>
              </div>
            </CardBody>
            <CardFooter className="flex justify-between">
              <Link href={`textbook/${textbook.id}`}>Подробнее</Link>
              <Button size="md">Открыть</Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Textbooks;
