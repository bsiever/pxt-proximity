# Proximity

Determine if the micro:bit is close to another micro:bit (utilizes radio and may prevent other radio functions)

## TODOs

New blocks / ideas:
* tare option to set target distance? 
* Instead of mb name, select a name/tag for microbit (microbit name is default)
* Diff in send vs. recieve strength?  Maybe send name:send strength at multiple strengths 
  * Detect could use a table to detect / classify distances based on loss?
* Block for inRange and leftRange? 

C++
* Get radio parameters (signal strength, channel, and frequencies)
* Set / restore them before/after prox checks?

Docs / testing 

# Acknowledgements 

Icon based on [Font Awesome icon 0xF06E](https://www.iconfinder.com/search?q=f06e) SVG.



# Misc. 

I develop micro:bit extensions in my spare time to support activities I'm enthusiastic about, like summer camps and science curricula.  You are welcome to become a sponsor of my micro:bit work (one time or recurring payments), which helps offset equipment costs: [here](https://github.com/sponsors/bsiever). Any support at all is greatly appreciated!

## Supported targets

for PXT/microbit

```package
pxt-proximity=github:bsiever/pxt-proximity
```

<script src="https://makecode.com/gh-pages-embed.js"></script>
<script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
