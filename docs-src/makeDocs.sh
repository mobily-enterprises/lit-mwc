rm -rf ../docs/*;
cp ../README.md ./welcome.md;
#node --inspect-brk\
  ../../docco/bin/docco\
	-c tpe.css\
       	-t tpe.ejs\
       	-o ../docs\
       	welcome.md\
       	quickstart-designers.md\
       	tutorials-designers.md\
       	tutorials-designers/*\
       	quickstart-developers.md\
       	tutorials-developers.md\
       	tutorials-developers/*\
				sources.md\
       	sources/*.js
