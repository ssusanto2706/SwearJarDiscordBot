# SwearJarDiscordBot
A discord bot that counts the number of times a user says a banned word and calculates how much is owed.

## To do
Remove whitespace when comparing strings so that users cannot bypass the filter with spaces, new lines, or other delimiters.

    tex:      d e e z n u t s
    SwearJar: @tex now owes $0.30

Users will get dinged if they work together, even if interrupted by another user.

    tex: d
         e
         e
    rex: so there i was in this hallway right
         z
    mex: n
         u
         t
         s
    SwearJar: @tex now owes $0.60
              @mex now owes $0.90

Implement Unidecode library to sanitize inputs so that users cannot substitute Unicode characters to bypass filters.

    tex: dėėz nüts
    SwearJar: @tex now owes $0.40
    mex: 𝔡𝔢𝔢𝔷 𝔫𝔲𝔱𝔰
    SwearJar: @mex now owes $0.20
    rex: Ⓓεｅｚ nuts
    SwearJar: @rex now owes $1.00