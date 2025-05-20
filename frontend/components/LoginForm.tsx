"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {Button, Input, Link} from "@heroui/react";
import {Icon} from "@iconify/react";
import bgImageSrc from '../public/BG1.webp';
import {Logo} from "@/components/icons";
import AuthService from "@/service/AuthService";

type FormData = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	
	const [isVisible, setIsVisible] = React.useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);
	
	const onSubmit = (data: FormData) => {
		//AuthService.login(data.email, data.password);
	};
	
	return (
		<div className="flex h-[calc(100vh-200px)] w-full items-center justify-center">
			<div className="bg-cover bg-center bg-no-repeat absolute top-0 left-0 w-screen h-screen"
				 style={{backgroundImage: `url(${bgImageSrc.src})`}}/>
			
			<div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small z-[1]">
				<div className="flex flex-col gap-1 items-center">
					<Logo/>
					<h1 className="text-large font-medium">Вход в аккаунт</h1>
				</div>
				
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
					<Input
						isRequired
						label="Email Address"
						placeholder="Enter your email"
						type="email"
						variant="bordered"
						errorMessage={errors.email?.message}
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Invalid email address"
							}
						})}
					/>
					
					<Input
						isRequired
						label="Password"
						placeholder="Enter your password"
						type={isVisible ? "text" : "password"}
						variant="bordered"
						errorMessage={errors.password?.message}
						endContent={
							<button type="button" onClick={toggleVisibility}>
								{isVisible ? (
									<Icon className="pointer-events-none text-2xl text-default-400"
										  icon="solar:eye-closed-linear"/>
								) : (
									<Icon className="pointer-events-none text-2xl text-default-400"
										  icon="solar:eye-bold"/>
								)}
							</button>
						}
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 6,
								message: "Password must be at least 6 characters"
							}
						})}
					/>
					
					<div className="flex w-full items-center justify-end px-1 py-2">
						<Link className="text-default-500" href="#" size="sm">
							Forgot password?
						</Link>
					</div>
					
					<Button className="w-full" color="primary" type="submit">
						Sign In
					</Button>
				</form>
				
				<p className="text-center text-small">
					Need to create an account?&nbsp;
					<Link href="#" size="sm">Sign Up</Link>
				</p>
			</div>
		</div>
	);
}
