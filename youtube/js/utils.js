/*
**
** Глобальные функции
**
*/
class Utils {

	static replaceWordsTitleVideo(str) {
		const extraWords = [
			/\(Official Music Video\)/,
			/\(Lyric Video\)/,
			/\(Lyrics\) /,
			/\(Official Lyric Video\)/,
			/\[.+\]/,
			/feat\. /,
			/ft\. /,
			/\s[x&+|]/,
			/[,]/,
		];

		for (let word of extraWords) {
			str = str.replace(RegExp(word, 'gi'), '');
		}
		return str.trim();
	}
	static isFavoriteChannel() {
		const channelVideo = document.querySelector('#owner-name > a').innerText;

		return favoriteChannels.some(chann => {
			if(chann.name === channelVideo) return true;
		});
	}
	static isWatchPage() {
		return document.querySelector('ytd-app').getAttribute('is-watch-page') !== null ? true : false;
	}
	static isPodcast() {
		const video = document.querySelector('video');

		if(!video) return false;
		if(video.duration > 30 * 60) return true;

		return false;
	}
	static getTitleVideo(v = document) {
		return this.replaceWordsTitleVideo(v.querySelector('#video-title').innerText).toLowerCase();
	}

}