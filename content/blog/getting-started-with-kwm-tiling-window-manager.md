---

title: Getting started with Kwm tiling window manager
date: 2017-01-02
draft: true
---

For the last few months I've been using a window manager for macOS called
[Kwm](https://koekeishiya.github.io/kwm/). It's a bit different to some of the
more popular window managers but it has provided a huge boost to my
productivity.

## What makes it different?

There are [plenty of window managers](https://css-tricks.com/os-x-window-manager-apps/)
for macOS (I used [Divvy](http://mizage.com/divvy/) previously) but one thing I
found a bit cumbersome is always needing to tell the tool what to do with my
windows. Even with keyboard shortcuts.

Kwm takes a different approach and instead uses a layout algorithm to decide
what size new windows should be in relation to existing ones. This saves a lot
of time when needing two windows side by side for example. With some
keyboard shortcuts you're free to rearrange and resize them as needed.

If you've seen [i3 for Linux](https://i3wm.org/) then it has some
similarities.

Here's a quick example video:

<div class="FlexEmbed Video">
  <div class="FlexEmbed-ratio FlexEmbed-ratio--16by9"></div>
  <div class="FlexEmbed-content">
    Youtube video here
  </div>
</div>

You can see that as I open more applications Kwm decides how to size and tile
them in relation to each other. This is usually more than enough for 2-3
windows open at once.

As things get busier you're free to move them around, resize or even pop one of
the windows into a full screen for a closer look. This is all driven by
combination of different key modifiers and H,J,K and L. The key bindings are
completely customisable

## Installation

There are actually two packages to install. Kwm is the window manager itself and
provides several commands for interacting with it.
[Khd](https://github.com/koekeishiya/khd) is responsible for mapping keys to
commands.

Both are available on [Homebrew](http://brew.sh/):

```bash
brew install koekeishiya/formulae/kwm
brew install koekeishiya/formulae/khd
```

Kwm and Khd ship with example configuration files that serve as a sensible
starting point. However the Kwm repository [provides an
example](https://github.com/koekeishiya/kwm/tree/master/examples) of a `khdrc`
that is tailored to interacting with Kwm. I'd recommending using this as your
starting point for the key bindings. You can grab the files with `curl`:

```bash
mkdir ~/kwm
curl -o ~/.khdrc https://raw.githubusercontent.com/koekeishiya/kwm/master/examples/khdrc
curl -o ~/.kwm/kwmrc https://raw.githubusercontent.com/koekeishiya/kwm/master/examples/kwmrc
```

Should you need to restart either package (useful when making configuration
changes) `brew services` should be used:

```bash
brew services restart kwm
```

## First look

Once it is up and running try opening some applications and notice how Kwm takes
over the layout and sizing of windows automatically:

![](/images/posts/getting-started-with-kwm/kwm-two-windows.png)

The active window has a yellow border around it and if you move the mouse over
to another window focus will move to it immediately. This is known as
`focus-follows-mouse` and it can be configured if it's not to your taste.

Opening a third window has a similar effect:

![](/images/posts/getting-started-with-kwm/kwm-three-windows.png)

## Tiling modes

Kwm arranges windows in three modes:

### BSP

This is the default mode shown above. As more windows are added to the space
they will be resized to fit using [binary space
partitioning](https://en.wikipedia.org/wiki/Binary_space_partitioning). The
documentation gives more information on how this works.

### Monocle

Stacks all open windows on top of each other so they take up the entire
viewport. A useful mode to use when on a smaller laptop screen.

### Floating

Switching to floating mode from either monocle or BSP seems to have no effect at
first glance. What it actually does is enable the mouse to be used to move and
resize the windows in a more traditional way. Useful for demonstrating something
or resizing a browser by hand.

Switching between all three is handled by keyboard shortcuts:

```bash
# Set Space Tiling Mode To BSP
cmd + ctrl - a : kwmc space -t bsp

# Set Space Tiling Mode To Monocle
cmd + ctrl - s : kwmc space -t monocle

# Set Space Tiling Mode To Floating
cmd + ctrl - d : kwmc space -t float
```

![](/images/posts/getting-started-with-kwm/window-modes.gif)

## Basic navigation

The real power of Kwm comes from using the various keyboard shortcuts to control
it.

The [config file for
Khd](https://github.com/koekeishiya/kwm/blob/master/examples/khdrc) is quite
well documented so it makes sense to play with the different key combinations to
see what they do. Most of the keyboard shortcuts require use of cmd+ctrl so I
recommend binding caps lock to control to make these more comfortable as you'll
be using them frequently.

I'd also encourage sticking with the usage of H,J,K and L on the home row. Keeping
your fingers in this position allows rapid usage of Kwm.

### Moving focus between windows

With multiple windows open on screen the focus can be moved between them by
using `cmd` + `alt` and the movement keys. This mimics moving a cursor over an
application and clicking on it to give focus.

I found this easier on my fingers by using `ctrl` instead of `alt`.

![](/images/posts/getting-started-with-kwm/moving.gif)

An advantage of navigating this way is it even works in monocle mode. I use it
instead of the traditional `cmd` + `tab` as it only switches between
windows that are not hidden or minimised.

### Swapping window position

Use of `ctrl` + `alt` and the movement keys allows a window to be swapped with
whichever window is in that direction. I tend to use this for simple window
swaps such as reversing the position of two adjacent windows.

For more complex movements (such as wanting to move a window several positions
in one direction) it is more efficient to use marking. The idea here is to focus
on the window you wish to move and mark it `cmd + alt + ctrl - m` and then focus
the window to swap it with and hit `ctrl + alt + m`. It can feel a little
cumbersome at first but once mastered this is a very effective workflow.

![](/images/posts/getting-started-with-kwm/swapping.gif)

These two methods of navigation are the ones I end up using most of the time.
I'd recommend experimenting with the [rest of the keyboard
shortcuts](https://github.com/koekeishiya/kwm/blob/master/examples/khdrc) and
seeing how they effect the window layout.

## Making use of spaces

Previously I hadn't found much use for [the Spaces
feature](https://support.apple.com/kb/PH18757?locale=en_GB) in macOS but it
works very effectively with Kwm.

Each space has its own window configuration so for example it is possible to
have three windows arranged in BSP mode on one desktop and two windows in
monocle mode on another. A window can also be sent from one space to another and
Kwm will arrange it according to the chosen layout mode on that space.

I find this extremely useful on a larger screen as it allows me to work on a
project with carefully arranged windows on one space and have other applications
(Chrome, Spotify, Slack etc) arranged on another

When combined with a keyboard shortcut to switch spaces it works very
effectively. It's another good reason to keep caps lock bound to control.

![](/images/posts/getting-started-with-kwm/keyboard.png)

By default this uses `ctrl + alt` and an arrow key left or right but I'd
encourage binding it to an easier combination.

## Multiple screens

Moving windows between screens works almost identically to spaces with the
difference being there is an extra shortcut to give focus to a screen so Kwm
knows which one to control:

```bash
# Move Focused Window To Screen
ctrl + alt - 1 : kwmc window -m display 0

# Give Focus To Screen
ctrl + cmd - 1 : kwmc display -f 0
```

## Usage on smaller screens

At first it seems like Kwm is only useful on larger screens due to the way some
windows can end up at a very small size. This is partially true but by adapting
the way it's used on smaller screens it can still be a useful tool.

### Use monocle mode by default

By remaining in monocle mode (where every window consumes the entire viewport)
we still get benefits of moving quickly between windows with `cmd + ctrl` and
the navigation keys. To carry out tasks that require 2-3 windows it's simple to
switch back to BSP mode.

### Make single windows 'fullscreen'

Whilst in BSP mode Kwm allows the focused window to be popped out into monocle
mode (or 'fullscreen') and still retain position of the surrounding windows.
When popped back the window will return to its original layout.

This involves using the prefix shortcut (default `ctrl` + `s`) and then `f`. The
same shortcut returns the window back to normal

gif here

> Prefix mode has a timeout of 1 second by default



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

