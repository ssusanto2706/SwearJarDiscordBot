# SwearJarDiscordBot
A discord bot that counts the number of times a user says a banned word and calculates how much is owed.

## To do
Users will get dinged if they work together, even if interrupted by another user.

    tex: b
         a
         n
    rex: so there i was in this hallway right
         n
    mex: e
         d
         w
         o
         r
         d
    SwearJar: @tex now owes $0.60
              @mex now owes $0.90
              
              
## Done
Remove whitespace when comparing strings so that users cannot bypass the filter with spaces, new lines, or other delimiters.

    tex:      b a n n e d w o r d
    SwearJar: @tex now owes $0.30

Implement Unidecode library to sanitize inputs so that users cannot substitute Unicode characters to bypass filters.

    tex: ๐๐๐ซ๐ซ๐ข๐ก ๐ด๐ฌ๐ฏ๐ก
    SwearJar: @tex now owes $0.40
    mex: bาaาnาnาeาdา าwาoาrาdา
    SwearJar: @mex now owes $0.20
    rex: โฮฑ๐โ๐ขฤ สท๐ธัเน
    SwearJar: @rex now owes $1.00
