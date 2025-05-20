import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card"
import { Divider } from "@heroui/divider"

import { Image } from "@heroui/image"
import { title, cardTitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="justify-items-center">
      <div>
        <h1 className={`${title()} flex flex-col text-center items-center justify-center gap-4 py-8 md:py-10`}>История школьного <br/> учебника</h1>
				<p className="text-center">Настоящий ресурс представляет собой полнотекстовую базу данных документов двух типов: цифровые копии учебных пособий и публикации результатов их исследований. Материалы систематизированы по странам и хронологии издания, авторам-составителям. В основу положена коллекция Виталия Григорьевича Безрогова (1959-2019). Ресурс создан специалистами – историками образования из России и зарубежных научных центров, поддержан грантами РФФИ (проекты 20-013-00227, 20-013-00246).</p>
      </div>
			<div className="my-5 w-full px-20">
				<Card isBlurred className="border-none w-full items-center" shadow="sm">
					<CardBody className="flex flex-row justify-between gap-8">
						<p className="text-center mt-3">Расширенный поиск по базе учеников</p>
						<Button size="lg">Найти нужное</Button>
					</CardBody>
				</Card>
			</div>
			<div>
				<h1 className={`${title()} flex flex-col text-center items-center mb-5`}>Исследовательские ресурсы</h1>
				<p className="text-center mb-5">изучение азбук, букварей и книг для начального чтения</p>
				<div className="grid grid-cols-3 gap-4 justify-center mt-6 h-max">
					<Card>
						<CardBody>
							<p className={`${cardTitle()} text-center mb-3`}>Информационный центр «Библиотека имени К. Д. Ушинского» РАО</p>
							<p className="text-center">Библиографический свод данных. Азбуки, буквари, книги для чтения, изданные на русском языке с 1800 по 1940 г.</p>
						</CardBody>
						<Divider />
						<CardBody>
							<Button size="md">Перейти</Button>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<p className={`${cardTitle()} text-center mb-3`}>Georg-Eckert-Institut für internationale Schulbuchforschung</p>
							<p className="text-center">Электронная библиотека института Международных исследований школьных учебников им. Георга Экерта (Германия).</p>
						</CardBody>
						<Divider />
						<CardBody>
							<Button size="md">Перейти</Button>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<p className={`${cardTitle()} text-center mb-3`}>Munich DigitiZation Center (MDZ)</p>
							<p className="text-center">Коллекция учебников из фондов Баварской государственной библиотеки (Германия).</p>
						</CardBody>
						<Divider className="mt-14" />
						<CardBody>
							<Button size="md">Перейти</Button>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<p className={`${cardTitle()} text-center mb-3`}>Российская государственная детская библиотека</p>
							<p className="text-center">Архив оцифрованных материалов..</p>
						</CardBody>
						<Divider />
						<CardBody>
							<Button size="md">Перейти</Button>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<p className={`${cardTitle()} text-center mb-3`}>Атлас визуальных элементов</p>
							<p className="text-center">Результаты исследования визуального ряда азбук, букварей, книг для чтения, изданных в России XIX – начала XX в.</p>
						</CardBody>
						<Divider className="mt-15" />
						<CardBody>
							<Button size="md">Перейти</Button>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<p className={`${cardTitle()} text-center mb-3`}>El Centro de Investigación MANES</p>
							<p className="text-center">Центр изучения школьных учебников при Национальном университете дистанционного образования (Испания).</p>
						</CardBody>
						<Divider className="mt-13" />
						<CardBody>
							<Button size="md">Перейти</Button>
						</CardBody>
					</Card>
				</div>
				<div>
					<h1 className={`${title()} text-center flex my-5`}>Команда проекта</h1>
					<Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w[610px]" shadow="sm">
						<CardBody className="p-7 flex flex-row justify-between">
							<div className="relative col-span-6 md:col-span-4">
            		<Image
            		  alt="Ромашина Екатерина"
            		  className="object-cover"
            		  height={200}
            		  shadow="md"
            		  src="https://heroui.com/images/album-cover.png"
            		  width={400}
            		/>
          		</div>
							<div className="ml-10">
								<h1 className={`${cardTitle()}`}>Ромашина Екатерина</h1>
								<p className="font-size-600 my-5">Руководитель проекта</p>
								<p className="">Доктор педагогических наук, профессор, декан факультета искусств, социальных и гумманитарных наук Тульского государственного педагогического университета имю. Л. Н. Толстого</p>
							</div>
						</CardBody>
					</Card>
				</div>
			</div>
    </section>
  );
}
