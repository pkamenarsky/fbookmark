group.options.add(["fbpath"],
		"Bookmarks path",
		"string",
		"~",
		{
			persist: true,
			scope: Option.SCOPE_GLOBAL
		});

group.options.add(["fbwebloc"],
		"Bookmarks format",
		"boolean",
		true,
		{
			persist: true,
			scope: Option.SCOPE_GLOBAL
		});

group.commands.add(["fbmark", "fbm"], "Save current page as bookmark in folder",
		// command
		function(item) {
			var bookmark;

			if (options.get("fbwebloc")) {
				bookmark = io.File(options.get("fbpath").stringValue).child("" + item).child(document.title.replace(/\//g, ":").replace(" - Pentadactyl", "") + ".webloc");
				bookmark.write(
					"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
					"<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\n" +
					"<plist version=\"1.0\">\n" +
					"<dict>\n" +
					"	<key>URL</key>\n" +
					"	<string>" + DOM.escapeHTML(buffer.URL) + "</string>\n" +
					"</dict>\n" +
					"</plist>\n");
			}
			else {
				bookmark = io.File(options.get("fbpath").stringValue).child("" + item).child(document.title.replace(/\//g, ":").replace(" - Pentadactyl", "") + ".url");
				bookmark.write(
					"[InternetShortcut]\r\n" +
					"URL=" + DOM.escapeHTML(buffer.URL) + "\r\n");
			}

			dactyl.echomsg("Written " + bookmark.path);
		},
		
		{
			argCount: 1,
			anchored: true,
			completer: function(context) {
				context.title = ["Path"];
				context.generate = function () {return io.File(options.get("fbpath").stringValue).readDirectory().
					filter(function (file) {return file.isDirectory();})};
				context.keys = {text: function (file) {return file.leafName;},
					description: function (file) {return file.path;}};
			}
		});

var INFO =
["plugin", { name: "fbookmark",
             version: "0.1",
             href: "https://github.com/pkamenarsky/fbookmark",
             summary: "Store bookmarks in files",
             xmlns: "dactyl"
           },
    [ "author",  { email: "pk@harmonious.at" }, "Philip Kamenarsky" ],
    [ "license", { href: "http://opensource.org/licenses/mit-license.php" }, "MIT" ],
    [ "project", { name: "FBookmarks", "min-version": "1.0" } ],
    [ "p", {},
      "This plugin stores bookmarks as individual .webloc or .url files directly in",
      "the filesystem. This enables Dropbox integration, system wide bookmark URL search and",
      "better organization of project related links and files (keep everything in one place).",
      "Folder autocompletion is provided." ],
    [ "item", {},
        [ "tags", {}, ":fbmark", ":fbm" ],
        [ "spec", {}, ":fbmark <a>tag</a>" ],
        [ "description", {},
            ["p", {},
              "Creates a bookmark in the folder specified by tag." ]]],
    [ "item", {},
        [ "tags", {}, "'fbwebloc' 'nofbwebloc'" ],
        [ "spec", {}, "'fbwebloc'" ],
        [ "type", {}, "boolean" ],
        [ "default", {}, "fbwebloc" ],
        [ "description",
            [ "p", {},
              "Whether to store the bookmarks as .webloc or .url files."]]],
    [ "item", {},
        [ "tags", {}, "'fbpath'" ],
        [ "spec", {}, "'fbpath'" ],
        [ "type", {}, "string" ],
        [ "type", {}, "~" ],
        [ "description",
            ["p", {},
                "File path for autocompletion items; bookmark files are stored under one of the",
                "autocompletetd items (i.e. folders are misused as bookmark tags)."]]]]

