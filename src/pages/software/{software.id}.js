/* eslint-disable complexity */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { createUseStyles } from 'react-jss';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { graphql, Link } from 'gatsby';

import { absoluteUrl } from '../../utils/publiccodeAbsoluteUrl';
import { Badge } from '../../components/Badge/Badge';
import { Collapse } from '../../components/Collapse';
import { Icon } from '../../components/Icon/Icon';
import { Page } from '../../components/Page/Page';

import '../../i18n';
import { TagList } from '../../components/TagList';

// TODO: remove eslint-disable
// eslint-disable-next-line max-lines-per-function,arrow-body-style
const Software = ({ data: { site, software } }) => {
  const { t, i18n } = useTranslation();

  const useStyles = createUseStyles({
    imageGallery: {
      '& img.image-gallery-image': {
        height: '400px',
      },
    },
  });

  const classes = useStyles();

  const [collapse, setCollapse] = useState(false);
  const toggle = () => {
    setCollapse(!collapse);
  };

  const localizedDescription =
    software.publiccodeYml.description[i18n.language] ||
    software.publiccodeYml.description.en ||
    software.publiccodeYml.description[
      Object.keys(software.publiccodeYml.description).find((k) => software.publiccodeYml.description[k])
    ];

  return (
    <>
      <Helmet>
        <title>{site.siteMetadata.title} - {software.publiccodeYml.name}</title>
      </Helmet>

      <Page>
        <div className="container d-flex flex-column">
          <div className="row pt-4">
            <nav className="breadcrumb-container" aria-label="Percorso di navigazione">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                  <span className="separator">/</span>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/software">Software</Link>
                  <span className="separator">/</span>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {software.publiccodeYml.name}
                </li>
              </ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-md-7">
              <div>
                <h1 className="d-inline-block">{software.publiccodeYml.name}</h1>
                <div>
                  <h2>
                    {software.publiccodeYml.isBasedOn && (
                      <>
                        <br />
                        <span>
                          {t('software.variant_by')}
                          {software.publiccodeYml.legal.repoOwner}
                        </span>
                      </>
                    )}
                  </h2>
                  <p className="fs-5 fw-bolder my-2 my-md-4">{localizedDescription.shortDescription}</p>
                  <div className="my-3 mb-5 d-flex">
                    <ul className="list-inline">
                      <TagList tags={software.publiccodeYml.categories} visibleCount={3} />
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="offset-md-1 col-md-4 ">
              {software.publiccodeYml.logo && (
                <img
                  alt=""
                  width={100}
                  src={absoluteUrl(software.publiccodeYml.logo, software.publiccodeYml.url)}
                  className="d-inline-block"
                />
              )}
              <div>
                {/* TODO vitality
                <div>
                  <p>{t('software.vitality')}:</p>
                  <p className="score d-inline-block"> {page.vitalityScore}%</p>
                  <div id="softwareChart" data-vitality={page.vitalityDataChart}>
                    <canvas id="vitalityChart"></canvas>
                  </div>
                  <div className="info-block d-inline-block">
                    <span className="info-block__icon">i</span>
                    <div className="info-block__msg font-serif">{t.software.tooltip}</div>
                  </div>
                  <div className="status-developement">
                    <p>{`${t('software.development_status')}: ${software.publiccodeYml.developmentStatus}`}</p>
                  </div>
                </div>
                */}
              </div>

            </div>
          </div>
        </div>

        <div className='container-fluid bg-secondary'>
          <div className='container py-5'>
            <div className="d-flex flex-wrap">
              {software.publiccodeYml.legal.repoOwner && (
                <div className="d-flex flex-column w-25">
                  <div className="fs-6 fw-bolder">{t('software.published_by')}</div>
                  <div className="fs-6 fw-bold">{software.publiccodeYml.legal.repoOwner}</div>
                </div>
              )}

              <div className="d-flex flex-column w-25">
                <div className="fs-6 fw-bolder">{t('software.last_release')}</div>
                <div className="fs-6 fw-bold">
                  {software.publiccodeYml.releaseDate}
                  {software.publiccodeYml.softwareVersion && ` (${software.publiccodeYml.softwareVersion})`}
                </div>
              </div>

              {software.publiccodeYml.maintenance.type === 'contract' &&
                software.publiccodeYml.maintenance.contractors?.length > 0 && (
                  <div className="d-flex flex-column w-25">
                    <div className="fs-6 fw-bolder">{t('software.software_maintained_by')}</div>
                    {software.publiccodeYml.maintenance.contractors.map((c) => {
                      c.website ? (
                        <div clasName="fs-6 fw-bold">
                          <a href={c.website}>{c.name}</a>
                        </div>
                      ) : (
                        <p>{c.name}</p>
                      );
                    })}
                  </div>
                )}

              {software.publiccodeYml.maintenance.contacts && (
                <div className="d-flex flex-column w-25">
                  <div className="fs-6 fw-bolder">
                    {t('software.technical_contact', { count: software.publiccodeYml.maintenance.contacts.length })}
                  </div>{' '}
                  {software.publiccodeYml.maintenance.contacts.map((contact) => {
                    if (contact.email) {
                      return (
                        <div className="fs-6 fw-bold">
                          <a href={`mailto:${contact.email}`}>{contact.name}</a> {contact.phone}{' '}
                        </div>
                      );
                    }
                    return (
                      <>
                        {contact.name} {contact.phone}{' '}
                      </>
                    );
                  })}
                </div>
              )}

              <div className="d-flex flex-column w-25">
                <div className="fs-6 fw-bolder">{t('software.maintainance_type')}</div>
                <div className="fs-6 fw-bold">{software.publiccodeYml.maintenance.type}</div>
              </div>

              <div className="d-flex flex-column w-25">
                <div className="fs-6 fw-bolder">{t('software.license')}</div>
                <div className="fs-6 fw-bold">{software.publiccodeYml.legal.license}</div>
              </div>

              {software.publiccodeYml.maintenance.type === 'contract' &&
                software.publiccodeYml.maintenance.contractors && (
                  <div className="d-flex flex-column w-25">
                    <div className="fs-6 fw-bolder">{t('software.contract_with')}</div>
                    <div className="fs-6 fw-bold">
                      {software.publiccodeYml.maintenance.contractors.map((contractor) => (
                        // <title id="software-support-ended">{t('software.contract_warning')}</title>
                        <>
                          {Date.now() > contractor.until && (
                            <Icon className="" color="" icon="it-warning" size="" />
                          )}
                          <span className="align-middle">
                            {contractor.website && <a href={contractor.website}>{contractor.name}</a>}
                            {t('software.until')}
                          </span>
                        </>
                      ))}
                    </div>
                  </div>
                )}

              {software.publiccodeYml.platforms?.length > 0 && (
                <div className="d-flex flex-column w-25">
                  <div className="fs-6 fw-bolder">{t('software.platforms')}</div>
                  {software.publiccodeYml.platforms.map((platform, i) => (
                    <div className="fs-6 fw-bold" key={i}>
                      {platform}
                    </div>
                  ))}
                </div>
              )}

              <div className="d-flex flex-column w-25">
                <div className="fs-6 fw-bolder">{t('software.dependencies_list')}</div>
                <div className="fs-6 fw-bold">
                  {!software.publiccodeYml.dependsOn && t('software.dependencies_none')}
                  {software.publiccodeYml.dependsOn?.open?.map((software, i) => (
                    <div className="p-1" key={i}>
                      <Badge color="success">{t('software.dependencies_oss')}</Badge>{' '}
                      <span className="pl-1">
                        {software.name} {software.optional ? `(${t('software.dependencies_optional')})` : ''}
                      </span>
                    </div>
                  ))}
                  {software.publiccodeYml.dependsOn?.hardware?.map((software, i) => (
                    <div className="p-1" key={i}>
                      <Badge color="secondary">Hardware</Badge>{' '}
                      <span className="pl-1">
                        {software.name} {software.optional ? `(${t('software.dependencies_optional')})` : ''}
                      </span>
                    </div>
                  ))}
                  {software.publiccodeYml.dependsOn?.proprietary?.map((software, i) => (
                    <div className="p-1" key={i}>
                      <Badge color="danger">{t('software.dependencies_proprietary')}</Badge>{' '}
                      <span className="pl-1">
                        {software.name} {software.optional ? `(${t('software.dependencies_optional')})` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='row col-6'>
            <div className='d-flex flex-wrap container py-5'>
              {software.publiccodeYml.landingURL && (
                <div className='w-50 text-uppercase fs-6 fw-bold pt-3'>
                  <p>
                    <a
                      href={software.publiccodeYml.landingURL}
                      aria-label={t('software.goToLandingUrlAriaLabel')}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Icon icon="it-link" />
                      <span className="font-weight-bold inline-block px-2">{t('software.goToLandingUrl')}</span>
                      <Icon icon="it-external-link" />
                    </a>
                  </p>
                </div>
              )}

              {localizedDescription.documentation && (
                <div className='w-50 text-uppercase fs-6 fw-bold pt-3'>
                  <p>
                    <a href={localizedDescription.documentation}>
                      <Icon icon="it-files" className="mr-2" />
                      <span className="font-weight-bold inline-block px-2">{t('software.goToDocumentation')}</span>
                      <Icon icon="it-external-link" />
                    </a>
                  </p>
                </div>
              )}

              <div className='w-50 text-uppercase fs-6 fw-bold pt-3'>
                <p>
                  <a href={software.publiccodeYml.url}>
                    <Icon icon="it-code-circle" className="mr-2" />
                    <span className="font-weight-bold inline-block px-2">{t('software.goToCode')}</span>
                    <Icon icon="it-external-link" />
                  </a>
                </p>
              </div>

              {software.publiccodeYml.roadmap && (
                <div className='w-50 text-uppercase fs-6 fw-bold pt-3'>
                  <p>
                    <a href={software.publiccodeYml.roadmap}>
                      <Icon icon="it-chart-line" className="mr-2" />
                      <span className="font-weight-bold inline-block px-2">{t('software.goToRoadmap')}</span>
                      <Icon icon="it-external-link" />
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>

          {localizedDescription.screenshots && (
            <div className={`my-5 col-12 ${classes.imageGallery}`}>
              <ImageGallery
                items={localizedDescription.screenshots.map((s) => {
                  const url = absoluteUrl(s, software.publiccodeYml.url);
                  return { original: url, thumbnail: url };
                })}
                showPlayButton={false}
                showFullscreenButton={false}
              />
            </div>
          )}
        </div>

        <div className="container">
          <div>
            <div className="row">
              <div className="col-lg-6 col-xs-12">
                <div className="row">
                  <a
                    data-toggle="collapse"
                    href="#mainOthersInfo"
                    role="button"
                    aria-expanded="false"
                    aria-controls="mainOthersInfo"
                    className="d-block d-md-none controls"
                  >
                    {t('software.others_info')}
                    <span className="or it-expand"></span>
                    <span className="and it-collapse"></span>
                  </a>
                  <div id="mainOthersInfo" className="collapse col-md-3 dont-collapse-md">
                    {/* {% if page.publiccode.intendedAudience.onlyFor.size > 0 %} */}
                    <div className="other-detail">
                      <p>
                        <span className="label">{t('software.main_audience')}</span>
                        {/* {% for audience in page.publiccode.intendedAudience.onlyFor %} */}
                        {/* {% include set-audience.html label=audience %} */}
                        {/* {% endfor %} */}
                      </p>
                    </div>
                    {/* {% endif %} */}
                    {/* {% if page.publiccode.localisation.localisationReady == true %} */}

                    <div className="other-detail">
                      <p>
                        <span className="label">{t('software.supported_languages')}</span>
                        {/* {% if page.publiccode.localisation.availableLanguages.size > 10 %} */}
                        {/* {% for language in page.publiccode.localisation.availableLanguages limit: 10 %} */}
                        {/* {% include set-language-supported.html lang=language %} */}
                        {/* {% endfor %} */}
                      </p>
                      <p>
                        <a
                          data-toggle="collapse"
                          href="#otherLanguage"
                          role="button"
                          aria-expanded="false"
                          className="count"
                          aria-controls="otherLanguage"
                        >
                          {t('langs.show_all')}
                          <span className="or it-expand"></span>
                          <span className="and it-collapse"></span>
                        </a>
                      </p>
                      <div className="collapse" id="otherLanguage">
                        {/* {% for language in page.publiccode.localisation.availableLanguages offset: 10 %} */}
                        {/* {% include set-language-supported.html lang=language %} */}
                        {/* {% endfor %} */}
                      </div>

                      <p>
                        {/* {% else %} */}
                        {/* {% for language in page.publiccode.localisation.availableLanguages %} */}
                        {/* {% include set-language-supported.html lang=language %} */}
                        {/* {% endfor %} */}
                        {/* {% endif %} */}
                      </p>
                    </div>
                    {/* {% endif %} */}

                    {localizedDescription.awards?.length > 0 && (
                      <div className="other-detail">
                        <p>
                          <span className="label">{t('software.awards')}</span>

                          {localizedDescription.awards.map((award, i) => (
                            <p key={i}>{award}</p>
                          ))}
                        </p>
                      </div>
                    )}

                    {localizedDescription.apiDocumentation && (
                      <div>
                        <p>
                          <span className="label">{t('software.api_documentation')}</span>
                          <a href={localizedDescription.apiDocumentation}> API</a>
                        </p>
                      </div>
                    )}
                  </div>

                  {/*
                    * Use data-proofer-ignore to make html-proofer ignore this section for now:
                    * it comes from external publiccode.yml files so there might be broken links
                    * out of our control making our CI pipeline fail.

                    * TODO: find a better solution
                  */}
                  <div className="mt-5" data-proofer-ignore>
                    <ReactMarkdown>{localizedDescription.longDescription}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6 col-xs-12">
                <h2>{t('software.functionality')}</h2>
                <div className="function-list">
                  {localizedDescription.features && (
                    <ul className="">
                      {localizedDescription.features.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  )}
                </div>
                {software.publiccodeYml.usedBy?.size > 0 && (
                  <ul className="">
                    {localizedDescription.usedBy.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
};

export const query = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    software(id: { eq: $id }) {
      publiccodeYml {
        name
        url
        landingURL
        logo
        platforms
        releaseDate
        roadmap
        softwareVersion
        developmentStatus
        categories
        intendedAudience {
          scope
        }
        legal {
          repoOwner
          license
        }
        # TODO: GraphQL doesn't have wildcards, we should find a better solution here
        description {
          en {
            localisedName
            shortDescription
            longDescription
            apiDocumentation
            documentation
            features
            screenshots
          }
          it {
            localisedName
            shortDescription
            longDescription
            apiDocumentation
            awards
            documentation
            features
            screenshots
          }
        }
        maintenance {
          type
          contacts {
            name
            email
            phone
          }
        }
        dependsOn {
          open {
            name
            optional
          }
          proprietary {
            name
            optional
          }
        }
        isBasedOn
      }
    }
  }
`;
          // hardware {
          //   name
          //   optional
          // }

export default Software;
