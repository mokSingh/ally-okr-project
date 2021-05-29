module.exports = {
	parserOptions: {
		project: './tsconfig.json'
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'airbnb-typescript',
		'airbnb/hooks',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:prettier/recommended',
		'airbnb-typescript-prettier'
	],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/prefer-regexp-exec': 'off',
		'class-methods-use-this': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/prefer-default-export': 'off',
		'import/no-unresolved': 'off',
		'import/extensions': 'off',
		'react/jsx-props-no-spreading': 'off',
		'no-console': 'off',
		'no-return-assign': 'off',
		"@typescript-eslint/no-var-requires": "off", // Disallows the use of require statements except in import statements
		"eqeqeq": ["error", "smart"], // Require === and !==
		"curly": "warn",// Require Curly Brace Conventions
		"max-params": ["error", 7], // enforce a maximum number of parameters in function definitions
		"object-shorthand": "error", // Require Object Literal Shorthand Syntax
		"prefer-template": "warn", // Suggest using template literals instead of string concatenations
		"no-return-await": "error", // Disallows unnecessary return await
		"consistent-return": "error" // require return statements to either always or never specify values
	},
	ignorePatterns: ['.eslintrc.js']
};
