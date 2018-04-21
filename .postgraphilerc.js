module.exports = {
	options: {
        appendPlugins: '<UPDATE THIS PATH>/node_modules/postgraphile-plugin-connection-filter/index.js',
		connection: 'postgres://demo_api:demo123@localhost:5432/demo_dev',
		schema: ['demo'],
		defaultRole: 'demo_user'
	}
};
