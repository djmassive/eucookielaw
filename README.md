**Cookie Warning Window - version 2.1**
Pure JS / SCSS Stylesheet / Lightweight - only ~2.8 kb

Cookie Warning Window is pure javascript plugin that allows to inform website users that You are using cookies.
It is designed to help you comply with the hideous EU Cookie Law.

This plugins includes **jQuery Cookie Plugin v2.2.0** by **Klaus Hartl & Fagner Brack**
Source:
https://github.com/js-cookie/js-cookie

DEMO
http://djmassive.github.io/eucookielaw/

INSTALLATION
Please just insert those lines before end of body tag

    <link rel="stylesheet" href="dist/cookieww.min.css" type="text/css">
    <script src="dist/cookieww.min.js"></script>

USAGE

    <script type="text/javascript">
    new CookieWW({
        text: 'Your text',
        text_btn: 'Your BTN text',
        expire: 7 // in days (default 7 days)
    });
    </script>

Enjoy !
This plugin is released under the MIT license.
Author: Grzegorz Miskiewicz
