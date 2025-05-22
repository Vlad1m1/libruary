import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Input, Textarea } from "@heroui/input"
import { title, subtitle, cardTitle } from "@/components/primitives";

import bgImageSrc1 from '@/public/BG1.webp';
import bgImageSrc2 from '@/public/DSC_1957.webp';
import gridImage1 from '@/public/resourceImages/1.webp'
import gridImage2 from '@/public/resourceImages/2.webp'
import gridImage3 from '@/public/resourceImages/3.webp'
import gridImage4 from '@/public/resourceImages/4.webp'
import gridImage5 from '@/public/resourceImages/5.webp'
import gridImage6 from '@/public/resourceImages/6.webp'


export default function Home() {
  return (
    <section className="justify-items-center">
      <div>
        <Card isHoverable className="relative overflow-hidden h-[400] w-full bg-no-repeat bg-cover bg-center" style={{backgroundImage: `url(${bgImageSrc1.src})`}}>
					<CardBody>
						<h1
            className={`${title()} text-white text-center grid place-items-center h-[400] w-full`}
          	>
            История школьного <br /> учебника
         	  </h1>
					</CardBody>
				</Card>
        <p className="text-center mt-5">
          Настоящий ресурс представляет собой полнотекстовую базу данных
          документов двух типов: цифровые копии учебных пособий и публикации
          результатов их исследований. Материалы систематизированы по странам и
          хронологии издания, авторам-составителям. В основу положена коллекция
          Виталия Григорьевича Безрогова (1959-2019). Ресурс создан
          специалистами – историками образования из России и зарубежных научных
          центров, поддержан грантами РФФИ (проекты 20-013-00227, 20-013-00246).
        </p>
      </div>
      <div className="my-5 w-full px-20">
        <Card isBlurred className="relative overflow-hidden h-[200] w-full bg-no-repeat bg-cover bg-top" style={{backgroundImage: `url(${bgImageSrc2.src})`}} shadow="sm">
          <CardBody className="flex-row grid place-items-center h-[400] w-full">
            <p className={`${title()} text-white`}>
              Расширенный поиск по базе учеников
            </p>
            <Button size="lg">Найти нужное</Button>
          </CardBody>
        </Card>
      </div>
      <h1 className={`${title()} flex flex-col text-center items-center mb-5`}>
        Исследовательские ресурсы
      </h1>
      <p className="text-center mb-5">
        изучение азбук, букварей и книг для начального чтения
      </p>
      <div className="grid grid-cols-3 gap-4 justify-center mt-6 h-max">
        <Card>
          <CardBody>
            <p className={`${cardTitle()} text-center mb-3`}>
              Информационный центр «Библиотека имени К. Д. Ушинского» РАО
            </p>
            <p className="text-center">
              Библиографический свод данных. Азбуки, буквари, книги для чтения,
              изданные на русском языке с 1800 по 1940 г.
            </p>
						<Image 
							src={gridImage1.src}
							className="w-full relative overflow-hidden"
						/>
          </CardBody>
          <CardBody>
            <Button size="md">Перейти</Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className={`${cardTitle()} text-center mb-3`}>
              Georg-Eckert-Institut für internationale Schulbuchforschung
            </p>
            <p className="text-center mb-2">
              Электронная библиотека института Международных исследований
              школьных учебников им. Георга Экерта (Германия).
            </p>
						<Image 
							src={gridImage2.src}
							className="w-full relative overflow-hidden"
						/>
          </CardBody>
          <CardBody>
            <Button size="md">Перейти</Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className={`${cardTitle()} text-center mb-3`}>
              Munich DigitiZation Center (MDZ)
            </p>
            <p className="text-center">
              Коллекция учебников из фондов Баварской государственной библиотеки
              (Германия).
            </p>
						<Image 
							src={gridImage3.src}
							className="w-full relative overflow-hidden"
						/>
          </CardBody>
          <Divider className="mt-14" />
          <CardBody>
            <Button size="md">Перейти</Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className={`${cardTitle()} text-center mb-3`}>
              Российская государственная детская библиотека
            </p>
            <p className="text-center">Архив оцифрованных материалов..</p>
						<Image 
							src={gridImage4.src}
							className="w-full relative overflow-hidden"
						/>
          </CardBody>
          <Divider />
          <CardBody>
            <Button size="md">Перейти</Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className={`${cardTitle()} text-center mb-3`}>
              Атлас визуальных элементов
            </p>
            <p className="text-center">
              Результаты исследования визуального ряда азбук, букварей, книг для
              чтения, изданных в России XIX – начала XX в.
            </p>
						<Image 
							src={gridImage5.src}
							className="w-full relative overflow-hidden"
						/>
          </CardBody>

          <CardBody>
            <Button size="md">Перейти</Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className={`${cardTitle()} text-center mb-3`}>
              El Centro de Investigación MANES
            </p>
            <p className="text-center">
              Центр изучения школьных учебников при Национальном университете
              дистанционного образования (Испания).
            </p>
						<Image 
							src={gridImage6.src}
							className="w-full relative overflow-hidden"
						/>
          </CardBody>
          <CardBody>
            <Button size="md">Перейти</Button>
          </CardBody>
        </Card>
      </div>

      <h1
        className={`${title()} flex flex-col text-center items-center mt-5 mb-5`}
      >
        Команда проекта
      </h1>

      <div>
        <div>
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w[610px]"
            shadow="sm"
          >
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
                <p className="">
                  Доктор педагогических наук, профессор, декан факультета
                  искусств, социальных и гумманитарных наук Тульского
                  государственного педагогического университета имю. Л. Н.
                  Толстого
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
				{/*<p className={'${subtitle()} text-center my-5'}>Напишите нам: Ваши предложения и вопросы, связанные с работой информационного ресурса "История школьного учебника"</p>
				 <div className="grid grid-cols-2">
					<div>
						<h1 className={title()}>Напишите нам</h1>
						<p>Ваши предложения и вопросы, связанные с работойинформационного ресурса "История школьная учебника".</p>
						<p>Рабочее местоположение</p>
						<p>Тула, пр-т. Ленина, 125, учебный корпус №4</p>
						<p>Контакты для связи</p>
						<p>primer@tsput.ru</p>
					</div>
					<Card className="w:1/2">
						<CardBody className="flex flex-col text-center items-center mb-5 	p-10">
							<h1 className={title()}>Обратная связь</h1>
							<div className="w-full">
								<Input label="Имя" className="my-5" />
								<Input label="Email" type="email" className="mb-5" />
								<Textarea label="Описание" />
							</div>
						</CardBody>
        	</Card>
				</div> */}
      </div>
    </section>
  );
}
