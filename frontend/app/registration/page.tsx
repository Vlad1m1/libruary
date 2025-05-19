import { Button } from "@heroui/button"
import { title } from "@/components/primitives"
import { Input } from "@heroui/input"

export default function Registration() {
	return (
		<div className="flex w-full flex-col text-align-center mt-5 mb-5">
			<h1 className={title()}>Регистрация</h1>
			<p className="mt-5">Для регистрации, пожалуйста, заполните необходимые данные</p>
			<Input label="Фамилия" className="mt-5" />
			<Input label="Имя" className="mt-5" />
			<Input label="Почта" type="email" className="mt-5" />
			<Input label="Введите пароль" type="password" className="mt-5" />
			<Input label="Введите пароль ещё раз" type="password" className="mt-5" />
			<Button size="lg" className="mt-5" >Создать аккаунт</Button>
		</div>
	);
}