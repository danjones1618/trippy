#!/bin/sh

set -e

npm run export
zip -r build.zip out
echo "Clean remote website folder"
ssh delta "rm -rf /var/www/trippy.icedcoffee.dev/*"
echo "Copying built files"
scp build.zip delta:/var/www/trippy.icedcoffee.dev
echo "Extracting archive on server"
ssh delta "unzip /var/www/trippy.icedcoffee.dev.dev/build.zip -d /var/www/trippy.icedcoffee.dev && mv /var/www/trippy.icedcoffee.dev/out/* /var/www/trippy.icedcoffee.dev/ && rmdir /var/www/trippy.icedcoffee.dev/out/ && rm /var/www/trippy.icedcoffee.dev/build.zip"
echo "Cleaning up..."
rm -rf build/ build.zip
