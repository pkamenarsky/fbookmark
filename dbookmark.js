function ls() {
	return io.File(options.get("dbpath").stringValue).readDirectory();
}

function dirname(path) {
	return path.substring(path.lastIndexOf(io.File.PATH_SEP) + 1);
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
			argCount: 1,
			completer: function(context) {
				context.title = ["Path"];
				context.completions = ls().filter(function (file) {
					return file.isDirectory();}).map(function (dir) {
						return [dirname(dir.path), dir.path]});
			}
		});
