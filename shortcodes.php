<?php
function wpcp_empty_paragraph_fix( $content ) {
	// An array of the offending tags.
	$arr = array(
		'<p>[' => '[',
		']</p>' => ']',
		']<br />' => ']',
		'<br />' => '',
		'<br>' => '',
		'<br/>' => '',
	);
	// Remove the offending tags and return the stripped content.
	$stripped_content = strtr( $content, $arr );

	return $stripped_content;
}

function wpcp_shortcode_question( $atts, $content ) {
	$atts = shortcode_atts( array(
		'title' => '',
		'id'    => 'q-1'
	), $atts, 'question' );

	$html = '<div id="' . esc_attr( $atts['id'] ) . '" class="q-block"><span class="q-text">' . esc_html( $atts['title'] ) . '</span>

	<span class="q-answers">' . do_shortcode( wpcp_empty_paragraph_fix( $content ) ) . '</span></div>';
	return $html;
}
add_shortcode( 'wpcp-question', 'wpcp_shortcode_question' );

function wpcp_shortcode_question_answer( $atts, $content ) {
	$atts = shortcode_atts( array(
		'class' => '',
		'data-c' => '',
	), $atts, 'question-answer' );

	$html = '<span class="' . esc_attr( $atts['class'] ) . '" data-c="' . esc_attr( $atts['data-c'] ) . '">' . wp_kses_post( wpcp_empty_paragraph_fix( $content ) ) . '</span>';
	return wpcp_empty_paragraph_fix( $html );
}
add_shortcode( 'wpcp-question-answer', 'wpcp_shortcode_question_answer' );

function wpcp_shortcode_answer_block( $atts, $content ) {
	$atts = shortcode_atts( array(
		'for' => '',
		'default' => 'false'
	), $atts, 'answer-block' );

	$default_class = '';

	if ( $atts['default'] !== 'false' ) {
		$default_class = 'var-block--default';
	}

	$html = '<span class="var-block ' . esc_attr( $default_class ) . '" data-qm="' . esc_attr( $atts['for'] ). '">' . wp_kses_post( wpcp_empty_paragraph_fix( $content ) ) . '</span>';
	return wpcp_empty_paragraph_fix( $html );
}
add_shortcode( 'wpcp-answer-block', 'wpcp_shortcode_answer_block' );


function wpcp_shortcode_answers_block( $atts, $content ) {
	$html = '<div class="var-blocks">' . do_shortcode( wpcp_empty_paragraph_fix ( $content ) ) . '</div>';
	return $html;
}
add_shortcode( 'wpcp-answers-block', 'wpcp_shortcode_answers_block' );
