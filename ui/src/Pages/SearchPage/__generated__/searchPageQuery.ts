/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MediaType } from './../../../__generated__/globalTypes'

// ====================================================
// GraphQL query operation: searchPageQuery
// ====================================================

export interface searchPageQuery_search_media_thumbnail {
  __typename: 'MediaURL'
  /**
   * URL for previewing the image
   */
  url: string
  /**
   * Width of the image in pixels
   */
  width: number
  /**
   * Height of the image in pixels
   */
  height: number
}

export interface searchPageQuery_search_media_highRes {
  __typename: 'MediaURL'
  /**
   * URL for previewing the image
   */
  url: string
}

export interface searchPageQuery_search_media_videoWeb {
  __typename: 'MediaURL'
  /**
   * URL for previewing the image
   */
  url: string
}

export interface searchPageQuery_search_media {
  __typename: 'Media'
  id: string
  type: MediaType
  /**
   * URL to display the media in a smaller resolution
   */
  thumbnail: searchPageQuery_search_media_thumbnail | null
  /**
   * URL to display the photo in full resolution, will be null for videos
   */
  highRes: searchPageQuery_search_media_highRes | null
  /**
   * URL to get the video in a web format that can be played in the browser, will be null for photos
   */
  videoWeb: searchPageQuery_search_media_videoWeb | null
  favorite: boolean
}

export interface searchPageQuery_search {
  __typename: 'SearchResult'
  /**
   * The string that was searched for
   */
  query: string
  /**
   * A list of media that matched the query
   */
  media: searchPageQuery_search_media[]
}

export interface searchPageQuery {
  /**
   * Perform a search query on the contents of the media library
   */
  search: searchPageQuery_search
}

export interface searchPageQueryVariables {
  query: string
  limitMedia?: number | null
}
