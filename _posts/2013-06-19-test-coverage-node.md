---
layout: post
title: Add test coverage to your Node.js projects
keywords: node,nodejs,test,coverage,npm,node,javascript,testing
comments: true
---
<img class="header-img" src="../../images/istanbul.jpg" title="Istanbul" style="width: 100%;" />

Test coverage is invaluable to get an overview of how well-tested your app is, and it helps finding new bugs in your code. Unfortunately coverage reports are not ubiquitous in Node.js projects, and because of that it may seem that it is hard to set up, which is not the case at all!

I'm going to show you how to set up code coverage using [Mocha](http://visionmedia.github.io/mocha/), [Istanbul](https://github.com/gotwarlost/istanbul) and [LCOV](http://ltp.sourceforge.net/coverage/lcov.php) in two easy steps.
<!--more-->

## Step 1: Install dependencies

First we'll install [LCOV](http://ltp.sourceforge.net/coverage/lcov.php), which is a graphical frontend for the `gcov` tool and can parse the output of code coverage `info` files. The gcov format is a universal format for code coverage stats.

In OSX (using [homebrew](http://mxcl.github.io/homebrew/)):

<pre><code class="bash">brew install lcov</code></pre>

In linux (Ubuntu):

<pre><code class="bash">apt-get install lcov</code></pre>

Now we declare the remaining dependencies in the `package.json` of your project:

<pre><code>{
  "devDependencies": {
    "mocha": "~1.10.0",
    "istanbul": "~0.1.36",
    "mocha-istanbul": "~0.2.0"
  }
}</code></pre>

<br/>
## Step 2: Set up a Makefile

With everything installed, we just need to automate the process of generating the coverage report. I am using a `Makefile` to do that, but it could also be a simple script. After all, it is just executing bash commands.

We first create a file named `Makefile` in the root of our project folder and declare some variables containing the location of executables and a filter for test files:

<pre><code class="bash">#!/bin/bash

MOCHA=node_modules/.bin/mocha
ISTANBUL=node_modules/.bin/istanbul

# test files must end with ".test.js"
TESTS=$(shell find test/ -name "*.test.js")</code></pre>

After that, we make a case for generating a coverage report:
<pre class="language-bash"><code>coverage:
    # check if reports folder exists, if not create it
    @test -d reports || mkdir reports
    $(ISTANBUL) instrument --output lib-cov lib
    # move original lib code and replace it by the instrumented one
    mv lib lib-orig && mv lib-cov lib
    # tell istanbul to only generate the lcov file
    ISTANBUL_REPORTERS=lcovonly $(MOCHA) -R mocha-istanbul $(TESTS)
    # place the lcov report in the report folder,
    # remove instrumented code and put back lib at its place
    mv lcov.info reports/
    rm -rf lib
    mv lib-orig lib
    genhtml reports/lcov.info --output-directory reports/</code></pre>

In the code above I scan the `lib` folder for JavaScript files and generate a `lib-cov` folder with the same files but this time instrumented by Istanbul. Anything outside of `lib` won't be taken into account for the code coverage report. I rename the original `lib` folder to `lib-orig` and we rename `lib-cov` to `lib` so the tests will use it as if it was the original one. After the reports are generated we restore `lib` to its original name and we get rid of other folders generated in the process.

Of course, you should change `lib` into the folder your source code is located.

As a nice final touch, we can add two extra actions to our Makefile, `clean` and `test`:

<pre><code class="bash">clean:
    rm -rf reports

test:
    $(MOCHA) -R spec $(TESTS)</code></pre>

With this, we now have available a `coverage` action in the Makefile. So we can execute the following in the root of our project folder:

    make coverage

and Istanbul will generate a report in the `report` folder. You can now go there and open `index.html` to see a very nice report of your coverage, by lines, functions and files.

Happy coding!