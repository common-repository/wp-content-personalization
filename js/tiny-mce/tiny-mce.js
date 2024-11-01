'use strict';

(function () {

	var count = 0;
	var uniqueID = Math.random().toString(36).substr(2, 9);

	tinymce.PluginManager.add('wpcp_tc_button', function (editor, url) {
		editor.addButton('wpcp_tc_button', {
			title: 'Add Personalised Content',
			type: 'menubutton',
			image: url + '../../../images/wp-octo-button.png',

			menu: [{
				text: 'Two Answers',
				onclick: function onclick() {
					editor.windowManager.open({
						title: 'Insert Question',
						body: [{
							type: 'textbox',
							name: 'title',
							label: 'Question title',
						}, {
							type: 'textbox',
							name: 'a1',
							label: 'Answer One',
    						layout: 'flex',
						}, {
							type: 'textbox',
							name: 'a2',
							label: 'Answer Two',
    						layout: 'flex',
						},
						{
							type   : 'container',
							html   : '<div style="margin-top: 1em; margin-bottom: 1em; height: 1em;"><hr /></div>',
    						layout: 'flex',
						},
						{
							type: 'textbox',
							name: 'ablock1',
							label: 'Content for Answer One',
    						layout: 'flex',
						},
						{
							type: 'textbox',
							name: 'ablock2',
							label: 'Content for Answer Two',
    						layout: 'flex',
						}
						],
						onsubmit: function onsubmit(e) {
							count++;
							uniqueID = uniqueID + count;
							editor.insertContent('[wpcp-question title="' + e.data.title + '" id="q-' + uniqueID + '"]<br />\n[wpcp-question-answer class="a-1"]' + e.data.a1 + '[/wpcp-question-answer]<br />\n[wpcp-question-answer class="a-2"]' + e.data.a2 + '[/wpcp-question-answer]<br />\n[/wpcp-question]<br />\n<br /><br />\n[wpcp-answers-block][wpcp-answer-block default="true" for="q-' + uniqueID + '-a-1"]' + e.data.ablock1 + '[/wpcp-answer-block]<br />\n[wpcp-answer-block for="q-' + uniqueID + '-a-2"]' + e.data.ablock2 + '[/wpcp-answer-block][/wpcp-answers-block]');
						}
					});
				}
			}, {
				text: 'Three Answers',
				onclick: function onclick() {
					editor.windowManager.open({
						title: 'Insert Question',
						body: [{
							type: 'textbox',
							name: 'title',
							label: 'Question title'
						}, {
							type: 'textbox',
							name: 'a1',
							label: 'Answer One'
						}, {
							type: 'textbox',
							name: 'a2',
							label: 'Answer Two'
						}, {
							type: 'textbox',
							name: 'a3',
							label: 'Answer Three'
						},
						{
							type   : 'container',
							html   : '<div style="margin-top: 1em; margin-bottom: 1em; height: 1em;"><hr /></div>'
						},
						{
							type: 'textbox',
							name: 'ablock1',
							label: 'Content for Answer One'
						},
						{
							type: 'textbox',
							name: 'ablock2',
							label: 'Content for Answer Two'
						},
						{
							type: 'textbox',
							name: 'ablock3',
							label: 'Content for Answer Three'
						}
						],
						onsubmit: function onsubmit(e) {
							count++;
							uniqueID = uniqueID + count;
							editor.insertContent('[wpcp-question title="' + e.data.title + '" id="q-' + uniqueID + '"]\n[wpcp-question-answer class="a-1"]' + e.data.a1 + '[/wpcp-question-answer]<br />\n[wpcp-question-answer class="a-2"]' + e.data.a2 + '[/wpcp-question-answer]<br />\n[wpcp-question-answer class="a-3"]' + e.data.a3 + '[/wpcp-question-answer]<br />\n[/wpcp-question]<br />\n<br /><br />\n[wpcp-answers-block][wpcp-answer-block for="q-' + uniqueID + '-a-1" default="true"]' + e.data.ablock1 + '[/wpcp-answer-block]<br />\n[wpcp-answer-block for="q-' + uniqueID + '-a-2"]' + e.data.ablock2 + '[/wpcp-answer-block]<br />\n[wpcp-answer-block for="q-' + uniqueID + '-a-3"]' + e.data.ablock3 + '[/wpcp-answer-block][/wpcp-answers-block]');
						}
					});
				}
			}, {
				text: 'Four Answers',
				onclick: function onclick() {
					editor.windowManager.open({
						title: 'Insert Question',
						body: [{
							type: 'textbox',
							name: 'title',
							label: 'Question title'
						}, {
							type: 'textbox',
							name: 'a1',
							label: 'Answer One'
						}, {
							type: 'textbox',
							name: 'a2',
							label: 'Answer Two'
						}, {
							type: 'textbox',
							name: 'a3',
							label: 'Answer Three'
						}, {
							type: 'textbox',
							name: 'a4',
							label: 'Answer Four'
						},
						{
							type   : 'container',
							html   : '<div style="margin-top: 1em; margin-bottom: 1em; height: 1em;"><hr /></div>'
						},
						{
							type: 'textbox',
							name: 'ablock1',
							label: 'Content for Answer One'
						},
						{
							type: 'textbox',
							name: 'ablock2',
							label: 'Content for Answer Two'
						},
						{
							type: 'textbox',
							name: 'ablock3',
							label: 'Content for Answer Three'
						},
						{
							type: 'textbox',
							name: 'ablock4',
							label: 'Content for Answer Four',
						}
						],
						onsubmit: function onsubmit(e) {
							count++;
							uniqueID = uniqueID + count;
							editor.insertContent('[wpcp-question title="' + e.data.title + '" id="q-' + uniqueID + '"]\n[wpcp-question-answer class="a-1"]' + e.data.a1 + '[/wpcp-question-answer]<br />\n[wpcp-question-answer class="a-2"]' + e.data.a2 + '[/wpcp-question-answer]<br />\n[wpcp-question-answer class="a-3"]' + e.data.a3 + '[/wpcp-question-answer]<br />\n[wpcp-question-answer class="a-4"]' + e.data.a4 + '[/wpcp-question-answer]<br />\n[/wpcp-question]<br />\n<br /><br />\n[wpcp-answers-block][wpcp-answer-block for="q-' + uniqueID + '-a-1" default="true"]' + e.data.ablock1 + '[/wpcp-answer-block]<br />\n[wpcp-answer-block for="q-' + uniqueID + '-a-2"]' + e.data.ablock2 + '[/wpcp-answer-block]<br />\n[wpcp-answer-block for="q-' + uniqueID + '-a-3"]' + e.data.ablock3 + '[/wpcp-answer-block]<br />\n[wpcp-answer-block for="q-' + uniqueID + '-a-4"]' + e.data.ablock4 + '[/wpcp-answer-block][/wpcp-answers-block]');
						}
					});
				}
			}]
		});
	});
})();
