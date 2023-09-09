'use client'
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, useDisclosure} from "@nextui-org/react";
import Image from "next/image";
import ModalDar from "@components/global/modal/modal";
import toast from 'react-hot-toast';

const Home = () => {

	const [isFollowed, setIsFollowed] = React.useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<Button onPress={onOpen} className="max-w-fit">Crear Post</Button>
			<Card className="max-w-[340px]">
				<CardHeader className="justify-between">
					<div className="flex gap-5">
						<Avatar isBordered radius="full" size="md" src="/images/avatar-1.png" />
						<div className="flex flex-col gap-1 items-start justify-center">
							<h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
							<h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
						</div>
					</div>
					<Button
						className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
						color="primary"
						radius="full"
						size="sm"
						variant={isFollowed ? "bordered" : "solid"}
						onPress={() =>{
							 setIsFollowed(!isFollowed)
							 toast('Here is your toast.')
							}}
					>
						{isFollowed ? "Dejar de seguir" : "Seguir"}
					</Button>
				</CardHeader>
				<CardBody className="px-3 py-0 text-small text-default-400">
					<p>
						Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
					</p>
					<span className="pt-2">
						#FrontendWithZoey 
						<span className="py-2" aria-label="computer" role="img">
							💻
						</span>
					</span>
					<div className="overflow-visible py-2">
						<Image
							alt="Card background"
							className="object-cover rounded-xl"
							src="/images/hero-card-complete.jpeg"
							width={300}
							height={200}
						/>
					</div>
				</CardBody>
				<CardFooter className="gap-3">
					<div className="flex gap-1">
						<p className="font-semibold text-default-400 text-small">4</p>
						<p className=" text-default-400 text-small">Following</p>
					</div>
					<div className="flex gap-1">
						<p className="font-semibold text-default-400 text-small">97.1K</p>
						<p className="text-default-400 text-small">Followers</p>
					</div>
				</CardFooter>
			</Card>
			<ModalDar
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			/>
		</section>
	);
}

export default Home