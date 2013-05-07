<?php

abstract class YouTubeHelper
{
    /**
     * Extract a Youtube video ID from a youtube.com URL.
     *
     * Based on http://stackoverflow.com/questions/2597080/regex-to-parse-youtube-yid
     *
     * @param string $url
     * @return mixed The string ID, or false on error.
     */
    public static function getVideoId($url)
    {
        if (1 === preg_match('/^[a-zA-Z0-9-_]{5,}$/', $url)) {
            // $url is already an ID, not a URL.
            return $url;
        }

        // Shortened URLs like http://youtu.be/BNXEEoeMsh4
        if (1 === preg_match('/youtu\.be\/([a-zA-Z0-9-_]{5,})/', $url)) {
          $url = preg_replace('/(https?\:\/\/)?youtu\.be\//', '', $url);
          return $url;
        }

        // Given a URL like http://www.youtube.com/watch?v=PRJq25RH_5k
        if (1 === preg_match('%(?<=v=)[a-zA-Z0-9-]+(?=&)|(?<=[0-9]/)[^&\n]+|(?<=v=)[^&\n]+%', $url, $match)) {
            return $match[0];
        }

        return false;
    }
}
