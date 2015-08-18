$(function() {
	var homeClone = $("#home").clone();
	var paramsClone = $("#params").clone();
	var featuresClone = $("#features").clone();
	
	/*
	 * $("#httpreq").off().on("click", AddHttpReq);
	 * $("#consttimer").off().on("click", AddConstTimer);
	 * $("#regexex").off().on("click", AddRegexEx);
	 */
	/*
	 * $("#start").off().on("click", Start); $("#savetofile").off().on("click",
	 * SaveToFile); $(".btnSave").off().on("click", Save);
	 * $(".btnDelete").off().on("click", Delete);
	 * $(".btnEdit").off().on("click", Edit);
	 */
	var hrefcount = 0;
	$('#addtestplan').click(function() {
		$("#params").replaceWith(paramsClone.clone());
		$("#features").replaceWith(featuresClone.clone());
		$('#params').show();
		$('#features').show();

		$('#saveplan').show();
		$('#buttons').hide();
		$('#start').hide();
		$('#stop').hide();

		$('#savetofile').hide();
		$("#downloadlink").hide();
		$('#testplan').hide();

		$("#httpreq").off().on("click", AddHttpReq);
		$("#consttimer").off().on("click", AddConstTimer);
		$("#regexex").off().on("click", AddRegexEx);

		$("#testtable").resizable();

	});
	$('#crtest').click(function() {

		$('#crtest').hide();
		$('#opentest').hide();
		$('#testplan').show();

	});
	$('#logo').click(function() {
		 location.reload();
		/*$("#home").replaceWith(homeClone.clone());
		$.ajax({
			url : "/LoadGen/",
			type : "GET",
			

			success : function() {
				
				
			},
			error : function() {

				
			}
		});*/


	});
	$('#savetestplan').click(function() {
	
		$('#params').hide();
		
		$('#saveplan').hide();
		$('#testplan').show();
		$('#buttons').show();
		$('#start').show();
		$('#stop').hide();
		$('#savetofile').show();
		$("#downloadlink").hide();
		$("#start").off().on("click", Start);
		$("#savetofile").off().on("click", SaveToFile);
		SavePlan();

	});
	$('#opentest').click(function() {
		$('#openfile').show();
		$('#crtest').hide();
		$('#opentest').hide();

	});

	$("#uploadForm").submit(function(event) {
		event.preventDefault();

		var fileData = new FormData($('#uploadForm')[0]);

		$.ajax({
			url : "/LoadGen/uploadFile",
			type : "POST",
			data : fileData,
			processData : false,
			contentType : false,
			cache : false,

			success : function() {
				$('#buttons').show();
				$('#start').show();
				$('#stop').hide();
				$('#savetofile').show();
				$("#downloadlink").hide();
				$("#start").off().on("click", Start);
				$("#savetofile").off().on("click", SaveToFile);
				$("#status").html('File Uploaded');
				$("#status").show();
				$("#status").delay(2000).fadeOut("slow");
			},
			error : function() {

				$("#status").html('File failed to upload');
				$("#status").show();
				$("#status").delay(2000).fadeOut("slow");
			}
		});

	});

	
	$('input[type=file]').bootstrapFileInput();
	$('.file-inputs').bootstrapFileInput();

	event.preventDefault();

	function getval(sel) {

		var id = sel.parents('tr:first').children("td:nth-child(2)").children(
				"div:nth-child(2)");
		if (this.value === "POST") {
			id.show();
		} else {
			id.hide();
		}
	}
	function SavePlan() {
	
		var tab = $("#paramtable");
		var reqrate = tab.children().children("tr:nth-child(2)").children(
				"td:nth-child(2)").children("input:nth-child(1)").val();
		var duration = tab.children().children("tr:nth-child(3)").children(
				"td:nth-child(2)").children("input:nth-child(1)").val();
		/*
		 * alert("da"); var table = $('#ttable').tableToJSON();
		 * alert(JSON.stringify(table));
		 */
	/*
		var tabledata = $('#ttable').tableToJSON();
		alert(JSON.stringify(tabledata));*/
		$.ajax({
			type : "POST",
			url : "/LoadGen/savetestplan",
			data : {
				reqRate : reqrate,
				duration : duration
			},
			success : function(response) {
				// we have the response
				$('#features').hide();
				$("#status").html("TestPlan Saved");
				$("#status").show();
				$("#status").delay(2000).fadeOut("slow");

			},
			error : function(e) {
				$("#status").html("TestPlan failed to save");
				$("#status").show();
				$("#status").delay(2000).fadeOut("slow");
			}
		});

	};

	function AddHttpReq() {
		$('#testtable').show();
		/* onchange='getval(this);' */
		var uniq1 = hrefcount++;

		var uniq2 = hrefcount++;
		var uniq3 = hrefcount++;

		var uniq4 = hrefcount++;
		var addRow = "<tr><td style='vertical-align: middle;'><label class='control-label'>Http Request</label>&nbsp;&nbsp;<select id='reqtype' class='form-control' "
				+ "style='max-width:40%; display:inline;'><option value='GET' selected>GET</option><option value='POST'>POST</option></select></td>"
				+ "<td><div id='urlbox' class='ui-helper-center'><input type='text' class='form-control' placeholder='Enter URL'/></div>"
				+ "<div id='postparams' style='display: none'>"
				+

				"<ul class='nav nav-tabs'>"
				+ "<li class='active'><a id ='a1' data-toggle='tab' href=''>POST Params</a></li>"
				+ "<li><a id='a2' data-toggle='tab' href='' >POST Body</a></li>"
				+ "</ul>"
				+

				"<div class='tab-content'>"
				+ "<div id='div1' class='tab-pane fade in active'>"
				+ "<table cellpadding='10' cellspacing='10' width='100%' >"
				+ "<tr><td class='ui-helper-center'><b>Param Name</b>"
				+ "</td><td class='ui-helper-center'><b>Param Value</b></td></tr>"
				+ "</table>"
				+ "<input type='image' class='parAdd' src='resources/images/plus.png' width=25 height=25>"
				+ "</div>"
				+ "<div id='div2' class='tab-pane fade'>"
				+ "<textarea width='100%' cols='42' rows='5' name='postdata'>"
				+ "</textarea>"
				+ "</div>"
				+

				"</div>"
				+ "</div>"
				+

				"</td><td style='vertical-align: middle;'><input type='image' src='resources/images/save.jpeg' width=25 height=25 class='btnSave'>"
				+ "<input type='image' src='resources/images/delete.png' width=25 height=25 class='btnDelete'/></td></tr>";
		/* $('#ttable tr:last').after(addRow); */

		$('#ttable > tbody:last-child').append(addRow);
		$(".parAdd").off().on("click", AddParam);
		$(".parDelete").off().on("click", DeleteParam);
		/* $(".parEdit").off().on("click", EditParam); */
		$(".parSave").off().on("click", SaveParam);

		$('#div1').attr("id", uniq1);
		$('#div2').attr("id", uniq2);
		$('#a1').attr("id", uniq3);
		$('#a2').attr("id", uniq4);
		var url1 = '#' + uniq1;
		var url2 = '#' + uniq2;
		$('#' + uniq3).attr("href", url1);
		$('#' + uniq4).attr("href", url2);
		/*
		 * #tbody > tr:nth-child(1) > td:nth-child(2) > div:nth-child(2) >
		 * div:nth-child(2)
		 */
		$('select').on(
				'change',
				function() {
					var id = $(this).parents('tr:first').children(
							"td:nth-child(2)").children("div:nth-child(2)");
					if (this.value === "POST") {
						id.show();
					} else {
						id.hide();
					}
				});
		/*
		 * $("#ttable
		 * tr:last").children("td:nth-child(1)").children("select:nth-child(2)").change(function () {
		 * var id =
		 * $(this).parents('tr:first').children("td:nth-child(2)").children("div:nth-child(2)");
		 * if(this.value==="POST"){ id.show(); } else{ id.hide(); } //alert(id);
		 * });
		 */
		/*
		 * $("#ttable tbody")
		 * 
		 * .append( "<tr>" + "<td><label class='control-label'>HTTP Request
		 * </label>&nbsp;&nbsp;<select id='reqtype' class='form-control'
		 * onchange='getval(this);' style='max-width:40%; display:inline;'><option
		 * value='GET' selected>GET</option><option value='POST'>POST</option></select></td>" + "<td><input
		 * type='text' class='form-control' placeholder='Enter URL'/>" + "<input
		 * type='text' id='postparams' class='form-control' placeholder='Enter
		 * params'/></td>" + "<td><input type='image'
		 * src='resources/images/save.jpeg' width=25 height=25 class='btnSave'><input
		 * type='image' src='resources/images/delete.png' width=25 height=25
		 * class='btnDelete'/></td>" + "</tr>");
		 */
		$(".btnSave").off().on("click", Save);
		$(".btnDelete").off().on("click", Delete);
		/* $('#postparams').hide(); */

	}
	;
	function AddConstTimer() {
		$('#testtable').show();
		var addRow = "<tr><td style='vertical-align: middle;'><label class='control-label'>Constant Timer</label></td> "
				+ "<td class='ui-helper-center'><input type='text' class='form-control' placeholder='Enter Time(millisecs)'/></td> "
				+ "<td style='vertical-align: middle;'><input type='image' src='resources/images/save.jpeg' width=25 height=25 class='btnSave'><input type='image' src='resources/images/delete.png' width=25 height=25 class='btnDelete'/></td></tr>";
		/* $('#ttable tr:last').after(addRow); */
		$('#ttable > tbody:last-child').append(addRow);
		/*
		 * $("#ttable tbody") .append( "<tr>" + "<td><label
		 * class='control-label'>Constant Timer</label></td>" + "<td><input
		 * type='text' class='form-control' placeholder='Enter
		 * Time(millisecs)'/></td>" + "<td><input type='image'
		 * src='resources/images/save.jpeg' width=25 height=25 class='btnSave'><input
		 * type='image' src='resources/images/delete.png' width=25 height=25
		 * class='btnDelete'/></td>" + "</tr>");
		 */
		$(".btnSave").off().on("click", Save);
		$(".btnDelete").off().on("click", Delete);

	}
	;
	function AddRegexEx() {
		$('#testtable').show();
		var addRow = "<tr><td style='vertical-align: middle;'><label class='control-label'>Regex Extractor</label></td>"
				+ "<td><table id='regextable' cellpadding='10' cellspacing='10' width='100%'>"
				+ "<tr><td class='ui-helper-center'><b>Reference Name</b>"
				+ "</td><td class='ui-helper-center'><b>Regex</b></td></tr>"
				+ "<tr><td class='ui-helper-center'><input type='text' class='form-control' placeholder='Enter Reference Name'/>"
				+ "</td><td class='ui-helper-center'><input type='text' class='form-control' placeholder='Enter Regex'/></td></tr></table></td>"
				+ "<td style='vertical-align: middle;'><input type='image' src='resources/images/save.jpeg' width=25 height=25 class='btnSave'><input type='image' src='resources/images/delete.png' width=25 height=25 class='btnDelete'/></td></tr>";
		/* $('#ttable tr:last').after(addRow); */
		$('#ttable > tbody:last-child').append(addRow);
		/*
		 * > tbody:last-child'
		 *//*
			 * $("#ttable tbody") .append( "<tr>" + "<td><label
			 * class='control-label'>Regex Extractor</label></td>" + "<td><div><input
			 * type='text' class='form-control' placeholder='Enter Reference
			 * Name'/></div><div style='display:inline;'><input type='text'
			 * class='form-control' placeholder='Enter Regex' /></div></td>" + "<td><input
			 * type='image' src='resources/images/save.jpeg' width=25 height=25
			 * class='btnSave'><input type='image'
			 * src='resources/images/delete.png' width=25 height=25
			 * class='btnDelete'/></td>" + "</tr>");
			 */
		$(".btnSave").off().on("click", Save);
		$(".btnDelete").off().on("click", Delete);

	}
	;

	function AddParam() {

		var tab = $(this).parent().children("table:nth-child(1)");

		var newRow = "<tr><td class='ui-helper-center'><input type='text' class='form-control' placeholder='Param Name'/></td>"
				+ "<td class='ui-helper-center'><input type='text' class='form-control' placeholder='Param Value'/></td><td style='vertical-align: middle;'>"
				+ "<input type='image' src='resources/images/save.jpeg' width=25 height=25 class='parSave'>"
				+ "<input type='image' src='resources/images/delete.png' width=25 height=25 class='parDelete'/></td></tr>";
		tab.append(newRow);
		$(".parDelete").off().on("click", DeleteParam);
		/* $(".parEdit").off().on("click", EditParam); */
		$(".parSave").off().on("click", SaveParam);
	}
	function EditParam() {
		var tab = $(this).parent().parent();
		var tdName = tab.children("td:nth-child(1)");
		var tdValue = tab.children("td:nth-child(2)");
		var tdButtons = tab.children("td:nth-child(3)");
		tdName
				.html("<input type='text' class='form-control' placeholder='Param Name' value='"
						+ tdName.html() + "'/>");
		tdValue
				.html("<input type='text' class='form-control' placeholder='Param Value' value='"
						+ tdValue.html() + "'/>");
		tdButtons
				.html("<input type='image' src='resources/images/save.jpeg' width=25 height=25 class='parSave'/>");
		$(".parSave").off().on("click", SaveParam);
	}
	function SaveParam() {
		var tab = $(this).parent().parent();
		var tdName = tab.children("td:nth-child(1)");
		var tdValue = tab.children("td:nth-child(2)");
		var tdButtons = tab.children("td:nth-child(3)");

		tdButtons
				.html("<input type='image' src='resources/images/delete.png' width=25 height=25 class='parDelete'/>"
						+ "<input type='image' src='resources/images/edit.jpeg' width=25 height=25 class='parEdit'/>");
		tdName.html(tdName.children("input[type=text]").val());
		tdValue.html(tdValue.children("input[type=text]").val());
		$(".parDelete").off().on("click", DeleteParam);
		$(".parEdit").off().on("click", EditParam);

	}
	function DeleteParam() {

		var tab = $(this).parent().parent();

		tab.remove();
	}
	function Save() {

		var par = $(this).parent().parent();
		var tdName = par.children("td:nth-child(1)").children(
				"label:nth-child(1)");

		var tdButtons = par.children("td:nth-child(3)");

		tdButtons
				.html("<input type='image' src='resources/images/delete.png' width=25 height=25 class='btnDelete'/><input type='image' src='resources/images/edit.jpeg' width=25 height=25 class='btnEdit'/>");
		$(".btnEdit").off().on("click", Edit);
		$(".btnDelete").off().on("click", Delete);

		if (tdName.html() === "Http Request") {
			/*
			 * #ttable > thead:nth-child(2) > tr:nth-child(2) > td:nth-child(2) >
			 * input:nth-child(1)
			 */

			var tdUrl = par.children("td:nth-child(2)").children(
					"div:nth-child(1)");

			var httpType = par.children("td:nth-child(1)").children(
					"select:nth-child(2)");

			tdUrl.html(tdUrl.children("input[type=text]").val());
			if (httpType.val() === "GET") {
				$.ajax({
					type : "POST",
					url : "/LoadGen/httpgetreq",
					data : {
						url : tdUrl.html(),
						httpType : httpType.val(),
						rownum : par.index()
					},
					success : function(response) {
						// we have the response
						$("#status").html("Http Request Added");
						$("#status").show();
						$("#status").delay(2000).fadeOut("slow");

					},
					error : function(e) {
						$("#status").html("Http Request failed to add");
						$("#status").show();
						$("#status").delay(2000).fadeOut("slow");
					}
				});
			} else {
				var table = par.children("td:nth-child(2)").children(
						"div:nth-child(2)").children("div:nth-child(2)")
						.children("div:nth-child(1)").children(
								"table:nth-child(1)");
				/*if ((table).find("tr").not("thead tr").length == 1) {*/
					var rawbody = par.children("td:nth-child(2)").children(
							"div:nth-child(2)").children("div:nth-child(2)")
							.children("div:nth-child(2)").children(
									"textarea:nth-child(1)");
						//alert(rawbody.val());
						var tableparam = table.tableToJSON();
						
						var tabledata = { "url ":tdUrl.html(), "httpType":httpType.val(),"rownum":par.index(),"postBody":rawbody.val(),"postParams":tableparam};
						/*alert(JSON.stringify(tabledata));*/
						$.ajax({
							type : "POST",
							url : "/LoadGen/httppostreq",
							dataType : 'json',
						
						      data: JSON.stringify(tabledata), 
							
							success : function(response) {
								// we have the response
								$("#status").html("Http Request Added");
								$("#status").show();
								$("#status").delay(2000).fadeOut("slow");

							},
							error : function(e) {
								$("#status").html("Http Request failed to add");
								$("#status").show();
								$("#status").delay(2000).fadeOut("slow");
							}
						});
				/*} *//*else {

					var tabledata = table.tableToJSON();
					var actualObj = JSON.parse(jsonText);
					actualObj+={ "url ":tdUrl.html(), "httpType":httpType.val(),"rownum":par.index()};
					tabledata.url=tdUrl.html();
					tabledata.httpType=httpType.val();
					tabledata.rownum=par.index();
					
					//alert(actualData);
					alert(JSON.stringify(actualObj));
				}*/

			}
		} else if (tdName.html() === "Constant Timer") {
			var tdTime = par.children("td:nth-child(2)");

			tdTime.html(tdTime.children("input[type=text]").val());

			$.ajax({
				type : "POST",
				url : "/LoadGen/consttimer",
				data : {
					time : tdTime.html(),
					rownum : par.index()
				},
				success : function(response) {
					// we have the response
					$("#status").html("Constant Timer Added");
					$("#status").show();
					$("#status").delay(2000).fadeOut("slow");

				},
				error : function(e) {
					$("#status").html("Constant Timer failed to add");
					$("#status").show();
					$("#status").delay(2000).fadeOut("slow");
				}
			});
		} else if (tdName.html() === "Regex Extractor") {
			var tdRegexName = par.children("td:nth-child(2)").children()
					.children("tbody:nth-child(1)").children("tr:nth-child(2)")
					.children("td:nth-child(1)");
			var tdRegex = par.children("td:nth-child(2)").children().children(
					"tbody:nth-child(1)").children("tr:nth-child(2)").children(
					"td:nth-child(2)");

			tdRegexName.html(tdRegexName.children("input[type=text]").val());
			tdRegex.html(tdRegex.children("input[type=text]").val());

			$.ajax({
				type : "POST",
				url : "/LoadGen/regexextractor",
				data : {
					refName : tdRegexName.html(),
					regex : tdRegex.html(),
					rownum : par.index()
				},
				success : function(response) {
					// we have the response
					$("#status").html("Regex Added");
					$("#status").show();
					$("#status").delay(2000).fadeOut("slow");
				},
				error : function(e) {
					$("#status").html("Regex failed to add");
					$("#status").show();
					$("#status").delay(2000).fadeOut("slow");
				}
			});
		}

	}
	;
	function Edit() {
		var par = $(this).parent().parent();
		var tdName = par.children("td:nth-child(1)");

		var tdButtons = par.children("td:nth-child(3)");
		var num = par.index();
		// alert(num);
		if (tdName.html() === "Http Request") {

			var tdUrl = par.children("td:nth-child(2)");
			tdUrl
					.html("<input type='text' class='form-control' placeholder='Enter URL' id='txtParam' value='"
							+ tdUrl.html() + "'/>");
		} else if (tdName.html() === "Constant Timer") {
			var tdTime = par.children("td:nth-child(2)");
			tdTime
					.html("<input type='text' class='form-control' placeholder='Enter Time(millisecs)'id='txtParam' value='"
							+ tdTime.html() + "'/>");

		} else if (tdName.html() === "Regex Extractor") {
			var tdRegexName = par.children("td:nth-child(2)").children(
					"div:nth-child(1)");
			var tdRegex = par.children("td:nth-child(2)").children(
					"div:nth-child(2)");
			tdRegexName
					.html("<input type='text' class='form-control' placeholder='Enter Reference Name' id='txtParam' value='"
							+ tdRegexName.html() + "'/>");
			tdRegex
					.html("<input type='text' class='form-control' placeholder='Enter Regex' id='txtParam' value='"
							+ tdRegex.html() + "'/>");
		}
		tdButtons
				.html("<input type='image' src='resources/images/save.jpeg' width=25 height=25 class='btnSave'/>");
		$(".btnSave").off().on("click", Save);
		// $(".btnEdit").bind("click", Edit);
		// $(".btnDelete").bind("click", Delete);
	}
	;

	function Delete() {
		var par = $(this).parent().parent();
		var num = par.index();

		par.remove();
		if ($('#tbody').children('tr').length == 0)
			$('#testtable').hide();
		// alert(num);
		$.ajax({
			type : "POST",
			url : "/LoadGen/remove",
			data : {
				rownum : num
			},
			success : function(response) {
				// we have the response
				$("#status").html("Deleted");
				$("#status").show();
				$("#status").delay(2000).fadeOut("slow");
			},
			error : function(e) {
				$("#status").html("Failed to delete");
				$("#status").show();
				$("#status").delay(2000).fadeOut("slow");
			}
		});

	}
	;
	function Start() {

		$.ajax({
			type : "POST",
			url : "/LoadGen/loadgen",

			success : function(response) {
				// we have the response
				$('#start').hide();
				$('#stop').show();
				$("#stop").off().on("click", Stop);
				$("#status").html("LoadGen Started");
				$("#status").show();
				$("#status").delay(2000).fadeOut("slow");
			},
			error : function(e) {
				$('#stop').show();
				$('#start').hide();
				$("#stop").off().on("click", Stop);
				$("#status").html("LoadGen failed to start");
				$("#status").show();
				$("#status").delay(2000).fadeOut("slow");
			}
		});

	}
	;
	function Stop() {

		$.ajax({
			type : "POST",
			url : "/LoadGen/stop",

			success : function(response) {

				$('#stop').hide();
				$('#start').show();
				$("#start").off().on("click", Start);
				$("#status").html("LoadGen Stopped");
				$("#status").show();
				$("#status").delay(2000).fadeOut("slow");
			},
			error : function(e) {
				$("#status").html("LoadGen failed to stop");
				$("#status").show();
				$("#status").delay(2000).fadeOut("slow");
			}
		});

	}
	;
	function SaveToFile() {

		$.ajax({
			type : "POST",
			url : "/LoadGen/savetofile",

			success : function(response) {
				// we have the response
				$("#buttons").show();
				$("#start").show();
				$("#stop").hide();
				$("#downloadlink").show();
				$("#savetofile").hide();
				$("#status").html("Test Saved to file");
				$("#status").show();
				$("#status").delay(2000).fadeOut("slow");
			},
			error : function(e) {
				$("#status").html("Test failed to save");
				$("#status").show();
				$("#status").delay(2000).fadeOut("slow");
			}
		});

	}
	;
});
