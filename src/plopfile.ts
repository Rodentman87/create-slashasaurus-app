import { Actions } from "node-plop";
import { NodePlopAPI } from "plop";
import {
	gitInit,
	mkdirAction,
	npmInstall,
	yarnInstall,
} from "./custom-actions.js";

export default function (plop: NodePlopAPI) {
	plop.setActionType("gitInit", gitInit);
	plop.setActionType("mkdir", mkdirAction);
	plop.setActionType("yarnInstall", yarnInstall);
	plop.setActionType("npmInstall", npmInstall);

	// create your generators here
	plop.setGenerator("basics", {
		description: "this is a skeleton plopfile",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What would you like to name your app?",
			},
			{
				type: "list",
				name: "manager",
				message: "Which package manager do you want to use?",
				choices: ["yarn", "npm"],
			},
		],
		actions: (data) => {
			if (!data || !data.manager) return [];
			let actions: Actions = [];

			actions.push({
				// @ts-expect-error weird type stuff
				type: "mkdir",
				path: `${process.cwd()}/{{name}}/`,
			});

			actions.push({
				type: "add",
				path: `${process.cwd()}/{{name}}/package.json`,
				templateFile: "plop-templates/package.hbs",
			});

			if (data.manager === "yarn") {
				actions.push({
					// @ts-expect-error weird type stuff
					type: "yarnInstall",
					path: `${process.cwd()}/{{name}}/`,
					packageName: ["discord.js@13.x.x", "slashasaurus@latest", "dotenv"],
					dev: false,
				});
				actions.push({
					// @ts-expect-error weird type stuff
					type: "yarnInstall",
					path: `${process.cwd()}/{{name}}/`,
					packageName: ["typescript", "@types/node"],
					dev: true,
				});
			} else {
				actions.push({
					// @ts-expect-error weird type stuff
					type: "npmInstall",
					path: `${process.cwd()}/{{name}}/`,
					packageName: ["discord.js@13.x.x", "slashasaurus@latest", "dotenv"],
					dev: false,
				});
				actions.push({
					// @ts-expect-error weird type stuff
					type: "npmInstall",
					path: `${process.cwd()}/{{name}}/`,
					packageName: ["typescript", "@types/node"],
					dev: true,
				});
			}

			actions.push({
				type: "add",
				path: `${process.cwd()}/{{name}}/.gitignore`,
				templateFile: "plop-templates/gitignore.hbs",
			});
			actions.push({
				type: "add",
				path: `${process.cwd()}/{{name}}/.env`,
				templateFile: "plop-templates/env.hbs",
			});
			actions.push({
				type: "add",
				path: `${process.cwd()}/{{name}}/tsconfig.json`,
				templateFile: "plop-templates/tsconfig.hbs",
			});
			actions.push({
				type: "add",
				path: `${process.cwd()}/{{name}}/README.md`,
				templateFile: "plop-templates/README.hbs",
			});
			actions.push({
				type: "add",
				path: `${process.cwd()}/{{name}}/src/index.ts`,
				templateFile: "plop-templates/index.hbs",
			});
			actions.push({
				type: "add",
				path: `${process.cwd()}/{{name}}/src/commands/chat/ping.ts`,
				templateFile: "plop-templates/command.hbs",
			});

			actions.push({
				// @ts-expect-error weird type stuff
				type: "gitInit",
				path: `${process.cwd()}/{{name}}/`,
				verbose: true,
			});

			return actions;
		},
	});
}
