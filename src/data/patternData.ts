import { PatternItem } from "../types/pattern";

export const patternData: PatternItem[] = [
  {
    "id": "right-half-pyramid",
    "num": 1,
    "title": "Right Half Pyramid Pattern",
    "category": "star",
    "difficulty": "Easy",
    "description": "A right-angled triangle of stars where the number of stars in each row equals the row number.",
    "logic": [
      "Outer loop runs i from 1 to n (controls current row).",
      "Inner loop runs j from 1 to i (prints i stars in row i).",
      "Print newline at the end of each row."
    ],
    "outputPreview": "* \n* * \n* * * \n* * * * \n* * * * * ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    // Outer loop for rows\n    for (int i = 1; i <= n; i++) {\n        // Inner loop for stars in row i\n        for (int j = 1; j <= i; j++) {\n            printf(\"* \");\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "left-half-pyramid",
    "num": 2,
    "title": "Left Half Pyramid Pattern",
    "category": "star",
    "difficulty": "Easy",
    "description": "A right-angled triangle aligned to the right side, requiring leading spaces before the stars.",
    "logic": [
      "Outer loop runs i from 1 to n.",
      "First inner loop prints 2 * (n - i) spaces for right alignment.",
      "Second inner loop prints i stars.",
      "Print newline after each row."
    ],
    "outputPreview": "        * \n      * * \n    * * * \n  * * * * \n* * * * * ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = 1; i <= n; i++) {\n        // Print leading spaces\n        for (int j = 1; j <= 2 * (n - i); j++) {\n            printf(\" \");\n        }\n        // Print stars\n        for (int k = 1; k <= i; k++) {\n            printf(\"* \");\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "inverted-right-half-pyramid",
    "num": 3,
    "title": "Inverted Right Half Pyramid",
    "category": "star",
    "difficulty": "Easy",
    "description": "A downward-pointing right-angled triangle where row 1 has n stars, decreasing to 1 star.",
    "logic": [
      "Outer loop runs i from n down to 1.",
      "Inner loop runs j from 1 to i to print stars.",
      "Print newline after each row."
    ],
    "outputPreview": "* * * * * \n* * * * \n* * * \n* * \n* ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    // Outer loop runs backwards from n to 1\n    for (int i = n; i >= 1; i--) {\n        for (int j = 1; j <= i; j++) {\n            printf(\"* \");\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "inverted-left-half-pyramid",
    "num": 4,
    "title": "Inverted Left Half Pyramid",
    "category": "star",
    "difficulty": "Easy",
    "description": "Inverted right triangle aligned to the right edge with increasing leading spaces.",
    "logic": [
      "Outer loop runs i from n down to 1.",
      "First inner loop prints 2 * (n - i) leading spaces.",
      "Second inner loop prints i stars.",
      "Print newline after each row."
    ],
    "outputPreview": "* * * * * \n  * * * * \n    * * * \n      * * \n        * ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = n; i >= 1; i--) {\n        // Leading spaces increase as i decreases\n        for (int j = 1; j <= 2 * (n - i); j++) {\n            printf(\" \");\n        }\n        // Print stars\n        for (int k = 1; k <= i; k++) {\n            printf(\"* \");\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "full-pyramid",
    "num": 5,
    "title": "Full Pyramid (Equilateral Triangle)",
    "category": "star",
    "difficulty": "Medium",
    "description": "Symmetric pyramid centered using single spaces between stars.",
    "logic": [
      "Outer loop runs i from 1 to n.",
      "First inner loop prints (n - i) spaces to center the row.",
      "Second inner loop prints i stars followed by a space (\"* \").",
      "Print newline after each row."
    ],
    "outputPreview": "    * \n   * * \n  * * * \n * * * * \n* * * * * ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = 1; i <= n; i++) {\n        // Print single spaces for centering\n        for (int j = 1; j <= n - i; j++) {\n            printf(\" \");\n        }\n        // Print \"* \" (star + space)\n        for (int k = 1; k <= i; k++) {\n            printf(\"* \");\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "inverted-full-pyramid",
    "num": 6,
    "title": "Inverted Full Pyramid",
    "category": "star",
    "difficulty": "Medium",
    "description": "Upside-down centered pyramid starting with n stars on the top row down to 1 star.",
    "logic": [
      "Outer loop runs i from n down to 1.",
      "First inner loop prints (n - i) spaces.",
      "Second inner loop prints i stars (\"* \").",
      "Print newline after each row."
    ],
    "outputPreview": "* * * * * \n * * * * \n  * * * \n   * * \n    * ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = n; i >= 1; i--) {\n        // Increasing spaces\n        for (int j = 1; j <= n - i; j++) {\n            printf(\" \");\n        }\n        // Decreasing stars\n        for (int k = 1; k <= i; k++) {\n            printf(\"* \");\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "rhombus-pattern",
    "num": 7,
    "title": "Rhombus (Parallelogram) Pattern",
    "category": "star",
    "difficulty": "Easy",
    "description": "A slanted square where every row contains exactly n stars, shifted by leading spaces.",
    "logic": [
      "Outer loop runs i from 1 to n.",
      "First inner loop prints (n - i) leading spaces for slant.",
      "Second inner loop prints exactly n stars.",
      "Print newline after each row."
    ],
    "outputPreview": "    * * * * * \n   * * * * * \n  * * * * * \n * * * * * \n* * * * * ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = 1; i <= n; i++) {\n        // Slanting spaces\n        for (int j = 1; j <= n - i; j++) {\n            printf(\" \");\n        }\n        // Constant n stars per row\n        for (int k = 1; k <= n; k++) {\n            printf(\"* \");\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "diamond-pattern",
    "num": 8,
    "title": "Diamond Pattern",
    "category": "star",
    "difficulty": "Medium",
    "description": "A combination of an upper Full Pyramid followed by a lower Inverted Full Pyramid.",
    "logic": [
      "Upper section: i from 1 to n, print (n - i) spaces, then i stars.",
      "Lower section: i from n - 1 down to 1, print (n - i) spaces, then i stars.",
      "Creates a symmetric 2n - 1 row diamond shape."
    ],
    "outputPreview": "    * \n   * * \n  * * * \n * * * * \n* * * * * \n * * * * \n  * * * \n   * * \n    * ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    // Upper Half of Diamond\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= n - i; j++) printf(\" \");\n        for (int k = 1; k <= i; k++) printf(\"* \");\n        printf(\"\n\");\n    }\n\n    // Lower Half of Diamond\n    for (int i = n - 1; i >= 1; i--) {\n        for (int j = 1; j <= n - i; j++) printf(\" \");\n        for (int k = 1; k <= i; k++) printf(\"* \");\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "hourglass-pattern",
    "num": 9,
    "title": "Hourglass Pattern",
    "category": "star",
    "difficulty": "Medium",
    "description": "An inverted pyramid directly joined with an upright pyramid at the single-star pinch point.",
    "logic": [
      "Upper section: i from n down to 1, print (n - i) spaces and i stars.",
      "Lower section: i from 2 up to n, print (n - i) spaces and i stars.",
      "Notice lower starts from i = 2 to avoid duplicating the central vertex."
    ],
    "outputPreview": "* * * * * \n * * * * \n  * * * \n   * * \n    * \n   * * \n  * * * \n * * * * \n* * * * * ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    // Upper inverted pyramid\n    for (int i = n; i >= 1; i--) {\n        for (int j = 1; j <= n - i; j++) printf(\" \");\n        for (int k = 1; k <= i; k++) printf(\"* \");\n        printf(\"\n\");\n    }\n\n    // Lower upright pyramid (starts from 2)\n    for (int i = 2; i <= n; i++) {\n        for (int j = 1; j <= n - i; j++) printf(\" \");\n        for (int k = 1; k <= i; k++) printf(\"* \");\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "hollow-square",
    "num": 10,
    "title": "Hollow Square Pattern",
    "category": "hollow",
    "difficulty": "Easy",
    "description": "A square grid with boundary stars only, leaving the interior hollow.",
    "logic": [
      "Outer loop i from 1 to n (rows), inner loop j from 1 to n (cols).",
      "If i == 1 or i == n (top/bottom boundary) -> print star.",
      "If j == 1 or j == n (left/right boundary) -> print star.",
      "Otherwise -> print two spaces (\"  \")."
    ],
    "outputPreview": "* * * * * \n*       * \n*       * \n*       * \n* * * * * ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= n; j++) {\n            // Boundary condition\n            if (i == 1 || i == n || j == 1 || j == n) {\n                printf(\"* \");\n            } else {\n                printf(\"  \");\n            }\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "hollow-full-pyramid",
    "num": 11,
    "title": "Hollow Full Pyramid Pattern",
    "category": "hollow",
    "difficulty": "Hard",
    "description": "An equilateral triangle outlined with stars on its edges and base, hollow inside.",
    "logic": [
      "Outer loop runs i from 1 to n.",
      "Print (n - i) spaces to center.",
      "For k from 1 to (2*i - 1): print star if k == 1, k == 2*i - 1, or i == n.",
      "Else print a single space."
    ],
    "outputPreview": "    * \n   * * \n  *   * \n *     * \n* * * * * * * * * ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = 1; i <= n; i++) {\n        // Leading spaces\n        for (int j = 1; j <= n - i; j++) {\n            printf(\" \");\n        }\n        // Hollow star condition\n        for (int k = 1; k <= 2 * i - 1; k++) {\n            if (k == 1 || k == 2 * i - 1 || i == n) {\n                printf(\"*\");\n            } else {\n                printf(\" \");\n            }\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "hollow-diamond",
    "num": 12,
    "title": "Hollow Diamond Pattern",
    "category": "hollow",
    "difficulty": "Hard",
    "description": "A diamond border formed by upper and lower hollow pyramid outlines.",
    "logic": [
      "Upper section: for i from 1 to n, print spaces, star at boundaries k==1 or k==2*i-1.",
      "Lower section: for i from n-1 down to 1, same boundary conditions.",
      "Creates a crisp diamond contour."
    ],
    "outputPreview": "    * \n   * * \n  *   * \n *     * \n*       * \n *     * \n  *   * \n   * * \n    * ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    // Upper hollow half\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= n - i; j++) printf(\" \");\n        for (int k = 1; k <= 2 * i - 1; k++) {\n            if (k == 1 || k == 2 * i - 1) printf(\"*\");\n            else printf(\" \");\n        }\n        printf(\"\n\");\n    }\n\n    // Lower hollow half\n    for (int i = n - 1; i >= 1; i--) {\n        for (int j = 1; j <= n - i; j++) printf(\" \");\n        for (int k = 1; k <= 2 * i - 1; k++) {\n            if (k == 1 || k == 2 * i - 1) printf(\"*\");\n            else printf(\" \");\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "simple-number-pyramid",
    "num": 13,
    "title": "Simple Numbers Pyramid (1 to i)",
    "category": "number",
    "difficulty": "Easy",
    "description": "Each row i displays consecutive numbers starting from 1 up to i.",
    "logic": [
      "Outer loop i runs from 1 to n.",
      "Inner loop j runs from 1 to i.",
      "Print j followed by a space in each iteration."
    ],
    "outputPreview": "1 \n1 2 \n1 2 3 \n1 2 3 4 \n1 2 3 4 5 ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            printf(\"%d \", j);\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "inverted-number-pyramid",
    "num": 14,
    "title": "Inverted Number Pyramid",
    "category": "number",
    "difficulty": "Easy",
    "description": "Countdown number triangle starting from 1 to n down to just 1.",
    "logic": [
      "Outer loop i runs from n down to 1.",
      "Inner loop j runs from 1 to i.",
      "Print j on each iteration."
    ],
    "outputPreview": "1 2 3 4 5 \n1 2 3 4 \n1 2 3 \n1 2 \n1 ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = n; i >= 1; i--) {\n        for (int j = 1; j <= i; j++) {\n            printf(\"%d \", j);\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "same-row-number-pyramid",
    "num": 15,
    "title": "Same Number in Row Pyramid",
    "category": "number",
    "difficulty": "Easy",
    "description": "Every number printed on row i is equal to the row index i.",
    "logic": [
      "Outer loop i runs from 1 to n.",
      "Inner loop j runs from 1 to i.",
      "Print i (the row number) instead of column j."
    ],
    "outputPreview": "1 \n2 2 \n3 3 3 \n4 4 4 4 \n5 5 5 5 5 ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            printf(\"%d \", i);\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "floyds-triangle",
    "num": 16,
    "title": "Floyd's Triangle",
    "category": "number",
    "difficulty": "Easy",
    "description": "A right triangle of consecutively increasing natural numbers across rows.",
    "logic": [
      "Maintain a running integer counter initialized to 1.",
      "Outer loop i runs from 1 to n.",
      "Inner loop j runs from 1 to i, printing counter++."
    ],
    "outputPreview": "1 \n2 3 \n4 5 6 \n7 8 9 10 \n11 12 13 14 15 ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n    int num = 1; // Continuous counter\n\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            printf(\"%d \", num);\n            num++;\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "binary-triangle",
    "num": 17,
    "title": "0-1 Binary Triangle",
    "category": "number",
    "difficulty": "Medium",
    "description": "A triangle alternating between 1 and 0 using parity check of row and column indices.",
    "logic": [
      "Outer loop i from 1 to n, inner loop j from 1 to i.",
      "Check parity: if (i + j) % 2 == 0 -> print 1, else -> print 0.",
      "Guarantees alternating binary values in all directions."
    ],
    "outputPreview": "1 \n0 1 \n1 0 1 \n0 1 0 1 \n1 0 1 0 1 ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            // Even sum gives 1, odd sum gives 0\n            if ((i + j) % 2 == 0) {\n                printf(\"1 \");\n            } else {\n                printf(\"0 \");\n            }\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "palindromic-number-pyramid",
    "num": 18,
    "title": "Palindromic Number Pyramid",
    "category": "number",
    "difficulty": "Hard",
    "description": "Centered pyramid where numbers count up from 1 to i and then mirror back down to 1.",
    "logic": [
      "Print 2 * (n - i) spaces for center alignment.",
      "Ascending loop: j runs from 1 up to i, printing j.",
      "Descending loop: j runs from i - 1 down to 1, printing j."
    ],
    "outputPreview": "        1 \n      1 2 1 \n    1 2 3 2 1 \n  1 2 3 4 3 2 1 \n1 2 3 4 5 4 3 2 1 ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = 1; i <= n; i++) {\n        // Leading spaces\n        for (int j = 1; j <= 2 * (n - i); j++) {\n            printf(\" \");\n        }\n        // Ascending part: 1 to i\n        for (int j = 1; j <= i; j++) {\n            printf(\"%d \", j);\n        }\n        // Descending part: i-1 down to 1\n        for (int j = i - 1; j >= 1; j--) {\n            printf(\"%d \", j);\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "pascals-triangle",
    "num": 19,
    "title": "Pascal's Triangle",
    "category": "number",
    "difficulty": "Hard",
    "description": "Triangular array of binomial coefficients where each number is the sum of the two above it.",
    "logic": [
      "Outer loop i from 0 to n - 1.",
      "Print (n - i) single spaces for triangle centering.",
      "Initialize coef = 1.",
      "Inner loop j from 0 to i: print coef, then update coef = coef * (i - j) / (j + 1)."
    ],
    "outputPreview": "    1 \n   1 1 \n  1 2 1 \n 1 3 3 1 \n1 4 6 4 1 ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = 0; i < n; i++) {\n        // Spaces for centering\n        for (int space = 1; space <= n - i; space++) {\n            printf(\" \");\n        }\n\n        int coef = 1;\n        for (int j = 0; j <= i; j++) {\n            printf(\"%d \", coef);\n            // Formula for nCr: C(i, j+1) = C(i, j) * (i - j) / (j + 1)\n            coef = coef * (i - j) / (j + 1);\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "simple-alphabet-triangle",
    "num": 20,
    "title": "Alphabet Triangle (A to A+i)",
    "category": "character",
    "difficulty": "Easy",
    "description": "Each row prints characters starting from 'A' up to 'A' + i - 1.",
    "logic": [
      "Outer loop i runs from 1 to n.",
      "Inner loop j runs from 1 to i.",
      "Print character using expression 'A' + j - 1."
    ],
    "outputPreview": "A \nA B \nA B C \nA B C D \nA B C D E ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            printf(\"%c \", 'A' + j - 1);\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "same-char-in-row",
    "num": 21,
    "title": "Same Character in Row Triangle",
    "category": "character",
    "difficulty": "Easy",
    "description": "Row 1 prints 'A', row 2 prints 'B B', row 3 prints 'C C C', and so on.",
    "logic": [
      "Outer loop i runs from 1 to n.",
      "Inner loop j runs from 1 to i.",
      "Print constant character 'A' + i - 1 for the whole row."
    ],
    "outputPreview": "A \nB B \nC C C \nD D D D \nE E E E E ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            printf(\"%c \", 'A' + i - 1);\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "continuous-alphabet-triangle",
    "num": 22,
    "title": "Continuous Alphabet Triangle (Floyd Style)",
    "category": "character",
    "difficulty": "Easy",
    "description": "Continuous alphabetical sequence starting at 'A' and advancing across rows.",
    "logic": [
      "Initialize char ch = 'A'.",
      "Outer loop i from 1 to n, inner loop j from 1 to i.",
      "Print ch++ in each inner iteration."
    ],
    "outputPreview": "A \nB C \nD E F \nG H I J \nK L M N O ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n    char ch = 'A'; // Running character\n\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            printf(\"%c \", ch++);\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "palindromic-alphabet-pyramid",
    "num": 23,
    "title": "Palindromic Alphabet Pyramid",
    "category": "character",
    "difficulty": "Hard",
    "description": "Centered pyramid going from 'A' up to the ith character and back to 'A'.",
    "logic": [
      "Print 2 * (n - i) spaces.",
      "Ascending loop: j from 0 to i - 1, print 'A' + j.",
      "Descending loop: j from i - 2 down to 0, print 'A' + j."
    ],
    "outputPreview": "        A \n      A B A \n    A B C B A \n  A B C D C B A \nA B C D E D C B A ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = 1; i <= n; i++) {\n        // Leading spaces\n        for (int j = 1; j <= 2 * (n - i); j++) {\n            printf(\" \");\n        }\n        // Ascending characters: A to A + i - 1\n        for (int j = 0; j < i; j++) {\n            printf(\"%c \", 'A' + j);\n        }\n        // Descending characters\n        for (int j = i - 2; j >= 0; j--) {\n            printf(\"%c \", 'A' + j);\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "inverted-alphabet-triangle",
    "num": 24,
    "title": "Inverted Alphabet Triangle",
    "category": "character",
    "difficulty": "Easy",
    "description": "Countdown alphabet triangle starting from row size n down to 1.",
    "logic": [
      "Outer loop i runs from n down to 1.",
      "Inner loop j runs from 1 to i.",
      "Print 'A' + j - 1."
    ],
    "outputPreview": "A B C D E \nA B C D \nA B C \nA B \nA ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = n; i >= 1; i--) {\n        for (int j = 1; j <= i; j++) {\n            printf(\"%c \", 'A' + j - 1);\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "butterfly-pattern",
    "num": 25,
    "title": "Butterfly Pattern",
    "category": "star",
    "difficulty": "Hard",
    "description": "A butterfly with symmetric wings expanding and contracting with middle space gap.",
    "logic": [
      "Upper wings (i from 1 to n): i stars, 2*(n-i) spaces, i stars.",
      "Lower wings (i from n down to 1): i stars, 2*(n-i) spaces, i stars.",
      "Total 2n rows with symmetric star wings."
    ],
    "outputPreview": "*                 * \n* *             * * \n* * *         * * * \n* * * *     * * * * \n* * * * * * * * * * \n* * * * * * * * * * \n* * * *     * * * * \n* * *         * * * \n* *             * * \n*                 * ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    // Upper Half of Butterfly\n    for (int i = 1; i <= n; i++) {\n        // Left wing\n        for (int j = 1; j <= i; j++) printf(\"* \");\n        // Center gap\n        for (int j = 1; j <= 2 * (n - i); j++) printf(\"  \");\n        // Right wing\n        for (int j = 1; j <= i; j++) printf(\"* \");\n        printf(\"\n\");\n    }\n\n    // Lower Half of Butterfly\n    for (int i = n; i >= 1; i--) {\n        // Left wing\n        for (int j = 1; j <= i; j++) printf(\"* \");\n        // Center gap\n        for (int j = 1; j <= 2 * (n - i); j++) printf(\"  \");\n        // Right wing\n        for (int j = 1; j <= i; j++) printf(\"* \");\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  },
  {
    "id": "hollow-inverted-full-pyramid",
    "num": 26,
    "title": "Hollow Inverted Full Pyramid",
    "category": "hollow",
    "difficulty": "Hard",
    "description": "Upside-down centered pyramid with hollow interior and stars along all perimeter edges.",
    "logic": [
      "Outer loop i from n down to 1.",
      "Print (n - i) spaces for centering.",
      "For k from 1 to 2*i - 1: print star if k == 1, k == 2*i - 1, or i == n.",
      "Else print space."
    ],
    "outputPreview": "* * * * * * * * * \n *     * \n  *   * \n   * * \n    * ",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    for (int i = n; i >= 1; i--) {\n        // Leading spaces\n        for (int j = 1; j <= n - i; j++) {\n            printf(\" \");\n        }\n        // Hollow boundary condition\n        for (int k = 1; k <= 2 * i - 1; k++) {\n            if (k == 1 || k == 2 * i - 1 || i == n) {\n                printf(\"*\");\n            } else {\n                printf(\" \");\n            }\n        }\n        printf(\"\n\");\n    }\n\n    return 0;\n}"
  }
];
