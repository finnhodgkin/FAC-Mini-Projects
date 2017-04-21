module.exports = {
    method: 'GET',
    path: '/admin/{param*}',
    handler: {
        directory: {
            path: './build',
            redirectToSlash: true,
            index: true
        }
    }
};
