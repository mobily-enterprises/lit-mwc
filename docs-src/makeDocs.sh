rm -rf ../docs/*;
echo "tpelements.com" > ../docs/CNAME
# node --inspect-brk ../node_modules/docco-next/bin/docco \
../node_modules/docco-next/bin/docco \
  -p ./plugin.js\
  -c tpe.css\
  -t tpe.ejs\
  -o ../docs\
  index.md\
  get-started.md\
  documentation.md\
  codelabs.md
cp -r ./images ../docs/
