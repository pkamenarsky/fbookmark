function ls(file) {
	return io.File(options.get("dbpath").stringValue).readDirectory();
}

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
			completer: function(context) {
				context.title = ["Path"];
				// context.completions = [['misc', 'Dropbox/misc'], ['asdas', 'lalalal']];
				// context.completions = [[homedir(), "homedir"]];
				context.completions = ls(homedir()).filter(function(file) {return file.isDirectory;}).map(function (dir) {return [dir.path, dir.path]});
				// context.completions = [ls(homedir())];
			}
		});
