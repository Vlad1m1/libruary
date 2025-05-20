import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center">
      <div>
        <h1 className={`${title()} flex flex-col text-center items-center justify-center gap-4 py-8 md:py-10`}>История школьного <br/> учебника</h1>
				<p className="text-center">Настоящий ресурс представляет собой полнотекстовую базу данных документов двух типов: цифровые копии учебных пособий и публикации результатов их исследований. Материалы систематизированы по странам и хронологии издания, авторам-составителям. В основу положена коллекция Виталия Григорьевича Безрогова (1959-2019). Ресурс создан специалистами – историками образования из России и зарубежных научных центров, поддержан грантами РФФИ (проекты 20-013-00227, 20-013-00246).</p>
				<p className={`${subtitle()} flex flex-col text-center items-center justify-center gap-4 py-8 md:py-10`}>Выберете удобную для вас навигацию</p>
				<div className="flex text-center gap-60">
					<div>
						<a href=""></a>
						<h4>Год издания</h4>
						<p>Сортировка учебников по дате издания</p>
					</div>
					<div>
						<h4>Автор</h4>
						<p>Поиск по автору книг</p>
					</div>
					<div>
						<h4>Язык</h4>
						<p>Навигация по языку издания</p>
					</div>
				</div>
      </div>
			<div className="w-full color-black flex gap-60">
			
			</div>
    </section>
  );
}
