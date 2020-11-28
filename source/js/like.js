import { Octokit } from 'https://cdn.skypack.dev/@octokit/core';

(async function ($) {
  const $post = $('#post');
  const postTitle = $post.attr('data-post-title');
  const $likeIcon = $('#post-like .like-icon');
  const $likeCount = $('#like-count');
  const token = $('#post-like').attr('data-token');
  const octokit = new Octokit({
    auth: window.atob(token)
  });

  const fingerprint = await window.candelas.getFingerprint();
  const { id, file: { content } } = await window.candelas.getPostLikeGist(octokit);
  const likeMap = JSON.parse(content) || {};
  const postLikes = likeMap[postTitle] || [];

  $likeCount.text(postLikes.length || '');
  $likeIcon.on('click', () => {
    if (postLikes.includes(fingerprint)) {
      return ;
    }
    postLikes.push(fingerprint);
    likeMap[postTitle] = postLikes;
    $likeCount.text(postLikes.length);
    window.candelas.updatePostLikeGist(octokit, id, JSON.stringify(likeMap));
  });
})(jQuery);
