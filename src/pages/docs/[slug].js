import { useEffect } from 'react';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { DocsContent } from '../../components/docs/docs-content';
import { withDocsLayout } from '../../hocs/with-docs-layout';
import { gtm } from '../../lib/gtm';
import { getArticleBySlug, getArticles } from '../../utils/docs';

const Article = (props) => {
  const { article } = props;
  const router = useRouter();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  if (!router.isFallback && !article?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div>
      <Head>
        <title>
          {`Docs: ${article.title} `}
        </title>
      </Head>
      <Container
        maxWidth="lg"
        sx={{ pb: '120px' }}
      >
        <DocsContent content={article.content} />
      </Container>
    </div>
  );
};

export default withDocsLayout(Article);

export const getStaticProps = ({ params }) => {
  const article = getArticleBySlug(params.slug, ['content', 'slug', 'title']);

  return {
    props: {
      article
    }
  };
};

export const getStaticPaths = () => {
  const articles = getArticles(['slug']);

  return {
    paths: articles.map((article) => {
      return {
        params: {
          slug: article.slug
        }
      };
    }),
    fallback: false
  };
};