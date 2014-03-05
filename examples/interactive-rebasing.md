Interactive rebasing example
============================

Setup:

    git init

    echo "" > favourite-foods.txt
    git add .
    git commit -m "Create a list of my favourite foods."

    echo "chicen" > favourite-foods.txt
    git commit -am "Add chicken to my favourite foods."

    # Go in and fix spelling mistake (chicen) in favourite-foods.txt
    sed -i 's/chicen/chicken/g' favourite-foods.txt
    git commit -am "Fix spelling mistake."

    echo "tmp/" > .gitignore
    git add .
    git commit -m "Setup .gitignore"

    echo "paella" >> favourite-foods.txt
    git commit -am "Add paella to my favourite foods."

    git log

Output of `git log`:

    commit 2b6afed60d3a41260937c292892324e87ed6dd64
    Author: Amy Boyd <amy@amyboyd.co.uk>
    Date:   Wed Mar 5 13:30:53 2014 +0000

        Add paella to my favourite foods.

    commit d17475e87b6da6551aa98318b41a6936ca861982
    Author: Amy Boyd <amy@amyboyd.co.uk>
    Date:   Wed Mar 5 13:30:53 2014 +0000

        Setup .gitignore

    commit 91e38a377dde357457bdb390d5c8cefb87dfe5e0
    Author: Amy Boyd <amy@amyboyd.co.uk>
    Date:   Wed Mar 5 13:30:53 2014 +0000

        Fix spelling mistake.

    commit d844cb22eeb047032c369eeb01363136eae2bf51
    Author: Amy Boyd <amy@amyboyd.co.uk>
    Date:   Wed Mar 5 13:30:53 2014 +0000

        Add chicken to my favourite foods.

    commit e5f584751c1377b92ddc67b8acb6487dee10eb4f
    Author: Amy Boyd <amy@amyboyd.co.uk>
    Date:   Wed Mar 5 13:30:53 2014 +0000

        Create a list of my favourite foods.

We want to tidy up the log:

* Merge "Add chicken to my favourite foods" and "Fix spelling mistake".
* Re-order so that "add paella to my favourite foods is before "Setup .gitignore".
* Add a full-stop at the end of the commit message for `d17475e87b6da6551aa98318b41a6936ca861982`.

Start an interactive rebase with `git rebase -i HEAD~~~~`.

This opens up vi (by default) with this:

    pick d844cb2 Add chicken to my favourite foods.
    pick 91e38a3 Fix spelling mistake.
    pick d17475e Setup .gitignore
    pick 2b6afed Add paella to my favourite foods.

To do the tidy up that we want (merge, re-order, add full-stop), change it to this:

    pick d844cb2 Add chicken to my favourite foods.
    fixup 91e38a3 Fix spelling mistake.
    pick 2b6afed Add paella to my favourite foods.
    reword d17475e Setup .gitignore.

And save.

Output of `git log` after interactive rebase:

    commit 0d943f1cea1ab0cba8533fa737c0cac0f8a2145f
    Author: Amy Boyd <amy@amyboyd.co.uk>
    Date:   Wed Mar 5 13:30:53 2014 +0000

        Setup .gitignore.

    commit 0117b0d30d9c65e35e01066ec1c1e6c1fa86a63b
    Author: Amy Boyd <amy@amyboyd.co.uk>
    Date:   Wed Mar 5 13:30:53 2014 +0000

        Add paella to my favourite foods.

    commit f48a17bc3117934338db21eb9f12d4ee0179d37e
    Author: Amy Boyd <amy@amyboyd.co.uk>
    Date:   Wed Mar 5 13:30:53 2014 +0000

        Add chicken to my favourite foods.

    commit e5f584751c1377b92ddc67b8acb6487dee10eb4f
    Author: Amy Boyd <amy@amyboyd.co.uk>
    Date:   Wed Mar 5 13:30:53 2014 +0000

        Create a list of my favourite foods.

Much tidier!
