import path from 'path-browserify';

export const absoluteUrl = (url: string, repo: string) : string => {
  if ((/^http(s)?:\/\//i).test(url)) {
    return url;
  }

  const repoUrl = new URL(repo.replace(/\.git$/, ''));

  let absolute = '';

  switch (repoUrl.host.toLowerCase()) {
    case 'github.com':
      absolute = path.join('https://raw.githubusercontent.com', repoUrl.pathname, 'HEAD', url)
      break;
    case 'bitbucket.org':
      absolute = path.join('https://bitbucket.org', repoUrl.pathname, 'raw/HEAD', url)
      break;
    default:
      // GitLab
      absolute = path.join(repoUrl.hostname, repoUrl.pathname, '-/raw/HEAD', url)
  }

  return absolute.toString();
};
