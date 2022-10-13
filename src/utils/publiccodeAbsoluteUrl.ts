import path from 'path-browserify';

export const absoluteUrl = (url: string, repo: string) : string => {
  if ((/^http(s)?:\/\//i).test(url)) {
    return url;
  }

  const repoUrl = new URL(repo.replace(/\.git$/, ''));

  switch (repoUrl.host.toLowerCase()) {
    case 'github.com':
      return 'https://raw.githubusercontent.com' + path.join(repoUrl.pathname, 'HEAD', url)
    case 'bitbucket.org':
      return 'https://bitbucket.org' + path.join(repoUrl.pathname, 'raw/HEAD', url)
    default:
      // GitLab
      return `${repoUrl.protocol}//${repoUrl.hostname}` + path.join(repoUrl.pathname, '-/raw/HEAD', url)
  }
};
