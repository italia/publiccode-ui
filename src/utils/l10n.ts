/*
 * This is a collection of utils for the localization used on client side code.
 * They work on the string catalogue used by jekyll
 */
import { SOFTWARE_OPEN, SOFTWARE_REUSE } from './constants';
import softwareCategoriesYml from '../_data/crawler/software_categories.yml';
import softwareDevelopmentStatusYml from '../_data/development_status.yml';
import softwareIntendedAudiencesYml from '../_data/crawler/software_scopes.yml';
import l10nYml from '../_data/l10n.yml';

export const lang = window.lang || 'it';
export const l10NLabels = l10nYml[lang]['t'];

export const softwareTypes = [
  [SOFTWARE_OPEN, l10NLabels.software[SOFTWARE_OPEN]],
  [SOFTWARE_REUSE, l10NLabels.software[SOFTWARE_REUSE]],
];

export const getSoftwareCategories = () => {
  return softwareCategoriesYml.map((value) => [value, value.replace(/-/gi, ' ')]);
};

export const getSoftwareDevelopmentStatuses = () => {
  return Object.entries(softwareDevelopmentStatusYml).reduce((acc, [key, value]) => {
    acc.push([key, value[lang]]);
    return acc;
  }, []);
};

export const getSoftwareIntendedAudiences = () => {
  return softwareIntendedAudiencesYml.map((value) => [value, value.replace(/-/gi, ' ')]);
};
