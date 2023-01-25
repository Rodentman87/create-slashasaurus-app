import { exec } from "child_process";
import { CustomActionFunction } from "plop";
import { mkdir } from "fs/promises";

export const mkdirAction: CustomActionFunction = (answers, config, plop) => {
	const { path } = config;
	return mkdir(plop.renderString(path, answers)).then(() => path);
};

export const yarnInstall: CustomActionFunction = (answers, config, plop) => {
	const { packageName, dev, path } = config;
	const packages = Array.isArray(packageName)
		? packageName.join(" ")
		: packageName;
	const command = dev ? "yarn add -D" : "yarn add";
	return new Promise((resolve, reject) => {
		exec(
			`${command} ${packages}`,
			{ cwd: plop.renderString(path, answers) },
			(error, stdout, stderr) => {
				if (error) {
					reject(stderr);
				}
				resolve(stdout);
			}
		);
	});
};

export const yarnInit: CustomActionFunction = (answers, config, plop) => {
	const { path } = config;
	return new Promise((resolve, reject) => {
		exec(
			`yarn init -y`,
			{ cwd: plop.renderString(path, answers) },
			(error, stdout, stderr) => {
				if (error) {
					reject(stderr);
				}
				resolve(stdout);
			}
		);
	});
};

export const npmInstall: CustomActionFunction = (answers, config, plop) => {
	const { packageName, dev, path } = config;
	const packages = Array.isArray(packageName)
		? packageName.join(" ")
		: packageName;
	const command = dev ? "npm install --save-dev" : "npm install";
	return new Promise((resolve, reject) => {
		exec(
			`${command} ${packages}`,
			{ cwd: plop.renderString(path, answers) },
			(error, stdout, stderr) => {
				if (error) {
					reject(stderr);
				}
				resolve(stdout);
			}
		);
	});
};

export const npmInit: CustomActionFunction = (answers, config, plop) => {
	const { path } = config;
	return new Promise((resolve, reject) => {
		exec(
			`npm init -y`,
			{ cwd: plop.renderString(path, answers) },
			(error, stdout, stderr) => {
				if (error) {
					reject(stderr);
				}
				resolve(stdout);
			}
		);
	});
};

export const gitInit: CustomActionFunction = (answers, config, plop) => {
	const { path } = config;
	return new Promise(async (resolve, reject) => {
		let output = "";
		await new Promise((resolve) => {
			exec(
				`git init`,
				{ cwd: plop.renderString(path, answers) },
				(error, stdout, stderr) => {
					if (error) {
						reject(stderr);
					}
					output += stdout;
					resolve(null);
				}
			);
		});
		await new Promise((resolve) => {
			exec(
				`git add .`,
				{ cwd: plop.renderString(path, answers) },
				(error, stdout, stderr) => {
					if (error) {
						reject(stderr);
					}
					output += stdout;
					resolve(null);
				}
			);
		});
		exec(
			`git commit -m "Initial commit"`,
			{ cwd: plop.renderString(path, answers) },
			(error, stdout, stderr) => {
				if (error) {
					reject(stderr);
				}
				resolve(output + "\n" + stdout);
			}
		);
	});
};
