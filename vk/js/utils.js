class Utils {
	/*
	** void func setLikePost
	** param postID: string
	*/
	static setLikePost(postID) {
		const likeBtn = document.querySelector(`#post${postID} ._like_wall${postID} .like_btn.like:not(.active)`);

		if(likeBtn) {
			likeBtn.click();
			return true;
		}

		return false;
	}

}