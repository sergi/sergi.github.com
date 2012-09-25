---
layout: post
title: Building a FTP module for NodeJS
keywords: ftp,nodejs,programming,cloud9,javascript,sergi,mansilla
published: false
---

[jsftp](https://github.com/sergi/jsftp "jsftp") is a lightweight FTP client library for node.js

Why?
----
One could argue that FTP is slowly fading away as less and less people use it and move to more advanced solutions in the cloud, and one would be probably right.

With that said, FTP is still very present in the internet, with many people using it to store their websites, backups and documents. We know that many developers are using it for personal projects and in Cloud9 we decided to make FTP-based storage available.

Surprisingly enough, there wasn't a decent node.js module for it yet (although there were some poorly implemented ones that we looked at) so I decided to make one.

Since FTP is already a cumbersome protocol, I wanted jsftp to be lightweight (the total codebase is around 513 LOC, including parsers for different platform outputs) and to rely on simple concepts, without overcomplicating its architecture.

Features
--------
-Compliant with [RFC959](http://www.ietf.org/rfc/rfc959.txt)
-Lightweight
-Only one external dependency

Usage
-----

How does it work?
-----------------
The basic FTP request-response is handled by streams, a concept taken from Scheme. Both user requests and server responses are treated as infinite lists in which one can't exist without the other. That is, there is always a response for every request (there are a few exceptions to that rule, but not important enough to deviate from this explanation), since FTP is a synchronous _chat-style_ protocol, in which each side waits for the other to send the next instruction.

The main complication here was to make a totally synchronous protocol like FTP work nicely with the asynchronous nature of node.js. An approach that



