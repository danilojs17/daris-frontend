import React from "react";
import "@styles/globals.scss";
import { Metadata } from "next";
import { Providers } from "./providers";
import clsx from "clsx";
import Navbar from "@components/base/navbar/navbar";
import { siteConfig } from "@config/site";
import { fontSans } from "@config/fonts";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="w-screen h-screen flex justify-center">
						<div className="flex flex-col items-center">
							<Navbar />
							{children}
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
