import React from 'react';
import {Input} from "@heroui/input";
import {Form} from '@heroui/form'
import {Button} from "@heroui/button";
import {Link} from "@heroui/link";

const LoginPage = () => {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-xl text-center justify-center">
					<Form
						className="w-full max-w-xs"
					>
						<Input
							isRequired
							errorMessage="Пожалуйста, введите правильный Email"
							label="Email"
							labelPlacement="outside"
							name="email"
							placeholder="Введите Email"
							type="email"
						/>
						<Input
							isRequired
							errorMessage="Пожалуйста, введите gfhjkm"
							label="Пароля"
							labelPlacement="outside"
							name="email"
							placeholder="Введите пароль"
							type="email"
						/>
						<Link href="#">Восстановвить пароль</Link>
						<Button type="submit" variant="bordered">
							Войти
						</Button>
					</Form>
			</div>
		</section>
	);
};

export default LoginPage;
