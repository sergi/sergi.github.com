---
layout: post
title: Implement cursor-swiping in half an afternoon
keywords: firefox,mozilla,ffos,firefox os,mobile,webapi,open,swipe,editing,swipeselection,cursor
comments: true
---

If you haven't seen it yet, I suggest that you take a look at this concept video that made the rounds on the internet some months ago:

<p style="text-align: center">
<iframe width="560" height="315" src="http://www.youtube.com/embed/RGQTaHGQ04Q?rel=0" frameborder="0" allowfullscreen></iframe>
</p>

I would pay to have this in my phone. Only, money wouldn’t help since I own an
iPhone, and a developer has simply no way to access an internal component like
the phone keyboard.
<!--more-->

Well, it only took a small part of an afternoon to implement a proof of concept
of cursor-swiping in Firefox OS. And even if this swipe-selection
implementation is only a prototype, it’s perfectly functional and I've already
gotten used to its convenience. See a rough video I made here:

<p style="text-align: center">
<iframe style="text-align: center" width="560" height="315" src="http://www.youtube.com/embed/uDzb7HZY2mE?rel=0" frameborder="0" allowfullscreen></iframe>
</p>

You can check out the code for it in [Comoyo's Gaia branch on GitHub](https://github.com/comoyo/gaia/compare/master...swipe_selection).

I can't even express how amazing it is to hack the OS of the phone
you use and adapt it to your needs in such an easy way and with such a fast
development cycle. It makes me excited to think about what will happen once all these
JavaScript developers discover that they can hack their phone and contribute to
it using their favorite language.

*Disclaimer: This implementation is in the Gaia fork that I use and I have no idea of whether it
will make it into the actual OS eventually, since there are obvious UX implications that might be uncomfortable for some.*

