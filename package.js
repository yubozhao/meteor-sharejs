Package.describe({
    summary: "server (& client library) to allow concurrent editing of any kind of content"
});

Npm.depends({
    share: "0.6.2",
    hiredis: '0.1.15', // See also https://github.com/stevemanuel/meteor-redis
    redis: '0.8.4'
});

var both = ['client', 'server'];

Package.on_use(function (api) {
    api.use('coffeescript', both);
    api.use(['handlebars', 'templating'], 'client');
    api.use(['routepolicy', 'underscore', 'webapp'], 'server');

    // ShareJS script files
    api.add_files([
        '.npm/package/node_modules/share/node_modules/browserchannel/dist/bcsocket.js',
        '.npm/package/node_modules/share/webclient/share.js'
    ], 'client');

    // TODO: a really smart package would not push both of these to the client depending on use case
    api.add_files('lib/ace.js', 'client');
    api.add_files('.npm/package/node_modules/share/webclient/ace.js', 'client');
    api.add_files('.npm/package/node_modules/share/webclient/textarea.js', 'client');

    // Our files
    api.add_files([
        'sharejs-templates.html',
        'sharejs-client.coffee'
    ], 'client');

    // Server files
    api.add_files([
        'sharejs-server.coffee'
    ], 'server');
});
