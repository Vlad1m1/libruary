import { Input } from "@heroui/input";
import { title } from "@/components/primitives";
import { Button } from "@heroui/button"

export default function AuthorizationPage() {
	return(
		<div className="flex w-full flex-col">
			<h1 className={title()}>Авторизация</h1>
			<Input label="Электронная почта" type="email" className="mb-5 mt-5" />
			<Input label="Пароль" type="password" />
			<Button className="mt-5 mb-5" size="lg">Войти</Button>
			<Button size="lg">Зарегистрироваться</Button>
		</div>
	);
}