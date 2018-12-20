---
title: Getting started with Kwm tiling window manager
date: 2017-01-02
draft: true
---

For the last few months I've been using a window manager called
[Kwm](https://koekeishiya.github.io/kwm/) and it has been a huge boost to my
productivity. However, it's a bit different to other window
managers I've used previously and not necessarily the easiest one to get started with so
read on for an explanation and some general tips.

## What makes it different?

There are plenty of window managers for macOS (I used
[Divvy](http://mizage.com/divvy/) previously) but one thing I found a bit
cumbersome is always needing to tell the tool what to do with my windows. Even
with keyboard shortcuts.

Kwm takes a different approach and instead uses a layout algorithm to decide
what size new windows should be in relation to existing ones. Then with some
keyboard shortcuts you're free to rearrange and resize them as needed.

Here's a quick example video:

<div class="FlexEmbed Video">
  <div class="FlexEmbed-ratio FlexEmbed-ratio--16by9"></div>
  <div class="FlexEmbed-content">
    <iframe width="853" height="480" src="https://www.youtube.com/embed/UL2Q4mHpn_4" frameborder="0" allowfullscreen></iframe>
  </div>
</div>

You can see that as I open more applications Kwm decides how to size and tile
them in relation to each other. This is usually more than enough for 2-3 three
windows open at once. As things get busier you're free to move them around,
resize or even pop one of the windows into a full screen for a closer look. This
is all driven by combination of different key modifiers and H,J,K and L.

## Installation

There are actually two packages to install. Kwm is the window manager itself and
provides several commands for interacting with it.
[Khd](https://github.com/koekeishiya/khd) is responsible for mapping keys to
specific commands.

Both are available on Homebrew:

```bash
brew install koekeishiya/khd/khd
brew install koekeishiya/kwm/kwm
```

Both Kwm and Khd ship with example configs that serve as a sensible starting
point. The brew packages provide instructions on how to use these. Use `brew
info kwm` if you missed it after the initial installation.

Should you need to restart either package (useful when making configuration
changes) `brew services` should be used:

```bash
brew services restart kwm
```

## Configuring Kwm

The example configuration file for Kwm is well commented so often it's a case of
tweaking values and seeing how it looks or behaves. I'll go through a handful of
the values I tweaked.

### `focus-follows-mouse`

If you move your mouse around you'll see a yellow border highlight the current
window under the mouse.

Unfortunately I found it quite irritating. It made it hard for me to click toolbar
shortcuts for an app. As you move the mouse up to click `File` and
it passes over the adjacent window it will switch to that app and the toolbar
will change too. I switched this off and haven't missed it, especially as I'm
trying to use the mouse as little as possible.

### `mouse-follows-focus`

This moves the cursor to the centre of whatever window you switch to with the
keyboard shortcuts. This is useful for allowing you to start controlling that
application, like scrolling in Chrome for example.

