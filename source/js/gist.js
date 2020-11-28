(function (window) {
  const FILE_NAME = 'post-like.json';

  async function updatePostLikeGist(octokit, postLikeGistId, content) {
    const { status, data } = await octokit.request('PATCH /gists/{gistId}', {
      gistId: postLikeGistId,
      files: {
        [FILE_NAME]: {
          content: content
        }
      }
    });

    if (status !== 200) {
      return;
    }

    return {
      id: data.id,
      file: data.files[FILE_NAME]
    };
  }

  async function getPostLikeGist(octokit) {
    const fileGistIdMap = await getFileGistIdMap(octokit);
    const postLikeGistId = fileGistIdMap.get(Array.from(fileGistIdMap.keys()).find(file => file.filename === FILE_NAME));

    if (!postLikeGistId) {
      return await createPostLikeGist(octokit);
    }

    const { status, data } = await octokit.request('GET /gists/{gistId}', {
      gistId: postLikeGistId
    });

    if (status !== 200) {
      return;
    }

    return {
      id: data.id,
      file: data.files[FILE_NAME]
    };
  }

  async function getFileGistIdMap(octokit) {
    const { status, data } = await octokit.request('GET /gists');

    if (status !== 200) {
      return;
    }

    const fileGistIdMap = new Map();
    data.reduce(function (map, gist) {
      Object.values(gist.files).forEach(file => map.set(file, gist.id));
      return map;
    }, fileGistIdMap);

    return fileGistIdMap;
  }

  async function createPostLikeGist(octokit) {
    const { status, data } = await octokit.request('POST /gists', {
      accept: 'application/vnd.github.v3+json',
      description: 'A gist to record likes of each post. It\'s used by Hexo theme candelas. https://github.com/DukeLuo/hexo-theme-candelas',
      files: {
        [FILE_NAME]: {
          content: JSON.stringify({})
        }
      },
      public: true
    });

    if (status !== 201) {
      return;
    }

    return {
      id: data.id,
      file: data.files[FILE_NAME]
    };
  }

  const candelas = window.candelas || {};

  candelas.getPostLikeGist = getPostLikeGist;
  candelas.updatePostLikeGist = updatePostLikeGist;
  window.candelas = candelas;
})(window);
