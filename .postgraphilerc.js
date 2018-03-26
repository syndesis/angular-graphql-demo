module.exports = {
	options: {
        appendPlugins: '/Users/p2725398/work/angular-graphql-demo/node_modules/postgraphile-plugin-connection-filter/index.js',
		connection: 'postgres://demo_api:demo123@localhost:5432/demo_dev',
		schema: ['demo'],
		defaultRole: 'demo_user'
	}
};
