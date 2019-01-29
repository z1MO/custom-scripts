<?php
error_reporting(E_ERROR);
header('Content-type: text/plain; charset=utf-8');

require './lib/simple_html_dom.php';

function getNameTrack($url) {
	$htmlPage = file_get_html($url);
	$titleTrack = $htmlPage->find('.medias_audio_title', 0)->plaintext;
	$titleTrack = preg_split('/(\s\s|\()/', $titleTrack)[1];
	$artistTrack = $htmlPage->find('.medias_audio_artist', 0)->plaintext;
	$isPreviewTrack = preg_match('[Preview]', $artistTrack);

	if($isPreviewTrack) {
		$artistTrack = str_replace('[Preview] ', '', $artistTrack);

		return "$artistTrack - $titleTrack";
	}

	return 'This is not preview.';
}

function checkParams($param, $type) {
	if($type === 'id') {
		return preg_match('/(-43308987_\d{6}|-31352730_\d{6})/', $param);
	} elseif($type === 'link') {
		return preg_match('/https:\/\/(m\.)?vk\.com/', $param);
	}

	return false;
}

function init() {

	if(isset($_GET['postID'])) {

		$postID = $_GET['postID'];

		if(checkParams($postID, 'id')) {
			$response = getNameTrack('https://m.vk.com/wall' . $postID);
		} else {
			$response = 'Fuck you.';
		}

	} elseif(isset($_GET['postURL'])) {

		$postURL = $_GET['postURL'];
		if(checkParams($postURL, 'link')) {
			$postURL = str_replace('//v', '//m.v', $postURL);
			$response = getNameTrack($postURL);
		} else {
			$response = 'Fuck you.';
		}

	} else {
		$response = 'No parameters';
	}

	echo $response;
}

init();

