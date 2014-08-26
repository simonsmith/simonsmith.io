---
title: Syncing MAMP databases with Dropbox
date: 2013-01-10
type: post
---
Just a simple tip on how to use a symlink to sync your MAMP databases into your Dropbox. This makes working on dynamic sites a breeze when moving between different computers.

## Move the current databases

First thing to do is move your mysql folder into Dropbox. It can be found at `/Applications/MAMP/db/mysql` and for example&#8217;s sake we&#8217;ll move it to `~/Dropbox/mysql`

## Create a symlink

Once that&#8217;s done pop open Terminal ([or iTerm 2 for extra winsauce][1]) and navigate to the db folder inside MAMP `/Applications/MAMP/db/`. From here run the following terminal command

    ln -s ~/Dropbox/mysql mysql

That will now create a symlink to your Dropbox and everytime you make a database change it will be automatically synced.

You can double check it was created successfully by running `ls -ll` in the same folder and you should see something like:

    mysql -> /Users/your.name/Dropbox/mysql/

Simple

 [1]: http://www.iterm2.com/