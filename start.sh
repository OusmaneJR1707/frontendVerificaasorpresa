#!/usr/bin/env bash

sudo service apache2 start
sudo service mariadb start

set -euo pipefail

cd "$(dirname "$0")"

/usr/bin/php -S localhost:8000 -t frontend/public
/usr/bin/php -S localhost:8000 -t API/public
