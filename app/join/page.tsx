'use client'
import React, { useState } from 'react'
import { Card,CardBody } from "@nextui-org/card";
import { Tabs,Tab } from "@nextui-org/tabs";
import TabLogin from '@components/page/login/TabLogin';
import TabSignup from '@components/page/signup/TabSignup';

const Join = () => {
	const [selected, setSelected] = useState<string>("login");

	return (
		<div className="flex flex-col w-full h-full justify-center">
			<div className="flex justify-center">
				<Card className="max-w-full w-[340px] h-[400px]">
					<CardBody className="overflow-hidden">
						<Tabs
							fullWidth
							size="md"
							aria-label="Tabs form"
							selectedKey={selected}
							onSelectionChange={setSelected}
						>
							<TabLogin	key='login' select={(e) => setSelected(e)} />
							<TabSignup	key='sign-up' select={(e) => setSelected(e)} />
						</Tabs>
					</CardBody>
				</Card>
			</div>
		</div>
	);
}

export default Join
