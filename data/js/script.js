jQuery(document).ready(function($) {
	addRow();
	$("#loading").remove();

	$("#addRowButton").click(addRow);
	$("#uploadButton").click(function(e) {
		e.preventDefault();
		if($("form").hasClass("disabled")) return;
		$("form").addClass("disabled");
		$(".progress-bar").css("width", "0").attr("aria-valuenow", 0).removeClass("progress-bar-error progress-bar-success progress-bar-warning").children("span").text("");
		$(".label").removeClass("label-danger label-success label-warning");
		var options = {
			files: [],
			success: function () {
				$(".progress-bar").css("width", "100%").addClass("progress-bar-success").children("span").text("100%");
				$(".label").addClass("label-success").text("Upload successfully finished.");
				$("form").removeClass("disabled");
			},
			progress: function(progress) {
				console.log(progress * 100 + "%");
				$(".progress-bar").css("width", progress * 100 + "%").attr("aria-valuenow", progress * 100).children("span").text(progress * 100 + "%");
				$(".label").text("Uploading...");
			},
			cancel: function () {
				$(".progress-bar").css("width", "100%").addClass("progress-bar-warning").children("span").text("");
				$(".label").addClass("label-warning").text("Upload cancelled.");
				$("form").removeClass("disabled");
			},
			error: function (errorMessage) {
				$(".progress-bar").css("width", "100%").addClass("progress-bar-error").children("span").text("");
				$(".label").addClass("label-danger").text("Upload failed.");
				$("form").removeClass("disabled");
			}
		};
		$(".itemRow").each(function(a,b) {
			if($(b).find("input[type=url]") != "") options.files.push({
				'url':$(b).find("input[type=url]").val(),
				'filename':$(b).find("input[type=text]").val()
			})
		});
		if(options.files.length > 0) {
			Dropbox.save(options);
			$(".progress-bar").children("span").text("...");
			$(".label").text("Upload started.");
		} else {
			$(".progress-bar").children("span").text("");
			$(".label").addClass("label-danger").text("No items.");
			$("form").removeClass("disabled");
		}
	});
});

function addRow() {
	$("#rowTable").append(`<div class="row itemRow">
	<div class="col-6">
		<input class="form-control" type="url" />
	</div>
	<div class="col-6">
		<input class="form-control" type="text" />
	</div>
</div>`);
}