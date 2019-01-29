<?php
error_reporting(E_ERROR);
header('Access-Control-Allow-Origin: https://www.youtube.com');
header('Content-type: text/plain; charset=utf-8');

require './lib/simple_html_dom.php';

function getInfoPodcast($title) {
	$encodeTitle = urlencode($title);
	$resultSearch = json_decode( file_get_contents("https://www.1001tracklists.com/ajax/search_tracklist.php?p=$encodeTitle&noIDFieldCheck=true&fixedMode=true&sf=p") );
	$firstResultID = $resultSearch->data[0]->properties;

	// echo var_dump($resultSearch);

	return [
		'title' => $firstResultID->tracklistname,
		'url' => "https://www.1001tracklists.com/tracklist/{$firstResultID->id_unique}/",
	];
}

function parsePagePodcast($parseInfoPodcast) {
	// $urlTracklist = 'https://www.1001tracklists.com/tracklist/1syn4hxk/tujamo-spinnin-sessions-245-2018-01-18.html';
	$htmlPage = file_get_html($parseInfoPodcast['url']);

	// echo var_dump($parseInfoPodcast['url']);
	// echo var_dump($htmlPage);

	$res = [
		'name' => $parseInfoPodcast['title'],
		'tracklist' => []
	];

	foreach($htmlPage->find('tr[id^="tlp_"]') as $track) {
		if(preg_match('/tlp_\d{7}/', $track->id)) {
			$res['tracklist'][] = [
				'name' => $track->find('meta[itemprop=name]', 0)->attr['content'],
				'duration' => $track->find('meta[itemprop=duration]', 0)->attr['content'],
				'url' => $track->find('meta[itemprop=url]', 0)->attr['content'],
				'timestamp' => $track->find('#tlp_cue_seconds' . substr($track->id, 3), 0)->attr['value'],
			];
		}
	}

	return $res;
}

function init() {

	if(isset($_GET['titlePosdcast'])) {
		$titlePodcast = $_GET['titlePosdcast'];

		$infoPodcast = getInfoPodcast($titlePodcast);
		$infoTracklist = parsePagePodcast($infoPodcast);
		$response = $infoTracklist;

	} elseif(isset($_GET['urlTracklist'])) {
		$urlTracklist = $_GET['urlTracklist'];

		$infoTracklist = parsePagePodcast($urlTracklist);
		$response = $infoTracklist;

	} else {
		$response = [
			'error' => 'Specify information about the podcast'
		];
	}

	echo json_encode($response);
}

init();