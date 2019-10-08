rm -rf ../docs/*;
#node --inspect-brk\
  ../../docco/bin/docco\
	-c tpe.css\
       	-t tpe.ejs\
       	-o ../docs\
       	index.md\
       	quickstart-designers.md\
       	tutorials-designers.md\
       	tutorials-designers/*\
       	quickstart-developers.md\
       	tutorials-developers.md\
       	tutorials-developers/*\
				elements.md\
       	elements/*.js
