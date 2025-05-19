"use client";

import React, {useEffect} from "react";
import {Button, Input, Checkbox, Link, Form, Divider} from "@heroui/react";
import {Icon} from "@iconify/react";
import bgImageSrc from '../public/BG_HQ.webp';
import {Logo} from "@/components/icons";

export default function Component() {
	const [isVisible, setIsVisible] = React.useState(false);
	
	const toggleVisibility = () => setIsVisible(!isVisible);
	
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("handleSubmit");
	};
	
	useEffect(() => {
		console.log(bgImageSrc);
	}, [])
	
	return (
		<div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
			<div className="bg-cover bg-center bg-no-repeat absolute top-0 left-0 w-screen h-screen" style={{backgroundImage: `url(${bgImageSrc.src});`}}/>
			<div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small z-[1]">
				<div className="flex flex-col gap-1 items-center">
					<Logo/>
					<h1 className="text-large font-medium">Вход в аккаунт</h1>
				</div>
				
				<Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
					<Input
						isRequired
						label="Email Address"
						name="email"
						placeholder="Enter your email"
						type="email"
						variant="bordered"
					/>
					<Input
						isRequired
						endContent={
							<button type="button" onClick={toggleVisibility}>
								{isVisible ? (
									<Icon
										className="pointer-events-none text-2xl text-default-400"
										icon="solar:eye-closed-linear"
									/>
								) : (
									<Icon
										className="pointer-events-none text-2xl text-default-400"
										icon="solar:eye-bold"
									/>
								)}
							</button>
						}
						label="Password"
						name="password"
						placeholder="Enter your password"
						type={isVisible ? "text" : "password"}
						variant="bordered"
					/>
					<div className="flex w-full items-center justify-end px-1 py-2">
						<Link className="text-default-500" href="#" size="sm">
							Forgot password?
						</Link>
					</div>
					<Button className="w-full" color="primary" type="submit">
						Sign In
					</Button>
				</Form>
				<p className="text-center text-small">
					Need to create an account?&nbsp;
					<Link href="#" size="sm">
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
}
