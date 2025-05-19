import Link from "next/link";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import {
  cardTitle,
  cardSubtitle,
  cardCharacteristicsTitle,
  cardCharacteristicsValue,
} from "@/components/primitives";

export default function BookPage() {
  // Данные книги
  const book = {
    title: "Друг: Азбука и первое чтение после азбуки",
    author: "О. Х. Озолина, Э. П. Озолин.",
    image: "",
    details: [
      { label: "Год издания", value: "1940" },
      { label: "Страниц", value: "170" },
      { label: "Страна", value: "Латвийская ССР" },
      { label: "Издательство", value: "Педгиз Латвийской ССР" },
    ],
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-center gap-6 w-full mb:flex-row">
          <div>
            <Image
              alt={book.title}
              className="border-solid border-2 border-gray-300"
              src="https://heroui.com/images/hero-card-complete.jpeg"
							width={500}
            />
          </div>
          <Card>
            <CardBody>
              <div>
                <h1 className={cardTitle()}>
                  {book.title}
                </h1>
                <p className={cardSubtitle()}>{book.author}</p>

                {/* Детали */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {book.details.map((detail, index) => (
                    <div key={index} className="py-2">
                      <p className={cardCharacteristicsTitle()}>{detail.label}</p>
                      <p className={cardCharacteristicsValue()}>
                        {detail.value}
                      </p>
                    </div>
                  ))}
                </div>
                <Button className="w-full" size="lg">
                  Открыть
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
