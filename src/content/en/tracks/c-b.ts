import type { Day } from '../../types';

/** C track, days 4–10. */
export const cEnB: Day[] = [
  {
    day: 4,
    title: 'Branching and loops',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'The control structures are almost identical to the Java-like ones. One difference matters: older C has **no separate boolean type** — zero is false and everything else is true.' },
      { k: 'code', lang: 'c', src: 'int dist = 8;\n\nif (dist < 10) {\n    printf("Obstacle\\n");\n} else if (dist < 30) {\n    printf("Slow down\\n");\n} else {\n    printf("Go\\n");\n}\n\nfor (int i = 0; i < 5; i++) printf("%d ", i);\n\nwhile (dist > 0) dist--;' },
      { k: 'callout', tone: 'warn', md: 'The classic C bug: `if (x = 5)` instead of `if (x == 5)`. That is an **assignment** whose result is 5, which is true — so the condition always holds, and the compiler may not warn. Compile with `-Wall`.' },
      { k: 'code', lang: 'c', src: 'for (int i = 0; i < 10; i++) {\n    if (i == 3) continue;\n    if (i == 6) break;\n    printf("%d ", i);\n}\n// 0 1 2 4 5', explain: '`break` and `continue` behave exactly as they do in Python.' },
      { k: 'callout', tone: 'tip', md: 'Use braces even for a one-line `if`. Without them, a second line added later is no longer part of the condition — a bug that has been collecting victims for decades.' },
    ],
    quiz: [
      { k: 'single', q: 'What counts as true in C?', opts: ['Only true', 'Anything that is not zero', 'Only 1'], answer: 1, why: 'In C zero is false and every other value is true. That is why an accidental assignment yields a condition that always holds.' },
      { k: 'single', q: 'What is wrong with `if (x = 5)`?', opts: ['It will not compile', 'It assigns rather than compares, and is always true', 'It is slow'], answer: 1, why: '`=` assigns, and the value of the expression is 5, which is not zero, so true. Comparison is `==`.' },
      { k: 'output', q: 'What does this print?', code: 'for (int i = 0; i < 4; i++) {\n    if (i == 2) continue;\n    printf("%d", i);\n}', lang: 'c', opts: ['0123', '013', '012'], answer: 1, why: '`continue` skips 2 and the rest is printed: 0, 1, 3.' },
      { k: 'single', q: 'Why use braces even on a one-line if?', opts: ['It looks better', 'Because a line added later would no longer belong to the condition', 'It is faster'], answer: 1, why: 'Without braces only the next single statement belongs to the if. A second line runs unconditionally — silently.' },
    ],
    note: {
      summary: ['Zero is false and everything else true — older C has no boolean type.', '`if (x = 5)` assigns rather than compares and is always true.', '`for`, `while`, `break` and `continue` work as elsewhere.', 'Use braces even on a one-line if.', 'Compile with `-Wall`: it catches many of these.'],
      terms: [{ term: 'truth value', def: 'In C, zero is false and every other value is true.' }, { term: 'assignment in a condition', def: 'The classic bug of writing `=` where `==` was meant.' }, { term: 'block', def: 'A sequence of statements enclosed in braces.' }],
    },
  },
  {
    day: 5,
    title: 'Functions',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A C function declares what it takes and what it returns. If the compiler has not seen the function by the time it is called, you get a warning or an error — which is what **prototypes** are for.' },
      { k: 'code', lang: 'c', src: '#include <stdio.h>\n\nint add(int a, int b);     // prototype\n\nint main(void) {\n    printf("%d\\n", add(2, 3));\n    return 0;\n}\n\nint add(int a, int b) {    // definition\n    return a + b;\n}', explain: 'The prototype tells the compiler the shape of the function before the definition appears. The same line goes in a header file.' },
      { k: 'callout', tone: 'key', md: 'In C **every parameter is passed by value**. If a function has to change the caller\'s variable, it must receive a pointer — there is no other way.' },
      { k: 'code', lang: 'c', src: 'void increment(int *x) { (*x)++; }\n\nint n = 5;\nincrement(&n);\nprintf("%d\\n", n);    // 6', explain: 'The parentheses in `(*x)++` matter: `*x++` would step the pointer, not the value.' },
      { k: 'callout', tone: 'warn', md: 'Never return a pointer to a local variable. When the function returns, that memory is released and the pointer dangles — it sometimes still works, and then one day it does not.' },
    ],
    quiz: [
      { k: 'single', q: 'What is a prototype for?', opts: ['Making the code faster', 'Telling the compiler the shape of a function before its definition', 'Running the function'], answer: 1, why: 'C reads top to bottom. Without a prototype the compiler cannot know what a function defined further down expects.' },
      { k: 'single', q: 'How are parameters passed in C?', opts: ['By reference', 'By value, always', 'It depends on the type'], answer: 1, why: 'A copy is always made. To change the caller\'s variable you must pass its address through a pointer.' },
      { k: 'single', q: 'Why is returning a pointer to a local variable dangerous?', opts: ['It is slow', 'That memory is released when the function returns', 'It will not compile'], answer: 1, why: 'A local lives on the stack, which is reused after the return. The pointer looks fine for a while and then yields rubbish.' },
      { k: 'single', q: 'What is the difference between `(*x)++` and `*x++`?', opts: ['None', 'The first increments the value, the second steps the pointer', 'The second is invalid'], answer: 1, why: '`++` binds tighter than `*`. Without parentheses the pointer moves on rather than the value growing.' },
    ],
    note: {
      summary: ['A prototype tells the compiler the shape of a function before its definition.', 'In C every parameter is passed by value.', 'Changing the caller\'s variable requires passing a pointer.', '`(*x)++` increments the value; `*x++` steps the pointer.', 'Never return a pointer to a local variable: that memory is released.'],
      terms: [{ term: 'prototype', def: "A function header declared in advance to the compiler." }, { term: 'pass by value', def: 'The function receives a copy of the parameter.' }, { term: 'dangling pointer', def: 'A pointer into memory that has already been released.' }],
    },
  },
  {
    day: 6,
    title: 'Arrays',
    minutes: 20,
    lesson: [
      { k: 'text', md: 'A C array is a **contiguous region of memory** holding a given number of items of one type. There is no magic in it — and no protection either.' },
      { k: 'code', lang: 'c', src: 'int distances[5];                 // five ints, uninitialised!\nint readings[] = {12, 8, 30, 5};  // size comes from the list\n\nint count = sizeof(readings) / sizeof(readings[0]);\nprintf("%d\\n", count);            // 4', explain: 'An array does not know its own length. The `sizeof` trick divides the total size by the size of one item — the only way to find out.' },
      { k: 'callout', tone: 'warn', md: '`distances[10]` on a five-item array does **not** fail: it writes into neighbouring memory. The program often keeps running and collapses half an hour later somewhere else. This is the most notorious class of C bug.' },
      { k: 'code', lang: 'c', src: 'for (int i = 0; i < count; i++) {\n    printf("%d ", readings[i]);\n}' },
      { k: 'callout', tone: 'key', md: 'The `sizeof` trick **only works where the array was declared**. Pass it to a function and it becomes a pointer, so `sizeof` gives the size of the pointer. That is why the length must always travel as a separate parameter.' },
    ],
    quiz: [
      { k: 'single', q: 'What happens if you write past the end of an array?', opts: ['It raises', 'It writes into neighbouring memory', 'Nothing happens'], answer: 1, why: 'C does no bounds checking. The program may keep running but the data is corrupted — and the failure shows up elsewhere, later.' },
      { k: 'single', q: 'How do you find the number of items in an array?', opts: ['array.length', 'sizeof(a) / sizeof(a[0])', 'count(a)'], answer: 1, why: 'An array does not store its length. You divide the total size by the size of one item.' },
      { k: 'single', q: 'Why does the sizeof trick fail inside a function?', opts: ['It is slow', 'Because the array becomes a pointer when passed', 'The compiler forbids it'], answer: 1, why: 'Only the starting address is passed. `sizeof` then gives the size of the pointer, which is why the length must be passed separately.' },
      { k: 'single', q: 'What is in an uninitialised array?', opts: ['Zeros', 'Undefined rubbish', 'NULL'], answer: 1, why: 'Just as with any local variable: whatever was in that memory. Always initialise.' },
    ],
    note: {
      summary: ['An array is a contiguous region of memory holding items of one type.', 'An array does not know its length: `sizeof(a) / sizeof(a[0])`.', 'That trick fails inside a function — pass the length separately.', 'Writing past the end does not fail; it corrupts neighbouring memory.', 'An uninitialised array holds rubbish.'],
      terms: [{ term: 'array', def: 'A contiguous region of memory holding items of one type.' }, { term: 'out-of-bounds access', def: 'Reading or writing outside an array, unchecked.' }, { term: 'array decay', def: 'An array becoming a pointer when passed to a function.' }],
    },
  },
  {
    day: 7,
    title: 'How pointers and arrays relate',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'In C the name of an array means, in most places, **the address of its first item**. That is why arrays and pointers look like the same thing — although they are not.' },
      { k: 'code', lang: 'c', src: 'int t[3] = {10, 20, 30};\nint *p = t;               // the same as &t[0]\n\nprintf("%d\\n", t[1]);     // 20\nprintf("%d\\n", p[1]);     // 20 — a pointer can be indexed too\nprintf("%d\\n", *(t + 1)); // 20 — the same thing differently', explain: '`t[i]` really is `*(t + i)`. Indexing is just a more comfortable notation for pointer arithmetic.' },
      { k: 'callout', tone: 'key', md: 'Pointer arithmetic steps **by item**, not by byte. `p + 1` moves four bytes for an `int*` and eight for a `double*`. The compiler knows the size and does the multiplication.' },
      { k: 'code', lang: 'c', src: 'void print(int *t, int count) {   // the length has to travel too\n    for (int i = 0; i < count; i++)\n        printf("%d ", t[i]);\n}\n\nprint(t, 3);', explain: 'In a parameter list `int t[]` and `int *t` are entirely equivalent — both are pointers.' },
      { k: 'callout', tone: 'warn', md: 'The difference is still there: `sizeof` gives the whole size for an array and the pointer size for a pointer. And an array name cannot be reassigned, while a pointer can.' },
    ],
    quiz: [
      { k: 'single', q: 'What is `t[i]` equivalent to?', opts: ['*(t + i)', 't + i', '&t[i]'], answer: 0, why: 'Indexing is only notation: the compiler produces the same thing for both.' },
      { k: 'single', q: 'How far does `p + 1` move for an `int*` with 4-byte ints?', opts: ['1 byte', '4 bytes', '8 bytes'], answer: 1, why: 'Pointer arithmetic steps by item, and an item here is 4 bytes. The compiler does the multiplication.' },
      { k: 'single', q: 'What is the difference between an array and a pointer?', opts: ['None', '`sizeof` differs, and an array name cannot be reassigned', 'The pointer is faster'], answer: 1, why: 'They behave alike in many places but are not the same: the array is the region itself; the pointer is only an address.' },
      { k: 'single', q: 'What must travel alongside an array passed to a function?', opts: ['Nothing', 'The number of items', 'The type'], answer: 1, why: 'The function only gets the starting address. Without the length it cannot know where to stop — a fundamental C pattern.' },
    ],
    note: {
      summary: ['An array name means, in most places, the address of its first item.', '`t[i]` is exactly `*(t + i)` — indexing is a convenience.', 'Pointer arithmetic steps by item, not by byte.', 'In a parameter list `int t[]` and `int *t` are equivalent.', 'They still differ: `sizeof` and reassignment behave differently.', 'Always pass the number of items alongside an array.'],
      terms: [{ term: 'pointer arithmetic', def: 'Stepping a pointer by items, scaled by the type size.' }, { term: 'array decay', def: 'An array name turning into a pointer in an expression or parameter.' }, { term: 'length parameter', def: "Passing an array's length separately to a function." }],
    },
  },
  {
    day: 8,
    title: 'Strings in C',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'C has **no string type**. A string is a `char` array ending in a `\\0` (null character). Every text function looks for that terminator.' },
      { k: 'code', lang: 'c', src: '#include <string.h>\n\nchar name[] = "Rover";     // 6 bytes: R o v e r \\0\n\nprintf("%zu\\n", strlen(name));   // 5 — the terminator is not counted\nprintf("%zu\\n", sizeof(name));   // 6 — it is', explain: '`strlen` counts characters, `sizeof` counts bytes occupied. They always differ by one.' },
      { k: 'callout', tone: 'warn', md: 'If the terminating `\\0` is missing or overwritten, `printf` and `strlen` keep reading until they happen upon a zero byte somewhere in memory. This is the classic C security hole.' },
      { k: 'code', lang: 'c', src: 'char target[20];\nstrcpy(target, "Rover");            // copy\nstrcat(target, " Mk-II");           // append\n\nif (strcmp(target, "Rover Mk-II") == 0)\n    printf("match\\n");', explain: '`strcmp` gives zero when they match. Never compare strings with `==` in C: that would compare two addresses.' },
      { k: 'callout', tone: 'key', md: '`strcpy` does not check whether it fits. If the target is smaller than the source it overwrites past the end — the famous buffer overflow. Use `snprintf` or check the length first.' },
    ],
    quiz: [
      { k: 'single', q: 'What terminates a string in C?', opts: ['A semicolon', 'A `\\0` null character', 'A newline'], answer: 1, why: 'Every text function looks for it. Without it there is no way to know where the text ends.' },
      { k: 'numeric', q: 'How many bytes does `char s[] = "abc";` occupy?', answer: 4, tol: 0.5, why: 'Three characters plus the terminating null: four bytes. `strlen` still gives 3.' },
      { k: 'single', q: 'How do you compare two strings in C?', opts: ['==', 'strcmp()', 'equals()'], answer: 1, why: '`==` would compare the two addresses. `strcmp` looks at the content and gives zero on a match.' },
      { k: 'single', q: 'What is wrong with `strcpy`?', opts: ['It is slow', 'It does not check that the target buffer is big enough', 'It is deprecated'], answer: 1, why: 'If the source is longer it writes past the target. That is a buffer overflow, the classic source of security bugs.' },
    ],
    note: {
      summary: ['C has no string type: a string is a `\\0`-terminated char array.', '`strlen` counts characters, `sizeof` counts bytes — they differ by one.', 'A missing terminator makes functions read past the end of memory.', 'Compare with `strcmp()`; `==` would compare addresses.', '`strcpy` checks no size — the source of buffer overflows.'],
      terms: [{ term: 'null-terminated string', def: 'A character array ending with a `\\0`.' }, { term: 'strlen', def: 'A function giving the number of characters, excluding the terminator.' }, { term: 'buffer overflow', def: 'Writing past the end of an allocated region.' }],
    },
  },
  {
    day: 9,
    title: 'Structs',
    minutes: 22,
    lesson: [
      { k: 'text', md: 'A **struct** groups several pieces of data of different types under one name. It is C\'s answer to what other languages call an object.' },
      { k: 'code', lang: 'c', src: 'typedef struct {\n    char name[20];\n    int battery;\n    double x, y;\n} Rover;\n\nRover r = {"Mk-I", 100, 0.0, 0.0};\n\nprintf("%s %d\\n", r.name, r.battery);\nr.battery -= 5;', explain: 'Without the `typedef` you would have to write `struct Rover` at every use. That is why it is normally defined this way.' },
      { k: 'code', lang: 'c', src: 'void move(Rover *r, double dx) {\n    r->x += dx;          // the same as (*r).x\n}\n\nmove(&r, 10.0);', explain: 'The `->` operator reaches a field through a pointer. It is the common notation in C, because structs are nearly always passed by pointer.' },
      { k: 'callout', tone: 'key', md: 'A struct **can** be passed by value, but copying a large one is expensive. With a pointer you pass only an address — hence the prevalence of `->`. If the function should not modify it, write `const Rover *r`.' },
      { k: 'callout', tone: 'warn', md: 'Two structs cannot be compared with `==`. Compare field by field, or with `memcmp` — but that also looks at padding bytes and can mislead.' },
    ],
    quiz: [
      { k: 'single', q: 'What is `typedef` for with a struct?', opts: ['Making it faster', 'Saving you from writing `struct` everywhere', 'Saving memory'], answer: 1, why: '`typedef` names the type. Without it every declaration would read `struct Rover r;`.' },
      { k: 'single', q: 'What does the `->` operator mean?', opts: ['Assignment', 'Reaching a field through a pointer', 'Comparison'], answer: 1, why: '`r->x` is exactly `(*r).x`, only more readable.' },
      { k: 'single', q: 'Why pass a struct by pointer?', opts: ['It is required', 'Because passing by value copies the whole thing', 'Because it would not compile otherwise'], answer: 1, why: 'Copying a large struct on every call is wasted work. A pointer is just an address.' },
      { k: 'single', q: 'How do you compare two structs?', opts: ['==', 'Field by field', 'strcmp'], answer: 1, why: '`==` is not defined on structs. `memcmp` exists but is unreliable because of padding bytes.' },
    ],
    note: {
      summary: ['A struct groups several pieces of data of different types under one name.', '`typedef` removes the need to write `struct` at every use.', 'Field access: `r.x` on a value, `r->x` through a pointer.', 'Pass structs by pointer: by value copies the whole thing.', 'Write `const Type *` when the function should not modify it.', 'Structs cannot be compared with `==`; compare field by field.'],
      terms: [{ term: 'struct', def: 'A composite type grouping fields of different types.' }, { term: 'typedef', def: 'Giving a new name to a type.' }, { term: 'arrow operator (->)', def: 'Reaching a field through a pointer to a struct.' }],
    },
  },
  {
    day: 10,
    title: 'Dynamic memory: malloc and free',
    minutes: 24,
    lesson: [
      { k: 'text', md: 'So far all memory was automatic: it vanished at the end of the function. **Dynamic memory** is for when the amount is only known at runtime, or when the data must outlive the function.' },
      { k: 'code', lang: 'c', src: '#include <stdlib.h>\n\nint n = 100;\nint *t = malloc(n * sizeof(int));\n\nif (t == NULL) {\n    printf("Out of memory\\n");\n    return 1;\n}\n\nt[0] = 42;\nfree(t);\nt = NULL;        // so no dangling pointer is left', explain: '`malloc` allocates bytes and returns the starting address — or `NULL` if it failed. **Always** check that.' },
      { k: 'callout', tone: 'key', md: 'What you allocate you must release. Every `malloc` deserves exactly one `free`. This is C\'s greatest responsibility — and the source of most long-running bugs.' },
      { k: 'text', md: 'The three typical mistakes:\n\n- **Memory leak** — allocated and never released. The program eats more and more memory.\n- **Double free** — `free` called twice on the same block. An instant crash, or worse.\n- **Use after free** — touching it after `free`. It sometimes works, which is what makes it insidious.' },
      { k: 'callout', tone: 'tip', md: 'Set the pointer to `NULL` right after `free`. Dereferencing `NULL` crashes immediately — far better than quietly reading bad data.' },
    ],
    quiz: [
      { k: 'single', q: 'What does `malloc` return when the allocation fails?', opts: ['Zero', 'A NULL pointer', 'It raises'], answer: 1, why: 'C has no exceptions: failure is signalled by the return value. That is why every `malloc` must be checked.' },
      { k: 'single', q: 'What is a memory leak?', opts: ['Reading bad data', 'Memory allocated but never released', 'Releasing twice'], answer: 1, why: 'The program keeps allocating and never gives anything back. In a long-running program that eventually exhausts the machine.' },
      { k: 'single', q: 'Why set a pointer to NULL after `free`?', opts: ['It is faster', 'Because dereferencing NULL crashes at once rather than failing quietly', 'It is required'], answer: 1, why: 'A dangling pointer may appear to work for a while. NULL fails immediately and loudly, which is far easier to find.' },
      { k: 'single', q: 'How many `free` calls does one `malloc` deserve?', opts: ['None', 'Exactly one', 'Two'], answer: 1, why: 'None is a leak. Two is a double free, which crashes. Exactly one is right.' },
    ],
    note: {
      summary: ['`malloc` allocates memory at runtime and returns the starting address.', 'It returns `NULL` on failure — always check.', 'Every `malloc` deserves exactly one `free`.', 'Three typical mistakes: leak, double free, use after free.', 'Set the pointer to `NULL` after `free`: NULL fails loudly.'],
      terms: [{ term: 'malloc', def: 'Runtime memory allocation returning the starting address.' }, { term: 'memory leak', def: 'Memory allocated but never released.' }, { term: 'double free', def: 'Calling free twice on the same block.' }],
    },
  },
];
