#!/bin/bash

git pull --rebase

# Remove Twig cache.
rm -fR Symfony/web/1/

php Symfony/app/console cache:clear --env=prod
php Symfony/app/console cache:clear --env=dev
php Symfony/app/console assets:install Symfony/web

# The unix timestamp of deployment is used to update user's browser caches.
date +%s > Symfony/app/cache/deployment-time
touch Symfony/app/cache/deployment-time

php Symfony/app/console assetic:dump --env=dev

echo "Done"

php Symfony/app/console doctrine:schema:update --dump-sql
