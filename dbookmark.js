group.options.add(["dbpath"],
		"Dropbox bookmarks path",
		"string",
		"~/Dropbox/Documents",
		{
			persist: true,
			scope: Option.SCOPE_GLOBAL
		});

group.commands.add(["dbbookmark"], "Save current page as bookmark in Dropbox folder",
		// command
		function(args) {
			window.alert(options.get("dbpath").stringValue);
			window.alert(io.File("/Users/phil/").directoryEntries);
		},
		
		{
			argCount: 1,
			anchored: true,
			completer: function(context) {
				context.title = ["Path"];
				context.generate = function () {return io.File(options.get("dbpath").stringValue).readDirectory().
					filter(function (file) {return file.isDirectory();})};
				context.keys = {text: function (file) {return file.leafName;},
					description: function (file) {return file.path;}};
			}
		});
