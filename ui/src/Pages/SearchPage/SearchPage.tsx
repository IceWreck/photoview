import React from 'react'
import Layout from '../../components/layout/Layout'
import { useQuery, gql } from '@apollo/client'
import PaginateLoader from '../../components/PaginateLoader'
import useURLParameters from '../../hooks/useURLParameters'
import useScrollPagination from '../../hooks/useScrollPagination'
import AlbumGallery from '../../components/albumGallery/AlbumGallery'
import {
  searchPageQuery,
  searchPageQueryVariables,
} from './__generated__/searchPageQuery'
import { useTranslation } from 'react-i18next'

const getSearchResultsQuery = gql`
  query searchPageQuery($query: String!, $limitMedia: Int) {
    search(query: $query, limitMedia: $limitMedia) {
      query
      media {
        id
        type
        thumbnail {
          url
          width
          height
        }
        highRes {
          url
        }
        videoWeb {
          url
        }
        favorite
      }
    }
  }
`

const SearchPage = () => {
  const { t } = useTranslation()

  const urlParams = useURLParameters()

  const searchKeyword = urlParams.getParam('keywords', 'placeholder')

  const { loading, error, data, refetch, fetchMore } = useQuery<
    searchPageQuery,
    searchPageQueryVariables
  >(getSearchResultsQuery, {
    variables: {
      limitMedia: 500,
      // @ts-ignore
      query: searchKeyword,
    },
  })

  const { containerElem, finished: finishedLoadingMore } =
    useScrollPagination<searchPageQuery>({
      loading,
      fetchMore,
      data,
      getItems: data => data.search.media,
    })

  if (error) return <div>Error</div>

  return (
    <Layout title="Search Results">
      <AlbumGallery
        ref={containerElem}
        // album={data && data.album}
        // @ts-ignore
        album={
          data && {
            id: '999',
            title: 'search_results',
            subAlbums: [],
            media: data.search.media,
          }
        }
        loading={loading}
        // setOnlyFavorites={toggleFavorites}
        // onlyFavorites={onlyFavorites}
        // onFavorite={() => (refetchNeededAll = refetchNeededFavorites = true)}
        // showFilter
        // setOrdering={orderParams.setOrdering}
        // ordering={orderParams}
      />
      <PaginateLoader
        active={!finishedLoadingMore && !loading}
        text={t('general.loading.paginate.media', 'Loading more media')}
      />
    </Layout>
  )
}

export default SearchPage
