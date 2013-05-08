<?php

use Twig_Extension;
use Twig_Filter_Method;
use Twig_Function_Method;

class Whatever extends Twig_Extension
{
    public function addHttpIfUrlHasNoScheme($url)
    {
        if (stripos($url, 'http://') === 0 || stripos($url, 'https://') === 0) {
            return $url;
        }
        return 'http://' . $url;
    }

    /**
     * @param mixed $amount
     * @return string Nicely formatted price, e.g. "50p", "£5", "£5.50".
     */
    public function asGBP($amount)
    {
        $str = number_format($amount, 2, '.', ',');

        // If between 1 pence and 99 pence, format as pence, e.g. "50p".
        if (substr($str, 0, 2) === '0.') {
            return substr($str, 2) . 'p';
        }

        // If an exact pound amount, e.g. 5.00, format as £5.
        if (substr($str, -3) === '.00') {
            return '£' . substr($str, 0, strlen($str) - 3);
        }

        return '£' . $str;
    }

    /**
     * Convert bookies odds from slash format to percent.
     * @param string $slash E.g. 5/3, 2/3, 5
     * @return string The odds as a percent.
     */
    public function bookiesSlashOddsToPercentOdds($slash)
    {
        $slash = explode('/', $slash);
        if (count($slash) == 1) {
            // "5" is a lazy way of writing "5/1".
            $slash[1] = 1;
        }

        $percent = 100 / (1 + ($slash[0] / $slash[1]));
        return round($percent, 1);
    }

    /**
     * Given 1, returns 1st.
     * Given 13, return 13th.
     * And so on.
     */
    public function dayOfMonthWithOrdinal($day)
    {
        $ends = array('th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th');
        if (($day % 100) >= 11 && ($day % 100) <= 13) {
            return $day . 'th';
        }
        else {
            return $day . $ends[$day % 10];
        }
    }
}

class WeekStuff extends Twig_Extension
{
    public function currentWeek()
    {
        return date('yW');
    }

    public function getWeekFromDate(DateTime $date)
    {
        return $date->format('yW');
    }

    /**
     * @param string $week Week as formatted by currentWeek()
     * @return string "25th Jan - 2nd Feb, 2013"
     */
    public function formatWeek($week)
    {
        $year = '20' . substr($week, 0, 2);
        $week = substr($week, 2);

        // strtotime() can work out the date of a day of the week by calling it
        // with a string like "2013W121" (12 = week, 1 = first day of the week).
        return date('jS M', strtotime($year . 'W' . $week . '1'))
            . ' - '
            . date('jS M, Y', strtotime($year . 'W' . $week . '7'));
    }

    /**
     * NOT TRANSLATED! ENGLISH ONLY!
     *
     * @param DateTime $date
     * @return string E.g. "just now", "5 seconds ago", "1 year ago"
     */
    public function ago(DateTime $date)
    {
        $secondsDelta = time() - $date->getTimestamp();
        if ($secondsDelta === 0) {
            return 'just now';
        }

        $format = $secondsDelta < 0 ? 'in %s' : '%s ago';

        $tokens = array (
            31536000 => 'year',
            2592000 => 'month',
            604800 => 'week',
            86400 => 'day',
            3600 => 'hour',
            60 => 'minute',
            1 => 'second',
        );

        $secondsDelta = abs($secondsDelta);
        foreach ($tokens as $unit => $text) {
            if ($secondsDelta < $unit) {
                continue;
            }
            $numberOfUnits = floor($secondsDelta / $unit);
            $inWords = $numberOfUnits . ' ' . $text . (($numberOfUnits > 1) ? 's' : '');
            break;
        }

        return sprintf($format, $inWords);
    }
}
